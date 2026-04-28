// components
import FeaturedCourt from "../components/featuredCourts";
import FooterWebsite from "../components/FooterWebsite";
import HeaderWebsite from "../components/HeaderWebsite";
import PlayerNetwork from "../components/PlayerNetwork";
import SimpleFlow from "../components/SimpleFolw";

export default function Website() {
  return (
    <div>
      {/* header */}
      <header>
        <HeaderWebsite />
      </header>
      {/* main */}
      <main>
        {/* simple flow how booking */}
        <SimpleFlow/>
        {/* top courts */}
        <FeaturedCourt/>
        {/* player network & top comments */}
        <PlayerNetwork/>
        {/* footer */}
        <FooterWebsite/>
      </main>
      
    </div>
  );
}
