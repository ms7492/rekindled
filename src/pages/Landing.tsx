import { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import heroImg from "@/assets/hero-friends.jpg";
import coupleImg from "@/assets/hero-couple.jpg";
import cafeImg from "@/assets/testimonial-cafe.jpg";
import coffeeImg from "@/assets/detail-coffee.jpg";
import adventureImg from "@/assets/section-adventure.jpg";
import gamesImg from "@/assets/section-games.jpg";

/* ─────────────────────────────────────────────
   Micro-interaction: Word-by-word stagger reveal
   ───────────────────────────────────────────── */
const SplitHeading = ({
  children,
  className = "",
  as: Tag = "h2",
}: {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) => {
  const words = children.split(" ");

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            delay: i * 0.04,
          }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
};

/* ─────────────────────────────────────────────
   Micro-interaction: Image scale reveal
   ───────────────────────────────────────────── */
const ScaleRevealImage = ({
  src,
  alt,
  className = "",
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}) => (
  <div className="overflow-hidden rounded-3xl">
    <motion.img
      src={src}
      alt={alt}
      className={className}
      initial={{ scale: 1.08, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
    />
  </div>
);

/* ─────────────────────────────────────────────
   Micro-interaction: Fade section wrapper
   ───────────────────────────────────────────── */
const FadeSection = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ─────────────────────────────────────────────
   Micro-interaction: Handdrawn arrow SVG
   ───────────────────────────────────────────── */
const HanddrawnArrow = ({ className = "" }: { className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.svg
      ref={ref}
      viewBox="0 0 120 60"
      fill="none"
      className={`absolute pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <motion.path
        d="M5 45 C 30 50, 50 20, 90 25 C 95 25, 100 28, 105 20 M 95 15 L 105 20 L 97 28"
        stroke="hsl(var(--brand))"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
      />
    </motion.svg>
  );
};

/* ─────────────────────────────────────────────
   Micro-interaction: Circle annotation
   ───────────────────────────────────────────── */
const CircleAnnotation = ({ className = "" }: { className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.svg
      ref={ref}
      viewBox="0 0 243 80"
      fill="none"
      preserveAspectRatio="none"
      className={`absolute pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <motion.path
        d="M48.5 17.5C87.5 -2.5 239 -4 239 40.5C239 87 13.5 87.5 5 43.5C2.9 32.5 23.9 18.2 39.4 14.7"
        stroke="hsl(var(--brand))"
        strokeWidth="3"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
      />
    </motion.svg>
  );
};

/* ─────────────────────────────────────────────
   Micro-interaction: Card with lift on hover
   ───────────────────────────────────────────── */
const LiftCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    className={className}
    whileHover={{
      y: -4,
      boxShadow: "var(--shadow-lift)",
      transition: { type: "spring", stiffness: 400, damping: 25 },
    }}
  >
    {children}
  </motion.div>
);

/* ─────────────────────────────────────────────
   Micro-interaction: Nav link with dot indicator
   ───────────────────────────────────────────── */
const NavDotLink = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group py-2"
  >
    {children}
    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-foreground scale-0 group-hover:scale-100 transition-transform duration-200" />
  </button>
);

/* ─────────────────────────────────────────────
   Testimonials with auto-advance + progress bar
   ───────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    text: "I showed up alone and left with three people's numbers. We're getting dinner next week.",
    author: "Sarah, 26",
  },
  {
    text: "Knowing it was only 6 people made me actually go. Best decision I've made in months.",
    author: "Marcus, 28",
  },
  {
    text: "The group chat after was the best part. We're hanging out again this weekend.",
    author: "Priya, 24",
  },
];

const TestimonialCarousel = () => {
  const [active, setActive] = useState(0);
  const [key, setKey] = useState(0);

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    setKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const timer = setInterval(advance, 5000);
    return () => clearInterval(timer);
  }, [advance, active]);

  const jumpTo = (i: number) => {
    setActive(i);
    setKey((k) => k + 1);
  };

  return (
    <div>
      <div className="flex gap-2 mb-10">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => jumpTo(i)}
            className="h-0.5 flex-1 bg-white/15 rounded-full overflow-hidden relative"
          >
            {i === active && (
              <div key={key} className="absolute inset-0 bg-white/60 animate-progress-fill rounded-full" />
            )}
            {i < active && <div className="absolute inset-0 bg-white/40 rounded-full" />}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-display text-2xl italic leading-relaxed text-white/90 lg:text-3xl xl:text-4xl">
            "{TESTIMONIALS[active].text}"
          </p>
          <footer className="mt-6 text-sm font-medium text-white/40">
            {TESTIMONIALS[active].author}
          </footer>
        </motion.blockquote>
      </AnimatePresence>
    </div>
  );
};

/* ─────────────────────────────────────────────
   FAQ accordion with spring animation
   ───────────────────────────────────────────── */
const FAQ_ITEMS = [
  {
    q: "What is a hang?",
    a: "A hang is a small-group activity (4–8 people) organized around a shared interest — like a coffee walk, game night, or sunset hike. A host makes sure everyone feels included.",
  },
  {
    q: "How do you match people?",
    a: "We match based on shared interests, location, and schedule. After each hang, feedback from the group makes your next match even better.",
  },
  {
    q: "Is it safe?",
    a: "Every host is verified. All events happen in public spaces. You can see exactly who's attending before you commit. And you can leave feedback privately after.",
  },
  {
    q: "What if I'm really introverted?",
    a: "That's exactly who we built this for. The small group size and structured activity means you never have to carry a conversation alone. The host makes sure nobody's left out.",
  },
];

const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border/60">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-lg font-medium pr-8">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex-shrink-0"
        >
          <Plus className="h-5 w-5 text-muted-foreground" />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-muted-foreground leading-relaxed max-w-xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   LANDING PAGE
   ═══════════════════════════════════════════════ */
const Landing = () => {
  const navigate = useNavigate();
  const go = () => navigate("/signup");

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <CustomCursor />

      {/* ── Sticky Nav ── */}
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "bg-background/70 backdrop-blur-2xl border-b border-border/40 shadow-card"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:h-20 lg:px-10">
          <a href="/" className="font-display text-xl font-bold tracking-tight">
            Rekindle
          </a>
          <div className="hidden items-center gap-8 md:flex">
            <NavDotLink onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}>
              How it works
            </NavDotLink>
            <NavDotLink onClick={() => document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" })}>
              Stories
            </NavDotLink>
            <NavDotLink onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}>
              Pricing
            </NavDotLink>
            <NavDotLink onClick={() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })}>
              FAQ
            </NavDotLink>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={go}
              className="hidden text-sm font-medium text-muted-foreground hover:text-foreground transition-colors sm:block relative group py-2"
            >
              Log in
              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-foreground scale-0 group-hover:scale-100 transition-transform duration-200" />
            </button>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
              <Button onClick={go} variant="hero" size="sm">
                Get started
              </Button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════
          HERO
         ═══════════════════════════════════════════ */}
      <section ref={heroRef} className="pt-20 lg:pt-0">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid min-h-screen items-center gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="col-span-full space-y-7 pt-24 lg:col-span-5 lg:pt-0">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm font-semibold uppercase tracking-[0.2em] text-brand"
              >
                Our Approach
              </motion.p>

              <div className="space-y-1">
                {["Find your next", "friend group."].map((line, i) => (
                  <div key={i} className="overflow-hidden">
                    <motion.h1
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.3 + i * 0.12,
                      }}
                      className="text-display-xl font-display font-bold"
                    >
                      {i === 1 ? (
                        <span className="relative inline-block">
                          {line}
                          <CircleAnnotation className="w-[115%] h-[130%] -left-[7%] -top-[15%]" />
                        </span>
                      ) : (
                        line
                      )}
                    </motion.h1>
                  </div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="max-w-md text-lg text-muted-foreground leading-relaxed"
              >
                Small groups, shared activities, and a host who makes sure nobody stands alone. Built on the belief that anyone looking for friends should be able to find them.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.9 }}
                className="relative"
              >
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="inline-block"
                >
                  <Button onClick={go} variant="hero" size="lg" className="group">
                    Try your first hang free
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
                <HanddrawnArrow className="w-24 h-12 -right-28 top-1/2 -translate-y-1/2 hidden lg:block" />
              </motion.div>
            </div>

            <motion.div
              className="col-span-full lg:col-span-7"
              style={{ y: heroY }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className="overflow-hidden rounded-3xl"
                style={{ scale: heroScale }}
              >
                <img
                  src={heroImg}
                  alt="Friends laughing together"
                  className="aspect-[4/3] w-full object-cover lg:aspect-[3/4] xl:aspect-[4/5]"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PROBLEM STATEMENT
         ═══════════════════════════════════════════ */}
      <section className="px-6 py-32 lg:px-10 lg:py-48">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12">
            <div className="lg:col-span-8 xl:col-span-7 xl:col-start-2">
              <FadeSection>
                <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-brand">
                  The Problem
                </p>
              </FadeSection>
              <SplitHeading className="text-display-lg font-display font-bold leading-snug">
                You've tried meetups where nobody talked to you. Apps that led nowhere. Events where nobody made space for you.
              </SplitHeading>
              <FadeSection delay={0.4}>
                <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
                  The problem isn't effort. It's format. Rekindle fixes the format.
                </p>
              </FadeSection>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          HOW IT WORKS
         ═══════════════════════════════════════════ */}
      <div id="how">
        <section className="px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid min-h-[80vh] items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5 xl:col-span-4 xl:col-start-2">
                <FadeSection>
                  <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-brand-foreground">1</span>
                </FadeSection>
                <SplitHeading className="mb-5 text-display-md font-display font-bold">
                  Don't walk in blind.
                </SplitHeading>
                <FadeSection delay={0.2}>
                  <p className="text-base text-muted-foreground leading-relaxed lg:text-lg">
                    You see the activity, the vibe, the group size, who's hosting. You decide if it's for you — before you show up.
                  </p>
                </FadeSection>
              </div>
              <div className="lg:col-span-7">
                <ScaleRevealImage src={adventureImg} alt="Friends at golden hour" className="aspect-[4/3] w-full object-cover" delay={0.1} />
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 lg:px-10 lg:py-0">
          <div className="mx-auto max-w-7xl">
            <div className="grid min-h-[80vh] items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="order-2 lg:order-1 lg:col-span-7">
                <ScaleRevealImage src={gamesImg} alt="Friends enjoying together" className="aspect-[4/3] w-full object-cover" delay={0.1} />
              </div>
              <div className="order-1 lg:order-2 lg:col-span-5 xl:col-span-4">
                <FadeSection>
                  <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-brand-foreground">2</span>
                </FadeSection>
                <SplitHeading className="mb-5 text-display-md font-display font-bold">
                  The activity carries you.
                </SplitHeading>
                <FadeSection delay={0.2}>
                  <p className="text-base text-muted-foreground leading-relaxed lg:text-lg">
                    The host makes sure nobody's standing alone. The small group means you actually get to know people — not just their names.
                  </p>
                </FadeSection>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 lg:px-10 lg:py-40">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
              <div className="hidden lg:col-span-3 lg:block">
                <ScaleRevealImage src={coffeeImg} alt="Coffee shop moment" className="aspect-[3/4] w-full object-cover" />
              </div>
              <div className="text-center lg:col-span-6">
                <FadeSection>
                  <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-brand-foreground">3</span>
                </FadeSection>
                <SplitHeading className="mb-5 text-display-md font-display font-bold">
                  One hang plants the seed.
                </SplitHeading>
                <FadeSection delay={0.2}>
                  <p className="mx-auto max-w-md text-base text-muted-foreground leading-relaxed lg:text-lg">
                    Group chat opens. Follow-up hangs happen if the group clicks. Your future matches improve based on feedback.
                  </p>
                </FadeSection>
              </div>
              <div className="hidden lg:col-span-3 lg:block">
                <ScaleRevealImage src={coupleImg} alt="Friends at carnival" className="aspect-[3/4] w-full object-cover" delay={0.15} />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ═══════════════════════════════════════════
          TESTIMONIALS
         ═══════════════════════════════════════════ */}
      <section id="testimonials" className="bg-foreground text-primary-foreground">
        <div className="grid lg:grid-cols-2">
          <div className="overflow-hidden">
            <ScaleRevealImage src={cafeImg} alt="Friends at outdoor cafe" className="h-full min-h-[50vh] w-full object-cover lg:min-h-[100vh]" />
          </div>
          <div className="flex flex-col justify-center px-8 py-20 lg:px-16 xl:px-24">
            <FadeSection>
              <p className="mb-12 text-sm font-semibold uppercase tracking-[0.2em] text-white/40">
                What Our Members Say
              </p>
            </FadeSection>
            <FadeSection delay={0.15}>
              <TestimonialCarousel />
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PRICING
         ═══════════════════════════════════════════ */}
      <section id="pricing" className="px-6 py-32 lg:px-10 lg:py-44">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12">
            <div className="lg:col-span-4 xl:col-span-3 xl:col-start-2">
              <FadeSection>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand">Pricing</p>
              </FadeSection>
              <SplitHeading className="text-display-md font-display font-bold">
                Simple, honest pricing.
              </SplitHeading>
            </div>
            <div className="mt-12 lg:col-span-7 lg:col-start-6 lg:mt-0 xl:col-span-6 xl:col-start-6">
              <FadeSection delay={0.1}>
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "First hang", price: "Free", detail: "No card required" },
                    { label: "Per hang", price: "$10", detail: "Pay as you go", featured: true },
                    { label: "Unlimited", price: "$25/mo", detail: "As many as you want" },
                  ].map((plan) => (
                    <LiftCard
                      key={plan.label}
                      className={`rounded-2xl border p-6 shadow-card transition-shadow ${
                        plan.featured ? "border-brand bg-brand/5" : "border-border"
                      }`}
                    >
                      <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{plan.label}</p>
                      <p className="mb-1 font-display text-3xl font-bold">{plan.price}</p>
                      <p className="text-sm text-muted-foreground">{plan.detail}</p>
                    </LiftCard>
                  ))}
                </div>
              </FadeSection>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FAQ
         ═══════════════════════════════════════════ */}
      <section id="faq" className="px-6 py-20 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-3xl">
          <FadeSection>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand">FAQ</p>
          </FadeSection>
          <SplitHeading className="mb-12 text-display-md font-display font-bold">
            Questions we get a lot.
          </SplitHeading>
          <div>
            {FAQ_ITEMS.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FINAL CTA
         ═══════════════════════════════════════════ */}
      <section className="bg-foreground px-6 py-32 lg:px-10 lg:py-44">
        <div className="mx-auto max-w-3xl text-center">
          <SplitHeading as="h2" className="mb-10 font-display text-display-lg font-bold text-white">
            Stop waiting for someone to invite you.
          </SplitHeading>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="inline-block"
            >
              <Button
                onClick={go}
                className="rounded-full bg-white px-10 py-6 text-base font-semibold text-foreground hover:bg-white/90 shadow-elevated group"
                size="xl"
              >
                Try your first hang free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground border-t border-white/8 px-6 py-12 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
          <span className="font-display text-lg font-bold text-white">Rekindle</span>
          <div className="flex items-center gap-8">
            {["About", "Careers", "Contact"].map((label) => (
              <button
                key={label}
                onClick={go}
                className="relative text-sm text-white/40 hover:text-white/70 transition-colors group py-2"
              >
                {label}
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/70 scale-0 group-hover:scale-100 transition-transform duration-200" />
              </button>
            ))}
          </div>
          <p className="text-xs text-white/25">© 2026 Rekindle</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
