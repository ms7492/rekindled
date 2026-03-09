import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, ChevronDown, ArrowRight } from "lucide-react";

const STEPS = [
  {
    label: "Before",
    title: "Don't walk in blind.",
    desc: "You see everything: the activity, the vibe, the group size, who's hosting. You decide if it's for you.",
  },
  {
    label: "During",
    title: "The activity carries you.",
    desc: "The host makes sure nobody's standing alone. The small group means you actually get to know people.",
  },
  {
    label: "After",
    title: "One hang plants the seed.",
    desc: "Group chat opens. Follow-up hangs happen if the group clicks. Your future matches improve based on feedback.",
  },
];

const HANGS = [
  { activity: "Coffee + conversation prompts", people: 6, vibe: "Chill" },
  { activity: "Pickup basketball + food after", people: 8, vibe: "Energetic" },
  { activity: "Museum walk + talk-as-you-go", people: 6, vibe: "Social" },
  { activity: "Cooking together + shared meal", people: 6, vibe: "Chill" },
  { activity: "Open mic night + debrief", people: 8, vibe: "Social" },
  { activity: "Hiking + trailside conversation", people: 8, vibe: "Energetic" },
  { activity: "Board games + mixing", people: 6, vibe: "Chill" },
];

const TESTIMONIALS = [
  { text: "I showed up alone and left with three people's numbers.", author: "Sarah, 26" },
  { text: "Knowing it was only 6 people made me actually go.", author: "Marcus, 28" },
  { text: "The group chat after was the best part. We're hanging out again this weekend.", author: "Priya, 24" },
  { text: "The host noticed I was quiet and brought me in naturally. That never happens at meetups.", author: "James, 27" },
  { text: "I've tried everything. This is the first thing that actually led to friends.", author: "Aisha, 25" },
  { text: "I was scared I'd be the most awkward person there. Turns out everyone felt that way.", author: "Devon, 23" },
];

const FAQS = [
  { q: "How is this different from Meetup?", a: "Small matched groups, trained hosts, structured activities, follow-up system. Meetup is an open event. Rekindle is an intentional group." },
  { q: "Will it be awkward?", a: "Everyone comes alone. Activity + small group + host = no standing around in silence." },
  { q: "What happens after?", a: "Group chat. Follow-up hangs. Better matches over time." },
  { q: "Is it safe?", a: "Trained hosts, norms, small groups, post-hang feedback system." },
  { q: "Can't afford $10?", a: "First hang free. $25/month unlimited. Sliding scale coming." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const Landing = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const goSignup = () => navigate("/signup");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <a href="/" className="font-display text-2xl font-bold tracking-tight">
            Rekindle
          </a>
          <Button variant="hero" size="sm" onClick={goSignup}>
            Get started
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pb-20 pt-24 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mx-auto max-w-2xl">
          <motion.h1 variants={fadeUp} className="mb-6 text-4xl font-bold leading-[1.15] md:text-[56px]">
            Your next friend group starts with one hang.
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mb-10 max-w-lg text-lg text-muted-foreground leading-relaxed">
            Small groups. Shared activities. A host who makes sure nobody stands alone.
          </motion.p>
          <motion.div variants={fadeUp} className="mb-5 flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="lg" onClick={goSignup}>
              Try your first hang free
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}>
              See how it works
            </Button>
          </motion.div>
          <motion.p variants={fadeUp} className="text-sm text-muted-foreground italic">
            Everyone comes alone. That's the whole point.
          </motion.p>
        </motion.div>
      </section>

      {/* Problem */}
      <section className="border-y border-border bg-secondary/50 px-6 py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mx-auto max-w-xl text-center">
          <motion.h2 variants={fadeUp} className="mb-6 text-3xl font-bold md:text-4xl">
            You've tried. It hasn't worked.
          </motion.h2>
          <motion.p variants={fadeUp} className="mb-4 text-muted-foreground leading-relaxed">
            You've gone to meetups where nobody talked to you. Downloaded apps that led nowhere. Said yes to events and left early because nobody made space for you.
          </motion.p>
          <motion.p variants={fadeUp} className="mb-8 text-muted-foreground leading-relaxed">
            The problem isn't effort. It's format.
          </motion.p>
          <motion.p variants={fadeUp} className="font-display text-2xl font-semibold">
            Rekindle fixes the format.
          </motion.p>
        </motion.div>
      </section>

      {/* How it works */}
      <section id="how" className="px-6 py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mx-auto max-w-5xl">
          <motion.h2 variants={fadeUp} className="mb-4 text-center text-3xl font-bold md:text-4xl">How it works</motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mb-14 max-w-xl text-center text-muted-foreground leading-relaxed">
            6–8 people matched by interest, age, and vibe. A shared activity. A trained host.
          </motion.p>
          <motion.div variants={stagger} className="grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <motion.div key={step.label} variants={fadeUp} className="rounded-2xl border border-border bg-card p-8 shadow-card">
                <span className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <h3 className="mb-3 font-display text-xl font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.p variants={fadeUp} className="mt-12 text-center font-display text-xl font-semibold">
            This isn't an event you attend. It's a group you join.
          </motion.p>
        </motion.div>
      </section>

      {/* Hang examples */}
      <section className="border-y border-border bg-secondary/50 px-6 py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mx-auto max-w-5xl">
          <motion.h2 variants={fadeUp} className="mb-12 text-center text-3xl font-bold md:text-4xl">What a hang looks like</motion.h2>
          <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HANGS.map((hang) => (
              <motion.div key={hang.activity} variants={fadeUp} className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <p className="mb-3 font-medium text-foreground">{hang.activity}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {hang.people} people
                  </span>
                  <span className="rounded-full bg-secondary px-2 py-0.5">{hang.vibe}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mx-auto max-w-5xl">
          <motion.h2 variants={fadeUp} className="mb-12 text-center text-3xl font-bold md:text-4xl">After one hang</motion.h2>
          <motion.div variants={stagger} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <motion.div key={t.author} variants={fadeUp} className="rounded-2xl border border-border bg-card p-7 shadow-card">
                <p className="mb-4 font-display text-lg italic leading-relaxed text-foreground">"{t.text}"</p>
                <p className="text-sm font-medium text-muted-foreground">— {t.author}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Pricing */}
      <section className="border-y border-border bg-secondary/50 px-6 py-20 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mx-auto max-w-3xl">
          <motion.h2 variants={fadeUp} className="mb-12 text-3xl font-bold md:text-4xl">Pricing</motion.h2>
          <motion.div variants={stagger} className="mb-8 flex flex-col items-center justify-center gap-5 sm:flex-row">
            {[
              { label: "First hang", price: "Free", detail: "No card required" },
              { label: "Per hang", price: "$10", detail: "Pay as you go", featured: true },
              { label: "Unlimited", price: "$25/mo", detail: "As many hangs as you want" },
            ].map((plan) => (
              <motion.div
                key={plan.label}
                variants={fadeUp}
                className={`flex-1 rounded-2xl border bg-card p-8 shadow-card ${plan.featured ? "border-foreground ring-1 ring-foreground" : "border-border"}`}
              >
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{plan.label}</p>
                <p className="mb-1 font-display text-4xl font-bold text-foreground">{plan.price}</p>
                <p className="text-sm text-muted-foreground">{plan.detail}</p>
              </motion.div>
            ))}
          </motion.div>
          <p className="mb-8 text-sm text-muted-foreground italic">Sliding scale coming soon.</p>
          <Button variant="hero" size="lg" onClick={goSignup}>
            Try your first hang free
          </Button>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mx-auto max-w-2xl">
          <motion.h2 variants={fadeUp} className="mb-12 text-center text-3xl font-bold md:text-4xl">FAQ</motion.h2>
          <div>
            {FAQS.map((faq, i) => (
              <motion.div key={i} variants={fadeUp} className="border-b border-border">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between py-6 text-left text-base font-semibold text-foreground transition-colors hover:text-muted-foreground"
                >
                  {faq.q}
                  <ChevronDown className={`h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-200 ${openFaq === i ? "max-h-40 pb-6" : "max-h-0"}`}>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-24 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mx-auto max-w-lg">
          <motion.h2 variants={fadeUp} className="mb-8 text-3xl font-bold md:text-4xl">
            Stop waiting for someone to invite you.
          </motion.h2>
          <motion.div variants={fadeUp}>
            <Button variant="hero" size="xl" onClick={goSignup}>
              Try your first hang free
              <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-10 text-center">
        <p className="text-sm text-muted-foreground">© 2026 Rekindle. Making showing up feel easier.</p>
      </footer>
    </div>
  );
};

export default Landing;
