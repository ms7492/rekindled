import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { toast } from "sonner";

const INTERESTS = [
  { id: "music", label: "🎵 Music", category: "arts" },
  { id: "sports", label: "⚽ Sports", category: "active" },
  { id: "tech", label: "💻 Tech", category: "professional" },
  { id: "food", label: "🍕 Food & Drinks", category: "social" },
  { id: "art", label: "🎨 Art & Design", category: "arts" },
  { id: "fitness", label: "💪 Fitness", category: "active" },
  { id: "gaming", label: "🎮 Gaming", category: "entertainment" },
  { id: "movies", label: "🎬 Movies & TV", category: "entertainment" },
  { id: "travel", label: "✈️ Travel", category: "lifestyle" },
  { id: "reading", label: "📚 Reading", category: "lifestyle" },
  { id: "photography", label: "📸 Photography", category: "arts" },
  { id: "networking", label: "🤝 Networking", category: "professional" },
  { id: "dance", label: "💃 Dance", category: "arts" },
  { id: "outdoors", label: "🏔️ Outdoors", category: "active" },
  { id: "comedy", label: "😂 Comedy", category: "entertainment" },
  { id: "volunteering", label: "❤️ Volunteering", category: "social" },
  { id: "startups", label: "🚀 Startups", category: "professional" },
  { id: "cooking", label: "👨‍🍳 Cooking", category: "lifestyle" },
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
    // TODO: save interests to DB
    localStorage.setItem("rekindle_interests", JSON.stringify(selected));
    navigate("/feed");
  };

  return (
    <div className="flex min-h-screen flex-col px-6 py-12 gradient-surface">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto w-full max-w-md"
      >
        <div className="mb-2 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-primary">Step 2 of 2</span>
        </div>
        <h1 className="mb-2 text-3xl font-bold">What lights your fire?</h1>
        <p className="mb-8 text-muted-foreground">
          Pick at least 3 interests. We'll match you with events and people who share your vibe.
        </p>

        <div className="mb-8 flex flex-wrap gap-3">
          <AnimatePresence>
            {INTERESTS.map((interest, i) => {
              const isSelected = selected.includes(interest.id);
              return (
                <motion.button
                  key={interest.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => toggle(interest.id)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isSelected
                      ? "gradient-primary text-primary-foreground shadow-glow"
                      : "bg-secondary text-secondary-foreground hover:bg-muted"
                  }`}
                >
                  {interest.label}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {selected.length} selected
          </span>
          <Button
            variant="hero"
            size="lg"
            onClick={handleContinue}
            disabled={selected.length < 3}
          >
            Let's go
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Interests;
