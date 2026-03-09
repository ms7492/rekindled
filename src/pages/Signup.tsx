import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, Camera, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type Step = "method" | "info" | "phone-input" | "otp" | "email-input";

const fade = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, x: -16, transition: { duration: 0.2 } },
};

const Signup = () => {
  const [step, setStep] = useState<Step>("method");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleEmailSubmit = async () => {
    if (!email.trim() || !email.includes("@")) { toast.error("Please enter a valid email"); return; }
    if (password.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
        navigate("/feed");
      } else {
        if (!name.trim()) { toast.error("Please enter your name"); setLoading(false); return; }
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { data: { name }, emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast.success("Account created! Check your email to verify.");
        navigate("/interests");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally { setLoading(false); }
  };

  const handleInfoContinue = () => {
    if (!name.trim()) { toast.error("Please enter your name"); return; }
    if (!email.trim() || !email.includes("@")) { toast.error("Please enter a valid email"); return; }
    setStep("phone-input");
  };

  const handleSendOtp = async () => {
    if (phone.length < 10) { toast.error("Please enter a valid phone number"); return; }
    setStep("otp");
    toast.success("OTP sent! (mock: use 123456)");
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 6) { toast.error("Enter a 6-digit code"); return; }
    localStorage.setItem("rekindle_name", name);
    localStorage.setItem("rekindle_email", email);
    toast.success("Welcome to Rekindle!");
    navigate("/interests");
  };

  const subtitle: Record<Step, string> = {
    method: isLogin ? "Welcome back" : "Let's get you started",
    "email-input": isLogin ? "Sign in to your account" : "Create your account",
    info: "Tell us about yourself",
    "phone-input": "Verify your phone number",
    otp: "Enter the code we sent",
  };

  const Field = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className="space-y-2">
      <label className="text-[13px] font-medium text-foreground">{label}</label>
      <Input {...props} className="h-12 rounded-xl border-border bg-card text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-brand" />
    </div>
  );

  const Back = ({ onClick, text = "Back" }: { onClick: () => void; text?: string }) => (
    <button onClick={onClick} className="flex w-full items-center justify-center gap-1.5 pt-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
      <ArrowLeft className="h-3.5 w-3.5" /> {text}
    </button>
  );

  const AvatarUpload = () => (
    <div className="flex justify-center">
      <label className="group relative flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-border bg-card transition-all hover:border-brand/30 hover:shadow-card">
        {avatarPreview ? (
          <img src={avatarPreview} alt="Avatar" className="h-full w-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-1">
            <Camera className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            <span className="text-[10px] text-muted-foreground">Photo</span>
          </div>
        )}
        <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
      </label>
    </div>
  );

  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center bg-background px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex w-full max-w-[380px] flex-col items-center"
      >
        <h1 className="mb-1 font-display text-3xl font-bold tracking-tight">Rekindle</h1>
        <p className="mb-10 text-center text-sm text-muted-foreground">{subtitle[step]}</p>

        <AnimatePresence mode="wait">
          {step === "method" && (
            <motion.div key="method" {...fade} className="w-full space-y-3">
              <button
                onClick={() => setStep("email-input")}
                className="flex w-full items-center gap-4 rounded-2xl border border-border bg-card p-4 text-left transition-all duration-200 hover:shadow-card hover:border-brand/20"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary">
                  <Mail className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-[15px]">Continue with Email</p>
                  <p className="text-xs text-muted-foreground">Sign up or log in with email</p>
                </div>
              </button>
              <button
                onClick={() => setStep("info")}
                className="flex w-full items-center gap-4 rounded-2xl border border-border bg-card p-4 text-left transition-all duration-200 hover:shadow-card hover:border-brand/20"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary">
                  <Phone className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-[15px]">Continue with Phone</p>
                  <p className="text-xs text-muted-foreground">Verify via SMS code</p>
                </div>
              </button>
              <p className="pt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <button onClick={() => { setIsLogin(true); setStep("email-input"); }} className="font-semibold text-foreground hover:underline">
                  Sign in
                </button>
              </p>
            </motion.div>
          )}

          {step === "email-input" && (
            <motion.div key="email" {...fade} className="w-full space-y-5">
              {!isLogin && (
                <>
                  <AvatarUpload />
                  <Field label="Name" type="text" placeholder="Your name" value={name} onChange={(e) => setName((e.target as HTMLInputElement).value)} />
                </>
              )}
              <Field label="Email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail((e.target as HTMLInputElement).value)} />
              <Field label="Password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword((e.target as HTMLInputElement).value)} />
              <Button variant="hero" size="lg" className="w-full group" onClick={handleEmailSubmit} disabled={loading}>
                {loading ? "Please wait..." : isLogin ? "Sign in" : "Create account"}
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-foreground hover:underline">
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
              <Back onClick={() => { setStep("method"); setIsLogin(false); }} />
            </motion.div>
          )}

          {step === "info" && (
            <motion.div key="info" {...fade} className="w-full space-y-5">
              <AvatarUpload />
              <Field label="Name" type="text" placeholder="Your name" value={name} onChange={(e) => setName((e.target as HTMLInputElement).value)} />
              <Field label="Email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail((e.target as HTMLInputElement).value)} />
              <Button variant="hero" size="lg" className="w-full group" onClick={handleInfoContinue}>
                Continue <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Back onClick={() => setStep("method")} />
            </motion.div>
          )}

          {step === "phone-input" && (
            <motion.div key="phone" {...fade} className="w-full space-y-5">
              <Field label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" value={phone} onChange={(e) => setPhone((e.target as HTMLInputElement).value)} />
              <Button variant="hero" size="lg" className="w-full group" onClick={handleSendOtp}>
                Send Code <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Back onClick={() => setStep("info")} />
            </motion.div>
          )}

          {step === "otp" && (
            <motion.div key="otp" {...fade} className="w-full space-y-5">
              <div className="space-y-2">
                <label className="text-[13px] font-medium text-foreground">Verification Code</label>
                <Input
                  type="text" placeholder="123456" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6}
                  className="h-14 rounded-xl border-border bg-card text-foreground text-center text-2xl tracking-[0.4em] placeholder:text-muted-foreground placeholder:tracking-[0.4em] placeholder:text-base focus-visible:ring-1 focus-visible:ring-brand"
                />
              </div>
              <Button variant="hero" size="lg" className="w-full group" onClick={handleVerifyOtp}>
                Verify & Enter <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Back onClick={() => setStep("phone-input")} text="Change number" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Signup;
