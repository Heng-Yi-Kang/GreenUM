# ⚠️ IMPORTANT: Run This SQL First!

Before using the event management system, you MUST add the `status` column to your database.

## Step 1: Open Supabase SQL Editor

1. Go to your Supabase Dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"

## Step 2: Copy and Run This SQL

```sql
-- Add status column to events table
ALTER TABLE events
ADD COLUMN IF NOT EXISTS status TEXT 
CHECK (status IN ('upcoming', 'ongoing', 'completed')) 
DEFAULT 'upcoming';

-- Update existing events to have 'upcoming' status
UPDATE events
SET status = 'upcoming'
WHERE status IS NULL;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_created_by ON events(created_by);
```

## Step 3: Click "Run"

Wait for the success message.

## Step 4: Verify

Run this query to verify the column was added:

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'events' AND column_name = 'status';
```

You should see:
```
column_name | data_type
status      | text
```

## ✅ Done!

Now you can use the event management system. The frontend will work correctly after this migration.

---

## What This Does:

- ✅ Adds `status` column with values: `upcoming`, `ongoing`, `completed`
- ✅ Sets all existing events to `upcoming` status
- ✅ Creates database indexes for faster queries
- ✅ Prevents invalid status values (database constraint)

## After Running This:

1. Refresh your frontend page
2. The error should be gone
3. Event managers can now see their events at `/manager/events`
4. Status dropdown will work in edit modal
