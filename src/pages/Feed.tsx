import { useState, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import EventCard from "@/components/EventCard";
import AppShell from "@/components/AppShell";
import { MOCK_EVENTS } from "@/data/mockEvents";
import { Flame, ChevronDown, Check, SlidersHorizontal } from "lucide-react";

/** Map event tag → interest id for matching */
const TAG_TO_INTEREST: Record<string, string> = {
  "Music": "music", "Live": "music",
  "Tech": "tech", "Coding": "tech", "Competition": "tech",
  "Networking": "networking", "Startups": "startups",
  "Food": "food", "Festival": "food", "Brunch": "food",
  "Fitness": "fitness", "Outdoors": "outdoors",
  "Wellness": "fitness",
  "Art": "art", "Culture": "art",
  "Comedy": "comedy", "Entertainment": "comedy",
  "Night Out": "dance", "Dance": "dance",
  "Social": "networking",
  "Games": "gaming", "Casual": "gaming",
  "Film": "movies", "Chill": "outdoors",
};
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  { value: "all", label: "All Categories", emoji: "🔥" },
  { value: "music", label: "Music", emoji: "🎵" },
  { value: "food", label: "Food & Drinks", emoji: "🍕" },
  { value: "tech", label: "Tech", emoji: "💻" },
  { value: "wellness", label: "Wellness", emoji: "🧘" },
  { value: "art", label: "Art & Culture", emoji: "🎨" },
];

const Feed = () => {
  // Read user interests from localStorage and sort events by relevance
  const userInterests: string[] = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("rekindle_interests") || "[]");
    } catch {
      return [];
    }
  }, []);

  const sortedEvents = useMemo(() => {
    if (userInterests.length === 0) return MOCK_EVENTS;
    const interestSet = new Set(userInterests);
    return [...MOCK_EVENTS].sort((a, b) => {
      const scoreA = a.tags.filter((t) => interestSet.has(TAG_TO_INTEREST[t] || t.toLowerCase())).length;
      const scoreB = b.tags.filter((t) => interestSet.has(TAG_TO_INTEREST[t] || t.toLowerCase())).length;
      return scoreB - scoreA;
    });
  }, [userInterests]);

  const [events, setEvents] = useState(sortedEvents);
  const [activeCategory, setActiveCategory] = useState("all");

  const activeCat = CATEGORIES.find((c) => c.value === activeCategory) || CATEGORIES[0];

  const handleJoin = useCallback(
    (id: string) => {
      const event = events.find((e) => e.id === id);
      if (event) {
        toast.success(`You're in for "${event.title}" ✦`);
        setEvents((prev) => prev.filter((e) => e.id !== id));
      }
    },
    [events]
  );

  const handlePass = useCallback(
    (id: string) => {
      setEvents((prev) => prev.filter((e) => e.id !== id));
    },
    []
  );

  return (
    <AppShell>
      <div className="relative flex flex-1 flex-col bg-background overflow-hidden">
        {/* Background decorations */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-accent/[0.06] blur-[120px]" />
          <div className="absolute bottom-0 -left-40 h-[500px] w-[500px] rounded-full bg-accent/[0.04] blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>

        {/* Scrollable content */}
        <div className="relative z-10 flex-1 overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-xl">
            <div className="mx-auto max-w-5xl px-6 py-4 lg:px-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10">
                    <Flame className="h-4.5 w-4.5 text-accent" />
                  </div>
                  <div>
                    <h1 className="font-display text-lg font-bold lg:text-xl">Discover</h1>
                    <p className="text-[11px] text-muted-foreground">{events.length} hangs near you</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Category dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="rounded-xl border-border gap-2 text-sm font-medium"
                        size="sm"
                      >
                        <span>{activeCat.emoji}</span>
                        <span className="hidden sm:inline">{activeCat.label}</span>
                        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      {CATEGORIES.map((cat) => (
                        <DropdownMenuItem
                          key={cat.value}
                          onClick={() => setActiveCategory(cat.value)}
                          className="flex items-center justify-between gap-2"
                        >
                          <span className="flex items-center gap-2">
                            <span>{cat.emoji}</span>
                            {cat.label}
                          </span>
                          {activeCategory === cat.value && (
                            <Check className="h-3.5 w-3.5 text-accent" />
                          )}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl border-border"
                  >
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Events grid */}
          <div className="mx-auto max-w-5xl px-6 py-6 lg:px-8 lg:py-8">
            <AnimatePresence mode="popLayout">
              {events.length > 0 ? (
                <motion.div
                  layout
                  className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {events.map((event, i) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onJoin={handleJoin}
                      onPass={handlePass}
                      index={i}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-32 text-center"
                >
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary">
                    <Flame className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h2 className="mb-2 font-display text-2xl font-bold">All caught up!</h2>
                  <p className="text-muted-foreground max-w-sm">
                    You've seen all available hangs. Check back later for more.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default Feed;
