require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow any origin during development to avoid CORS issues with localhost/127.0.0.1 mismatch
      if (
        !origin ||
        origin.startsWith("http://localhost:") ||
        origin.startsWith("http://localhost:5173/") ||
        origin.startsWith("http://127.0.0.1:")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());

// Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "WARNING: Missing SUPABASE_URL or SUPABASE_KEY. DB features will fail."
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Routes
app.get("/", (req, res) => {
  res.send("GreenUM API is running");
});

// Event Routes
// GET /api/events - List all events (for users: only upcoming and ongoing)
app.get("/api/events", async (req, res) => {
  try {
    const { include_completed } = req.query;

    let query = supabase.from("events").select("*");

    // Filter out completed events unless explicitly requested
    if (include_completed !== "true") {
      query = query.in("status", ["upcoming", "ongoing"]);
    }

    query = query.order("date", { ascending: true });

    const { data, error } = await query;

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/events - Create new event
app.post("/api/events", async (req, res) => {
  try {
    const { title, date, time, location, description, image_url, created_by } =
      req.body;

    // Basic validation
    if (!title || !date || !location) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data, error } = await supabase
      .from("events")
      .insert([
        {
          title,
          date,
          time,
          location,
          description,
          image_url,
          created_by,
          status: "upcoming", // Default status when creating event
        },
      ])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/events/:eventId/register - Register for an event
app.post("/api/events/:eventId/register", async (req, res) => {
  console.log(
    `[Registration Request] Event: ${req.params.eventId}, Body:`,
    req.body
  );
  try {
    const { eventId } = req.params;
    const { user_id, user_email } = req.body;

    // Basic validation
    if (!user_id || !user_email) {
      return res.status(400).json({ error: "Missing user_id or user_email" });
    }

    // Validate that user is not an admin/event manager
    if (user_email.endsWith("@greenum.org")) {
      return res.status(403).json({
        error:
          "Event managers and admins cannot register for events. Only regular users can register.",
      });
    }

    // Check if event exists
    const { data: eventData, error: eventError } = await supabase
      .from("events")
      .select("id, title")
      .eq("id", eventId)
      .single();

    if (eventError || !eventData) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Check if user is already registered
    const { data: existingRegistration, error: checkError } = await supabase
      .from("event_registrations")
      .select("id")
      .eq("event_id", eventId)
      .eq("user_id", user_id)
      .maybeSingle();

    if (checkError && checkError.code !== "PGRST116") {
      throw checkError;
    }

    if (existingRegistration) {
      return res.status(409).json({
        error: "You are already registered for this event",
      });
    }

    // Create registration
    const { data, error } = await supabase
      .from("event_registrations")
      .insert([
        {
          event_id: eventId,
          user_id: user_id,
          user_email: user_email,
          registered_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;
    res.status(201).json({
      message: "Successfully registered for event",
      registration: data[0],
    });
  } catch (err) {
    console.error("Error registering for event:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/events/:eventId/registrations - Get all registrations for an event
app.get("/api/events/:eventId/registrations", async (req, res) => {
  try {
    const { eventId } = req.params;

    const { data, error } = await supabase
      .from("event_registrations")
      .select("*")
      .eq("event_id", eventId)
      .order("registered_at", { ascending: false });

    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    console.error("Error fetching registrations:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/events/:eventId/register/:userId - Unregister from an event
app.delete("/api/events/:eventId/register/:userId", async (req, res) => {
  try {
    const { eventId, userId } = req.params;

    const { error } = await supabase
      .from("event_registrations")
      .delete()
      .eq("event_id", eventId)
      .eq("user_id", userId);

    if (error) throw error;
    res.json({ message: "Successfully unregistered from event" });
  } catch (err) {
    console.error("Error unregistering from event:", err);
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/events/:eventId - Update an event
app.put("/api/events/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;
    const { title, date, time, location, description, image_url, status } =
      req.body;

    // Basic validation
    if (!title || !date || !location) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const updateData = {
      title,
      date,
      time,
      location,
      description,
      image_url,
    };

    // Only include status if provided
    if (status) {
      updateData.status = status;
    }

    const { data, error } = await supabase
      .from("events")
      .update(updateData)
      .eq("id", eventId)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(data[0]);
  } catch (err) {
    console.error("Error updating event:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/events/:eventId - Delete an event
app.delete("/api/events/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;

    // First, delete all registrations for this event
    await supabase.from("event_registrations").delete().eq("event_id", eventId);

    // Then delete the event
    const { error } = await supabase.from("events").delete().eq("id", eventId);

    if (error) throw error;
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/users/:userId/registrations - Get all events a user is registered for
app.get("/api/users/:userId/registrations", async (req, res) => {
  try {
    const { userId } = req.params;

    // Get registrations with event details
    const { data, error } = await supabase
      .from("event_registrations")
      .select(
        `
        *,
        event:events (*)
      `
      )
      .eq("user_id", userId)
      .order("registered_at", { ascending: false });

    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    console.error("Error fetching user registrations:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/stats - Get platform statistics (total users and events)
app.get("/api/stats", async (req, res) => {
  try {
    // Get total number of events
    const { count: eventsCount, error: eventsError } = await supabase
      .from("events")
      .select("*", { count: "exact", head: true });

    if (eventsError) throw eventsError;

    // Get active events count (upcoming and ongoing)
    const { count: activeEventsCount, error: activeEventsError } =
      await supabase
        .from("events")
        .select("*", { count: "exact", head: true })
        .in("status", ["upcoming", "ongoing"]);

    if (activeEventsError) throw activeEventsError;

    // Get total number of authenticated users from Supabase Auth
    const {
      data: { users },
      error: usersError,
    } = await supabase.auth.admin.listUsers();

    if (usersError) throw usersError;

    const usersCount = users?.length || 0;

    // Get event registrations for CO2 calculation
    const { data: registrationsData, error: registrationsError } =
      await supabase.from("event_registrations").select("user_id");

    if (registrationsError) throw registrationsError;

    // Calculate estimated values
    // Impact Score: Based on users * events * 100 (arbitrary multiplier for visualization)
    const impactScore = usersCount * (eventsCount || 0) * 100;

    // CO₂ Reduced: Estimate ~20kg CO₂ saved per event participant
    // Formula: total registrations * 20kg / 1000 = tonnes
    const co2Reduced = ((registrationsData?.length || 0) * 20) / 1000;

    res.json({
      totalUsers: usersCount,
      totalEvents: eventsCount || 0,
      activeEvents: activeEventsCount || 0,
      impactScore: impactScore,
      co2Reduced: co2Reduced.toFixed(1), // Return as string with 1 decimal
    });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ error: err.message });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
