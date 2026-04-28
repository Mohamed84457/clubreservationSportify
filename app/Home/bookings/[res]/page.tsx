// icons mui
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
export default async function Res({ params }: { params: { res: string } }) {
  const { res } = await params;

  const reservationId = res;

  const fakereservationdetails = {
    id: reservationId,
    startTime: "10:00",
    endTime: "11:30",
    state: "Maintained",
    courtId: 1,
    name: "medo",
    phoneNumber: "012978723",
  };
  // handle delete & edit reservation
  return (
    <div className="min-h-screen  flex flex-col  justify-start items-start gap-5 p-6 bg-gradient-to-br from-gray-100 via-white to-gray-200">
      {/* retrun button */}
      <Link
        href={"/Home/bookings"}
        className="p-2.5 transition-all duration-150 cursor-pointer shadow-md hover:-translate-x-2 active:scale-90"
      >
        <ArrowBackIcon className=" text-green-600 " />
      </Link>
      {/* specific reservation */}
      <div className="w-full max-w-xxl bg-white rounded-2xl h-fit  shadow-lg p-6 border border-gray-300 space-y-6">
        {/* Header */}
        <div className="border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Reservation #{reservationId}
          </h1>
          <p className="text-sm text-gray-500">
            Details about this reservation
          </p>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
          <div>
            <p className="text-gray-500">Start Time</p>
            <p className="font-medium">{fakereservationdetails.startTime}</p>
          </div>

          <div>
            <p className="text-gray-500">End Time</p>
            <p className="font-medium">{fakereservationdetails.endTime}</p>
          </div>

          <div>
            <p className="text-gray-500">State</p>
            <p className="font-medium text-green-600">
              {fakereservationdetails.state}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Court ID</p>
            <p className="font-medium">{fakereservationdetails.courtId}</p>
          </div>

          <div>
            <p className="text-gray-500">Name</p>
            <p className="font-medium">{fakereservationdetails.name}</p>
          </div>

          <div>
            <p className="text-gray-500">Phone</p>
            <p className="font-medium">{fakereservationdetails.phoneNumber}</p>
          </div>
          <div>
            <p className="text-gray-500">payment state</p>
            <p className="font-medium">pending</p>
          </div>
          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-4 pt-4 border-t">
            <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition active:scale-95">
              Delete
            </button>

            <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl transition active:scale-95">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
