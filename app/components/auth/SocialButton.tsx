"use client";

import { ButtonHTMLAttributes } from "react";

interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  provider: "google" | "facebook" | "apple";
}

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 5.04c1.94 0 3.68.67 5.05 1.97l3.77-3.77C18.53 1.25 15.51 0 12 0 7.31 0 3.25 2.7 1.21 6.64l4.24 3.28C6.46 7.15 9.02 5.04 12 5.04z"
      fill="#EA4335"
    />
    <path
      d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.76 2.91c2.2-2.02 3.66-4.99 3.66-8.73z"
      fill="#4285F4"
    />
    <path
      d="M5.45 14.36c-.14-.42-.23-.88-.23-1.36s.09-.94.23-1.36L1.21 8.36C.44 10.01 0 11.83 0 13.73s.44 3.72 1.21 5.37l4.24-3.74z"
      fill="#FBBC05"
    />
    <path
      d="M12 24c3.24 0 5.97-1.07 7.96-2.91l-3.76-2.91c-1.1.74-2.51 1.18-4.2 1.18-3.13 0-5.78-2.11-6.73-4.96l-4.24 3.3C3.25 21.3 7.31 24 12 24z"
      fill="#34A853"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const AppleIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M16.365 1.43c0 1.14-.465 2.235-1.27 3.04-.82.82-2.13 1.45-3.29 1.36-.14-1.11.44-2.29 1.23-3.1.82-.84 2.24-1.47 3.33-1.3zm3.26 16.11c-.69 1.58-1.53 3.16-2.77 3.19-1.18.03-1.56-.7-2.92-.7-1.36 0-1.79.68-2.9.72-1.2.05-2.11-1.21-2.8-2.79-1.4-3.22-2.47-9.1 1.46-11.37 1.95-1.13 3.63-.93 4.86-.03 1.2-.9 2.97-1.09 4.91-.03.8.46 3.04 2.66 2.1 5.54-.08.24-1.53.9-1.5 3.46.04 3.02 2.65 4.03 2.68 4.05-.03.07-.43 1.47-1.12 2.96z"/>
  </svg>
);

const providerConfig = {
  google: { label: "Google", Icon: GoogleIcon },
  facebook: { label: "Facebook", Icon: FacebookIcon },
  apple: { label: "Apple", Icon: AppleIcon },
};

export default function SocialButton({ provider, ...props }: SocialButtonProps) {
  const { label, Icon } = providerConfig[provider];

  return (
    <button
      type="button"
      className="flex items-center justify-center gap-3 bg-surface-container-high border border-outline-variant rounded-xl py-3 hover:bg-surface-variant active:scale-95 transition-all duration-200 cursor-pointer"
      aria-label={`Continue with ${label}`}
      {...props}
    >
      <Icon />
      <span className="text-on-surface font-medium" style={{ fontSize: "14px" }}>
        {label}
      </span>
    </button>
  );
}
