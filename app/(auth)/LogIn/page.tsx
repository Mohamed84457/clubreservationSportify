"use client";

// mui
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

import Link from "next/link";
import { FormEvent, SyntheticEvent, useState } from "react";
import { PasswordInput } from "@/app/components/auth/AuthInput";
import AuthInput from "@/app/components/auth/AuthInput";
import SocialButton from "@/app/components/auth/SocialButton";

import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";

interface FormErrors {
  email?: string;
  password?: string;
}
export default function LoginPage() {
  const back_end_url = process.env.NEXT_PUBLIC_BACK_END_URL;
  const login_path = process.env.NEXT_PUBLIC_LOGIN_PATH;
  // router
  const router = useRouter();
  //cppkie
  const Cookie = new Cookies();
  // snackbar
  const [open, setOpen] = useState<{
    open: boolean;
    message: string;
    type: "success" | "error" | "warning" | "info";
  }>({
    open: false,
    message: "",
    type: "success",
  });
  const handleSnackbarClose = (
    event: SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") return;

    setOpen((prev) => ({ ...prev, open: false }));
  };

  const handleAlertClose = (event: SyntheticEvent) => {
    setOpen((prev) => ({ ...prev, open: false }));
  };

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // validation errors
  const validate = (): FormErrors => {
    const errs: FormErrors = {};

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      errs.email = "Enter a valid email address.";
    if (!password.length) errs.password = "Password is required.";
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
    try {
      const response = await axios.post(`${back_end_url}${login_path}`, {
        email: email,
        password: password,
      });
      console.log(response);
      if (response.status === 200) {
        Cookie.set("sportifyaccesstoken", response.data.accessToken, {
          path: "/",
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        });
        Cookie.set("sportifyrefreshtoken", response.data.refreshToken, {
          path: "/",
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        });
        if (response.data.roleName == "Player") {
          router.push("website");
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errors = error.response?.data?.errors;

        if (error.response?.status === 401) {
          setOpen({
            open: true,
            message: "Email or password is incorrect",
            type: "error",
          });
        } else if (error.response?.data?.errors) {
          const errors = error.response?.data?.errors as Record<
            string,
            string[]
          >;
          const message = Object.values(errors)[0]?.[0] || "Validation error";

          setOpen({
            open: true,
            message,
            type: "error",
          });
        }
      }
    } finally {
      await new Promise((r) => setTimeout(r, 1200));
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background font-inter flex flex-col">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/80 backdrop-blur-md border-b border-outline-variant/30 shadow-lg shadow-black/20 flex justify-between items-center px-6 h-16">
        <span className="text-xl font-black text-green-600 italic tracking-tighter font-lexend">
          Sportify
        </span>
        <button
          type="button"
          aria-label="Help"
          className="text-on-surface-variant hover:text-on-surface transition-colors"
        >
          <span className="material-symbols-outlined">Log in</span>
        </button>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center p-4 pt-20">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-surface-container rounded-3xl shadow-2xl border border-outline-variant/30">
          {/* Hero Panel */}
          <div className="hidden lg:block relative bg-login-hero min-h-[600px]">
            <div className="absolute inset-0 flex flex-col justify-end p-12 bg-gradient-to-t from-background via-transparent to-transparent">
              <div className="mb-4 inline-flex items-center gap-2 bg-primary/10 border border-primary/20 backdrop-blur-md px-4 py-2 rounded-full w-fit">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{
                    fontSize: "14px",
                    fontVariationSettings: "'FILL' 1",
                  }}
                >
                  stars
                </span>
                <span
                  className="text-primary uppercase tracking-widest font-medium"
                  style={{ fontSize: "11px" }}
                >
                  Premium Facilities Only
                </span>
              </div>
              <h2 className="font-lexend text-4xl font-bold text-white mb-4 leading-tight tracking-tight">
                Precision in every booking.
              </h2>
              <p className="text-on-surface-variant text-lg max-w-md leading-relaxed">
                Experience the elite standard of court management. Reserve your
                spot in seconds and focus on the game.
              </p>
            </div>
          </div>

          {/* Form Panel */}
          <div className="p-8 md:p-14 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
              <header className="mb-10">
                <h1 className="font-lexend text-3xl font-semibold text-on-surface mb-2 tracking-tight">
                  Welcome Back
                </h1>
                <p className="text-on-surface-variant text-base">
                  Login to book your next game
                </p>
              </header>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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

                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label
                      htmlFor="password"
                      className="text-on-surface-variant font-medium"
                      style={{ fontSize: "14px" }}
                    >
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-primary hover:underline decoration-primary/40 underline-offset-4"
                      style={{ fontSize: "14px" }}
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <PasswordInput
                    id="password"
                    label=""
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    error={errors.password}
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 ">
                  {/* Remember me */}
                  <label className="flex items-center gap-3 px-1 cursor-pointer select-none group">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-5 h-5 rounded border-outline-variant bg-surface-container-high text-primary-container focus:ring-primary focus:ring-offset-background cursor-pointer accent-primary"
                    />
                    <span
                      className="text-on-surface-variant group-hover:text-on-surface transition-colors"
                      style={{ fontSize: "14px" }}
                    >
                      Remember me
                    </span>
                  </label>
                  {/* forget password */}

                  <div className="text-center sm:text-right ">
                    <Link
                      href={"/forget-password"}
                      className="text-primary hover:underline decoration-primary/40 underline-offset-4 text-blue-800"
                    >
                      Forgot password?
                    </Link>
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
                      Signing in…
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-10">
                <div className=" inset-0 flex items-center">
                  <div className="w-full border-t border-outline-variant/30 " />
                </div>
                <div className="relative flex justify-center">
                  <span
                    className="bg-surface-container px-4 mt-3 text-on-surface-variant uppercase tracking-widest font-medium"
                    style={{ fontSize: "11px" }}
                  >
                    or continue with
                  </span>
                </div>
              </div>

              {/* Social */}
              <div className="grid grid-cols-1 gap-4">
                <SocialButton provider="google" />
              </div>

              {/* Footer */}
              <footer className="mt-10 text-center">
                <p className="text-on-surface-variant text-base">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/Register"
                    className="text-primary font-semibold hover:underline decoration-primary/40 underline-offset-4 ml-1"
                  >
                    Register
                  </Link>
                </p>
              </footer>
            </div>
          </div>
        </div>
      </main>

      <Snackbar
        open={open.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity={open.type}
          variant="filled"
          sx={{ width: "90%", margin: "auto" }}
        >
          {open.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
