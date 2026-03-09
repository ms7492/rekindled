import { useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import EventCard from "@/components/EventCard";
import BottomNav from "@/components/BottomNav";
import { MOCK_EVENTS } from "@/data/mockEvents";
import { X, Heart, Flame } from "lucide-react";
import { toast } from "sonner";

const Feed = () => {
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [swipedRight, setSwipedRight] = useState<string[]>([]);
  const swipeDirectionRef = useRef<"left" | "right">("right");
  const [, forceUpdate] = useState(0);

  const handleSwipe = useCallback(
    (direction: "left" | "right") => {
      const current = events[0];
      if (!current) return;
      swipeDirectionRef.current = direction;
      if (direction === "right") {
        setSwipedRight((prev) => [...prev, current.id]);
        toast.success(`You're in for "${current.title}" ✦`);
      }
      forceUpdate((n) => n + 1);
      requestAnimationFrame(() => setEvents((prev) => prev.slice(1)));
    },
    [events]
  );

  return (
    <div className="flex min-h-[100svh] flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pb-3 pt-[max(3.5rem,env(safe-area-inset-top,3.5rem))]">
        <div className="flex items-center gap-2.5">
          <Flame className="h-5 w-5 text-brand" />
          <h1 className="font-display text-xl font-bold">Discover</h1>
        </div>
        <span className="rounded-full bg-secondary px-3.5 py-1 text-xs font-medium text-muted-foreground">
          {events.length} left
        </span>
      </div>

      {/* Card stack */}
      <div className="relative mx-auto flex w-full max-w-[380px] flex-1 flex-col items-center justify-center px-5 pb-28">
        <div className="relative h-[480px] w-full sm:h-[520px]">
          <AnimatePresence>
            {events.length > 0 ? (
              events
                .slice(0, 2)
                .reverse()
                .map((event, i) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onSwipe={handleSwipe}
                    isTop={i === events.slice(0, 2).reverse().length - 1}
                    swipeDirection={swipeDirectionRef.current}
                  />
                ))
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-full flex-col items-center justify-center text-center"
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
                  <Flame className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="mb-2 font-display text-xl font-bold">All caught up!</h2>
                <p className="max-w-[200px] text-sm text-muted-foreground leading-relaxed">
                  Check back later for more hangs near you.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action buttons */}
        {events.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex items-center gap-12"
          >
            <button
              onClick={() => handleSwipe("left")}
              className="flex h-[60px] w-[60px] items-center justify-center rounded-full border-2 border-border bg-card shadow-card transition-all duration-200 hover:scale-110 hover:shadow-elevated active:scale-95"
            >
              <X className="h-6 w-6 text-muted-foreground" />
            </button>
            <button
              onClick={() => handleSwipe("right")}
              className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-brand shadow-elevated transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <Heart className="h-7 w-7 text-brand-foreground" />
            </button>
          </motion.div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Feed;
