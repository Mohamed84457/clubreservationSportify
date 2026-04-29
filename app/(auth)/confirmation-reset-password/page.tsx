"use client";

export default function ConfirmationEmail() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        {/* Icon */}
        <div className="text-green-500 text-5xl mb-4">📧</div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Check Your Email
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          We’ve sent you a reset password link. Please check your inbox and
          click the link to Follow-up of procedures.
        </p>

        {/* Open Gmail Button */}
        <a
          href="https://mail.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition"
        >
          Open Gmail
        </a>

        {/* Extra help */}
        <p className="text-sm text-gray-500 mt-4">
          Didn’t receive the email? Check your spam folder or try again.
        </p>
      </div>
    </div>
  );
}
