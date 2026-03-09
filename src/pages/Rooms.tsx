import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { MOCK_ROOMS } from "@/data/mockRooms";
import { MessageCircle } from "lucide-react";

const Rooms = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[100svh] flex-col bg-background">
      <div className="px-6 pb-2 pt-14">
        <h1 className="font-display text-2xl font-bold">Chats</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Your matched group conversations
        </p>
      </div>

      <div className="flex-1 px-6 pb-24">
        {MOCK_ROOMS.length > 0 ? (
          <div className="divide-y divide-border">
            {MOCK_ROOMS.map((room, i) => (
              <motion.button
                key={room.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => navigate(`/chat/${room.id}`)}
                className="flex w-full items-center gap-4 py-4 text-left transition-colors hover:bg-secondary/50 -mx-3 px-3 rounded-xl"
              >
                {/* Stacked avatars */}
                <div className="relative flex h-12 w-12 flex-shrink-0">
                  {room.members.slice(0, 3).map((m, j) => (
                    <img
                      key={m.id}
                      src={m.avatar}
                      alt={m.name}
                      className="absolute h-7 w-7 rounded-full border-2 border-background bg-secondary"
                      style={{ left: j * 10, top: j * 2, zIndex: 3 - j }}
                    />
                  ))}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className="font-semibold text-foreground text-[15px] truncate">{room.eventTitle}</h3>
                    <span className="text-[11px] text-muted-foreground flex-shrink-0 ml-2">{room.lastMessageTime}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{room.lastMessage}</p>
                </div>

                {room.unread > 0 && (
                  <span className="flex h-5 min-w-[20px] flex-shrink-0 items-center justify-center rounded-full bg-accent px-1.5 text-[10px] font-bold text-accent-foreground">
                    {room.unread}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
              <MessageCircle className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="mb-2 font-display text-xl font-bold">No chats yet</h2>
            <p className="text-sm text-muted-foreground">
              Like events to get matched into groups!
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Rooms;
