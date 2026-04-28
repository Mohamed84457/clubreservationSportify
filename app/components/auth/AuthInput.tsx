"use client";
// mui cions
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { InputHTMLAttributes, forwardRef, useState } from "react";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: string;
  error?: string;
  rightElement?: React.ReactNode;
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, icon, error, rightElement, id, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-none tracking-wide text-on-surface-variant ml-1"
          style={{ fontSize: "14px", letterSpacing: "0.01em" }}
        >
          {label}
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            {id == "registerpassword" ? (
              ""
            ) : (
              <span
                className="material-symbols-outlined text-outline group-focus-within:text-primary transition-colors duration-200 text-green-600"
                style={{ fontSize: "20px" }}
              >
                {icon}
              </span>
            )}
          </div>
          <input
            ref={ref}
            id={id}
            className={`
              w-full bg-surface-container-high border rounded-xl py-4 ${id=="registerpassword"?"pl-4":"pl-18"} text-on-surface
              placeholder:text-on-surface-variant/40 font-inter text-base
              transition-all duration-200 glow-focus
              ${rightElement ? "pr-12" : "pr-4"}
              ${
                error
                  ? "border-red-500 focus:ring-red-500/20"
                  : "border-outline-variant"
              }
            `}
            {...props}
          />
          {rightElement && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              {rightElement}
            </div>
          )}
        </div>
        {error && (
          <p className="text-error text-xs ml-1 mt-1 flex items-center gap-1">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "14px" }}
            >
              error
            </span>
            {error}
          </p>
        )}
      </div>
    );
  },
);

AuthInput.displayName = "AuthInput";

export default AuthInput;

// Password input with toggle
export function PasswordInput({
  label,
  id,
  error,
  ...props
}: Omit<AuthInputProps, "icon" | "type" | "rightElement">) {
  const [show, setShow] = useState(false);

  return (
    <AuthInput
      id={id}
      label={label}
      icon={id == "registerpassword" ? "" : "lock"}
      type={show ? "text" : "password"}
      error={error}
      rightElement={
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="text-outline hover:text-on-surface transition-colors"
          aria-label={show ? "Hide password" : "Show password"}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "20px" }}
          >
            {show ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
          </span>
        </button>
      }
      {...props}
    />
  );
}
