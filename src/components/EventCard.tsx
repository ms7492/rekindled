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
  const rotate = useTransform(x, [-300, 0, 300], [-6, 0, 6]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 120) onSwipe("right");
    else if (info.offset.x < -120) onSwipe("left");
  };

  if (!isTop) {
    return (
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-3xl bg-card"
        style={{ scale: 0.96, y: 10, opacity: 0.5 }}
      >
        <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute inset-0 cursor-grab overflow-hidden rounded-3xl bg-card shadow-dramatic active:cursor-grabbing"
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 1.01 }}
      exit={{ x: swipeDirection === "right" ? 500 : -500, opacity: 0, transition: { duration: 0.3 } }}
    >
      {/* Full image — takes up ~65% */}
      <div className="relative h-[65%]">
        <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,20%,8%,0.5)] via-transparent to-transparent" />

        {/* Swipe overlays */}
        <motion.div
          className="absolute left-5 top-5 rounded-full border-2 border-[hsl(14,80%,50%)] bg-[hsl(14,80%,50%,0.15)] px-6 py-2.5 backdrop-blur-sm"
          style={{ opacity: likeOpacity }}
        >
          <span className="text-sm font-bold text-[hsl(14,80%,50%)]">I'M IN ✦</span>
        </motion.div>
        <motion.div
          className="absolute right-5 top-5 rounded-full border-2 border-[hsl(0,72%,51%)] bg-[hsl(0,72%,51%,0.15)] px-6 py-2.5 backdrop-blur-sm"
          style={{ opacity: nopeOpacity }}
        >
          <span className="text-sm font-bold text-[hsl(0,72%,51%)]">PASS</span>
        </motion.div>

        {/* Tags */}
        <div className="absolute bottom-4 left-5 flex gap-2">
          {event.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/90 backdrop-blur-sm px-3.5 py-1.5 text-[11px] font-semibold"
              style={{ color: "hsl(220, 20%, 8%)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex h-[35%] flex-col justify-between p-6">
        <div>
          <h2 className="mb-2 font-display text-xl font-bold text-foreground leading-tight">{event.title}</h2>
          <p className="line-clamp-2 text-sm text-muted-foreground leading-relaxed">{event.description}</p>
        </div>
        <div className="flex items-center gap-5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {event.date}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {event.location}
          </span>
          <span className="ml-auto flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 font-semibold text-secondary-foreground">
            <Users className="h-3.5 w-3.5" />
            {event.attendees}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
