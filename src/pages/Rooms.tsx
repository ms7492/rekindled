import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { MOCK_ROOMS } from "@/data/mockRooms";
import { MessageCircle } from "lucide-react";

const Rooms = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col gradient-surface">
      <div className="px-6 pb-4 pt-12">
        <h1 className="text-2xl font-bold">Your Rooms</h1>
        <p className="text-sm text-muted-foreground">
          Chat with your matched groups
        </p>
      </div>

      <div className="flex-1 space-y-3 px-6 pb-24">
        {MOCK_ROOMS.length > 0 ? (
          MOCK_ROOMS.map((room, i) => (
            <motion.button
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(`/chat/${room.id}`)}
              className="flex w-full items-center gap-4 rounded-2xl bg-card p-4 shadow-card transition-colors hover:bg-secondary text-left"
            >
              {/* Stacked avatars */}
              <div className="relative flex h-12 w-12 flex-shrink-0">
                {room.members.slice(0, 3).map((m, j) => (
                  <img
                    key={m.id}
                    src={m.avatar}
                    alt={m.name}
                    className="absolute h-8 w-8 rounded-full border-2 border-card bg-secondary"
                    style={{ left: j * 10, zIndex: 3 - j }}
                  />
                ))}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground truncate">{room.eventTitle}</h3>
                  <span className="text-xs text-muted-foreground flex-shrink-0">{room.lastMessageTime}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{room.lastMessage}</p>
                <span className="text-xs text-muted-foreground">{room.eventDate} · {room.members.length} people</span>
              </div>

              {room.unread > 0 && (
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full gradient-primary text-[10px] font-bold text-primary-foreground">
                  {room.unread}
                </span>
              )}
            </motion.button>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
              <MessageCircle className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="mb-2 text-xl font-bold">No rooms yet</h2>
            <p className="text-sm text-muted-foreground">
              Swipe right on events to get matched into rooms!
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Rooms;
