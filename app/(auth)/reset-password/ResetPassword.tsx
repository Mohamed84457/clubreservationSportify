"use client";

import { PasswordInput } from "@/app/components/auth/AuthInput";
import { CircularProgress } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

interface FormErrors {
  password?: string;
  confirmPassword?: string;
}

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setNewConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const back_end_url = process.env.NEXT_PUBLIC_BACK_END_URL;
  const resetpassword_path = process.env.NEXT_PUBLIC_RESET_PASSWORD_PATH;

  const validation = (): FormErrors => {
    const errs: FormErrors = {};

    if (newPassword.length < 8)
      errs.password = "At least 8 characters required";
    else if (!/[A-Z]/.test(newPassword))
      errs.password = "Must contain uppercase letter";
    else if (!/[a-z]/.test(newPassword))
      errs.password = "Must contain lowercase letter";
    else if (!/[0-9]/.test(newPassword))
      errs.password = "Must contain a number";
    else if (!/[!@#$%^&*]/.test(newPassword))
      errs.password = "Must contain a special character";

    if (newPassword !== confirmNewPassword)
      errs.confirmPassword = "Passwords do not match";

    return errs;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !token) {
      setErrors({ password: "Invalid or expired reset link" });
      return;
    }

    const errs = validation();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await fetch(`${back_end_url}${resetpassword_path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          token,
          newPassword,
          confirmNewPassword,
        }),
      });

      if (!res.ok) throw new Error("Reset failed");

      setSuccess(true);

      setTimeout(() => {
        router.push("/LogIn");
      }, 1500);
    } catch (err) {
      setErrors({ password: "Failed to reset password. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-surface-container to-background px-4">
      <div className="w-full max-w-md bg-surface-container rounded-3xl shadow-2xl border border-outline-variant/30 p-8 text-center">

        {success ? (
          <div className="space-y-4">
            <div className="text-4xl">✅</div>
            <h2 className="text-xl font-semibold">
              Password updated successfully
            </h2>
            <p className="text-on-surface-variant text-sm">
              Redirecting to login...
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
            <p className="text-on-surface-variant text-sm mb-6">
              Enter your new password below
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <PasswordInput
                id="password"
                label="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                error={errors.password}
                required
              />

              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmNewPassword}
                  onChange={(e) => setNewConfirmPassword(e.target.value)}
                  className="w-full border rounded-xl p-4"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-green-500 text-black font-semibold flex justify-center items-center gap-2"
              >
                {loading ? (
                  <>
                    <CircularProgress size={20} />
                    Updating...
                  </>
                ) : (
                  "Change Password"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}