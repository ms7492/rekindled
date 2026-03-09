import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

const INTERESTS = [
  { id: "music", label: "🎵 Music" },
  { id: "sports", label: "⚽ Sports" },
  { id: "tech", label: "💻 Tech" },
  { id: "food", label: "🍕 Food & Drinks" },
  { id: "art", label: "🎨 Art & Design" },
  { id: "fitness", label: "💪 Fitness" },
  { id: "gaming", label: "🎮 Gaming" },
  { id: "movies", label: "🎬 Movies & TV" },
  { id: "travel", label: "✈️ Travel" },
  { id: "reading", label: "📚 Reading" },
  { id: "photography", label: "📸 Photography" },
  { id: "networking", label: "🤝 Networking" },
  { id: "dance", label: "💃 Dance" },
  { id: "outdoors", label: "🏔️ Outdoors" },
  { id: "comedy", label: "😂 Comedy" },
  { id: "volunteering", label: "❤️ Volunteering" },
  { id: "startups", label: "🚀 Startups" },
  { id: "cooking", label: "👨‍🍳 Cooking" },
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
    <div className="flex min-h-screen flex-col bg-background px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto w-full max-w-md"
      >
        <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Step 2 of 2</span>
        <h1 className="mb-2 font-display text-3xl font-bold">What are you into?</h1>
        <p className="mb-8 text-muted-foreground">
          Pick at least 3 interests so we can match you with the right people.
        </p>

        <div className="mb-10 flex flex-wrap gap-3">
          <AnimatePresence>
            {INTERESTS.map((interest, i) => {
              const isSelected = selected.includes(interest.id);
              return (
                <motion.button
                  key={interest.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.02 }}
                  onClick={() => toggle(interest.id)}
                  className={`rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
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
            Continue
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Interests;
