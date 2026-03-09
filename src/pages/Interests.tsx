import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

const INTERESTS = [
  { id: "music", label: "Music", emoji: "🎵" },
  { id: "sports", label: "Sports", emoji: "⚽" },
  { id: "tech", label: "Tech", emoji: "💻" },
  { id: "food", label: "Food & Drinks", emoji: "🍕" },
  { id: "art", label: "Art & Design", emoji: "🎨" },
  { id: "fitness", label: "Fitness", emoji: "💪" },
  { id: "gaming", label: "Gaming", emoji: "🎮" },
  { id: "movies", label: "Movies & TV", emoji: "🎬" },
  { id: "travel", label: "Travel", emoji: "✈️" },
  { id: "reading", label: "Reading", emoji: "📚" },
  { id: "photography", label: "Photography", emoji: "📸" },
  { id: "networking", label: "Networking", emoji: "🤝" },
  { id: "dance", label: "Dance", emoji: "💃" },
  { id: "outdoors", label: "Outdoors", emoji: "🏔️" },
  { id: "comedy", label: "Comedy", emoji: "😂" },
  { id: "volunteering", label: "Volunteering", emoji: "❤️" },
  { id: "startups", label: "Startups", emoji: "🚀" },
  { id: "cooking", label: "Cooking", emoji: "👨‍🍳" },
];

const Interests = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    if (selected.length < 3) {
      toast.error("Pick at least 3 interests");
      return;
    }
    localStorage.setItem("rekindle_interests", JSON.stringify(selected));
    navigate("/feed");
  };

  return (
    <div className="flex min-h-[100svh] flex-col bg-background">
      <div className="flex-1 px-6 py-14 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-lg"
        >
          <span className="mb-3 inline-block text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Step 2 of 2
          </span>
          <h1 className="mb-2 font-display text-3xl font-bold sm:text-4xl">What are you into?</h1>
          <p className="mb-10 text-muted-foreground">
            Pick at least 3 so we can find your people.
          </p>

          <div className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {INTERESTS.map((interest, i) => {
              const isSelected = selected.includes(interest.id);
              return (
                <motion.button
                  key={interest.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02, duration: 0.3 }}
                  onClick={() => toggle(interest.id)}
                  className={`relative flex items-center gap-2.5 rounded-2xl border p-4 text-left transition-all ${
                    isSelected
                      ? "border-foreground bg-foreground text-primary-foreground shadow-card"
                      : "border-border bg-card text-foreground hover:border-foreground/20 hover:shadow-card"
                  }`}
                >
                  <span className="text-lg">{interest.emoji}</span>
                  <span className="text-sm font-medium">{interest.label}</span>
                  {isSelected && (
                    <Check className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Sticky bottom bar */}
      <div className="sticky bottom-0 border-t border-border bg-background/95 backdrop-blur-xl px-6 py-4">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {selected.length} selected
          </span>
          <Button
            variant="hero"
            size="lg"
            onClick={handleContinue}
            disabled={selected.length < 3}
          >
            Continue
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Interests;
