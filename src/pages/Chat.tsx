import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Send, Users, Sparkles, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MOCK_CHAT, ChatMessage } from "@/data/mockRooms";
import AppShell from "@/components/AppShell";
import MemberProfileSheet from "@/components/MemberProfileSheet";
import { supabase } from "@/integrations/supabase/client";

interface RoomMember {
  id: string;
  name: string;
  avatar_url: string | null;
  interests: string[];
}

/** Generate an event-specific icebreaker message */
function getEventIcebreaker(eventTitle: string): string {
  const lower = eventTitle.toLowerCase();
  if (lower.includes("music") || lower.includes("concert") || lower.includes("dj"))
    return `Welcome to the "${eventTitle}" room! 🎵 I'm here to help break the ice. What's a song that's been on repeat for you lately? Anyone been to a similar show before?`;
  if (lower.includes("food") || lower.includes("brunch") || lower.includes("dinner") || lower.includes("taco"))
    return `Hey foodies! Welcome to "${eventTitle}" 🍽️ What's your go-to comfort food? And does anyone have a favorite spot near the venue?`;
  if (lower.includes("tech") || lower.includes("hack") || lower.includes("startup") || lower.includes("pitch"))
    return `Welcome to "${eventTitle}"! 💻 What are you working on right now? Any cool side projects or ideas you're excited about?`;
  if (lower.includes("fitness") || lower.includes("run") || lower.includes("yoga") || lower.includes("hike"))
    return `Hey everyone! Welcome to "${eventTitle}" 💪 What's your fitness routine like? Anyone done an event like this before?`;
  if (lower.includes("comedy") || lower.includes("standup") || lower.includes("improv"))
    return `Welcome to "${eventTitle}"! 😂 Who's your favorite comedian right now? This is going to be a great time!`;
  if (lower.includes("art") || lower.includes("gallery") || lower.includes("museum"))
    return `Hey art lovers! Welcome to "${eventTitle}" 🎨 What kind of art are you into? Anyone been to this gallery before?`;
  if (lower.includes("game") || lower.includes("gaming") || lower.includes("board"))
    return `Welcome to "${eventTitle}"! 🎮 What games are you into right now? Let's get to know each other before we meet up!`;
  return `Welcome to the "${eventTitle}" room! 🔥 I'm Rekindled AI — here to help you all connect before the event. What are you most excited about for this one?`;
}

const Chat = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [roomTitle, setRoomTitle] = useState("");
  const [members, setMembers] = useState<RoomMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<RoomMember | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    if (!roomId) return;

    const fetchRoomData = async () => {
      setLoading(true);

      // Get room info
      const { data: room } = await supabase
        .from("rooms")
        .select("id, event_title")
        .eq("id", roomId)
        .maybeSingle();

      if (!room) {
        navigate("/rooms");
        return;
      }

      const title = room.event_title || "Chat Room";
      setRoomTitle(title);

      // Generate AI icebreaker based on the event
      const icebreaker: ChatMessage = {
        id: "ai-intro",
        senderId: "ai",
        senderName: "Rekindled AI",
        senderAvatar: "",
        content: getEventIcebreaker(title),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isAI: true,
      };
      setMessages([icebreaker]);

      // Get members with profiles
      const { data: roomMembers } = await supabase
        .from("room_users")
        .select("user_id")
        .eq("room_id", roomId);

      if (roomMembers && roomMembers.length > 0) {
        const userIds = roomMembers.map((m) => m.user_id);
        const [{ data: profiles }, { data: interests }] = await Promise.all([
          supabase.from("profiles").select("id, name, avatar_url").in("id", userIds),
          supabase.from("user_interests").select("user_id, interest_id").in("user_id", userIds),
        ]);

        // Group interests by user_id
        const interestMap: Record<string, string[]> = {};
        for (const i of interests || []) {
          if (!interestMap[i.user_id]) interestMap[i.user_id] = [];
          interestMap[i.user_id].push(i.interest_id);
        }

        setMembers(
          (profiles || []).map((p) => ({
            id: p.id,
            name: p.name || "Anonymous",
            avatar_url: p.avatar_url,
            interests: interestMap[p.id] || [],
          }))
        );
      }

      setLoading(false);
    };

    fetchRoomData();
  }, [roomId, navigate]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: ChatMessage = {
      id: `m${Date.now()}`,
      senderId: "me",
      senderName: "You",
      senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Me",
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  const handleMemberClick = (member: RoomMember) => {
    setSelectedMember(member);
    setSheetOpen(true);
  };

  if (loading) {
    return (
      <AppShell>
        <div className="flex flex-1 items-center justify-center bg-background">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="flex flex-1 flex-col bg-background">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-4 lg:px-8">
          <button onClick={() => navigate("/rooms")} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary transition-colors lg:hidden">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-[15px] text-foreground truncate">{roomTitle}</h2>
            <span className="text-[11px] text-muted-foreground flex items-center gap-1">
              <Users className="h-3 w-3" />
              {members.length} members
            </span>
          </div>
        </div>

        {/* Members bar */}
        <div className="border-b border-border px-4 py-3 lg:px-8">
          <p className="mb-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.15em]">
            Members
          </p>
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {members.map((member) => {
              const avatarUrl = member.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`;
              return (
                <button
                  key={member.id}
                  onClick={() => handleMemberClick(member)}
                  className="flex flex-col items-center gap-1.5 flex-shrink-0 group"
                >
                  <div className="relative">
                    <img
                      src={avatarUrl}
                      alt={member.name}
                      className="h-10 w-10 rounded-full bg-secondary border-2 border-transparent group-hover:border-accent/50 transition-all"
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground group-hover:text-foreground transition-colors max-w-[56px] truncate">
                    {member.name.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 lg:px-8">
          <div className="mx-auto max-w-2xl space-y-6">
            {messages.map((msg, i) => {
              const isMe = msg.senderId === "me";
              const isAI = msg.isAI;

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.3 }}
                  className={`flex gap-3 ${isMe ? "flex-row-reverse" : "flex-row"}`}
                >
                  {!isMe && (
                    <div className="flex-shrink-0 pt-5">
                      {isAI ? (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                          <Sparkles className="h-4 w-4 text-accent" />
                        </div>
                      ) : (
                        <img src={msg.senderAvatar} alt={msg.senderName} className="h-8 w-8 rounded-full bg-secondary" />
                      )}
                    </div>
                  )}
                  <div className={`max-w-[75%] ${isMe ? "items-end" : "items-start"}`}>
                    {!isMe && (
                      <span className={`mb-1 block text-[11px] font-medium ${isAI ? "text-accent" : "text-muted-foreground"}`}>
                        {msg.senderName}
                      </span>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        isMe
                          ? "bg-foreground text-primary-foreground rounded-br-md"
                          : isAI
                          ? "bg-accent/8 text-foreground border border-accent/15 rounded-bl-md"
                          : "bg-card border border-border text-foreground rounded-bl-md"
                      }`}
                    >
                      {msg.content}
                    </div>
                    <span className="mt-1.5 block text-[10px] text-muted-foreground">{msg.timestamp}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-border bg-card/80 backdrop-blur-xl px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] lg:px-8">
          <div className="mx-auto flex max-w-2xl items-center gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 rounded-full border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground h-12 px-5"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-primary-foreground transition-all hover:opacity-90 active:scale-95 disabled:opacity-30"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Member profile sheet */}
        <MemberProfileSheet
          member={selectedMember}
          open={sheetOpen}
          onOpenChange={setSheetOpen}
        />
      </div>
    </AppShell>
  );
};

export default Chat;
