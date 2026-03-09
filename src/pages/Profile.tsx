import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { LogOut, ChevronRight, Sun, Moon, Pencil } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const MOCK_PROFILE = {
  name: "You",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Me",
  bio: "Looking for hiking buddies and coffee friends ☕",
  interests: ["Music", "Tech", "Food & Drinks", "Startups", "Photography"],
  stats: { hangs: 3, groups: 2, connections: 12 },
  eventsAttended: [
    { title: "Jazz Night", date: "Feb 28", emoji: "🎵" },
    { title: "AI Meetup", date: "Mar 5", emoji: "💻" },
    { title: "Food Truck Rally", date: "Mar 10", emoji: "🍕" },
  ],
};

const stagger = { visible: { transition: { staggerChildren: 0.06 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
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
      <div className="flex items-center justify-between px-6 pt-[max(3.5rem,env(safe-area-inset-top,3.5rem))] pb-2">
        <h1 className="font-display text-2xl font-bold">Profile</h1>
        <button onClick={toggleTheme} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary transition-colors">
          {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
        </button>
      </div>

      <motion.div
        initial="hidden" animate="visible" variants={stagger}
        className="flex-1 px-6 pb-32"
      >
        {/* Avatar & Name */}
        <motion.div variants={fadeUp} className="flex flex-col items-center py-8">
          <div className="relative mb-4">
            <img
              src={MOCK_PROFILE.avatar}
              alt="Profile"
              className="h-28 w-28 rounded-full border-4 border-card bg-secondary shadow-elevated"
            />
            <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-primary-foreground shadow-card">
              <Pencil className="h-3.5 w-3.5" />
            </button>
          </div>
          <h2 className="font-display text-2xl font-bold">{MOCK_PROFILE.name}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{MOCK_PROFILE.bio}</p>
        </motion.div>

        {/* Stats */}
        <motion.div variants={fadeUp} className="mb-8 grid grid-cols-3 gap-3">
          {[
            { label: "Hangs", value: MOCK_PROFILE.stats.hangs },
            { label: "Groups", value: MOCK_PROFILE.stats.groups },
            { label: "Connections", value: MOCK_PROFILE.stats.connections },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-card p-4 text-center shadow-card">
              <p className="font-display text-2xl font-bold">{stat.value}</p>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Interests */}
        <motion.div variants={fadeUp} className="mb-8">
          <h3 className="mb-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
            Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {MOCK_PROFILE.interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full border border-border bg-card px-3.5 py-1.5 text-[13px] font-medium text-foreground shadow-card"
              >
                {interest}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Recent Hangs */}
        <motion.div variants={fadeUp} className="mb-8">
          <h3 className="mb-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
            Recent Hangs
          </h3>
          <div className="space-y-2">
            {MOCK_PROFILE.eventsAttended.map((event) => (
              <div
                key={event.title}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-card transition-colors hover:bg-secondary/40"
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

        {/* Sign Out */}
        <motion.div variants={fadeUp}>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-2xl border border-destructive/20 bg-destructive/5 p-4 text-left transition-colors hover:bg-destructive/10"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <LogOut className="h-4 w-4 text-destructive" />
            </div>
            <span className="text-[15px] font-medium text-destructive">Sign out</span>
          </button>
        </motion.div>
      </motion.div>

      <BottomNav />
    </div>
  );
};

export default Profile;
