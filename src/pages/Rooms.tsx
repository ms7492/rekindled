import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AppShell from "@/components/AppShell";
import { MOCK_ROOMS } from "@/data/mockRooms";
import { MessageCircle, Search, Sparkles, Users } from "lucide-react";
import { useState } from "react";

const FILTERS = ["All", "Active", "New", "Archived"];

const Rooms = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AppShell>
      <div className="flex flex-1 flex-col bg-background">
        {/* Header */}
        <div className="border-b border-border px-6 py-4 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="font-display text-xl font-bold lg:text-2xl">Chats</h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {MOCK_ROOMS.length} active conversations
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-accent px-2 text-[11px] font-bold text-accent-foreground">
                {MOCK_ROOMS.reduce((sum, r) => sum + r.unread, 0)}
              </span>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-secondary/50 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  activeFilter === filter
                    ? "bg-foreground text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-1">
          {/* Chat list */}
          <div className="flex-1 overflow-y-auto px-6 pb-24 lg:pb-8 lg:px-8">
            {MOCK_ROOMS.length > 0 ? (
              <div className="mx-auto max-w-2xl">
                {/* Pinned section */}
                <div className="py-3">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    Recent
                  </p>
                </div>

                <div className="divide-y divide-border">
                  {MOCK_ROOMS.map((room, i) => (
                    <motion.button
                      key={room.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                      onClick={() => navigate(`/chat/${room.id}`)}
                      className="flex w-full items-center gap-4 py-4 text-left transition-all hover:bg-secondary/30 -mx-3 px-3 rounded-xl"
                    >
                      <div className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center">
                        {room.members.slice(0, 3).map((m, j) => (
                          <img
                            key={m.id}
                            src={m.avatar}
                            alt={m.name}
                            className="absolute h-8 w-8 rounded-full border-2 border-background bg-secondary"
                            style={{ left: j * 10, top: j * 3, zIndex: 3 - j }}
                          />
                        ))}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-foreground text-[15px] truncate">{room.eventTitle}</h3>
                          <span className="text-[11px] text-muted-foreground flex-shrink-0 ml-2">{room.lastMessageTime}</span>
                        </div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span className="text-[11px] text-muted-foreground">{room.members.length} members · {room.eventDate}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{room.lastMessage}</p>
                      </div>
                      {room.unread > 0 && (
                        <span className="flex h-6 min-w-[24px] flex-shrink-0 items-center justify-center rounded-full bg-accent px-2 text-[11px] font-bold text-accent-foreground">
                          {room.unread}
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Suggested section */}
                <div className="py-5 mt-4">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground flex items-center gap-2">
                    <Sparkles className="h-3 w-3" />
                    Suggested hangs to join
                  </p>
                  <div className="space-y-2">
                    {[
                      { title: "Sunset Yoga in the Park", members: 4, emoji: "🧘" },
                      { title: "Street Food Festival", members: 6, emoji: "🍕" },
                    ].map((suggestion) => (
                      <div
                        key={suggestion.title}
                        className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/50 p-3.5 transition-all hover:bg-secondary/30 cursor-pointer"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-lg">
                          {suggestion.emoji}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{suggestion.title}</p>
                          <p className="text-[11px] text-muted-foreground">{suggestion.members} people interested</p>
                        </div>
                        <span className="rounded-full bg-accent/10 px-3 py-1 text-[11px] font-semibold text-accent">
                          Join
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-28 text-center">
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
                  <MessageCircle className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="mb-3 font-display text-2xl font-bold">No chats yet</h2>
                <p className="text-muted-foreground">Like events to get matched into groups!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default Rooms;
