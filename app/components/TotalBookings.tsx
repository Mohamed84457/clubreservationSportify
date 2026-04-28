// interfaces
import { ItotalBookings } from "../utils/interfaces";
// mui icons
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
export default function TotalBookings({
  numberofbookings = 12,
  istrendup = false,
  trendpersent = 20,
}: ItotalBookings) {
  return (
    <div className=" rounded-md flex flex-col gap-5 py-5  px-6 m-2  shadow-md cursor-pointer">
      {/* image and analysis */}
      <div className="flex items-center justify-between ">
        <div className="bg-gray-200 hover:bg-gray-300 shadow-md transition-all duration-200 p-2 rounded-md">
          <CalendarMonthIcon className="text-green-600" />
        </div>
        <div
          className={` ${istrendup ? "bg-green-100 hover:bg-green-200" : " bg-red-200 hover:bg-red-300"} cursor-pointer rounded-2xl px-2 shadow-md      ${istrendup ? "text-green-600 " : "text-red-600 "}`}
        >
          {istrendup ? <TrendingUpIcon /> : <TrendingDownIcon />}
          <span>
            {istrendup ? "+" : "-"} {trendpersent} %
          </span>
        </div>
      </div>
      {/* total bookings */}
      <div className="flex flex-col gap-2">
        <p className=" tracking-wide text-green-600">Total Bookings</p>
        <h1 className=" font-bold text-2xl text-green-900">{numberofbookings}</h1>
      </div>
    </div>
  );
}
