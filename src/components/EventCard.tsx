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
  const rotate = useTransform(x, [-300, 0, 300], [-12, 0, 12]);
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
        className="absolute inset-0 rounded-2xl bg-card overflow-hidden shadow-card"
        style={{ scale: 0.96, y: 8 }}
      >
        <img src={event.image} alt={event.title} className="h-full w-full object-cover opacity-50" />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute inset-0 cursor-grab rounded-2xl bg-card overflow-hidden shadow-elevated active:cursor-grabbing"
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 1.01 }}
      exit={{ x: swipeDirection === "right" ? 500 : -500, opacity: 0, transition: { duration: 0.3 } }}
    >
      {/* Image */}
      <img src={event.image} alt={event.title} className="h-3/5 w-full object-cover" />

      {/* Swipe indicators */}
      <motion.div
        className="absolute left-5 top-5 rounded-full border-2 border-accent bg-accent/10 px-4 py-1.5"
        style={{ opacity: likeOpacity }}
      >
        <span className="text-base font-bold text-accent">I'M IN ✦</span>
      </motion.div>
      <motion.div
        className="absolute right-5 top-5 rounded-full border-2 border-destructive bg-destructive/10 px-4 py-1.5"
        style={{ opacity: nopeOpacity }}
      >
        <span className="text-base font-bold text-destructive">PASS</span>
      </motion.div>

      {/* Content */}
      <div className="flex h-2/5 flex-col justify-between p-5">
        <div>
          <h2 className="mb-1 font-display text-xl font-semibold text-foreground">{event.title}</h2>
          <p className="line-clamp-2 text-sm text-muted-foreground">{event.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {event.date}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {event.location}
            </span>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
            <Users className="h-3.5 w-3.5" />
            {event.attendees}
          </span>
        </div>
        <div className="flex gap-2">
          {event.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
