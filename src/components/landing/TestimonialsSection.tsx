import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    text: "I showed up alone and left with three people's numbers.",
    author: "Sarah",
    age: "26",
  },
  {
    text: "Knowing it was only 6 people made me actually go.",
    author: "Marcus",
    age: "28",
  },
  {
    text: "The group chat after was the best part.",
    author: "Priya",
    age: "24",
  },
];

const fade = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const TestimonialsSection = () => (
  <section className="px-6 py-32 lg:px-12 lg:py-44">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      className="mx-auto max-w-6xl"
    >
      <motion.p
        variants={fade}
        className="mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/30"
      >
        After one hang
      </motion.p>
      <motion.h2
        variants={fade}
        className="mb-20 font-display text-4xl font-bold text-white sm:text-5xl"
      >
        Real people, real&nbsp;stories.
      </motion.h2>

      <div className="grid gap-px overflow-hidden rounded-3xl border border-white/8 sm:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <motion.div
            key={t.author}
            variants={fade}
            className="flex flex-col justify-between bg-white/[0.03] p-10 backdrop-blur-sm transition-colors hover:bg-white/[0.06]"
          >
            <p className="mb-10 font-display text-xl italic leading-relaxed text-white/80 lg:text-2xl">
              "{t.text}"
            </p>
            <div>
              <p className="text-sm font-semibold text-white/60">{t.author}</p>
              <p className="text-xs text-white/25">{t.age}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

export default TestimonialsSection;
