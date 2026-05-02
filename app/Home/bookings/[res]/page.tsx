"use client";

import { Ireservationdetails } from "@/app/utils/interfaces";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import Cookies from "universal-cookie";

// helpers
import {
  getTimeFromTimestamp,
  timeToMinutes,
  minutesToAmPm,
} from "@/app/helpers/methods";

interface IRes {
  params: Promise<{ res: string }>;
}

export default function Res({ params }: IRes) {
  const [loading, setLoading] = useState(true);
  const { res } = use(params);

  const Cookie = new Cookies();
  const router = useRouter();

  const [reservationdetails, setReservationdetails] =
    useState<Ireservationdetails | null>(null);

  const startTime = reservationdetails?.startTime
    ? minutesToAmPm(
        timeToMinutes(getTimeFromTimestamp(reservationdetails.startTime))
      )
    : "--";

  const endTime = reservationdetails?.endTime
    ? minutesToAmPm(
        timeToMinutes(getTimeFromTimestamp(reservationdetails.endTime))
      )
    : "--";

  useEffect(() => {
    const accessToken = Cookie.get("sportifyaccesstoken");

    if (!accessToken) {
      router.push("/LogIn");
      return;
    }

    const getReservationDetails = async () => {
      try {
        const response = await axios.get(
          `http://m-sportify.runasp.net/api/admin/reservations/${res}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setReservationdetails(response.data);
        setLoading(false);
      } catch (error: unknown) {
        const err = error as AxiosError;

        if (err?.response?.status === 401) {
          router.replace("/LogIn");
        } else {
          router.replace("/Home/bookings");
        }
      }
    };

    getReservationDetails();
  }, [res]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="animate-pulse text-gray-500 text-lg">
          Loading reservation...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-100 via-white to-gray-200">
      {/* Back Button */}
      <Link
        href="/Home/bookings"
        className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white shadow hover:shadow-md rounded-xl transition"
      >
        <ArrowBackIcon />
        <span>Back</span>
      </Link>

      {/* Main Card */}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">
              Reservation #{res}
            </h1>
            <p className="text-sm opacity-90">
              Reservation details overview
            </p>
          </div>

          {/* Status Badge */}
          <span className="px-4 py-1 bg-white/20 rounded-full text-sm font-semibold">
            {reservationdetails?.status}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Time */}
          <div className="flex items-start gap-3">
            <AccessTimeIcon className="text-green-500" />
            <div>
              <p className="text-gray-500 text-sm">Time</p>
              <p className="font-semibold text-lg">
                {startTime} → {endTime}
              </p>
            </div>
          </div>

          {/* Name */}
          <div className="flex items-start gap-3">
            <PersonIcon className="text-blue-500" />
            <div>
              <p className="text-gray-500 text-sm">Customer</p>
              <p className="font-semibold">
                {reservationdetails?.userFullName}
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3">
            <EmailIcon className="text-purple-500" />
            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-medium">
                {reservationdetails?.userEmail}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3">
            <PhoneIcon className="text-orange-500" />
            <div>
              <p className="text-gray-500 text-sm">Phone</p>
              <p className="font-medium">
                {reservationdetails?.userPhoneNumber || "No number"}
              </p>
            </div>
          </div>

          {/* Maintenance Note */}
          {reservationdetails?.maintenanceNote && (
            <div className="md:col-span-2 bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
              <p className="text-yellow-700 font-medium text-sm mb-1">
                Maintenance Note
              </p>
              <p className="text-gray-700">
                {reservationdetails.maintenanceNote}
              </p>
            </div>
          )}

          {/* Payment */}
          <div className="md:col-span-2">
            <p className="text-gray-500 text-sm">Payment</p>
            <span className="inline-block mt-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
              Paid
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 p-6 border-t bg-gray-50">
          <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition active:scale-95">
            Delete
          </button>

          <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition active:scale-95">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}