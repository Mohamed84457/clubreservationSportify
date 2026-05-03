"use client";

import axios from "axios";
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

  const Cookie = new Cookies();
  const router = useRouter();

  const [isAuthorized, setIsAuthorized] = useState(true); //false by default, will be set to true if auth is successful

  useEffect(() => {
    const init = async () => {
      let accessToken = Cookie.get("sportifyaccesstoken");
      let refreshToken = Cookie.get("sportifyrefreshtoken");

      // ❌ No tokens → redirect
      if (!accessToken && !refreshToken) {
        router.replace("/LogIn"); // or "/404"
        return;
      }

      // 🔄 Refresh if needed
      if (!accessToken && refreshToken) {
        try {
          const response = await axios.post(
            `${back_end_url}${refresh_token_path}`,
            { token: refreshToken },
          );

          accessToken = response.data.accessToken;
          refreshToken = response.data.refreshToken;

          Cookie.set("sportifyaccesstoken", accessToken, {
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
          });

          Cookie.set("sportifyrefreshtoken", refreshToken, {
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
          });
        } catch (error) {
          console.log(error);
          router.replace("/LogIn");
          return;
        }
      }

      // ✅ Authorized
      setIsAuthorized(true);
    };

    init();
  }, []);

  // ⛔ Prevent rendering until auth is done
  if (!isAuthorized) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
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
