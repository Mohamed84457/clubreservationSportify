// components
import PlayerComment from "./PlayerComment";
export default function PlayerNetwork() {
  return (
    <div className=" bg-[#041627] py-10 ">
      <div className="w-11/12 m-auto">
        <p className="text-lime-300 text-xs mb-2">THE PLAYER NETWORK</p>
        <h1 className="text-amber-100  text-3xl">join 10,000+ athletes</h1>
      </div>
      {/* comments */}
      <div className=" grid sm:grid-cols-2 md:grid-cols-3 md:px-5">
        {/* here get the top commets //todo */}
        <PlayerComment acountId="1" comment="good court good courtgood courtgood courtgood court " rate={5} />
        <PlayerComment acountId="2" comment="good court good courtgood courtgood courtgood court " rate={5} />
        <PlayerComment acountId="3" comment="good court good courtgood courtgood courtgood court " rate={5} />
      </div>
    </div>
  );
}
