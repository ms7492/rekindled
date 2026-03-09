import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const LandingNav = ({ onAction }: { onAction: () => void }) => (
  <nav className="fixed top-0 z-50 w-full">
    <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12">
      <a href="/" className="font-display text-2xl font-bold tracking-tight text-white">
        Rekindle
      </a>
      <div className="flex items-center gap-4">
        <button
          onClick={onAction}
          className="hidden text-sm font-medium text-white/60 transition-colors hover:text-white sm:block"
        >
          Log in
        </button>
        <Button
          onClick={onAction}
          className="rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20"
        >
          Get started
        </Button>
      </div>
    </div>
  </nav>
);

export default LandingNav;
