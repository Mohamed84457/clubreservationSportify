"use client";

// mui icons
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BoltIcon from "@mui/icons-material/Bolt";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import Link from "next/link";

const stats = [
  { num: "2.4k", label: "Courts worldwide" },
  { num: "98%", label: "Uptime SLA" },
  { num: "14s", label: "Avg. booking time" },
];

const features = [
  {
    icon: <CalendarMonthIcon className="text-gray-400" />,
    title: "Real-time availability",
    desc: "Live court schedules updated to the minute. No double bookings, no surprises.",
  },
  {
    icon: <BoltIcon className="text-yellow-600" />,
    title: "Instant confirmation",
    desc: "Book in seconds. Receive a QR code immediately — no waiting for approval.",
  },
  {
    icon: <EmojiEventsIcon className="text-yellow-400" />,
    title: "Elite facilities only",
    desc: "Every court is vetted for surface quality, lighting, and amenities before listing.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#090f08] text-on-background font-inter overflow-x-hidden">
      {/* Animated grid background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(75,226,119,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(75,226,119,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          animation: "gridMove 20s linear infinite",
        }}
      />
      {/* Radial glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 pointer-events-none z-0"
        style={{
          width: "800px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(75,226,119,0.12) 0%, transparent 65%)",
        }}
      />

      <style>{`
        @keyframes gridMove { from { background-position: 0 0; } to { background-position: 0 48px; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .fade-up { animation: fadeUp 0.7s ease both; }
        .badge-dot { animation: blink 1.5s ease-in-out infinite; }
        .btn-primary-hero {
          padding: 16px 40px; border-radius: 50px; background: #22c55e; color: #003915;
          border: none; font-family: inherit; font-size: 16px; font-weight: 700;
          cursor: pointer; transition: all 0.25s; letter-spacing: 0.02em;
          box-shadow: 0 0 32px rgba(34,197,94,0.35);
        }
        .btn-primary-hero:hover { background: #4be277; transform: scale(1.04); box-shadow: 0 0 48px rgba(75,226,119,0.5); }
        .btn-primary-hero:active { transform: scale(0.97); }
        .btn-ghost-hero {
          padding: 15px 38px; border-radius: 50px; border: 1px solid #3d4a3d;
          background: black; color: #dce5d9;
          font-family: inherit; font-size: 16px; font-weight: 600;
          cursor: pointer; transition: all 0.25s;
        }
        .btn-ghost-hero:hover { background: #1a221a; border-color: #bccbb9; color: #fff; transform: scale(1.02); }
        .feature-card:hover { background: #1a221a !important; }
        .stat-item:hover { background: rgba(36,44,36,0.8) !important; }
      `}</style>

      {/* ── HERO ── */}
      <section className="relative z-5 flex flex-col items-center text-center px-6 pt-28 pb-20">
        {/* Badge */}
        <div
          className="fade-up inline-flex items-center gap-2 mb-10 px-5 py-2 rounded-full border text-primary text-xs font-bold uppercase tracking-widest"
          style={{
            background: "rgba(75,226,119,0.08)",
            borderColor: "rgba(75,226,119,0.2)",
            animationDelay: "0.1s",
          }}
        >
          <span className="badge-dot w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
          <span className="text-green-400">Now booking premium courts</span>
        </div>

        {/* Headline */}
        <h1
          className="fade-up font-lexend font-black text-gray-700 leading-none tracking-tighter mb-7"
          style={{
            fontSize: "clamp(52px, 8vw, 96px)",
            letterSpacing: "-0.04em",
            animationDelay: "0.15s",
          }}
        >
          <span className="text-green-700">Book</span> the court.
          <br />
          <span className="text-primary">
            <span className="text-green-700">Own</span> the game.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="fade-up text-on-surface-variant max-w-xl mb-14 leading-relaxed text-gray-400"
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            animationDelay: "0.25s",
          }}
        >
          Court Curator connects athletes and facility managers through a
          seamless, elite-grade booking platform. Find, reserve, and play — in
          seconds.
        </p>

        {/* CTAs */}
        <div
          className="fade-up flex gap-4 flex-wrap justify-center"
          style={{ animationDelay: "0.35s" }}
        >
          <Link href="/Register">
            <button className="btn-primary-hero">Create free account</button>
          </Link>
          <Link href="/LogIn">
            <button className="btn-ghost-hero ">Sign in</button>
          </Link>
        </div>

        {/* Court card illustration */}
        <div
          className="fade-up relative w-full max-w-2xl mt-16 rounded-2xl overflow-hidden border border-outline-variant"
          style={{ animationDelay: "0.45s" }}
        >
          <svg
            viewBox="0 0 680 260"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full block"
          >
            <rect width="680" height="260" fill="#161d16" />
            <rect
              x="80"
              y="30"
              width="520"
              height="200"
              rx="4"
              fill="none"
              stroke="#3d4a3d"
              strokeWidth="1.5"
            />
            <line
              x1="340"
              y1="30"
              x2="340"
              y2="230"
              stroke="#3d4a3d"
              strokeWidth="1.5"
            />
            <rect
              x="140"
              y="30"
              width="400"
              height="200"
              fill="none"
              stroke="#2f372e"
              strokeWidth="1"
            />
            <rect
              x="200"
              y="80"
              width="120"
              height="100"
              fill="none"
              stroke="#2f372e"
              strokeWidth="1"
            />
            <rect
              x="360"
              y="80"
              width="120"
              height="100"
              fill="none"
              stroke="#2f372e"
              strokeWidth="1"
            />
            <line
              x1="80"
              y1="130"
              x2="600"
              y2="130"
              stroke="#3d4a3d"
              strokeWidth="1.5"
            />
            <line
              x1="340"
              y1="50"
              x2="340"
              y2="210"
              stroke="#4be277"
              strokeWidth="2.5"
              strokeDasharray="4 3"
              opacity="0.7"
            />
            <rect
              x="420"
              y="50"
              width="220"
              height="160"
              rx="12"
              fill="#1a221a"
              stroke="#3d4a3d"
              strokeWidth="1"
            />
            <rect
              x="420"
              y="50"
              width="220"
              height="40"
              rx="12"
              fill="#242c24"
            />
            <rect x="420" y="78" width="220" height="12" fill="#242c24" />
            <text
              x="440"
              y="76"
              fontFamily="Inter,sans-serif"
              fontSize="13"
              fontWeight="600"
              fill="#dce5d9"
            >
              Centre Court A1
            </text>
            <text
              x="440"
              y="106"
              fontFamily="Inter,sans-serif"
              fontSize="11"
              fill="#869585"
            >
              Available
            </text>
            <circle cx="502" cy="103" r="4" fill="#4be277" />
            <text
              x="440"
              y="128"
              fontFamily="Inter,sans-serif"
              fontSize="11"
              fill="#869585"
            >
              10:00 – 11:30
            </text>
            <text
              x="440"
              y="148"
              fontFamily="Inter,sans-serif"
              fontSize="11"
              fill="#869585"
            >
              Surface: Clay
            </text>
            <rect
              x="436"
              y="162"
              width="96"
              height="30"
              rx="8"
              fill="#22c55e"
            />
            <text
              x="484"
              y="181"
              fontFamily="Inter,sans-serif"
              fontSize="12"
              fontWeight="700"
              fill="#003915"
              textAnchor="middle"
            >
              Book Now
            </text>
            <circle
              cx="538"
              cy="177"
              r="12"
              fill="#2f372e"
              stroke="#3d4a3d"
              strokeWidth="1"
            />
            <text
              x="538"
              y="181"
              fontFamily="Inter,sans-serif"
              fontSize="9"
              fill="#bccbb9"
              textAnchor="middle"
            >
              +4
            </text>
            <rect
              x="44"
              y="70"
              width="58"
              height="28"
              rx="8"
              fill="#242c24"
              stroke="#3d4a3d"
              strokeWidth="1"
            />
            <text
              x="73"
              y="88"
              fontFamily="Inter,sans-serif"
              fontSize="10"
              fontWeight="600"
              fill="#4be277"
              textAnchor="middle"
            >
              8 open
            </text>
            <rect
              x="44"
              y="108"
              width="58"
              height="28"
              rx="8"
              fill="#242c24"
              stroke="#3d4a3d"
              strokeWidth="1"
            />
            <text
              x="73"
              y="126"
              fontFamily="Inter,sans-serif"
              fontSize="10"
              fill="#bccbb9"
              textAnchor="middle"
            >
              Today
            </text>
          </svg>
        </div>

        {/* Stats */}
        <div
          className="fade-up flex w-full max-w-2xl mt-8 rounded-2xl overflow-hidden border border-outline-variant"
          style={{
            background: "rgba(26,34,26,0.6)",
            backdropFilter: "blur(12px)",
            animationDelay: "0.5s",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="stat-item flex-1 py-7 text-center transition-colors"
              style={{
                borderRight:
                  i < stats.length - 1 ? "1px solid #3d4a3d" : "none",
              }}
            >
              <div className="font-lexend font-black text-white text-3xl tracking-tight mb-1">
                {s.num.replace(/[k%s]/, "")}
                <span className="text-primary">
                  {s.num.match(/[k%s]/)?.[0]}
                </span>
              </div>
              <div className="text-on-surface-variant text-sm font-medium  text-green-200 opacity-60">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <div className="relative z-5 mx-12 mt-24 rounded-2xl overflow-hidden border border-outline-variant grid grid-cols-1 md:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="feature-card bg-[#090f08] p-10 border-r border-outline-variant last:border-r-0 transition-colors cursor-default"
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 border border-primary/20"
              style={{ background: "rgba(75,226,119,0.1)" }}
            >
              <span
                className="material-symbols-outlined text-primary"
                style={{ fontSize: "20px" }}
              >
                {f.icon}
              </span>
            </div>
            <h3 className="font-lexend font-bold text-white text-base mb-2.5 tracking-tight">
              {f.title}
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed text-green-200 opacity-60">
              {f.desc}
            </p>
          </div>
        ))}
      </div>

      {/* ── BOTTOM CTA ── */}
      <div className="relative z-5 text-center px-6 py-24">
        <h2
          className="font-lexend font-black text-white tracking-tighter mb-4"
          style={{ fontSize: "clamp(32px,5vw,56px)" }}
        >
          Ready to play?
        </h2>
        <p className="text-on-surface-variant text-lg mb-10  text-green-200 opacity-60">
          Join thousands of athletes already booking smarter.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/Register">
            <button className="btn-primary-hero">Create free account</button>
          </Link>
          <Link href="/LogIn">
            <button className="btn-ghost-hero">
              Sign in to existing account
            </button>
          </Link>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="relative z-5 border-t border-outline-variant px-12 py-7 flex justify-between items-center flex-wrap gap-4">
        <span className="font-lexend font-black italic text-white text-base">
          Sportify
        </span>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Support"].map((l) => (
            <a
              key={l}
              href="#"
              className="text-on-surface-variant  text-green-200 opacity-60 hover:text-primary transition-colors text-sm"
            >
              {l}
            </a>
          ))}
        </div>
        <span className="text-on-surface-variant text-sm  text-green-200 opacity-60">
          © 2026 Court Curator
        </span>
      </footer>
    </div>
  );
}
