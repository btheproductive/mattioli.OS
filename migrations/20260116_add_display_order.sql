-- Migration: Add display_order to goals table
-- Date: 2026-01-16
-- Purpose: Enable custom ordering of habits in the Manage Habits panel

-- Add display_order column to goals table
ALTER TABLE public.goals ADD COLUMN IF NOT EXISTS display_order INTEGER;

-- Initialize display_order based on created_at for existing records
-- This ensures existing habits maintain their current order
UPDATE public.goals 
SET display_order = sub.row_num 
FROM (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at) as row_num 
  FROM public.goals
) sub 
WHERE goals.id = sub.id AND goals.display_order IS NULL;

-- Add comment to document the field
COMMENT ON COLUMN public.goals.display_order IS 'Custom display order for habits. Lower numbers appear first. NULL values will be sorted by created_at.';
