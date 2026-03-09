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
  { text: "The group chat after was the best part.", author: "Priya, 24" },
];

const FAQS = [
  { q: "How is this different from Meetup?", a: "Small matched groups, trained hosts, structured activities, follow-up system. Meetup is an open event. Rekindle is an intentional group." },
  { q: "Will it be awkward?", a: "Everyone comes alone. Activity + small group + host = no standing around in silence." },
  { q: "What happens after?", a: "Group chat. Follow-up hangs. Better matches over time." },
  { q: "Is it safe?", a: "Trained hosts, norms, small groups, post-hang feedback system." },
];

const fade = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const Landing = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const go = () => navigate("/signup");

  return (
    <div className="min-h-screen bg-foreground text-primary-foreground">
      {/* Nav — dark transparent */}
      <nav className="fixed top-0 z-50 w-full">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="/" className="font-display text-2xl font-bold tracking-tight text-white">
            Rekindle
          </a>
          <Button variant="outline" size="sm" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white rounded-full" onClick={go}>
            Get started
          </Button>
        </div>
      </nav>

      {/* ── Hero: full-screen image + centered copy ── */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <img src={heroImg} alt="Friends laughing together" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fade}
          className="relative z-10 mx-auto max-w-2xl px-6 text-center"
        >
          <h1 className="mb-6 font-display text-5xl font-bold leading-[1.1] text-white md:text-7xl">
            Your next friend group starts here.
          </h1>
          <p className="mx-auto mb-10 max-w-md text-lg text-white/80 leading-relaxed">
            Small groups. Shared activities. A host who makes sure nobody stands alone.
          </p>
          <Button variant="hero" size="xl" onClick={go} className="bg-white text-foreground hover:bg-white/90">
            Try your first hang free
            <ArrowRight className="ml-1 h-5 w-5" />
          </Button>
        </motion.div>
        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        >
          <ChevronDown className="h-6 w-6 text-white/60" />
        </motion.div>
      </section>

      {/* ── Tagline band ── */}
      <section className="bg-foreground px-6 py-20 text-center">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fade}
          className="mx-auto max-w-xl font-display text-3xl font-semibold leading-snug text-white md:text-4xl"
        >
          Everyone comes alone.
          <br />
          <span className="text-white/50">That's the whole point.</span>
        </motion.p>
      </section>

      {/* ── How it works — alternating image + text ── */}
      <section className="bg-background text-foreground">
        {/* Row 1 */}
        <div className="grid min-h-[70vh] md:grid-cols-2">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}
            className="flex flex-col justify-center px-8 py-16 md:px-16 lg:px-24"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Before</p>
            <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">Don't walk in blind.</h2>
            <p className="max-w-md text-muted-foreground leading-relaxed">
              You see the activity, the vibe, the group size, who's hosting. You decide if it's for you — before you show up.
            </p>
          </motion.div>
          <div className="overflow-hidden">
            <motion.img
              initial={{ scale: 1.1 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }}
              src={adventureImg} alt="Friends hiking together" className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Row 2 — reversed */}
        <div className="grid min-h-[70vh] md:grid-cols-2">
          <div className="order-2 overflow-hidden md:order-1">
            <motion.img
              initial={{ scale: 1.1 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }}
              src={gamesImg} alt="Friends playing board games" className="h-full w-full object-cover"
            />
          </div>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}
            className="order-1 flex flex-col justify-center px-8 py-16 md:order-2 md:px-16 lg:px-24"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">During</p>
            <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">The activity carries you.</h2>
            <p className="max-w-md text-muted-foreground leading-relaxed">
              The host makes sure nobody's standing alone. The small group means you actually get to know people.
            </p>
          </motion.div>
        </div>

        {/* Row 3 — text-only centered */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}
          className="flex min-h-[50vh] flex-col items-center justify-center px-8 py-20 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">After</p>
          <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">One hang plants the seed.</h2>
          <p className="max-w-lg text-muted-foreground leading-relaxed">
            Group chat opens. Follow-up hangs happen if the group clicks. Your future matches improve based on feedback.
          </p>
        </motion.div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-foreground px-6 py-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="mx-auto max-w-5xl">
          <h2 className="mb-14 text-center font-display text-3xl font-bold text-white md:text-4xl">After one hang</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.author} className="rounded-2xl border border-white/10 bg-white/5 p-8">
                <p className="mb-5 font-display text-lg italic leading-relaxed text-white">"{t.text}"</p>
                <p className="text-sm font-medium text-white/50">— {t.author}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Pricing ── */}
      <section className="bg-background px-6 py-24 text-center text-foreground">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="mx-auto max-w-3xl">
          <h2 className="mb-14 font-display text-3xl font-bold md:text-4xl">Simple pricing</h2>
          <div className="mb-10 flex flex-col items-stretch justify-center gap-5 sm:flex-row">
            {[
              { label: "First hang", price: "Free", detail: "No card required" },
              { label: "Per hang", price: "$10", detail: "Pay as you go", featured: true },
              { label: "Unlimited", price: "$25/mo", detail: "As many as you want" },
            ].map((plan) => (
              <div
                key={plan.label}
                className={`flex-1 rounded-2xl border p-8 shadow-card ${plan.featured ? "border-foreground ring-1 ring-foreground" : "border-border"}`}
              >
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{plan.label}</p>
                <p className="mb-1 font-display text-4xl font-bold">{plan.price}</p>
                <p className="text-sm text-muted-foreground">{plan.detail}</p>
              </div>
            ))}
          </div>
          <Button variant="hero" size="lg" onClick={go}>
            Get started
          </Button>
        </motion.div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-secondary/50 px-6 py-24 text-foreground">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="mx-auto max-w-2xl">
          <h2 className="mb-12 text-center font-display text-3xl font-bold md:text-4xl">FAQ</h2>
          {FAQS.map((faq, i) => (
            <div key={i} className="border-b border-border">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between py-6 text-left font-semibold transition-colors hover:text-muted-foreground"
              >
                {faq.q}
                <ChevronDown className={`h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-200 ${openFaq === i ? "max-h-40 pb-6" : "max-h-0"}`}>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-foreground px-6 py-28 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="mx-auto max-w-lg">
          <h2 className="mb-8 font-display text-3xl font-bold text-white md:text-5xl">
            Stop waiting for someone to invite you.
          </h2>
          <Button variant="hero" size="xl" onClick={go} className="bg-white text-foreground hover:bg-white/90">
            Try your first hang free
            <ArrowRight className="ml-1 h-5 w-5" />
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground border-t border-white/10 px-6 py-10 text-center">
        <p className="text-sm text-white/40">© 2026 Rekindle. Making showing up feel easier.</p>
      </footer>
    </div>
  );
};

export default Landing;
