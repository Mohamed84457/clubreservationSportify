"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";
const mockCourts = [
  {
    id: 1,
    name: "Sample court",
    type: "5v5",
    price: 200,
    image: "/webImages/pexels-adempercem-35531301.jpg",
    location: "tanta",
  },
];

export default function BrowseCourts() {
  // route
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredCourts = mockCourts.filter((court) =>
    court.name.toLowerCase().includes(search.toLowerCase()),
  );

  //   handle click on book court
  const routingBookingCourtPage = () => {
    router.push("/website/BrowseCourts/1");
  };
  //   ===handle click on book court===

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Browse Courts</h1>
        <p className="text-gray-500">Find and book your favorite court</p>

        {/* Search */}
        <div className="mt-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courts..."
            className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourts.map((court) => (
          <div
            key={court.id}
            className="rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition group"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={court.image}
                alt={court.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center transform-gpu group-hover:scale-110 transition-transform duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Type */}
              <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs px-3 py-1 rounded-full">
                {court.type}
              </span>
            </div>

            {/* Content */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {court.name}
              </h2>

              <p className="text-sm text-gray-500">📍 {court.location}</p>

              <div className="mt-2 flex justify-between items-center">
                <span className="text-amber-600 font-bold">
                  {court.price} EGP / hour
                </span>

                <button
                  onClick={routingBookingCourtPage}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-lg text-sm transition cursor-pointer transform active:scale-95 active:translate-y-1"
                >
                  Book
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredCourts.length === 0 && (
        <div className="text-center mt-10 text-gray-500">No courts found</div>
      )}
    </div>
  );
}
