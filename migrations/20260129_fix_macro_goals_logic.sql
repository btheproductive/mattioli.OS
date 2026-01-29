-- Improved function to check and fail expired goals
-- Accepts current date parameters from the/client to ensure consistency with frontend date logic (date-fns)
-- This fixes the issue where future goals (e.g., next week) were incorrectly marked as failed
-- because the check didn't properly account for month/year boundaries or used different week calculation.

CREATE OR REPLACE FUNCTION check_and_fail_expired_goals(
    current_year INT,
    current_month INT,
    current_week INT,
    current_quarter INT
)
RETURNS void AS $$
BEGIN
    -- Update 'weekly' goals
    -- Fail if:
    -- 1. Year is past
    -- 2. Year is current but Month is past
    -- 3. Year is current, Month is current, but Week is past
    UPDATE long_term_goals
    SET status = 'failed'
    WHERE status = 'active'
      AND type = 'weekly'
      AND (
          year < current_year
          OR (year = current_year AND month < current_month)
          OR (year = current_year AND month = current_month AND week_number < current_week)
      );

    -- Update 'monthly' goals
    UPDATE long_term_goals
    SET status = 'failed'
    WHERE status = 'active'
      AND type = 'monthly'
      AND (
          year < current_year
          OR (year = current_year AND month < current_month)
      );

    -- Update 'quarterly' goals
    UPDATE long_term_goals
    SET status = 'failed'
    WHERE status = 'active'
      AND type = 'quarterly'
      AND (
          year < current_year
          OR (year = current_year AND quarter < current_quarter)
      );

    -- Update 'annual' goals
    UPDATE long_term_goals
    SET status = 'failed'
    WHERE status = 'active'
      AND type = 'annual'
      AND year < current_year;

END;
$$ LANGUAGE plpgsql;
