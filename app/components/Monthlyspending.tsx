// mui icons
import PaidIcon from "@mui/icons-material/Paid";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// interfaces
import { Imonthlyspend } from "../utils/interfaces";
export default function MonthlySpending({
  istrendup = false,
  trendpersent = 20,
  monthlyspend = 400,
}: Imonthlyspend) {
  return (
    <div className=" rounded-md flex flex-col gap-5 py-5  px-6 m-2  shadow-md cursor-pointer ">
      {/* imgae and trend */}
      <div className="flex items-center justify-between  ">
        <div className="bg-gray-200 hover:bg-gray-300 shadow-md transition-all duration-200 p-2 rounded-md">
          <PaidIcon className="text-green-600" />
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
      {/*profits  */}
      <div className="flex flex-col gap-3">
        <p className="text-green-600 tracking-wide">Monthly spend</p>
        <h1 className="font-bold text-2xl text-green-900 ">{monthlyspend} $</h1>
      </div>
    </div>
  );
}
