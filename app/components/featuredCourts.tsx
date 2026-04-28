// components
import CourtView from "./CourtView";

export default function FeaturedCourt() {
  return (
    <div className="w-full mt-10">
      {/* content */}
      <div className="flex flex-col  ">
        {/* text description to our courts */}
        <div className=" self-center flex flex-col items-center gap-2">
          <h1 className=" font-bold text-3xl tracking-wide">
            Elite Featured Courts
          </h1>
          <p className=" w-9/10  text-center font-mono">
            Experiance precision play at our most requested premimum facilities
            across the city.
          </p>
        </div>
        {/* top courts */}
        <div className="max-w-7xl   px-4 py-10">
          
            <CourtView
              courtId="1"
              courtImg="/webImages/pexels-adempercem-35531301.jpg"
              courtLocation="tanta"
              courtName="court1"
              courtPriceHour={100}
              courtType="football"
            />

            {/* ===top courts=== */}
          
        </div>
      </div>
    </div>
  );
}
