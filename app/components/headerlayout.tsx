"use client";
// components
import Navigation from "./nav";

// icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// next
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Cookies from "universal-cookie";
export default function HeaderLayout() {
  // cookie
  const Cookie = new Cookies();
  // router
  const router = useRouter();
  // mine profile
  const [mineProfileWindowScreenOpen, setMineProfileWindowScreenOpen] =
    useState(false);

    useState(false);
  // pathname to highlight page
  const pathname = usePathname();
  // route
  const userouter = useRouter();
  // hamburger
  const hamburger = [
    {
      label: "Home",
      path: "/Home",
    },
    {
      label: "users",
      path: "/Home/users",
    },
    {
      label: "Bookings",
      path: "/Home/bookings",
    },
    
    {
      label: "venues",
      path: "/Home/venues",
    },
  ];
  // sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isLogin = Cookie.get("sportifyaccesstoken") ? true : false;

  // handle logout
  const handlelogout = () => {
    Cookie.remove("sportifyaccesstoken");
    Cookie.remove("sportifyrefreshtoken");
    setTimeout(() => {
      router.push("/LogIn");
    }, 300);
  };
  return (
    <header className="bg-white h-16 px-6 flex items-center justify-between shadow-md ">
      {/* Logo */}
      <Link
        href={"/Home"}
        className="flex items-center gap-2 cursor-pointer group"
      >
        <div className=" flex items-center gap-2 cursor-pointer ">
          {/* group-hover:animate-pulse */}
          <Image
            className=" group-hover:animate-pulse  transition-all duration-200"
            src="/test.png"
            alt="logo"
            width={40}
            height={40}
          />
          <span className="text-xl font-bold text-gray-800">Sportify</span>
        </div>
      </Link>
      {/* nav */}
      <div className=" p-1 w-full flex items-center justify-between  hidden md:flex ">
        {/* Navigation */}
        <div className="w-4/5 md:w-3/4 flex justify-center ml-2 ">
          <Navigation />
        </div>
        {/* Profile */}
        <div className="flex items-center relative">
          <div onClick={() => setMineProfileWindowScreenOpen((pre) => !pre)}>
            <AccountCircleIcon
              fontSize="large"
              className="text-gray-700 cursor-pointer hover:text-green-500 transition"
            />
          </div>
          <div
            className={` bg-amber-50 border p-3 rounded-2xl grid grid-cols-1 gap-2 absolute w-[140px] -bottom-[104px] -left-20
          transform transition-all duration-300 ease-out shadow shadow-md
          ${
            mineProfileWindowScreenOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
          >
            {isLogin ? (
              <>
                <h1 className="text-center text-primary font-bold ">email</h1>
                <button
                  onClick={handlelogout}
                  className="text-red-700 border py-1 mt-2 rounded-md hover:bg-red-700 hover:text-amber-100 cursor-pointer "
                >
                  logout
                </button>
              </>
            ) : (
              <>
                <a
                  className="bg-gray-900 p-2 rounded-md text-amber-100 text-center "
                  href="/LogIn"
                >
                  login
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* sidebar */}
      <div className="md:hidden ">
        <button
          onClick={() => setSidebarOpen(true)}
          className="py-2 px-3 rounded-lg bg-white shadow border-none cursor-pointer transition-all duration-150  hover:shadow-md active:scale-90 active:translate-y-1"
        >
          ☰
        </button>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
  fixed lg:static top-0 left-0 z-90 h-full w-72 bg-white 
  transform transition-transform duration-300 ease-in-out
  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
  lg:translate-x-0 lg:w-auto
  lg:col-span-4 flex flex-col gap-5 p-4 lg:p-0
md:hidden
`}
      >
        {/* Close button (mobile only) */}
        <div className="flex justify-between md:hidden  ">
          {/* Profile */}
          <div className="flex items-center">
            <AccountCircleIcon
              fontSize="large"
              className="text-gray-700 cursor-pointer hover:text-green-500 transition"
            />
            {isLogin && <span className="ml-2 font-bold">email</span>}
          </div>
          <button
            className=" rounded-lg cursor-pointer shadow py-2 px-3 border-none hover:shadow-md  transition-all duration-150 active:scale-90 active:translate-y-1"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>
        {hamburger.map(
          (item) =>
            item.label != "log out" &&
            item.label != "Login" && (
              <div
                onClick={() => {
                  setSidebarOpen((pre) => false);
                  userouter.replace(item?.path);
                }}
                key={item.path}
                className={`border ${
                  pathname === item.path
                    ? "text-green-400"
                    : "text-gray-500 hover:text-gray-700"
                } p-3 rounded-lg shadow cursor-pointer hover:shadow-md transition-all duration-150 active:scale-95 active:translate-y-1 font-bold  tracking-wider  `}
              >
                {item.label}
              </div>
            ),
        )}
        <div className="absolute bottom-4 grid grid-cols-1 w-11/12 gap-3">
          {!isLogin && (
            <a
              href="/LogIn"
              className=" w-10/12 py-2 rounded-xl text-center text-amber-100 bg-gray-700 border  hover:text-gray-700 hover:bg-amber-100 cursor-pointer transition-all duration-150 "
            >
              login
            </a>
          )}
          {isLogin && (
            <div
              onClick={handlelogout}
              className=" w-10/12 py-2 rounded-xl text-center text-red-700 border hover:bg-red-700 hover:text-amber-100 cursor-pointer transition-all duration-150 "
            >
              log out
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
