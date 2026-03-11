import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

    // Parse optional event_titles from request body
    let eventTitles: Record<string, string> = {};
    try {
      const body = await req.json();
      eventTitles = body?.event_titles || {};
    } catch (_e) { /* no body is fine */ }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Find events with 3+ right-swipes that don't have a room yet
    const { data: swipeGroups, error: swipeErr } = await supabase
      .from("swipes")
      .select("event_id")
      .eq("direction", "right");

    if (swipeErr) throw swipeErr;

    // Group swipes by event_id
    const eventSwipes: Record<string, boolean> = {};
    for (const s of swipeGroups || []) {
      eventSwipes[s.event_id] = true;
    }
    const eventIds = Object.keys(eventSwipes);

    // Check which events already have rooms
    const { data: existingRooms, error: roomErr } = await supabase
      .from("rooms")
      .select("event_id")
      .in("event_id", eventIds.length > 0 ? eventIds : ["__none__"]);

    if (roomErr) throw roomErr;

    const existingEventIds = new Set((existingRooms || []).map((r: any) => r.event_id));

    // For each event without a room, count right-swipes
    const newEventIds = eventIds.filter((id) => !existingEventIds.has(id));

    let roomsCreated = 0;
    let usersAdded = 0;

    for (const eventId of newEventIds) {
      // Get all users who swiped right on this event
      const { data: swipes, error: sErr } = await supabase
        .from("swipes")
        .select("user_id")
        .eq("event_id", eventId)
        .eq("direction", "right");

      if (sErr) throw sErr;
      if (!swipes || swipes.length < 3) continue;

      // Create room with title from request body or fallback to event_id
      const { data: room, error: rErr } = await supabase
        .from("rooms")
        .insert({ event_id: eventId, event_title: eventTitles[eventId] || `Event ${eventId}` })
        .select("id")
        .single();

      if (rErr) throw rErr;

      // Add users to room
      const members = swipes.map((s: any) => ({
        room_id: room.id,
        user_id: s.user_id,
      }));

      const { error: mErr } = await supabase
        .from("room_users")
        .insert(members);

      if (mErr) throw mErr;

      roomsCreated++;
      usersAdded += members.length;
    }

    // Also check existing rooms for new swipers to add
    for (const eventId of Array.from(existingEventIds)) {
      const { data: room } = await supabase
        .from("rooms")
        .select("id")
        .eq("event_id", eventId)
        .single();

      if (!room) continue;

      const { data: currentMembers } = await supabase
        .from("room_users")
        .select("user_id")
        .eq("room_id", room.id);

      const memberIds = new Set((currentMembers || []).map((m: any) => m.user_id));

      const { data: swipes } = await supabase
        .from("swipes")
        .select("user_id")
        .eq("event_id", eventId)
        .eq("direction", "right");

      const newMembers = (swipes || [])
        .filter((s: any) => !memberIds.has(s.user_id))
        .map((s: any) => ({ room_id: room.id, user_id: s.user_id }));

      if (newMembers.length > 0) {
        await supabase.from("room_users").insert(newMembers);
        usersAdded += newMembers.length;
      }
    }

    return new Response(
      JSON.stringify({ success: true, roomsCreated, usersAdded }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
