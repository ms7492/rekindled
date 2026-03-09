import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { LogOut, Calendar, Sun, Moon, Settings, ChevronRight } from "lucide-react";
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
      <div className="flex items-center justify-between px-6 pt-14 pb-2">
        <h1 className="font-display text-2xl font-bold">Profile</h1>
        <button onClick={toggleTheme} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary transition-colors">
          {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
        </button>
      </div>

      <div className="flex-1 px-6 pb-28">
        {/* Avatar & name */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center py-8"
        >
          <img
            src={MOCK_PROFILE.avatar}
            alt="Profile"
            className="mb-4 h-28 w-28 rounded-full border-4 border-card bg-secondary shadow-card"
          />
          <h2 className="font-display text-2xl font-bold">{MOCK_PROFILE.name}</h2>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.5 }}
          className="mb-8 grid grid-cols-3 gap-3"
        >
          {[
            { label: "Hangs", value: MOCK_PROFILE.stats.hangs },
            { label: "Groups", value: MOCK_PROFILE.stats.groups },
            { label: "Connections", value: MOCK_PROFILE.stats.connections },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-card p-4 text-center shadow-card">
              <p className="font-display text-2xl font-bold">{stat.value}</p>
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.5 }}
          className="mb-8"
        >
          <h3 className="mb-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
            Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {MOCK_PROFILE.interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-foreground"
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
          className="mb-8"
        >
          <h3 className="mb-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
            Recent Hangs
          </h3>
          <div className="space-y-2">
            {MOCK_PROFILE.eventsAttended.map((event) => (
              <div
                key={event.title}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-card"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-lg">
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

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left transition-colors hover:bg-secondary/50 shadow-card"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-destructive/10">
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
