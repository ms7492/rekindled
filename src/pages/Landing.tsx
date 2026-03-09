import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-friends.jpg";
import coupleImg from "@/assets/hero-couple.jpg";
import cafeImg from "@/assets/testimonial-cafe.jpg";
import coffeeImg from "@/assets/detail-coffee.jpg";
import adventureImg from "@/assets/section-adventure.jpg";
import gamesImg from "@/assets/section-games.jpg";

/* ── SVG annotation component ── */
const CircleAnnotation = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 243 80"
    fill="none"
    preserveAspectRatio="none"
    className={`absolute pointer-events-none ${className}`}
    aria-hidden="true"
  >
    <path
      d="M48.5 17.5C87.5 -2.5 239 -4 239 40.5C239 87 13.5 87.5 5 43.5C2.9 32.5 23.9 18.2 39.4 14.7"
      stroke="hsl(var(--brand))"
      strokeWidth="3"
      fill="none"
      strokeDasharray="100"
      strokeDashoffset="100"
      pathLength="100"
      className="animate-draw"
      style={{ animationDelay: "0.8s" }}
    />
  </svg>
);

/* ── Animated section wrapper ── */
const FadeSection = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const TESTIMONIALS = [
  { text: "I showed up alone and left with three people's numbers. We're getting dinner next week.", author: "Sarah, 26" },
  { text: "Knowing it was only 6 people made me actually go. Best decision I've made in months.", author: "Marcus, 28" },
  { text: "The group chat after was the best part. We're hanging out again this weekend.", author: "Priya, 24" },
];

const Landing = () => {
  const navigate = useNavigate();
  const go = () => navigate("/signup");
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ── Nav ── */}
      <nav className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
          <a href="/" className="font-display text-xl font-bold tracking-tight">
            Rekindle
          </a>
          <div className="flex items-center gap-6">
            <button onClick={go} className="hidden text-sm font-medium text-muted-foreground hover:text-foreground transition-colors sm:block">
              Log in
            </button>
            <Button onClick={go} variant="hero" size="sm">
              Get started
            </Button>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════════
          HERO — Text-first, Hinge-style with image alongside
         ══════════════════════════════════════════ */}
      <section ref={heroRef} className="pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid min-h-[90vh] items-center gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Text — spans 5 cols */}
            <div className="col-span-full space-y-8 pt-20 lg:col-span-5 lg:pt-0 xl:col-span-5 xl:col-start-1">
              <FadeSection>
                <p className="text-sm font-semibold uppercase tracking-widest text-brand">
                  Our Approach
                </p>
              </FadeSection>
              <FadeSection delay={0.1}>
                <h1 className="text-display-xl font-display font-bold">
                  Find your next{" "}
                  <span className="relative inline-block">
                    friend group.
                    <CircleAnnotation className="w-[115%] h-[130%] -left-[7%] -top-[15%]" />
                  </span>
                </h1>
              </FadeSection>
              <FadeSection delay={0.2}>
                <p className="max-w-md text-lg text-muted-foreground leading-relaxed">
                  Rekindle is built on the belief that anyone looking for friends should be able to find them. Small groups, shared activities, and a host who makes sure nobody stands alone.
                </p>
              </FadeSection>
              <FadeSection delay={0.3}>
                <Button onClick={go} variant="hero" size="lg" className="group">
                  Try your first hang free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </FadeSection>
            </div>

            {/* Image — spans 7 cols, large rounded image */}
            <motion.div
              className="col-span-full lg:col-span-7 xl:col-span-7"
              style={{ y: heroY }}
            >
              <FadeSection delay={0.2}>
                <motion.div className="overflow-hidden rounded-3xl" style={{ scale: heroScale }}>
                  <img
                    src={heroImg}
                    alt="Friends laughing over coffee"
                    className="aspect-[4/3] w-full object-cover lg:aspect-[3/4] xl:aspect-[4/5]"
                  />
                </motion.div>
              </FadeSection>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHAT WE DO — Large serif statement
         ══════════════════════════════════════════ */}
      <section className="px-6 py-40 lg:px-10 lg:py-52">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12">
            <div className="lg:col-span-8 xl:col-span-7 xl:col-start-2">
              <FadeSection>
                <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-brand">
                  The Problem
                </p>
              </FadeSection>
              <FadeSection delay={0.1}>
                <h2 className="text-display-lg font-display font-bold leading-snug">
                  You've tried meetups where nobody talked to you. Apps that led nowhere. Events where nobody made space for you.
                </h2>
              </FadeSection>
              <FadeSection delay={0.2}>
                <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
                  The problem isn't effort. It's format. Rekindle fixes the format.
                </p>
              </FadeSection>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS — Asymmetric grid sections
         ══════════════════════════════════════════ */}
      {/* Section 1: Before */}
      <section className="px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid min-h-[85vh] items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5 xl:col-span-4 xl:col-start-2">
              <FadeSection>
                <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-brand-foreground">
                  1
                </span>
                <h2 className="mb-5 text-display-md font-display font-bold">
                  Don't walk in blind.
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed lg:text-lg">
                  You see everything: the activity, the vibe, the group size, who's hosting. You decide if it's for you — before you show up.
                </p>
              </FadeSection>
            </div>
            <div className="lg:col-span-7">
              <FadeSection delay={0.15}>
                <div className="overflow-hidden rounded-3xl">
                  <motion.img
                    whileInView={{ scale: [1.06, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                    src={adventureImg}
                    alt="Friends hiking at golden hour"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              </FadeSection>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: During — reversed */}
      <section className="px-6 py-20 lg:px-10 lg:py-0">
        <div className="mx-auto max-w-7xl">
          <div className="grid min-h-[85vh] items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="order-2 lg:order-1 lg:col-span-7">
              <FadeSection delay={0.15}>
                <div className="overflow-hidden rounded-3xl">
                  <motion.img
                    whileInView={{ scale: [1.06, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                    src={gamesImg}
                    alt="Friends playing board games"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              </FadeSection>
            </div>
            <div className="order-1 lg:order-2 lg:col-span-5 xl:col-span-4">
              <FadeSection>
                <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-brand-foreground">
                  2
                </span>
                <h2 className="mb-5 text-display-md font-display font-bold">
                  The activity carries&nbsp;you.
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed lg:text-lg">
                  The host makes sure nobody's standing alone. The small group means you actually get to know people — not just their names.
                </p>
              </FadeSection>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: After — centered with small images flanking */}
      <section className="px-6 py-20 lg:px-10 lg:py-40">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="hidden lg:col-span-3 lg:block">
              <FadeSection>
                <div className="overflow-hidden rounded-3xl">
                  <img src={coffeeImg} alt="Coffee cheers" className="aspect-[3/4] w-full object-cover" />
                </div>
              </FadeSection>
            </div>
            <div className="text-center lg:col-span-6">
              <FadeSection>
                <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-brand-foreground">
                  3
                </span>
                <h2 className="mb-5 text-display-md font-display font-bold">
                  One hang plants the&nbsp;seed.
                </h2>
                <p className="mx-auto max-w-md text-base text-muted-foreground leading-relaxed lg:text-lg">
                  Group chat opens. Follow-up hangs happen if the group clicks. Your future matches improve based on feedback.
                </p>
              </FadeSection>
            </div>
            <div className="hidden lg:col-span-3 lg:block">
              <FadeSection delay={0.2}>
                <div className="overflow-hidden rounded-3xl">
                  <img src={coupleImg} alt="Friends at carnival" className="aspect-[3/4] w-full object-cover" />
                </div>
              </FadeSection>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS — Big serif quotes with image
         ══════════════════════════════════════════ */}
      <section className="bg-foreground text-primary-foreground">
        <div className="grid lg:grid-cols-2">
          {/* Image half */}
          <div className="overflow-hidden">
            <FadeSection>
              <img
                src={cafeImg}
                alt="Friends at outdoor cafe"
                className="h-full min-h-[50vh] w-full object-cover lg:min-h-[100vh]"
              />
            </FadeSection>
          </div>
          {/* Quotes half */}
          <div className="flex flex-col justify-center px-8 py-20 lg:px-16 xl:px-24">
            <FadeSection>
              <p className="mb-12 text-sm font-semibold uppercase tracking-widest text-white/40">
                What Our Members Say
              </p>
            </FadeSection>
            <div className="space-y-14">
              {TESTIMONIALS.map((t, i) => (
                <FadeSection key={t.author} delay={i * 0.12}>
                  <blockquote>
                    <p className="font-display text-xl italic leading-relaxed text-white/90 lg:text-2xl">
                      "{t.text}"
                    </p>
                    <footer className="mt-4 text-sm font-medium text-white/40">
                      {t.author}
                    </footer>
                  </blockquote>
                </FadeSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PRICING
         ══════════════════════════════════════════ */}
      <section className="px-6 py-36 lg:px-10 lg:py-44">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12">
            <div className="lg:col-span-4 xl:col-span-3 xl:col-start-2">
              <FadeSection>
                <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand">
                  Pricing
                </p>
                <h2 className="text-display-md font-display font-bold">
                  Simple,<br />honest pricing.
                </h2>
              </FadeSection>
            </div>
            <div className="mt-12 lg:col-span-7 lg:col-start-6 lg:mt-0 xl:col-span-6 xl:col-start-6">
              <FadeSection delay={0.1}>
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "First hang", price: "Free", detail: "No card required" },
                    { label: "Per hang", price: "$10", detail: "Pay as you go", featured: true },
                    { label: "Unlimited", price: "$25/mo", detail: "As many as you want" },
                  ].map((plan) => (
                    <div
                      key={plan.label}
                      className={`rounded-2xl border p-6 transition-shadow hover:shadow-elevated ${
                        plan.featured ? "border-brand bg-brand/5 shadow-card" : "border-border shadow-card"
                      }`}
                    >
                      <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{plan.label}</p>
                      <p className="mb-1 font-display text-3xl font-bold">{plan.price}</p>
                      <p className="text-sm text-muted-foreground">{plan.detail}</p>
                    </div>
                  ))}
                </div>
              </FadeSection>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FINAL CTA
         ══════════════════════════════════════════ */}
      <section className="bg-foreground px-6 py-36 lg:px-10 lg:py-44">
        <div className="mx-auto max-w-3xl text-center">
          <FadeSection>
            <h2 className="mb-10 font-display text-display-lg font-bold text-white">
              Stop waiting for someone to invite&nbsp;you.
            </h2>
            <Button
              onClick={go}
              className="rounded-full bg-white px-10 py-6 text-base font-semibold text-foreground hover:bg-white/90 shadow-elevated group"
              size="xl"
            >
              Try your first hang free
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </FadeSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground border-t border-white/8 px-6 py-12 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
          <span className="font-display text-lg font-bold text-white">Rekindle</span>
          <div className="flex items-center gap-8">
            <button onClick={go} className="text-sm text-white/40 hover:text-white/70 transition-colors">About</button>
            <button onClick={go} className="text-sm text-white/40 hover:text-white/70 transition-colors">Careers</button>
            <button onClick={go} className="text-sm text-white/40 hover:text-white/70 transition-colors">Contact</button>
          </div>
          <p className="text-xs text-white/25">© 2026 Rekindle</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
