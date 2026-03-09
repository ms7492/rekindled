import { useLocation, useNavigate } from "react-router-dom";
import { Flame, MessageCircle, User } from "lucide-react";

const NAV_ITEMS = [
  { path: "/feed", icon: Flame, label: "Discover" },
  { path: "/rooms", icon: MessageCircle, label: "Chats" },
  { path: "/profile", icon: User, label: "Profile" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-md items-center justify-around py-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        {NAV_ITEMS.map(({ path, icon: Icon, label }) => {
          const active = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`relative flex flex-col items-center gap-1 px-6 py-1.5 transition-all ${
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`h-[22px] w-[22px] transition-all ${active ? "stroke-[2.5]" : "stroke-[1.5]"}`} />
              <span className={`text-[10px] font-medium transition-all ${active ? "opacity-100" : "opacity-60"}`}>{label}</span>
              {active && (
                <span className="absolute -top-0.5 left-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-foreground" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
