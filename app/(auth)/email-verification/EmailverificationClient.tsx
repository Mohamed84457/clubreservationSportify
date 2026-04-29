"use client";
// api urls

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Emailverification() {
  const searchParams = useSearchParams();

  const [status, setStatus] = useState<string>("Verifying...");

 const emailVerification_path = process.env.NEXT_PUBLIC_EMAIL_VERIFICATION_PATH;
  const back_end_url = process.env.NEXT_PUBLIC_BACK_END_URL;

  useEffect(() => {
    const email = searchParams.get("email");
    const token = searchParams.get("token");

    const verifyEmail = async () => {

      
      const response = await fetch(`${back_end_url}${emailVerification_path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus("Email verified successfully ✅");
        console.log(data);
      } else {
        setStatus("Verification failed ❌");
        console.log(data);
      }
    };

    if (email && token) {
      verifyEmail();
    } else {
      console.log("Missing email or token in query parameters");
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        {/* Icon based on status */}
        {!status.includes("Verifying...") && (
          <>
            <div className="text-5xl mb-4">
              {status.includes("successfully") ? "✅" : "❌"}
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {status.includes("successfully")
                ? "Email Verified"
                : "Verification Failed"}
            </h1>
          </>
        )}

        {/* Status message */}
        <p className="text-gray-600 mb-6">{status}</p>

        {/* Action button */}
        <a
          href="/LogIn"
          className="block w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition"
        >
          Go to Login
        </a>

        {/* Extra help */}
        <p className="text-sm text-gray-500 mt-4">
          If something went wrong, you can request a new verification email.
        </p>
      </div>
    </div>
  );
}
