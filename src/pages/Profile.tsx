import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { LogOut, Calendar, Flame } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const MOCK_PROFILE = {
  name: "You",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Me",
  interests: ["Music", "Tech", "Food & Drinks", "Startups", "Photography"],
  eventsAttended: [
    { title: "Jazz Night", date: "Feb 28" },
    { title: "AI Meetup", date: "Mar 5" },
    { title: "Food Truck Rally", date: "Mar 10" },
  ],
};

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen flex-col gradient-surface">
      <div className="px-6 pb-4 pt-12">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Profile</h1>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="mr-1 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </div>

      <div className="flex-1 px-6 pb-24 space-y-6">
        {/* Avatar & name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          <div className="relative mb-3">
            <img
              src={MOCK_PROFILE.avatar}
              alt="Profile"
              className="h-24 w-24 rounded-full border-2 border-primary bg-secondary"
            />
            <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full gradient-primary shadow-glow">
              <Flame className="h-4 w-4 text-primary-foreground" />
            </div>
          </div>
          <h2 className="text-xl font-bold">{MOCK_PROFILE.name}</h2>
        </motion.div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {MOCK_PROFILE.interests.map((interest) => (
              <span
                key={interest}
                className="rounded-xl bg-secondary px-3 py-1.5 text-sm text-secondary-foreground"
              >
                {interest}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Past events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Events Attended
          </h3>
          <div className="space-y-2">
            {MOCK_PROFILE.eventsAttended.map((event) => (
              <div
                key={event.title}
                className="flex items-center gap-3 rounded-xl bg-card p-3 shadow-card"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{event.title}</p>
                  <p className="text-xs text-muted-foreground">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
