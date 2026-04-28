"use client"
import Link from "next/link";
// interfaces
import { Inavigation } from "../utils/interfaces";

import { usePathname } from "next/navigation";

export default function Navigation() {
  // pathname to highlight page
  const pathname = usePathname();
  // navigations
  const navigation: Inavigation[] = [
    {
      label: "Home",
      directory: "/Home",
    },
    {
      label: "Bookings",
      directory: "/Home/bookings",
    },
    {
      label: "Venues",
      directory: "/Home/venues",
    },
  ];

  return (
    <nav className="flex items-center justify-around w-full h-full  p-4 rounded-xl">
      {navigation.map((item) => (
        <Link
          key={item.directory}
          href={item.directory}
          className={`text-gray-900 hover:text-gray-700 transition duration-200 font-medium ${
            pathname === item.directory
              ? "text-green-400"
              : "text-gray-300 hover:text-gray-700"
          }`}
        >
          {item.label}
          <hr />
        </Link>
      ))}
    </nav>
  );
}
