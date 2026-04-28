// components
import TotalBookings from "../components/TotalBookings";
import Monthlyspending from "../components/Monthlyspending";
import Cancellations from "../components/Cancellations";
import Typing from "../components/typingstyle";
import MothlyAnalysis from "../components/monthlyanalysis";
export default function Home() {
  return (
    <div className=" bg-gradient-to-br from-gray-100 via-white to-gray-200-100 h-screen">
      <Typing inputText="welcome back mohamed" />
      {/* total bookings  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
        <TotalBookings
          numberofbookings={30}
          istrendup={false}
          trendpersent={25}
        />
        {/* monthly earn  */}
        <Monthlyspending
          monthlyspend={450}
          istrendup={true}
          trendpersent={30}
        />
        {/* cancellations */}
        <Cancellations
          numbercancellations={2}
          numbercancellationslastmonth={2}
        />
        {/* mothly analysis */}
        <MothlyAnalysis />
      </div>
    </div>
  );
}
