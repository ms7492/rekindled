import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Flame, ArrowRight, ArrowLeft, Camera, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Step = "info" | "phone" | "otp";

const Signup = () => {
  const [step, setStep] = useState<Step>("info");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleInfoContinue = () => {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    setStep("phone");
  };

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
      // TODO: save name, email, avatar to profile in DB
      localStorage.setItem("rekindle_name", name);
      localStorage.setItem("rekindle_email", email);
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
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary shadow-glow"
        >
          <Flame className="h-8 w-8 text-primary-foreground" />
        </motion.div>

        <h1 className="mb-1 text-3xl font-bold tracking-tight">
          <span className="text-gradient">Join Rekindle</span>
        </h1>
        <p className="mb-8 text-center text-sm text-muted-foreground">
          {step === "info" && "Tell us a bit about yourself"}
          {step === "phone" && "Verify your phone number"}
          {step === "otp" && "Enter the code we sent you"}
        </p>

        {/* Step: Basic info */}
        {step === "info" && (
          <motion.div key="info" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="w-full space-y-4">
            {/* Avatar */}
            <div className="flex justify-center">
              <label className="group relative flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-border bg-secondary transition-colors hover:border-primary">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <Camera className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-[10px] text-muted-foreground">Photo</span>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
              </label>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Name</label>
              <Input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 rounded-xl border-border bg-secondary text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl border-border bg-secondary text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <Button variant="hero" size="lg" className="w-full" onClick={handleInfoContinue}>
              Continue
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </motion.div>
        )}

        {/* Step: Phone */}
        {step === "phone" && (
          <motion.div key="phone" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Phone Number</label>
              <Input
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-12 rounded-xl border-border bg-secondary text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <Button variant="hero" size="lg" className="w-full" onClick={handleSendOtp} disabled={loading}>
              {loading ? "Sending..." : "Send Code"}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <button onClick={() => setStep("info")} className="flex w-full items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </button>
          </motion.div>
        )}

        {/* Step: OTP */}
        {step === "otp" && (
          <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Verification Code</label>
              <Input
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="h-12 rounded-xl border-border bg-secondary text-foreground text-center text-2xl tracking-[0.5em] placeholder:text-muted-foreground placeholder:tracking-[0.5em] placeholder:text-lg"
              />
            </div>
            <Button variant="hero" size="lg" className="w-full" onClick={handleVerifyOtp} disabled={loading}>
              {loading ? "Verifying..." : "Verify & Enter"}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <button onClick={() => setStep("phone")} className="flex w-full items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" />
              Change number
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Signup;
