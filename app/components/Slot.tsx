// icons mui
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
// helpers
import { timeToMinutes } from "../helpers/methods";
// enum
import { Eslotstate } from "../utils/enums";

export default function Slot({
  time,
  isavailable,
  onClick,
  isselected,
  state = Eslotstate.available,
}: {
  time: string;
  isavailable: boolean;
  onClick: () => void;
  isselected: boolean;
  state: Eslotstate;
}) {
  const startMinutes = timeToMinutes(time);
  const endMinutes = startMinutes + 30;

  const starth = Math.floor(startMinutes / 60);
  const startm = startMinutes % 60;

  const endh = Math.floor(endMinutes / 60);
  const endm = endMinutes % 60;

  const startPeriod = starth < 12 ? "AM" : "PM";
  const endPeriod = endh < 12 ? "AM" : "PM";

  const formattedStartHour = starth % 12 === 0 ? 12 : starth % 12;
  const formattedEndHour = endh % 12 === 0 ? 12 : endh % 12;

  const startTime = `${String(formattedStartHour).padStart(2, "0")}:${String(
    startm,
  ).padStart(2, "0")}`;

  const endTime = `${String(formattedEndHour).padStart(2, "0")}:${String(
    endm,
  ).padStart(2, "0")}`;

  // const isAvailable = state === Eslotstate.available;

  // the right style for each state
  const getStyle = () => {
    if (state === Eslotstate.booked) {
      return "bg-gray-200 text-gray-400 cursor-not-allowed";
    }

    if (state === Eslotstate.maintained) {
      return "bg-red-200 border-red-500 text-gray-400 cursor-not-allowed";
    }

    if (isselected) {
      return "bg-green-500 text-white border-green-600 cursor-pointer";
    }

    return "bg-white  hover:bg-green-50 cursor-pointer";
  };
  // the label showen in slot
  const getLabel = () => {
    if (state === Eslotstate.booked) return "Booked";
    if (state === Eslotstate.maintained) return "Under Maintenance";
    if (isselected) return "Selected";
    return "Available";
  };

  return (
    <div
      onClick={isavailable ? onClick : undefined}
      className={`
    p-2.5 rounded border transition-colors duration-150 relative group 
    ${getStyle()}
  `}
    >
      {/* Time */}
      <div className="font-semibold text-gray-800">
        {startTime} {startPeriod}
      </div>
      <div className="text-xs text-gray-500">
        to {endTime} {endPeriod}
      </div>
      {/* Status */}
      <div
        className={`mt-1 text-xs font-semibold ${
          isavailable
            ? `${isselected ? "text-white" : "text-green-600"}`
            : "text-gray-400"
        }`}
      >
        {getLabel()}
      </div>
      {/* maintenance icon */}
      {state === Eslotstate.maintained && (
        <SettingsSharpIcon
          className="
      absolute -top-2 -left-2 
      text-red-600 bg-white rounded-full p-1 shadow-md
      transform transition-all duration-500 ease-in-out
      group-hover:rotate-45 group-hover:scale-120
    "
        />
      )}

      {/* booked icon */}
      {state === Eslotstate.booked && (
        <BookmarkAddedIcon
          className="
      absolute -top-2 -left-2 
      text-blue-600 bg-white rounded-full p-1 shadow-md
      transform transition-all duration-300 ease-out
      group-hover:scale-110
    "
        />
      )}
    </div>
  );
}
