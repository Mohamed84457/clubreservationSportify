"use client";

import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";

import { IMydata } from "../../utils/interfaces";

export default function ProfilePage() {
  const backend_url = process.env.NEXT_PUBLIC_BACK_END_URL;
  const getmydata_path = process.env.NEXT_PUBLIC_GET_MYDATA_PATH;

  const [user, setUser] = useState<IMydata | null>(null);
  const [loading, setLoading] = useState(true);

  const Cookie = new Cookies();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = Cookie.get("sportifyaccesstoken");

      if (!accessToken) {
        router.replace("/LogIn");
        return;
      }

      try {
        const response = await axios.get(`${backend_url}${getmydata_path}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUser(response.data);
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

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto">
        {/* 🔵 Header */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>

        {/* 🔄 Loading */}
        {loading && (
          <div className="flex justify-center py-10">
            <div className="animate-spin h-10 w-10 border-t-2 border-blue-500 rounded-full"></div>
          </div>
        )}

        {/* ❌ Error / No Data */}
        {!loading && !user && (
          <div className="text-center text-gray-400">
            Failed to load profile
          </div>
        )}

        {/* ✅ Profile Card */}
        {!loading && user && (
          <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-6">
            {/* Avatar + Name */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">
                {user.fullName.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {user.fullName}
                </h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t"></div>

            {/* Info */}
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400">Full Name</p>
                <p className="text-gray-800 font-medium">{user.fullName}</p>
              </div>

              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-gray-800 font-medium">{user.email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-400">Phone Number</p>
                <p className="text-gray-800 font-medium">{user.phoneNumber}</p>
              </div>
            </div>

            {/* 🔘 Action Button (future use) */}
            <button className="w-full mt-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition">
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
