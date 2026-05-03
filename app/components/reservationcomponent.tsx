"use client";
import { timeToMinutes } from "../helpers/methods";
import { Ireservation } from "../utils/interfaces";
// props interface
interface Ipropsreservation extends Ireservation {
  onClick: (id: string) => void;
}

export default function ReservationComponent({
  id,
  startTime,
  endTime,
  status,
  playerName,
  onClick,
}: Ipropsreservation) {
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  const starth = Math.floor(startMinutes / 60);
  const startm = startMinutes % 60;

  const endh = Math.floor(endMinutes / 60);
  const endm = endMinutes % 60;

  const startPeriod = starth < 12 ? "AM" : "PM";
  const endPeriod = endh < 12 ? "AM" : "PM";

  const formattedStartHour = starth % 12 === 0 ? 12 : starth % 12;
  const formattedEndHour = endh % 12 === 0 ? 12 : endh % 12;

  const finalstartTime = `${String(formattedStartHour).padStart(2, "0")}:${String(
    startm,
  ).padStart(2, "0")}`;

  const finalendTime = `${String(formattedEndHour).padStart(2, "0")}:${String(
    endm,
  ).padStart(2, "0")}`;

  const isBooked = status?.toLowerCase() === "confirmed";
  const iscancelled = status?.toLowerCase() === "cancelled";
  const isMaintenance = status?.toLowerCase() === "maintenance";

  return (
    <div
      onClick={() => {
        onClick(id);
      }}
      className="bg-white cursor-pointer border border-gray-200 rounded-2xl p-4 m-3 shadow-sm hover:shadow-md hover:border-green-600 transition-all duration-200 active:scale-90 active:translate-y-1.5"
    >
      {/* Top Row */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-gray-800">Court #</h2>

        <span
          className={`px-3 py-1 text-sm rounded-full font-medium ${
            isBooked
              ? "bg-green-100 text-green-600"
              : iscancelled
                ? "bg-amber-100 text-amber-700"
                : isMaintenance
                  ? "bg-yellow-100 text-red-700"
                  : "bg-gray-100 text-gray-500"
          }`}
        >
          {isBooked ? "Booked" : iscancelled ? "Cancelled" : isMaintenance ? "Maintenance" : "Pending"}
        </span>
      </div>

      {/* Time */}
      <div className="flex items-center gap-2 text-gray-700 mb-2">
        ⏰
        <span className="font-medium">
          {finalstartTime} {startPeriod} - {finalendTime} {endPeriod}
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200 my-2"></div>

      {/* User Info */}
      {isBooked ? (
        <div className="space-y-1 text-gray-700">
          <p>
            👤 <span className="font-medium">{playerName}</span>
          </p>
        </div>
      ) : (
        <p className="text-gray-400 italic">Available</p>
      )}
    </div>
  );
}
