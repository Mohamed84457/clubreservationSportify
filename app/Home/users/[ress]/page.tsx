"use client";

import ReservationComponent from "@/app/components/reservationcomponent";
import { getTimeFromTimestamp } from "@/app/helpers/methods";
import { Ireservation } from "@/app/utils/interfaces";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import Cookies from "universal-cookie";
// mui icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


interface IRess {
  params: Promise<{ ress: string }>;
}

export default function Ress({ params }: IRess) {
  const backend_url = process.env.NEXT_PUBLIC_BACK_END_URL;
  const getreservationsuser_url =
    process.env.NEXT_PUBLIC_GET_RESERVATION_SPESIFIC_USER_PATH;

  const {ress} = use(params);

  const [userReservations, setUserReservations] = useState<Ireservation[]>([]);
  const [loading, setLoading] = useState(true);

  const Cookie = new Cookies();
  const router = useRouter();

  const handleclickreservation = (id: string) => {
    router.push(`/Home/bookings/${id}`);
  };

  useEffect(() => {
    const getReservationsSpecificUser = async () => {
      const accessToken = Cookie.get("sportifyaccesstoken");

      if (!accessToken) {
        router.replace("/LogIn");
        return;
      }

      try {
        const response = await axios.get(
          `${backend_url}${getreservationsuser_url}${ress}/reservations`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        setUserReservations(response.data);
      } catch (error: unknown) {
        const err = error as AxiosError;
        if (err.response?.status === 401) {
          router.replace("/LogIn");
        } else {
          console.log(err);
        }
      } finally {
        setLoading(false);
      }
    };

    getReservationsSpecificUser();
  }, [ress]);

  // ✅ Group reservations by date
  const grouped = userReservations.reduce(
    (acc, res) => {
      const date = new Date(res.startTime).toDateString();

      if (!acc[date]) acc[date] = [];
      acc[date].push(res);

      return acc;
    },
    {} as Record<string, Ireservation[]>,
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
          {/* Back Button */}
      <button
        onClick={() => {
          router.back();
        }}
        className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white shadow hover:shadow-md rounded-xl transition"
      >
        <ArrowBackIcon />
        <span>Back</span>
      </button>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 🔵 Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Reservations</h1>

          <span className="text-sm text-gray-500">
            {userReservations.length} bookings
          </span>
        </div>

        {/* 🔄 Loading */}
        {loading && (
          <div className="flex justify-center py-10">
            <div className="animate-spin h-10 w-10 border-t-2 border-blue-500 rounded-full"></div>
          </div>
        )}

        {/* ❌ Empty State */}
        {!loading && userReservations.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border">
            <p className="text-gray-400 text-lg font-medium">
              No reservations yet
            </p>
            <p className="text-gray-300 text-sm mt-2">
              Your bookings will appear here
            </p>
          </div>
        )}

        {/* ✅ Grouped Reservations */}
        {!loading && userReservations.length > 0 && (
          <div className="space-y-6">
            {Object.entries(grouped).map(([date, reservations]) => (
              <div key={date} className="space-y-3">
                {/* 📅 Date */}
                <h2 className="text-sm font-semibold text-gray-500">{date}</h2>

                {/* 🧾 Reservations */}
                {reservations.map((reserve) => (
                  <div
                    key={reserve.id}
                    onClick={() => handleclickreservation(reserve.id)}
                    className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition cursor-pointer border"
                  >
                    <ReservationComponent
                      startTime={getTimeFromTimestamp(reserve.startTime)}
                      endTime={getTimeFromTimestamp(reserve.endTime)}
                      status={reserve.status}
                      id={reserve.id}
                      playerName={reserve.playerName}
                      onClick={handleclickreservation}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
