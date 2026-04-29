"use client";


import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import AuthInput, { PasswordInput } from "@/app/components/auth/AuthInput";
import SocialButton from "@/app/components/auth/SocialButton";
import Cookies from "universal-cookie";
// mui
import CircularProgress from "@mui/material/CircularProgress";
// mui icons
import CheckIcon from "@mui/icons-material/Check";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import { useRouter } from "next/navigation";
interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

export default function Register() {
  const back_end_url = process.env.NEXT_PUBLIC_BACK_END_URL;
  const register_path = process.env.NEXT_PUBLIC_REGISTER_PATH;
  // route
  const useroute = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const minLength = 8;
  const hasUpper = /[A-Z]/;
  const hasLower = /[a-z]/;
  const hasNumber = /[0-9]/;
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/;

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!firstName.trim()) errs.firstName = "First name is required.";
    if (!lastName.trim()) errs.lastName = "Last name is required.";
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      errs.email = "Enter a valid email address.";
    if (!phoneNumber.trim()) {
      errs.phoneNumber = "Phone number is required.";
    } else if (!/^01[0-2,5]\d{8}$/.test(phoneNumber)) {
      errs.phoneNumber =
        "Enter a valid Egyptian phone number (e.g. 01012345678).";
    }
    if (password.length < minLength) {
      errs.password = "Password must be at least 8 characters";
    }
    if (!hasUpper.test(password)) {
      errs.password = "Must contain uppercase letter";
    }
    if (!hasLower.test(password)) {
      errs.password = "Must contain lowercase letter";
    }
    if (!hasNumber.test(password)) {
      errs.password = "Must contain a number";
    }
    if (!hasSpecial.test(password)) {
      errs.password = "Must contain a special character";
    }
    if (password !== confirmPassword)
      errs.confirmPassword = "Passwords do not match.";
    if (!acceptTerms) errs.terms = "You must accept the terms to continue.";
    return errs;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsLoading(true);
    // TODO: integrate your auth logic here
    
    const registeration = async () => {
      const body = {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        confirmPassword,
      };

      console.log("REQUEST BODY:", body); // 👈 debug input

      const res = await fetch(`${back_end_url}${register_path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json(); // 👈 VERY IMPORTANT

      if (res.ok) {
        console.log("SUCCESS:", data);
        const Cookie = new Cookies();
        Cookie.set("sportifyaccesstoken", data.accessToken, {
          path: "/",
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        });
        Cookie.set("sportifyrefreshtoken", data.refreshToken, {
          path: "/",
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        });
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          useroute.push(`/confirmation-email?email=${data.email}`);
        }, 500);
      } else {
        console.log("ERROR STATUS:", res.status);
        console.log("ERROR DATA:", data); // 👈 THIS WILL TELL YOU EVERYTHING
        setIsLoading(false);
      }

      await new Promise((r) => setTimeout(r, 1200));
    };
    registeration();
  };

  return (
    <div className="min-h-screen bg-background text-on-background font-inter flex">
      {/* Brand / Visual Panel */}
      <aside className="hidden lg:flex md:w-1/2 relative flex-col justify-between p-12 overflow-hidden bg-surface-container-lowest">
        {/* Background image */}
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src={"/registerimage.png"}
            alt="Premium tennis court at dusk"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/20 to-transparent z-10" />

        {/* Logo */}
        <div className="relative z-20 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-4xl">
            Sportify
          </span>
          <span className="font-lexend tracking-tighter text-2xl font-black text-white italic">
            Court Curator
          </span>
        </div>

        {/* Social proof */}
        <div className="relative z-20 mb-12">
          <h1 className="font-lexend text-5xl font-bold text-white max-w-md mb-8 leading-tight tracking-tight">
            Elevate your game. Experience precision.
          </h1>

          <div className="p-6 bg-surface-container/60 backdrop-blur-xl border border-outline-variant rounded-2xl max-w-sm">
            <div className="flex gap-1 text-primary mb-3">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="material-symbols-outlined"
                  style={{
                    fontSize: "16px",
                    fontVariationSettings: "'FILL' 1",
                  }}
                >
                  star
                </span>
              ))}
            </div>
            <p
              className="italic text-on-surface-variant mb-4 leading-relaxed"
              style={{ fontSize: "15px" }}
            >
              &ldquo;The most seamless booking experience I&apos;ve ever used.
              The premium facilities are matched by the premium
              interface.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-primary relative flex-shrink-0">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_joon129GTA4mi1c_QR0ftBoZ4-3fMLpU1yoNgPo0Nngqk5yHk9p3eamgHko-thug-obKf48kBUFCfOkLJ7-FqH354_DwSfFY7x7zCiaJfusXl675kySRHoxfz1N2OMo_9jHxxZstJdTKiEinCRCSFwc9PkazzSXzzSHE0L0mcvq4cZkBPhtSess20422tlfMNTmF5KrZms7L9wGnKU3x0VRvmEEnhw4l2EkbkwMSwhJEBgEcTWK63SxaK7QqZZcoBmjemsQ-aTo"
                  alt="Marcus Chen"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div>
                <p
                  className="font-bold text-white"
                  style={{ fontSize: "14px" }}
                >
                  Marcus Chen
                </p>
                <p
                  className="text-on-surface-variant"
                  style={{ fontSize: "12px" }}
                >
                  Elite Tennis Pro
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Form Panel */}
      <section className="flex-1 flex flex-col justify-center items-center px-6 py-12 md:px-16 bg-surface lg:bg-background overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="md:hidden flex items-center justify-center gap-2 mb-10">
            <span className="material-symbols-outlined text-primary text-3xl font-bold">
              <SportsTennisIcon className="text-green-500 mr-2" />
              Sportify
            </span>
            <span className="font-lexend tracking-tighter text-xl font-black  italic">
              Register
            </span>
          </div>

          <div className="text-center md:text-left mb-10">
            <h2 className="font-lexend text-3xl font-semibold  mb-2 tracking-tight">
              Create Account
            </h2>
            <p className="text-on-surface-variant text-base">
              Join the elite network of racquet sport enthusiasts.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <AuthInput
              id="firstName"
              label="First Name"
              icon="person"
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={errors.firstName}
              autoComplete="given-name"
              required
            />
            <AuthInput
              id="lastName"
              label="Last Name"
              icon="person"
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={errors.lastName}
              autoComplete="family-name"
              required
            />

            <AuthInput
              id="email"
              label="Email Address"
              icon="mail"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              autoComplete="email"
              required
            />
            <AuthInput
              id="phoneNumber"
              label="Phone Number"
              icon="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              error={errors.phoneNumber}
              autoComplete="tel"
              required
            />

            {/* Password row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <PasswordInput
                id="registerpassword"
                label="Password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                autoComplete="new-password"
                required
              />
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-on-surface-variant font-medium ml-1 mb-0.5"
                  style={{ fontSize: "14px" }}
                >
                  Confirm Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"></div>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                    className={`w-full bg-surface-container-high border rounded-xl py-4 pl-4 pr-2  text-on-surface placeholder:text-on-surface-variant/40 text-base transition-all duration-200 glow-focus ${errors.confirmPassword ? "border-red-500" : "border-outline-variant"}`}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-error text-xs ml-1 flex items-center gap-1">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "14px" }}
                    >
                      error
                    </span>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 py-1">
              <div className="relative flex items-center mt-0.5 flex-shrink-0">
                <input
                  id="terms"
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-outline-variant bg-surface-container-high transition-all checked:bg-primary-container checked:border-primary-container outline-none glow-focus"
                />
                <span
                  className="material-symbols-outlined absolute  text-on-primary-container opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                  style={{ fontSize: "16px" }}
                >
                  <CheckIcon className="text-green-500 pr-1" />
                </span>
              </div>
              <div>
                <label
                  htmlFor="terms"
                  className="text-on-surface-variant cursor-pointer leading-snug"
                  style={{ fontSize: "14px" }}
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-primary hover:underline decoration-primary/40 underline-offset-4"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-primary hover:underline decoration-primary/40 underline-offset-4"
                  >
                    Privacy Policy
                  </Link>
                  .
                </label>
                {errors.terms && (
                  <p className="text-error text-xs mt-1 flex items-center gap-1">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "14px" }}
                    >
                      error
                    </span>
                    {errors.terms}
                  </p>
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative overflow-hidden font-semibold py-4 rounded-xl 
             bg-gradient-to-r from-green-400 to-green-600 
             text-black  cursor-pointer
             shadow-[0_10px_30px_rgba(34,197,94,0.4)]
             hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(34,197,94,0.6)]
             active:scale-[0.98]
             transition-all duration-300 
             disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ fontSize: "16px", letterSpacing: "0.02em" }}
            >
              {isLoading ? (
                <>
                  <span style={{ fontSize: "18px" }}>
                    <CircularProgress
                      aria-label="Loading…"
                      className="text-sm "
                    />
                  </span>
                  Signing up…
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>

          {/* Social */}
          <div className="mt-10">
            <div className="relative flex items-center mb-6">
              <div className="flex-grow border-t border-outline-variant/30" />
              <span
                className="flex-shrink mx-4 text-on-surface-variant/50 font-bold uppercase tracking-widest"
                style={{ fontSize: "11px" }}
              >
                Or register with
              </span>
              <div className="flex-grow border-t border-outline-variant/30" />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <SocialButton provider="google" />
            </div>
          </div>

          {/* Login link */}
          <p className="mt-10 text-center text-on-surface-variant text-base">
            Already have an account?{" "}
            <Link
              href="/LogIn"
              className="text-primary font-semibold hover:underline underline-offset-4 decoration-primary/40 transition-all"
            >
              Login
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
