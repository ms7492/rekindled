import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Flame, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Welcome = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    setLoading(true);
    const formattedPhone = phone.startsWith("+") ? phone : `+1${phone}`;
    const { error } = await supabase.auth.signInWithOtp({ phone: formattedPhone });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      setStep("otp");
      toast.success("OTP sent!");
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    const formattedPhone = phone.startsWith("+") ? phone : `+1${phone}`;
    const { error } = await supabase.auth.verifyOtp({
      phone: formattedPhone,
      token: otp,
      type: "sms",
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      navigate("/interests");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 gradient-surface">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-accent/10 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 flex w-full max-w-sm flex-col items-center"
      >
        {/* Logo */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl gradient-primary shadow-glow"
        >
          <Flame className="h-10 w-10 text-primary-foreground" />
        </motion.div>

        <h1 className="mb-2 text-4xl font-bold tracking-tight">
          <span className="text-gradient">Rekindle</span>
        </h1>
        <p className="mb-10 text-center text-muted-foreground">
          Find your crew. Spark connections at events that matter.
        </p>

        {step === "phone" ? (
          <motion.div
            key="phone"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full space-y-4"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Phone Number</label>
              <Input
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-12 rounded-xl border-border bg-secondary text-foreground placeholder:text-muted-foreground focus:ring-primary"
              />
            </div>
            <Button
              variant="hero"
              size="lg"
              className="w-full"
              onClick={handleSendOtp}
              disabled={loading}
            >
              {loading ? "Sending..." : "Continue"}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="otp"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full space-y-4"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Enter OTP</label>
              <Input
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="h-12 rounded-xl border-border bg-secondary text-foreground text-center text-2xl tracking-[0.5em] placeholder:text-muted-foreground placeholder:tracking-[0.5em] placeholder:text-lg focus:ring-primary"
              />
            </div>
            <Button
              variant="hero"
              size="lg"
              className="w-full"
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify & Enter"}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <button
              onClick={() => setStep("phone")}
              className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Change phone number
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Welcome;
