import styles from "../styles/webHeaderStyle.module.css";

export default function HeaderWebsite() {
  return (
    <header className={styles.headerWebsite}>
      <div className="flex flex-col items-start gap-5 max-w-xl">
        {/* Premium Badge */}
        <button className="flex flex-row-reverse items-center gap-2 px-5 py-1 text-xs rounded-xl border border-white bg-[#3e4c42] text-[#91b888]">
          PREMIUM ACCESS OPEN
          <span className="w-[6px] h-[6px] rounded-full bg-[#c9d009]" />
        </button>

        {/* Title */}
        <h1 className="flex flex-col text-white text-4xl md:text-5xl font-bold tracking-wide leading-tight">
          BOOK YOUR COURT
          <span className="text-[#dee109]">EASILY</span>
        </h1>
<img />
        {/* Description */}
        <div className="flex flex-col gap-1 text-gray-300 tracking-wide text-sm md:text-base">
          <p>Find and reserve the best local sports courts in seconds.</p>
          <p>Your next match starts here.</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <a
            href="/website/BrowseCourts"
            className="text-white px-5 py-2 rounded-md bg-[#061829] hover:bg-[#0a2238] transition active:scale-95 active:translate-y-1 transition-all duration-150"
          >
            Book Now
          </a>

          <a
            href="/website/BrowseCourts"
            className="text-white px-5 py-2 rounded-md bg-[#374542] shadow-[0_0_1px_#fff] hover:bg-[#445552] transition active:scale-95 active:translate-y-1 transition-all duration-150"
          >
            Explore Locations
          </a>
        </div>
      </div>
    </header>
  );
}
