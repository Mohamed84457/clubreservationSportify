"use client";
// mui
import { SelectChangeEvent } from "@mui/material/Select";

import { useState } from "react";
import { ApiResponse } from "../utils/interfaces";
import Mycalender from "./Calender";
import ReservationComponent from "./reservationcomponent";
import { useRouter } from "next/navigation";
// components
import SelectList from "./selectList";
export default function Reservations() {
  // court select
  const [selectedCourt, setSelectedCourt] = useState<string>("");
  // handle change court
  const handleCourtChange = (event: SelectChangeEvent) =>
    setSelectedCourt(event.target.value);
  const [selecteddate, setselecteddate] = useState<Date | null>(null);
  const router = useRouter();
  // fake courts
  const courts = [
    { key: "1", label: "court 1" },
    { key: "2", label: "court 2" },
    { key: "3", label: "court 3" },
    { key: "4", label: "court 4" },
  ];
  // fake reservation
  const apiData: ApiResponse = {
    date: "2026-04-20",
    openingHours: { start: "10:00", end: "23:00" },
    slotDuration: 30,
    reservations: [
      {
        id: "1",
        startTime: "10:00",
        endTime: "11:30",
        state: "Maintained",
        courtId: 1,
        name: "",
        phoneNUmber: "",
      },
      {
        id: "2",
        startTime: "15:00",
        endTime: "16:00",
        state: "Booked",
        courtId: 2,
        name: "medo",
        phoneNUmber: "0129738",
      },
      {
        id: "3",
        startTime: "15:00",
        endTime: "16:00",
        state: "Booked",
        courtId: 2,
        name: "medo",
        phoneNUmber: "0129738",
      },
    ],
  };

  const handleclickreservation = (id: string) => {
    router.push(`/Home/bookings/${id}`);
  };

  // filter reservation depend on court & date
  const filteredReservations = apiData.reservations.filter((r) => {
    if (!selectedCourt || !selecteddate) return false;

    const selectedDateStr = selecteddate.toLocaleDateString("en-CA");
    return (
      r.courtId === Number(selectedCourt) && apiData.date === selectedDateStr
    );
  });
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-gradient-to-br from-gray-100 via-white to-gray-200">
      <div>
        {/* court */}
        <div className="flex flex-col gap-3">
          <SelectList
            court={selectedCourt}
            handleChange={handleCourtChange}
            items={courts}
          />
          <p className="font-semibold text-gray-700 mb-4 font-light">
            Court:
            <span
              className={`ml-2 ${selectedCourt ? "text-green-600" : "text-gray-400"}`}
            >
              {selectedCourt
                ? courts.find((c) => c.key === selectedCourt)?.label
                : "select court"}
            </span>
            {/* here must request court name by court id */}
          </p>
        </div>
        {/* ===court=== */}
        {/* Calendar */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <Mycalender
            onchagedate={setselecteddate}
            selecteddate={selecteddate}
          />
        </div>
      </div>

      {/* Reservations */}
      <div className="bg-white p-4 rounded-2xl shadow md:sticky md:top-6 h-fit">
        <p className="font-semibold text-gray-700 mb-4">
          Date:
          <span
            className={`ml-2  ${selecteddate ? "text-green-600" : "text-gray-500 font-light"}`}
          >
            {selecteddate ? selecteddate.toDateString() : "Select a date"}
          </span>
        </p>

        <div className="flex flex-col gap-3">
          {!selectedCourt ? (
            <p className="text-gray-500">please select court first</p>
          ) : filteredReservations.length > 0 ? (
            filteredReservations.map((reserve) => (
              <ReservationComponent
                key={reserve.id}
                onClick={handleclickreservation}
                {...reserve}
              />
            ))
          ) : (
            <p className="text-gray-400 text-sm">
              No reservations for this date
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
