"use client";
import { FormEvent, useState } from "react";
import AuthInput from "../../components/auth/AuthInput";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FormErrors {
  email?: string;
}

export default function ForgetPassword() {
  const router = useRouter();

  const back_end_url = process.env.NEXT_PUBLIC_BACK_END_URL;
  const forget_password_path = process.env.NEXT_PUBLIC_FORGET_PASSWORD_PATH;

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errs.email = "Enter a valid email address.";
    }
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
    setLoading(true);

    try {
      await axios.post(`${back_end_url}${forget_password_path}`, { email });

      setTimeout(() => {
        router.push("/confirmation-reset-password");
      }, 800);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const backendErrors = error.response?.data?.errors as
          | Record<string, string[]>
          | undefined;

        const message =
          backendErrors?.[Object.keys(backendErrors)[0]]?.[0] ||
          "Something went wrong";

        setErrors({ email: message });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-surface-container to-background px-4">
      
      {/* Card */}
      <div className="w-full max-w-md bg-surface-container rounded-3xl shadow-2xl border border-outline-variant/30 p-8 md:p-10">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Forgot Password
          </h1>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            Enter your email and we’ll send you a reset link.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <AuthInput
            id="email"
            label="Email Address"
            icon="email"
            type="email"
            error={errors.email}
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full font-semibold py-4 rounded-xl 
              bg-gradient-to-r from-green-400 to-green-600 
              text-black
              shadow-[0_10px_30px_rgba(34,197,94,0.4)]
              hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(34,197,94,0.6)]
              active:scale-[0.98]
              transition-all duration-300 
              disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <CircularProgress size={20} />
                Sending…
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-on-surface-variant">
            Remember your password?{" "}
            <Link
              href="/LogIn"
              className="text-primary font-medium hover:underline"
            >
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}