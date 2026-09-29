import React from "react";

const TechStackIcon = ({ TechStackIcon: iconSrc, Language }) => {
  return (
    <div className="group relative p-5 sm:p-6 rounded-[1.75rem] mac-glass border border-black/[0.08] dark:border-white/12 transition-all duration-300 ease-out flex flex-col items-center justify-center gap-3 hover:scale-105 hover:-translate-y-1 cursor-pointer shadow-md hover:shadow-xl">
      {/* macOS Squircle Icon Glow */}
      <div className="relative flex items-center justify-center">
        <div className="absolute -inset-2 bg-gradient-to-tr from-[#0071E3]/20 via-sky-400/10 to-indigo-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 pointer-events-none" />
        <div className="relative p-2 rounded-2xl bg-black/[0.03] dark:bg-white/[0.06] border border-black/[0.04] dark:border-white/10 group-hover:border-[#0071E3]/30 transition-colors">
          <img
            src={iconSrc}
            alt={`${Language} icon`}
            className="h-12 w-12 sm:h-14 sm:w-14 object-contain transform transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        </div>
      </div>
      <span className="text-gray-800 dark:text-gray-200 font-semibold text-xs sm:text-sm tracking-tight group-hover:text-[#0071E3] transition-colors duration-300 text-center">
        {Language}
      </span>
    </div>
  );
};

export default TechStackIcon;