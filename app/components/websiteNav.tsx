"use client";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
// mui icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
export default function WesiteNav() {
  const back_end_url = process.env.NEXT_PUBLIC_BACK_END_URL;
  const refresh_token_path = process.env.NEXT_PUBLIC_REFRESH_TOKEN_PATH;

  // cookie
  const Cookie = new Cookies();
  // router
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  // get current path name
  const pathname = usePathname();
  // navigation links
  const navigations = [
    {
      label: "Home",
      path: "/website",
    },
    {
      label: "Browse Court",
      path: "/website/BrowseCourts",
    },
    {
      label: "My Bookings",
      path: "/website/MyBookings",
    },
  ];

  useEffect(() => {
    const init = async () => {
      let accessToken = Cookie.get("sportifyaccesstoken");
      let refreshToken = Cookie.get("sportifyrefreshtoken");

      if (accessToken) {
        setIsLogin(true);
        setLoading(false);
        return;
      }

      if (!refreshToken) {
        setLoading(false);
        router.replace("/LogIn");
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
          setIsLogin(true);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
          router.replace("/LogIn");
          return;
        }
      }
    };

    init();
  }, []);
  // logout
  const handleLogout = () => {
    Cookie.remove("sportifyaccesstoken", { path: "/" });
    Cookie.remove("sportifyrefreshtoken", { path: "/" });
    setIsOpen(false); // close mobile menu
    router.replace("/LogIn");
  };

  return (
    <nav className="flex items-center justify-between bg-[#d2d3d4] p-2 rounded-lg shadow-md">
      {/* website icon */}
      <div className="flex items-center gap-2 ">
        <Link href={"/website"}>
          <Image
            className=" transition-all duration-150 cursor-pointer active:scale-90 active:translate-y-1 "
            src="/newicon.png"
            alt="Website Icon"
            width={50}
            height={50}
          />
        </Link>
        {/* website name */}
        <Link
          href={"/website"}
          className=" font-mono custom-font cursor-pointer "
        >
          sportify
        </Link>
      </div>
      {/* navigation links */}
      <div className=" items-center justify-around gap-10 hidden md:flex ">
        {navigations.map((nav) => (
          <Link
            href={nav.path}
            key={nav.path}
            className={` hover:text-green-600 ${pathname === nav.path ? " underline text-green-500  " : "text-gray-600"} font-mono`}
          >
            {nav.label}
          </Link>
        ))}
      </div>
      {/* sign in button */}
      {!loading && (
        <div className="hidden md:flex items-center justify-around gap-10">
          {!isLogin && (
            <>
              <Link href={"/LogIn"} className="  font-bold py-2 px-4 rounded ">
                Log In
              </Link>
              <Link
                href={"/Register"}
                className="bg-black hover:bg-gray-600 text-[#d2d3d4] font-bold py-2 px-4 rounded"
              >
                sign up
              </Link>
            </>
          )}
          {/* avatar */}
          {/* show if he sign in by using jwt cookies and hidden signup bottons  */}
          {isLogin && (
            <div className="flex gap-2 items-center">
              <Link href={"/website/profile"}>
                <AccountCircleIcon
                  fontSize="large"
                  className="text-gray-700 cursor-pointer hover:text-green-500 transition"
                />
              </Link>
              <button
                onClick={handleLogout}
                className=" hover:bg-[#c52712] hover:text-white text-[#c52712] border border-[#c52712] cursor-pointer  font-bold py-2 px-4 rounded"
              >
                logout
              </button>
            </div>
          )}
        </div>
      )}
      {/* mobile nav */}
      <div className="md:hidden flex items-center justify-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-xl cursor-pointer transition-all duration-150 active:scale-95 active:translate-y-1 "
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden cursor-pointer"
          onClick={() => setIsOpen(false)}
        />
      )}
      {isOpen && (
        <div
          className={`fixed top-0 left-0 h-full w-72 bg-[#d2d3d4] p-4 z-50 shadow-lg transform transition-transform duration-300 md:hidden ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-5">
            <Link href="/website" className="font-mono">
              sportify
            </Link>

            <button
              onClick={() => setIsOpen(false)}
              className="text-xl cursor-pointer active:scale-95 active:translate-y-1 transition-all duration-150"
            >
              ✕
            </button>
          </div>

          {/* Links */}
          {navigations.map((nav) => (
            <Link
              key={nav.path}
              href={nav.path}
              onClick={() => setIsOpen(false)}
              className={`block py-3 pl-4 rounded mb-4 font-mono transition ${
                pathname == nav.path
                  ? "border border-green-500 text-green-500"
                  : "text-gray-600 hover:text-green-600"
              }`}
            >
              {nav.label}
            </Link>
          ))}

          {/* Buttons */}
          <div className="absolute bottom-5 w-full pr-5 flex flex-col gap-2">
            {!isLogin ? (
              <>
                <Link
                  href="/LogIn"
                  className="px-5 py-2 hover:bg-gray-500 rounded"
                >
                  log in
                </Link>
                <Link
                  href="/Register"
                  className="bg-black text-[#d2d3d4] hover:bg-gray-500 hover:text-black py-2 px-5 rounded"
                >
                  sign up
                </Link>
              </>
            ) : (
              <>
                <Link
                  onClick={() => setIsOpen(false)}
                  href={"/website/profile"}
                  className="  hover:bg-gray-800 hover:text-amber-100 p-2 rounded-md border border-gray-800  flex items-center justify-center gap-3"
                >
                  <AccountCircleIcon /> <span className="text-xl">profile</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className=" hover:bg-[#c52712] hover:text-white text-[#c52712] border border-[#c52712] cursor-pointer  font-bold py-2 px-4 rounded"
                >
                  logout
                </button>
              </>
            )}
          </div>
          {/* show if he sign in by using jwt cookies and hidden signup bottons  */}
          {false && <div></div>}
        </div>
      )}
    </nav>
  );
}
