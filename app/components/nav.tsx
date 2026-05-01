"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Navigation() {
  const pathname = usePathname();

  const navigation = [
    { label: "Home", directory: "/Home" },
    { label: "Users", directory: "/Home/users" },
    { label: "Today Bookings", directory: "/Home/bookings/today" },
    { label: "Bookings", directory: "/Home/bookings" },
    { label: "Venues", directory: "/Home/venues" },
  ];

  return (
    <nav className="flex items-center justify-around w-full p-4 rounded-xl  ">
      {navigation.map((item) => {
        const isActive = pathname === item.directory;

        return (
          <Link
            key={item.directory}
            href={item.directory}
            className="relative px-3 py-2 font-medium transition "
          >
            <span
              className={`${
                isActive ? "text-green-400" : "text-black"
              } hover:text-gray-500`}
            >
              {item.label}
            </span>

            {/* Animated underline */}
            {isActive && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 bottom-0 h-[2px] w-full bg-green-400 rounded"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
