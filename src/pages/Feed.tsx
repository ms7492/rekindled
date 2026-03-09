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
        toast.success(`You're in for "${current.title}" 🔥`);
      }

      // Force a re-render so the exit animation picks up the ref value,
      // then remove the card on the next tick
      forceUpdate((n) => n + 1);
      requestAnimationFrame(() => {
        setEvents((prev) => prev.slice(1));
      });
    },
    [events]
  );

  const handleButtonSwipe = (direction: "left" | "right") => {
    handleSwipe(direction);
  };

  return (
    <div className="flex min-h-screen flex-col gradient-surface">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pb-2 pt-12">
        <div className="flex items-center gap-2">
          <Flame className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Discover</h1>
        </div>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
          {events.length} events
        </span>
      </div>

      {/* Card stack */}
      <div className="relative mx-auto flex w-full max-w-sm flex-1 flex-col items-center justify-center px-6 pb-20">
        <div className="relative h-[420px] w-full">
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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-full flex-col items-center justify-center text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
                  <Flame className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="mb-2 text-xl font-bold">All caught up!</h2>
                <p className="text-sm text-muted-foreground">
                  Check back later for more events.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action buttons */}
        {events.length > 0 && (
          <div className="mt-6 flex items-center gap-6">
            <button
              onClick={() => handleButtonSwipe("left")}
              className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-card shadow-card transition-transform hover:scale-110 active:scale-95"
            >
              <X className="h-7 w-7 text-muted-foreground" />
            </button>
            <button
              onClick={() => handleButtonSwipe("right")}
              className="flex h-16 w-16 items-center justify-center rounded-full gradient-primary shadow-glow transition-transform hover:scale-110 active:scale-95"
            >
              <Heart className="h-7 w-7 text-primary-foreground" />
            </button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Feed;
