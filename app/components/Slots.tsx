"use client";
// emuns
import { typeUsingSlots } from "../utils/enums";
import { useState } from "react";
// helpers
import { timeToMinutes, minutesToAmPm } from "../helpers/methods";
// interfaces
import { ApiResponse } from "../utils/interfaces";
// components
import { buildSlots } from "./Buildingslot";
import Slot from "./Slot";
// mui icons
import BuildIcon from "@mui/icons-material/Build";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
export default function Slots({
  typeusing = typeUsingSlots.user,
  selecteddate,
}: {
  selecteddate: Date | null;
  typeusing: typeUsingSlots;
}) {
  const [selectedSlot, setSelectedSlot] = useState<string[]>([]);

  const times = selectedSlot.map(timeToMinutes);
  const minTime = times.length ? Math.min(...times) : null;
  const maxTime = times.length ? Math.max(...times) : null;

  const mintimeampm = minutesToAmPm(minTime!).replace(" ", " ");

  const maxtimeampm = minutesToAmPm(maxTime! + 30);

  const handleSelectedSlot = (slotTime: string) => {
    setSelectedSlot((prev) => {
      const newTime = timeToMinutes(slotTime);
      const times = prev.map(timeToMinutes);
      const minTime = Math.min(...times);
      const maxTime = Math.max(...times);

      // 🔴 REMOVE
      if (prev.includes(slotTime)) {
        if (newTime === minTime || newTime === maxTime) {
          return prev.filter((slot) => slot !== slotTime);
        }
        return prev;
      }

      // 🟢 ADD
      if (prev.length === 0) return [slotTime];
      if (newTime === maxTime + 30) return [...prev, slotTime];
      if (newTime === minTime - 30) return [slotTime, ...prev];

      return prev;
    });
  };

  const isSelected = (slotTime: string) => selectedSlot.includes(slotTime);

  // handel click confirm button
  const handleconfirmselection = (type: string) => {
    console.log("reservation", {
      
      Date: selecteddate,
      state: type,
      StartTime: mintimeampm,
      EndTime: maxtimeampm,
    });
  };
  // Mock API
  const apiData: ApiResponse = {
    date: "2026-03-20",
    openingHours: { start: "10:00", end: "23:00" },
    slotDuration: 30,
    reservations: [
      {
        id: "1",
        startTime: "10:00",
        endTime: "11:30",
        state: "Maintained",
        courtId: 1,
        name: "medo",
        phoneNUmber: "0129738",
      },
      {
        id: "2",
        startTime: "15:00",
        endTime: "16:00",
        state: "Booked",
        courtId: 1,
        name: "medo",
        phoneNUmber: "0129738",
      },
    ],
  };

  const slots = buildSlots(apiData);
  
  return (
    <div className="min-h-screen p-4 md:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-1">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          {selecteddate ? selecteddate.toDateString() : "Select a date"}
        </h2>

        <p className="text-sm text-gray-500">
          Choose your time range (30 min slots)
        </p>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-3" />
      </div>
      {/* Slots Grid */}
      {slots.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-400">
          <p>No available slots</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-600">Available Slots</p>
            <p className="text-xs text-gray-400">{slots.length} slots</p>
          </div>
          <div className="transition-all duration-300 ease-in-out">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-3">
              {slots.map((slot) => (
                <Slot
                  key={slot.id}
                  time={slot.time}
                  isavailable={slot.available}
                  isselected={isSelected(slot.time)}
                  state={slot.state}
                  onClick={() =>
                    slot.available && handleSelectedSlot(slot.time)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Bottom Sticky Summary */}
      <div className="sticky bottom-4 z-50">
        <div
          className="bg-zinc-800/90 backdrop-blur-lg border border-zinc-700 
  rounded-2xl p-4 shadow-xl"
        >
          {/* Container */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Time Info */}
            <div>
              {selectedSlot.length === 0 ? (
                <p className="text-gray-400 text-sm">No slot selected</p>
              ) : (
                <div>
                  <p className="text-sm text-gray-400">Selected Time</p>
                  <p className="font-semibold text-lg text-green-400 flex items-center gap-1.5">
                    <span>{mintimeampm}</span>
                    <span>- {maxtimeampm}</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    Total:
                    <span className="text-green-400">
                      {" "}
                      {selectedSlot.length * 50}
                    </span>{" "}
                    EGP
                  </p>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              {/* Confirm */}
              <button
                onClick={() => {
                  handleconfirmselection("booking");
                }}
                disabled={
                    !selecteddate || selectedSlot.length === 0
                }
                className="flex-1 md:flex-none 
          bg-green-500 hover:bg-green-600 
          disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed
          disabled:hover:shadow-none disabled:hover:translate-y-0
          text-white font-semibold py-2.5 px-4 rounded-xl shadow-md 
          transition-all duration-200 active:scale-95 
          flex items-center justify-center gap-2 
          hover:shadow-lg hover:-translate-y-0.5"
              >
                <CheckCircleIcon fontSize="small" />
                Confirm
              </button>

              {/* Maintenance */}
              {typeusing === typeUsingSlots.admin && (
                <button
                  onClick={() => {
                    handleconfirmselection("maintance");
                  }}
                  disabled={selectedSlot.length === 0}
                  className="flex-1 md:flex-none 
          bg-red-500 hover:bg-red-600 
          disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed
          text-white font-semibold py-2.5 px-4 rounded-xl shadow-md 
          transition-all duration-200 active:scale-95 
          flex items-center justify-center gap-2 
          hover:shadow-lg hover:-translate-y-0.5"
                >
                  <BuildIcon fontSize="small" />
                  Maintenance
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
