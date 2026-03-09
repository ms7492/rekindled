import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { LogOut, Sun, Moon, ChevronRight } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const MOCK_PROFILE = {
  name: "You",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Me",
  interests: ["Music", "Tech", "Food & Drinks", "Startups", "Photography"],
  stats: { hangs: 3, groups: 2, connections: 12 },
  eventsAttended: [
    { title: "Jazz Night", date: "Feb 28", emoji: "🎵" },
    { title: "AI Meetup", date: "Mar 5", emoji: "💻" },
    { title: "Food Truck Rally", date: "Mar 10", emoji: "🍕" },
  ],
};

const Profile = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate("/");
  };

  return (
    <div className="flex min-h-[100svh] flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-14 pb-3">
        <h1 className="font-display text-2xl font-bold">Profile</h1>
        <button onClick={toggleTheme} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary transition-colors">
          {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
        </button>
      </div>

      <div className="flex-1 px-6 pb-28">
        {/* Avatar & name */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="flex flex-col items-center py-10"
        >
          <img
            src={MOCK_PROFILE.avatar}
            alt="Profile"
            className="mb-5 h-32 w-32 rounded-full border-4 border-card bg-secondary shadow-elevated"
          />
          <h2 className="font-display text-3xl font-bold">{MOCK_PROFILE.name}</h2>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.5 }}
          className="mb-10 grid grid-cols-3 gap-3"
        >
          {[
            { label: "Hangs", value: MOCK_PROFILE.stats.hangs },
            { label: "Groups", value: MOCK_PROFILE.stats.groups },
            { label: "Connections", value: MOCK_PROFILE.stats.connections },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-card/50 border border-border/50 p-5 text-center">
              <p className="font-display text-3xl font-bold">{stat.value}</p>
              <p className="mt-1 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.5 }}
          className="mb-10"
        >
          <h3 className="mb-4 border-b border-border pb-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.2em]">
            Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {MOCK_PROFILE.interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full border border-border/50 bg-card/50 px-4 py-2 text-sm font-medium text-foreground"
              >
                {interest}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Past events */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.5 }}
          className="mb-10"
        >
          <h3 className="mb-4 border-b border-border pb-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.2em]">
            Recent Hangs
          </h3>
          <div className="space-y-2">
            {MOCK_PROFILE.eventsAttended.map((event) => (
              <div
                key={event.title}
                className="flex items-center gap-4 rounded-2xl bg-card/50 border border-border/50 p-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-lg">
                  {event.emoji}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-[15px]">{event.title}</p>
                  <p className="text-xs text-muted-foreground">{event.date}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sign out */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-2xl bg-card/50 border border-border/50 p-4 text-left transition-colors hover:bg-secondary/30"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <LogOut className="h-5 w-5 text-destructive" />
            </div>
            <span className="font-medium text-destructive">Sign out</span>
          </button>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
