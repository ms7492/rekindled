import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { Calendar, MapPin, Users } from "lucide-react";

export interface EventData {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  attendees: number;
  image: string;
  tags: string[];
}

interface EventCardProps {
  event: EventData;
  onSwipe: (direction: "left" | "right") => void;
  isTop: boolean;
  swipeDirection: "left" | "right";
}

const EventCard = ({ event, onSwipe, isTop, swipeDirection }: EventCardProps) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 120) {
      onSwipe("right");
    } else if (info.offset.x < -120) {
      onSwipe("left");
    }
  };

  if (!isTop) {
    return (
      <motion.div
        className="absolute inset-0 rounded-2xl bg-card shadow-card overflow-hidden"
        style={{ scale: 0.95, y: 12 }}
      >
        <img src={event.image} alt={event.title} className="h-full w-full object-cover opacity-60" />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute inset-0 cursor-grab rounded-2xl bg-card shadow-card overflow-hidden active:cursor-grabbing"
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 1.02 }}
      exit={{ x: swipeDirection === "right" ? 500 : -500, opacity: 0, transition: { duration: 0.3 } }}
    >
      {/* Image */}
      <img src={event.image} alt={event.title} className="h-3/5 w-full object-cover" />

      {/* Swipe indicators */}
      <motion.div
        className="absolute left-6 top-6 rounded-xl border-2 border-green-400 px-4 py-1"
        style={{ opacity: likeOpacity }}
      >
        <span className="text-xl font-bold text-green-400">I'M IN 🔥</span>
      </motion.div>
      <motion.div
        className="absolute right-6 top-6 rounded-xl border-2 border-red-400 px-4 py-1"
        style={{ opacity: nopeOpacity }}
      >
        <span className="text-xl font-bold text-red-400">PASS</span>
      </motion.div>

      {/* Content */}
      <div className="flex h-2/5 flex-col justify-between p-5">
        <div>
          <h2 className="mb-1 text-xl font-bold text-foreground">{event.title}</h2>
          <p className="line-clamp-2 text-sm text-muted-foreground">{event.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-primary" />
              {event.date}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              {event.location}
            </span>
          </div>
          <span className="flex items-center gap-1 text-xs text-accent">
            <Users className="h-3.5 w-3.5" />
            {event.attendees}
          </span>
        </div>
        <div className="flex gap-2">
          {event.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-lg bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
