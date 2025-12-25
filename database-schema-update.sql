-- Add status column to events table
-- Run this SQL in your Supabase SQL Editor

ALTER TABLE events
ADD COLUMN IF NOT EXISTS status TEXT CHECK (status IN ('upcoming', 'ongoing', 'completed')) DEFAULT 'upcoming';

-- Update existing events to have 'upcoming' status if null
UPDATE events
SET status = 'upcoming'
WHERE status IS NULL;

-- Optional: Create an index on status for better query performance
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);

-- Optional: Create an index on created_by for faster manager queries
CREATE INDEX IF NOT EXISTS idx_events_created_by ON events(created_by);
