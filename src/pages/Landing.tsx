import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import heroImg from "@/assets/hero-friends.jpg";
import adventureImg from "@/assets/section-adventure.jpg";
import gamesImg from "@/assets/section-games.jpg";

const TESTIMONIALS = [
  { text: "I showed up alone and left with three people's numbers.", author: "Sarah, 26" },
  { text: "Knowing it was only 6 people made me actually go.", author: "Marcus, 28" },
  { text: "The group chat after was the best part. We're hanging out again this weekend.", author: "Priya, 24" },
];

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const Landing = () => {
  const navigate = useNavigate();
  const go = () => navigate("/signup");

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ── Floating Nav ── */}
      <nav className="fixed top-0 z-50 w-full bg-gradient-to-b from-black/40 to-transparent">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 lg:px-10">
          <a href="/" className="font-display text-2xl font-bold tracking-tight text-white">
            Rekindle
          </a>
          <div className="flex items-center gap-3">
            <button onClick={go} className="text-sm font-medium text-white/80 hover:text-white transition-colors hidden sm:block">
              Log in
            </button>
            <Button
              onClick={go}
              className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-foreground hover:bg-white/90 shadow-elevated"
            >
              Get started
            </Button>
          </div>
        </div>
      </nav>

      {/* ── Hero: Full-bleed image ── */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <img
          src={heroImg}
          alt="Friends laughing over coffee"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 w-full px-6 pb-16 pt-40 lg:px-10"
        >
          <div className="mx-auto max-w-6xl">
            <motion.h1
              variants={fade}
              className="mb-5 max-w-xl font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl"
            >
              Your next friend group starts with one&nbsp;hang.
            </motion.h1>
            <motion.p variants={fade} className="mb-8 max-w-md text-base text-white/75 leading-relaxed sm:text-lg">
              Small groups. Shared activities. A host who makes sure nobody stands alone.
            </motion.p>
            <motion.div variants={fade}>
              <Button
                onClick={go}
                className="rounded-full bg-white px-8 py-6 text-base font-semibold text-foreground hover:bg-white/90 shadow-elevated"
                size="lg"
              >
                Try your first hang free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        >
          <ChevronDown className="h-5 w-5 text-white/40" />
        </motion.div>
      </section>

      {/* ── Statement ── */}
      <section className="px-6 py-28 lg:px-10">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={fade}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-display text-3xl font-bold leading-snug sm:text-4xl lg:text-5xl">
            Everyone comes alone.
            <br />
            <span className="text-muted-foreground">That's the whole point.</span>
          </h2>
        </motion.div>
      </section>

      {/* ── How it works — immersive sections ── */}
      {[
        {
          label: "Before",
          title: "Don't walk in blind.",
          desc: "You see the activity, the vibe, the group size, who's hosting. You decide if it's for you — before you show up.",
          img: adventureImg,
          alt: "Friends hiking at golden hour",
        },
        {
          label: "During",
          title: "The activity carries you.",
          desc: "The host makes sure nobody's standing alone. The small group means you actually get to know people.",
          img: gamesImg,
          alt: "Friends playing board games",
          reverse: true,
        },
      ].map((section, i) => (
        <section key={section.label} className="bg-background">
          <div className={`grid min-h-[75vh] lg:grid-cols-2 ${section.reverse ? "" : ""}`}>
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fade}
              className={`flex flex-col justify-center px-6 py-20 lg:px-16 xl:px-24 ${section.reverse ? "lg:order-2" : ""}`}
            >
              <span className="mb-4 inline-block w-fit rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                {section.label}
              </span>
              <h2 className="mb-5 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-[42px]">
                {section.title}
              </h2>
              <p className="max-w-md text-base text-muted-foreground leading-relaxed lg:text-lg">
                {section.desc}
              </p>
            </motion.div>
            <div className={`overflow-hidden ${section.reverse ? "lg:order-1" : ""}`}>
              <motion.img
                initial={{ scale: 1.08 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                src={section.img}
                alt={section.alt}
                className="h-full min-h-[50vh] w-full object-cover"
              />
            </div>
          </div>
        </section>
      ))}

      {/* After — standalone statement */}
      <section className="px-6 py-28 lg:px-10">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fade}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            After
          </span>
          <h2 className="mb-5 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-[42px]">
            One hang plants the seed.
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed lg:text-lg">
            Group chat opens. Follow-up hangs happen if the group clicks. Your future matches improve based on feedback.
          </p>
        </motion.div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-foreground px-6 py-28 lg:px-10">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}
          className="mx-auto max-w-5xl"
        >
          <motion.h2 variants={fade} className="mb-16 text-center font-display text-3xl font-bold text-white sm:text-4xl">
            After one hang
          </motion.h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <motion.div
                key={t.author}
                variants={fade}
                className="rounded-2xl border border-white/8 bg-white/5 p-8 backdrop-blur-sm"
              >
                <p className="mb-6 font-display text-lg italic leading-relaxed text-white/90">
                  "{t.text}"
                </p>
                <p className="text-sm font-medium text-white/40">— {t.author}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Pricing ── */}
      <section className="px-6 py-28 lg:px-10">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.h2 variants={fade} className="mb-16 font-display text-3xl font-bold sm:text-4xl">
            Simple pricing
          </motion.h2>
          <motion.div variants={fade} className="mb-12 flex flex-col items-stretch gap-4 sm:flex-row">
            {[
              { label: "First hang", price: "Free", detail: "No card required" },
              { label: "Per hang", price: "$10", detail: "Pay as you go", featured: true },
              { label: "Unlimited", price: "$25/mo", detail: "As many as you want" },
            ].map((plan) => (
              <div
                key={plan.label}
                className={`flex-1 rounded-2xl border p-8 transition-shadow hover:shadow-elevated ${
                  plan.featured ? "border-foreground shadow-elevated" : "border-border shadow-card"
                }`}
              >
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{plan.label}</p>
                <p className="mb-1 font-display text-4xl font-bold">{plan.price}</p>
                <p className="text-sm text-muted-foreground">{plan.detail}</p>
              </div>
            ))}
          </motion.div>
          <motion.div variants={fade}>
            <Button variant="hero" size="lg" onClick={go}>
              Get started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-foreground px-6 py-32 lg:px-10">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}
          className="mx-auto max-w-xl text-center"
        >
          <motion.h2 variants={fade} className="mb-8 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Stop waiting for someone to invite&nbsp;you.
          </motion.h2>
          <motion.div variants={fade}>
            <Button
              onClick={go}
              className="rounded-full bg-white px-10 py-6 text-base font-semibold text-foreground hover:bg-white/90 shadow-elevated"
              size="xl"
            >
              Try your first hang free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground border-t border-white/8 px-6 py-10">
        <div className="mx-auto max-w-6xl flex flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="font-display text-lg font-bold text-white">Rekindle</span>
          <p className="text-sm text-white/30">© 2026 Rekindle. Making showing up feel easier.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
