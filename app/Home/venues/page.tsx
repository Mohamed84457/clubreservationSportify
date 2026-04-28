"use client";
import { useState } from "react";
// components
import Slots from "../../components/Slots";
import Mycalender from "../../components/Calender";
import Slotcatalog from "../../components/Slotcatalog";
// emuns
import { typeUsingSlots } from "@/app/utils/enums";

import Link from "next/link";

export default function Venus() {
  const [date, setDate] = useState<Date | null>(new Date());

  
  const changeSelectedDate = (value: Date | null) => setDate(value);

  
  return (
    <div className="min-h-screen rounded bg-gradient-to-br from-gray-100 via-white to-gray-200 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10">
        {/* Breadcrumb */}
        <div className="mb-3 text-sm text-gray-500 flex items-center gap-2 hidden md:flex">
          <Link href="/Home" className="hover:text-green-500 transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-green-500 font-medium">Venus</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Book Your Slot
        </h1>

        <p className="text-gray-500 mt-2">
          Choose your preferred court and schedule
        </p>
      </div>

      {/* Main Layout */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT SIDE */}
        <div className="lg:col-span-4 flex flex-col gap-5">
         

          {/* Calendar */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow ">
            <p className="text-sm font-medium text-gray-600 mb-3">
              Select Date
            </p>
            <Mycalender onchagedate={changeSelectedDate} selecteddate={date} />
          </div>

          {/* Slot Legend */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <p className="text-sm font-medium text-gray-600 mb-3">
              Slot Status
            </p>
            <Slotcatalog />
          </div>
        </div>

        {/* RIGHT SIDE (Slots) */}
        <div className="bg-white lg:col-span-8  rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition-shadow">
          <Slots
            selecteddate={date}
            typeusing={typeUsingSlots.admin}
          />
        </div>
      </main>
    </div>
  );
}
