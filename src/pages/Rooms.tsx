import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AppShell from "@/components/AppShell";
import { MOCK_ROOMS } from "@/data/mockRooms";
import { MessageCircle } from "lucide-react";

const Rooms = () => {
  const navigate = useNavigate();

  return (
    <AppShell>
      <div className="flex flex-1 flex-col bg-background">
        <div className="border-b border-border px-6 py-4 lg:px-8">
          <h1 className="font-display text-xl font-bold lg:text-2xl">Chats</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Your matched group conversations
          </p>
        </div>

        <div className="flex-1 px-6 pb-24 lg:pb-8 lg:px-8">
          {MOCK_ROOMS.length > 0 ? (
            <div className="mx-auto max-w-2xl divide-y divide-border">
              {MOCK_ROOMS.map((room, i) => (
                <motion.button
                  key={room.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                  onClick={() => navigate(`/chat/${room.id}`)}
                  className="flex w-full items-center gap-4 py-5 text-left transition-all hover:bg-secondary/30 -mx-3 px-3 rounded-xl"
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
    </AppShell>
  );
};

export default Rooms;
