// interfaces
import { Icancellations } from "../utils/interfaces";
// mui icons
import EventBusyIcon from "@mui/icons-material/EventBusy";

export default function Cancellations({
  numbercancellations = 2,
  numbercancellationslastmonth = 3,
}: Icancellations) {
  // change persent
  const change =
    numbercancellations - numbercancellationslastmonth > 0
      ? numbercancellations - numbercancellationslastmonth
      : numbercancellations - numbercancellationslastmonth < 0
        ? numbercancellationslastmonth - numbercancellations
        : 0;
  const istrendup =
    numbercancellations - numbercancellationslastmonth > 0 ? false : true;
  return (
    <div className=" rounded-md flex flex-col gap-5 py-5  px-6 m-2  shadow-md cursor-pointer ">
      {/* imgae and trend */}
      <div className="flex items-center justify-between  ">
        <div className="bg-gray-200 hover:bg-gray-300 shadow-md transition-all duration-200 p-2 rounded-md">
          <EventBusyIcon className="text-green-600" />
        </div>
        <div
          className={` ${istrendup ? "bg-green-100 hover:bg-green-200" : " bg-red-200 hover:bg-red-300"} cursor-pointer rounded-2xl px-2 shadow-md      ${istrendup ? "text-green-600 " : "text-red-600 "}`}
        >
          
          <span>
            {istrendup ? "-" : "+"} {change} change
          </span>
        </div>
      </div>
      {/*profits  */}
      <div className="flex flex-col gap-3">
        <p className="text-green-600 tracking-wide">cancellations</p>
        <h1 className="font-bold text-2xl text-green-900 ">
          {numbercancellations} 
        </h1>
      </div>
    </div>
  );
}
