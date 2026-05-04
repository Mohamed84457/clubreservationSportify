"use client";

import { Iuser, IMydata } from "@/app/utils/interfaces";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export default function Userspage() {
  const back_end_url = process.env.NEXT_PUBLIC_BACK_END_URL;
  const admingetuers_url = process.env.NEXT_PUBLIC_ADMIN_GET_USERS_PATH;
  const adminblockuser_path = process.env.NEXT_PUBLIC_ADMIN_BLOCK_USER_PATH;
  const adminunblock_path = process.env.NEXT_PUBLIC_ADMIN_UN_BLOCK_PATH;
  const getmydata_path = process.env.NEXT_PUBLIC_GET_MYDATA_PATH;

  const Cookie = new Cookies();
  const router = useRouter();

  // data of me
  const [myData, setMyData] = useState<IMydata>();

  // get data me
  useEffect(() => {
    const getDateOfMe = async () => {
      const accessToken = Cookie.get("sportifyaccesstoken");

      if (!accessToken) {
        router.push("/LogIn");
        return;
      }
      try {
        const response = await axios.get(`${back_end_url}${getmydata_path}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setMyData(response.data);
      } catch (error: unknown) {
        const err = error as AxiosError;
        if (err.response?.status === 401) {
          router.replace("/LogIn");
        } else {
          console.log(err);
        }
      }
    };

    getDateOfMe();
  }, []);

  const [users, setUsers] = useState<Iuser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const accessToken = Cookie.get("sportifyaccesstoken");
    if (!accessToken) {
      router.push("/LogIn");
      return;
    }

    const getUsers = async () => {
      try {
        const response = await axios.get(`${back_end_url}${admingetuers_url}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUsers(response.data);
      } catch (error: unknown) {
        const err = error as AxiosError;
        if (err.response?.status === 401) {
          router.push("/LogIn");
        } else {
          console.log(err);
        }
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()),
  );

  const [loadingBlockingUserId, setloadingBlockingUserId] = useState<
    string | null
  >(null);
  const [loadingUnBlockingUserId, setloadingUnBlockingUserId] = useState<
    string | null
  >(null);

  const handleBlockUser = async (userId: string) => {
    const accessToken = Cookie.get("sportifyaccesstoken");

    setloadingBlockingUserId(userId);

    try {
      await axios.post(
        `${back_end_url}${adminblockuser_path}${userId}/block`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      // ✅ update UI
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, isBlocked: true } : u)),
      );
    } catch (error: unknown) {
      const err = error as AxiosError;
      if (err.response?.status === 401) {
        router.push("/LogIn");
      } else {
        console.log(err);
      }
    } finally {
      setloadingBlockingUserId(null);
    }
  };
  // un block user
  const handleUnBlockUser = async (userId: string) => {
    const accessToken = Cookie.get("sportifyaccesstoken");
    setloadingUnBlockingUserId(userId);
    try {
      await axios.post(
        `${back_end_url}${adminunblock_path}${userId}/unblock`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      // ✅ update UI
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, isBlocked: false } : u)),
      );
    } catch (error: unknown) {
      const err = error as AxiosError;
      if (err.response?.status === 401) {
        router.push("/LogIn");
      } else {
        console.log(err);
      }
    } finally {
      setloadingUnBlockingUserId(null);
    }
  };
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Simple SVG icon */}
          <div className="bg-blue-100 p-2 rounded-xl">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M17 20h5v-2a4 4 0 00-5-3.87" />
              <path d="M9 20H4v-2a4 4 0 015-3.87" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-800">Users</h1>
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-72 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
        </div>
      )}

      {/* Users Grid */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-5 border relative "
            >
              <h2
                className={`text-lg font-semibold ${user.email === myData?.email ? "text-orange-600" : "text-gray-800"}`}
              >
                {user.fullName}
              </h2>

              <div
                className={`mt-3 space-y-1 text-sm  ${user.email === myData?.email ? "text-orange-600" : "text-gray-800"}`}
              >
                <p>{user.email}</p>
                <p>{user.phoneNumber}</p>
              </div>

              <div className="absolute top-4 right-4 flex flex-col gap-2 ">
                {myData && user.email !== myData.email && (
                  <div>
                    {!user.isBlocked ? (
                      <>
                        <button
                          onClick={() => handleBlockUser(user.id)}
                          disabled={loadingBlockingUserId === user.id}
                          className={`px-3 py-2 rounded-md text-sm font-medium transition w-full
    ${
      loadingBlockingUserId === user.id
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-red-600 hover:bg-red-700 text-white"
    }
  `}
                        >
                          {loadingBlockingUserId === user.id
                            ? "Blocking..."
                            : "Block"}
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleUnBlockUser(user.id)}
                          disabled={loadingUnBlockingUserId === user.id}
                          className={`px-3 py-2 rounded-md text-sm font-medium transition w-full
    ${
      loadingUnBlockingUserId === user.id
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700 text-white"
    }
  `}
                        >
                          {loadingUnBlockingUserId === user.id
                            ? "Unblocking..."
                            : "Unblock"}
                        </button>
                      </>
                    )}
                  </div>
                )}
                <Link
                  href={`/Home/users/${user.id}`}
                  className="bg-green-600 py-2 px-3 rounded-md text-white  text-sm font-medium transition  hover:bg-green-700"
                >
                  Reservations
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredUsers.length === 0 && (
        <div className="text-center text-gray-400 py-10">No users found</div>
      )}
    </div>
  );
}
