// mui
import Rating from "@mui/material/Rating";
import Avatar from "@mui/material/Avatar";

// interface
interface IPlayerComment {
  rate: number;
  comment: string;
  acountId: string;
}

export default function PlayerComment({
  rate = 5,
  comment = "Good court, really enjoyed playing here. Clean and well maintained!",
  acountId = "0",
}: IPlayerComment) {
  return (
    <div className={`max-w-md  bg-[#1d2d3d] rounded-2xl p-4 m-3 
                    shadow-lg border border-white/10 
                    hover:shadow-xl  transition-all duration-300 ${acountId=="2"?"md:mb-10 md:scale-110  md:border-amber-100 ":""}`}>

      {/* Header (Rating) */}
      <div className="flex justify-between items-center mb-2">
        <Rating name="read-only" value={rate} readOnly size="small" />
        <span className="text-yellow-400 text-sm font-medium">
          {rate}.0
        </span>
      </div>

      {/* Comment */}
      <p className="text-gray-200 text-sm leading-relaxed mb-4">
        {comment}
      </p>

      {/* User Info */}
      <div className="flex items-center gap-3 pt-3 border-t border-white/10">
        <Avatar
          className="border border-yellow-400"
          sx={{ width: 40, height: 40 }}
        >
          M
        </Avatar>

        <div className="flex flex-col">
          {/* name account */}
          <h2 className="text-white text-sm font-semibold leading-tight">
            Medo Eldamaty
          </h2>
          <p className="text-gray-400 text-xs">
            Player
          </p>
        </div>
      </div>
    </div>
  );
}