"use client";
// import { FaFutbol, FaClock, FaCheckCircle } from "react-icons/fa";
// mui icons
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DoneIcon from "@mui/icons-material/Done";
type Step = {
  label: string;
  text: string;
  icon: React.ReactNode;
};

const steps: Step[] = [
  {
    label: "Choose Court",
    text: "Browse through our curated selection of high-end football facilities near you.",
    icon: <SearchIcon />,
  },
  {
    label: "Select Time",
    text: "Check real-time availability and pick a slot that fits your schedule perfectly.",
    icon: <CalendarMonthIcon />,
  },
  {
    label: "Confirm Booking",
    text: "Secure your booking with instant confirmation and digital entry codes sent to your phone.",
    icon: <DoneIcon />,
  },
];

export default function SimpleFlow() {
  return (
    <div className="w-full mt-20">
      {/* Header */}
      <div className="mb-16 max-w-xl">
        <p className="text-amber-500 font-semibold tracking-widest text-xs">
          SIMPLE FLOW
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold leading-snug">
          Book your court in{" "}
          <span className="text-amber-500">3 simple steps</span>
        </h1>
      </div>

      {/* Timeline */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Line */}
        <div className="hidden md:block absolute top-8 left-[5%] right-[5%] h-[2px] bg-gradient-to-r from-amber-500 via-amber-200 to-amber-500 z-0" />

        {steps.map((step, index) => (
          <div
            key={step.label}
            className="relative z-10 p-6 rounded-3xl bg-gradient-to-br from-white to-gray-50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] cursor-pointer"
          >
            {/* Number */}
            <div className="absolute -top-4 left-5 w-11 h-11 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold shadow-md">
              {index + 1}
            </div>

            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center text-white text-2xl mb-4 shadow-lg">
              {step.icon}
            </div>

            {/* Title */}
            <h2 className="font-bold text-lg mb-2">{step.label}</h2>

            {/* Text */}
            <p className="text-gray-500 text-sm leading-relaxed">{step.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
