# 🚀 Quick Start Guide - Event Management System

## ⚠️ CRITICAL FIRST STEP

**You're seeing an error because the database schema needs to be updated!**

### The Error You're Seeing:
```
Error: column events.status does not exist
```

### Fix It Now:

1. **Open Supabase Dashboard** → SQL Editor
2. **Copy and paste this SQL:**

```sql
ALTER TABLE events
ADD COLUMN IF NOT EXISTS status TEXT
CHECK (status IN ('upcoming', 'ongoing', 'completed'))
DEFAULT 'upcoming';

UPDATE events SET status = 'upcoming' WHERE status IS NULL;

CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_created_by ON events(created_by);
```

3. **Click "Run"**
4. **Refresh your browser** - Error should be gone! ✅

---

## What's New?

### 1. Event Status Tracking
- ✅ Every event now has a status: `upcoming`, `ongoing`, or `completed`
- ✅ New events default to `upcoming`
- ✅ Event managers can change status via dropdown

### 2. Event Manager Dashboard
- ✅ New page: `/manager/events`
- ✅ View only YOUR events (filtered by creator)
- ✅ See real-time attendee counts
- ✅ Edit and delete events
- ✅ Search functionality

### 3. Smart Event Filtering
- ✅ **Regular users** only see `upcoming` and `ongoing` events
- ✅ **Completed events are hidden** from public view
- ✅ **Event managers** see all their events (including completed)

### 4. Navigation
- ✅ **Admins** (@greenum.org): See "My Events" in navigation
- ✅ **Regular users**: See "Going" in navigation

---

## How to Use

### As Event Manager:

1. **Sign in** with @greenum.org email
2. Click **"My Events"** in navigation
3. **View all your events** with attendee counts
4. Click **"Edit"** to:
   - Update event details
   - Change status (upcoming → ongoing → completed)
5. Click **"Delete"** to remove events
6. Use **search bar** to find events quickly

### As Regular User:

1. Visit **Home page**
2. See only **upcoming and ongoing events**
3. **Completed events are automatically hidden**
4. Click event to register

---

## Testing

### Test Event Status:

1. Create a new event (it will be `upcoming`)
2. Go to "My Events"
3. Click "Edit" on an event
4. Change status to `ongoing`
5. Save and see the badge color change

### Test Event Filtering:

1. Create several events
2. Set some to `completed`
3. Visit home page as regular user
4. Verify completed events are hidden

---

## Servers Running

- ✅ **Backend**: http://localhost:5001
- ✅ **Frontend**: http://localhost:5175

---

## File Structure

```
GreenUM/
├── api/
│   └── index.js                    # Updated with status endpoints
├── frontend/src/
│   ├── pages/
│   │   └── ManagerEventsPage.tsx  # NEW - Manager dashboard
│   ├── components/
│   │   ├── event-management/
│   │   │   ├── EventTable.tsx     # Updated with real data
│   │   │   └── EditEventModal.tsx # Added status dropdown
│   │   └── ui/
│   │       └── select.tsx         # NEW - Select component
│   ├── hooks/
│   │   └── useEvents.ts           # Added status field, API calls
│   └── layout/
│       └── Navbar.tsx             # Conditional navigation
└── database-schema-update.sql     # SQL migration script
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | Get events (filtered by status) |
| GET | `/api/events?include_completed=true` | Get all events |
| POST | `/api/events` | Create event (auto-sets status) |
| PUT | `/api/events/:id` | Update event |
| DELETE | `/api/events/:id` | Delete event |

---

## Troubleshooting

### "Column does not exist" error
→ Run the SQL migration above ⬆️

### Events not showing in manager dashboard
→ Make sure events have `created_by` field set to your user ID

### Can't change status
→ Verify you're logged in as admin (@greenum.org)

### Navigation not showing "My Events"
→ Sign in with @greenum.org email to be recognized as admin

---

## Next Steps

After running the SQL migration, everything should work perfectly!

Visit `/manager/events` to see your event management dashboard.
