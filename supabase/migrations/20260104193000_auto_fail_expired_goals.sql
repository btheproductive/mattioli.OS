-- Function to check and fail expired goals with a 48-hour buffer
CREATE OR REPLACE FUNCTION check_and_fail_expired_goals()
RETURNS void AS $$
DECLARE
    curr_date DATE := CURRENT_DATE;
    cutoff_date DATE := CURRENT_DATE - INTERVAL '2 days'; -- 48 hour buffer (grace period)
    -- This cutoff_date means: if endpoint < cutoff_date, meaning more than 2 days have passed since endpoint
BEGIN
    -- 1. ANNUAL GOALS
    -- Fail if year < current year (e.g., it's Jan 3rd 2025, goal is 2024. End date is Dec 31 2024. Diff is > 2 days)
    UPDATE long_term_goals
    SET status = 'failed'
    WHERE type = 'annual'
      AND status = 'active'
      AND year < EXTRACT(YEAR FROM cutoff_date); 
      -- Logic: if today is Jan 3, cutoff is Jan 1. If year is < 2025, i.e., 2024. Correct.
      -- wait, if today is Jan 2 2025. Cutoff is Dec 31 2024. 
      -- year < 2024 is definitely failed. 
      -- year < 2025? 
      -- If today is Jan 2, cutoff = Dec 31. Year of cutoff = 2024. 
      -- Checks if goal year < 2024. Goal year 2024 IS NOT < 2024. So active.
      -- If today is Jan 3, cutoff = Jan 1. Year of cutoff = 2025.
      -- Checks if goal year < 2025. Goal year 2024 IS < 2025. Failed.
      -- Works.

    -- 2. QUARTERLY GOALS
    -- Quarters end: Q1 (Mar 31), Q2 (Jun 30), Q3 (Sep 30), Q4 (Dec 31)
    -- More complex logic needed or explicit date calculation.
    -- Let's construct the end date of the goal and compare with cutoff_date.
    
    UPDATE long_term_goals
    SET status = 'failed'
    WHERE type = 'quarterly'
      AND status = 'active'
      AND (
          make_date(year, (quarter * 3), 1) + interval '1 month' - interval '1 day' 
      ) < cutoff_date;

    -- 3. MONTHLY GOALS
    -- End of month
    UPDATE long_term_goals
    SET status = 'failed'
    WHERE type = 'monthly'
      AND status = 'active'
      AND (
          make_date(year, month, 1) + interval '1 month' - interval '1 day'
      ) < cutoff_date;

    -- 4. WEEKLY GOALS
    -- Assume week number follows ISO or similar. We need to approximate or calculate properly.
    -- Easier approach: we store year/week.
    -- Get ISO end date of that year/week (Sunday).
    -- TO_DATE(year || week, 'IYYYIW') returns Monday of that week.
    -- +6 days = Sunday.
    UPDATE long_term_goals
    SET status = 'failed'
    WHERE type = 'weekly'
      AND status = 'active'
      AND (
          TO_DATE(year::text || week_number::text, 'IYYYIW') + 6
      ) < cutoff_date;

END;
$$ LANGUAGE plpgsql;
