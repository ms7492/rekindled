import { motion } from "framer-motion";
import connectionImg from "@/assets/section-connection.jpg";
import adventureImg from "@/assets/section-adventure.jpg";
import gamesImg from "@/assets/section-games.jpg";
import cheersImg from "@/assets/section-cheers.jpg";

const fade = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};

const imgReveal = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] } },
};

const StorySection = () => (
  <>
    {/* Statement */}
    <section className="px-6 py-32 lg:px-12 lg:py-44">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fade}
        className="mx-auto max-w-4xl text-center"
      >
        <h2 className="font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl text-balance">
          Everyone comes alone.
          <br />
          <span className="italic text-white/40">That's the whole point.</span>
        </h2>
      </motion.div>
    </section>

    {/* Immersive sections */}
    {[
      {
        tag: "Before",
        headline: "Don't walk in blind.",
        body: "You see the activity, the vibe, the group size, who's hosting. You decide if it's for you — before you show up.",
        img: connectionImg,
        alt: "Two friends having a conversation in the park",
      },
      {
        tag: "During",
        headline: "The activity carries you.",
        body: "The host makes sure nobody's standing alone. The small group means you actually get to know people.",
        img: adventureImg,
        alt: "Group cooking together in a warm kitchen",
        reverse: true,
      },
      {
        tag: "After",
        headline: "One hang plants the seed.",
        body: "Group chat opens. Follow-up hangs happen if the group clicks. Your future matches improve based on feedback.",
        img: gamesImg,
        alt: "Friends playing board games together",
      },
    ].map((section) => (
      <section key={section.tag} className="overflow-hidden">
        <div className={`grid min-h-[80vh] lg:grid-cols-2`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fade}
            className={`flex flex-col justify-center px-6 py-20 lg:px-16 xl:px-24 ${
              section.reverse ? "lg:order-2" : ""
            }`}
          >
            <span className="mb-5 inline-block w-fit border-b border-white/20 pb-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/40">
              {section.tag}
            </span>
            <h2 className="mb-6 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {section.headline}
            </h2>
            <p className="max-w-md text-base leading-relaxed text-white/45 lg:text-lg">
              {section.body}
            </p>
          </motion.div>
          <div className={`overflow-hidden ${section.reverse ? "lg:order-1" : ""}`}>
            <motion.img
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={imgReveal}
              src={section.img}
              alt={section.alt}
              className="h-full min-h-[50vh] w-full object-cover"
            />
          </div>
        </div>
      </section>
    ))}

    {/* Full-bleed image break */}
    <section className="relative h-[60vh] overflow-hidden">
      <motion.img
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        src={cheersImg}
        alt="Friends raising glasses in celebration"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,20%,8%)] via-transparent to-[hsl(220,20%,8%)]" />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fade}
        className="absolute inset-0 flex items-center justify-center"
      >
        <p className="font-display text-3xl font-bold italic text-white/80 sm:text-4xl lg:text-5xl">
          "We're hanging out again this weekend."
        </p>
      </motion.div>
    </section>
  </>
);

export default StorySection;
