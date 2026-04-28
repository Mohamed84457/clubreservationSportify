"use client";

import LocationOnIcon from "@mui/icons-material/LocationOn";

interface ICourtView {
  courtId: string;
  courtImg: string;
  courtType: string;
  courtName: string;
  courtLocation: string;
  courtPriceHour: number;
}

export default function CourtView({
  courtId = "1",
  courtImg = "/webImages/pexels-adempercem-35531301.jpg",
  courtType = "Football",
  courtName = "Elite Stadium",
  courtLocation = "Tanta",
  courtPriceHour = 30,
}: ICourtView) {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={courtImg}
          alt={courtName}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center transform-gpu will-change-transform group-hover:scale-110 transition-transform duration-500"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Type badge */}
        <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
          {courtType}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3">
        {/* Name */}
        <h2 className="font-bold text-lg text-gray-800">{courtName}</h2>

        {/* Location */}
        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <LocationOnIcon className="!text-base" />
          <span>{courtLocation}</span>
        </div>

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-2">
          {/* Price */}
          <div>
            <p className="text-xl font-extrabold text-emerald-600">
              ${courtPriceHour}
            </p>
            <span className="text-xs text-gray-400">per hour</span>
          </div>

          {/* Button */}
          <button className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-amber-500 transition">
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
