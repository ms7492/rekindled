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
  const rotate = useTransform(x, [-300, 0, 300], [-8, 0, 8]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 120) onSwipe("right");
    else if (info.offset.x < -120) onSwipe("left");
  };

  if (!isTop) {
    return (
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-3xl bg-card shadow-card"
        style={{ scale: 0.95, y: 12 }}
      >
        <img src={event.image} alt={event.title} className="h-full w-full object-cover opacity-40" />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute inset-0 cursor-grab overflow-hidden rounded-3xl bg-card shadow-elevated active:cursor-grabbing"
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 1.01 }}
      exit={{ x: swipeDirection === "right" ? 500 : -500, opacity: 0, transition: { duration: 0.3 } }}
    >
      {/* Full image */}
      <div className="relative h-3/5">
        <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Swipe overlays */}
        <motion.div
          className="absolute left-4 top-4 rounded-full bg-white/90 px-5 py-2"
          style={{ opacity: likeOpacity }}
        >
          <span className="text-sm font-bold text-accent">I'M IN ✦</span>
        </motion.div>
        <motion.div
          className="absolute right-4 top-4 rounded-full bg-white/90 px-5 py-2"
          style={{ opacity: nopeOpacity }}
        >
          <span className="text-sm font-bold text-destructive">PASS</span>
        </motion.div>

        {/* Tags on image */}
        <div className="absolute bottom-3 left-4 flex gap-1.5">
          {event.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-white/80 backdrop-blur-sm px-3 py-1 text-[11px] font-medium text-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex h-2/5 flex-col justify-between p-5">
        <div>
          <h2 className="mb-1.5 font-display text-xl font-bold text-foreground">{event.title}</h2>
          <p className="line-clamp-2 text-sm text-muted-foreground leading-relaxed">{event.description}</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {event.date}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {event.location}
          </span>
          <span className="ml-auto flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 font-medium text-secondary-foreground">
            <Users className="h-3.5 w-3.5" />
            {event.attendees}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
