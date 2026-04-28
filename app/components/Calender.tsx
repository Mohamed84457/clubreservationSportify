"use client";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
type Value = Date | null;
export default function Mycalender({
  onchagedate,
  selecteddate,
}: {
  onchagedate: (value: Value) => void;
  selecteddate: Value;
}) {
  // selected date
  return (
    <div className="p-5 bg-white rounded-2xl  w-full md:w-fit flex items-center justify-center ">
      <Calendar
        className="custom-calendar w-full"
        onChange={(value) => {
          onchagedate(value as Date);
        }}
        value={selecteddate as Date}
        tileClassName={({ date }) => {
          const today = new Date();
          const isToday = date.toDateString() === today.toDateString();

          return isToday
            ? "bg-blue-100 text-blue-600 font-semibold rounded-lg"
            : "";
          
        }}
      />
    </div>
  );
}
