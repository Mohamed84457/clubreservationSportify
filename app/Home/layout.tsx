"use client";

import axios, { AxiosError } from "axios";
import HeaderLayout from "../components/headerlayout";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const back_end_url = process.env.NEXT_PUBLIC_BACK_END_URL;
  const refresh_token_path = process.env.NEXT_PUBLIC_REFRESH_TOKEN_PATH;
  const getmydata_path = process.env.NEXT_PUBLIC_GET_MYDATA_PATH;

  const Cookie = new Cookies();
  const router = useRouter();

  const [status, setStatus] = useState<"loading" | "auth" | "unauth">(
    "loading",
  );
  useEffect(() => {
    const init = async () => {
      setStatus("loading");

      let accessToken = Cookie.get("sportifyaccesstoken");
      const refreshToken = Cookie.get("sportifyrefreshtoken");

      if (!accessToken && !refreshToken) {
        setStatus("unauth");
        router.replace("/LogIn");
        return;
      }

      // 🔄 refresh token if needed
      if (!accessToken && refreshToken) {
        try {
          const response = await axios.post(
            `${back_end_url}${refresh_token_path}`,
            { token: refreshToken },
          );

          accessToken = response.data.accessToken;

          Cookie.set("sportifyaccesstoken", accessToken, {
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
          });

          setStatus("auth");
        } catch {
          setStatus("unauth");
          router.replace("/LogIn");
          return;
        }
      }

      // 🔍 validate token
      try {
        await axios.get(`${back_end_url}${getmydata_path}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setStatus("auth");
      } catch (error: unknown) {
        const err = error as AxiosError;

        setStatus("unauth");

        if (err.response?.status === 401) {
          router.replace("/LogIn");
        }
      }
    };

    init();
  }, []);

  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-t-2 border-blue-500 rounded-full" />
      </div>
    );
  }

  if (status === "unauth") {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <header className="sticky top-0 z-50">
        <HeaderLayout />
      </header>

      <main>{children}</main>
    </div>
  );
}
