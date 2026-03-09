import { useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import EventCard from "@/components/EventCard";
import AppShell from "@/components/AppShell";
import { MOCK_EVENTS } from "@/data/mockEvents";
import { X, Heart, Flame, TrendingUp, Calendar, Sparkles } from "lucide-react";
import { toast } from "sonner";

const TRENDING_TAGS = ["🔥 Trending", "🎵 Music", "🍕 Food", "💻 Tech", "🧘 Wellness", "🎨 Art"];

const UPCOMING = [
  { title: "Jazz & Wine Night", date: "Tomorrow", emoji: "🎷", spots: 4 },
  { title: "Ramen Crawl", date: "Saturday", emoji: "🍜", spots: 2 },
  { title: "Morning Run Club", date: "Sunday", emoji: "🏃", spots: 8 },
];

const Feed = () => {
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [swipedRight, setSwipedRight] = useState<string[]>([]);
  const [activeTag, setActiveTag] = useState("🔥 Trending");
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
    <AppShell>
      <div className="relative flex flex-1 flex-col bg-background overflow-hidden">
        {/* Background decorations */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-accent/[0.04] blur-[100px]" />
          <div className="absolute top-1/2 -left-60 h-[400px] w-[400px] rounded-full bg-primary/[0.03] blur-[80px]" />
          <div className="absolute bottom-20 right-1/4 h-[300px] w-[300px] rounded-full bg-accent/[0.03] blur-[90px]" />
          {/* Dot grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        </div>
        {/* Desktop layout */}
        <div className="flex flex-1">
          {/* Main card area */}
          <div className="flex flex-1 flex-col">
            {/* Header with filters */}
            <div className="border-b border-border px-6 py-4 lg:px-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Flame className="h-5 w-5 text-accent" />
                  <h1 className="font-display text-xl font-bold lg:text-2xl">Discover</h1>
                </div>
                <span className="rounded-full bg-secondary px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
                  {events.length} hangs available
                </span>
              </div>
              {/* Tag filters */}
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {TRENDING_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition-all ${
                      activeTag === tag
                        ? "bg-foreground text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Card stack */}
            <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-5 pb-24 lg:pb-8">
              <div className="relative h-[480px] w-full sm:h-[540px]">
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
                      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
                        <Flame className="h-10 w-10 text-muted-foreground" />
                      </div>
                      <h2 className="mb-3 font-display text-2xl font-bold">All caught up!</h2>
                      <p className="text-muted-foreground">Check back later for more hangs.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action buttons */}
              {events.length > 0 && (
                <div className="mt-10 flex items-center gap-12">
                  <button
                    onClick={() => handleSwipe("left")}
                    className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-card shadow-card transition-all hover:scale-105 hover:shadow-elevated active:scale-95"
                  >
                    <X className="h-7 w-7 text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => handleSwipe("right")}
                    className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-accent shadow-elevated transition-all hover:scale-105 active:scale-95"
                  >
                    <Heart className="h-8 w-8 text-accent-foreground" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Desktop right sidebar */}
          <div className="hidden xl:flex xl:w-[320px] xl:flex-col xl:border-l xl:border-border xl:bg-card/30">
            {/* Upcoming hangs */}
            <div className="border-b border-border px-6 py-5">
              <h3 className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                Coming up
              </h3>
              <div className="space-y-3">
                {UPCOMING.map((item) => (
                  <div key={item.title} className="flex items-center gap-3 rounded-xl bg-secondary/50 p-3">
                    <span className="text-xl">{item.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                      <p className="text-[11px] text-muted-foreground">{item.date} · {item.spots} spots left</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Your interests */}
            <div className="border-b border-border px-6 py-5">
              <h3 className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5" />
                Your vibes
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Music", "Tech", "Food", "Outdoors", "Art"].map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-foreground"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="px-6 py-5">
              <h3 className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <TrendingUp className="h-3.5 w-3.5" />
                Your activity
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Hangs", value: "3" },
                  { label: "Connections", value: "12" },
                  { label: "Groups", value: "2" },
                  { label: "This week", value: "1" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-secondary/50 p-3 text-center">
                    <p className="font-display text-xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</p>
        </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default Feed;
