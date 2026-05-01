"use client";

// interfaces
import { ApiResponse } from "../utils/interfaces";
// helpers
import { getDateFromTimestamp, getTimeFromTimestamp } from "../helpers/methods";

import { useEffect, useState } from "react";
import Mycalender from "./Calender";
import ReservationComponent from "./reservationcomponent";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import Cookies from "universal-cookie";
// components
export default function Reservations() {
  const back_end_url = process.env.NEXT_PUBLIC_BACK_END_URL;
  const adminreservations_path =
    process.env.NEXT_PUBLIC_ADMIN_GET_RESERVATIONS_PATH;
  // loading
  const [loading, setLoading] = useState(true);
  // cookie
  const Cookie = new Cookies();
  // select date
  const [selecteddate, setselecteddate] = useState<Date | null>(null);
  const router = useRouter();
  // response data
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const init = async () => {
      const accessToken = Cookie.get("sportifyaccesstoken");
      console.log("TOKEN:", accessToken); // 🔍 debug
      if (!accessToken) {
        router.push("LogIn");
        return;
      }
      setLoading(true);
      // ✅ Now token is guaranteed
      try {
        const response = await axios.get(
          `${back_end_url}${adminreservations_path}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        console.log(response.data);
        setReservations(response.data);
      } catch (error: unknown) {
        const err = error as AxiosError;

        if (err?.response?.status === 401) {
          router.replace("/LogIn");
        } else {
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);
  // fake reservation
  const intialconfig: ApiResponse = {
    openingHours: { start: "01:00", end: "23:00" },
    slotDuration: 30,
    reservations: reservations,
  };

  const handleclickreservation = (id: string) => {
    router.push(`/Home/bookings/${id}`);
  };

  // filter reservation depend on court & date
  const filteredReservations = intialconfig.reservations.filter((r) => {
    if (!selecteddate) return false;

    const selectedDateStr = selecteddate.toLocaleDateString("en-CA");
    return getDateFromTimestamp(r.startTime) === selectedDateStr;
  });

  if (loading) {
    return (
      <div className="h-full flex justify-center items-center">
        <p>loading...</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-gradient-to-br from-gray-100 via-white to-gray-200">
      <div>
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
          {filteredReservations.length > 0 ? (
            filteredReservations.map((reserve) => (
              <ReservationComponent
                startTime={getTimeFromTimestamp(reserve.startTime)}
                endTime={getTimeFromTimestamp(reserve.endTime)}
                status={reserve.status}
                id={reserve.id}
                playerName={reserve.playerName}
                key={reserve.id}
                onClick={handleclickreservation}
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
