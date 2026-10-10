import React from "react";
import { ChevronLeft, ChevronRight, PanelLeft } from "lucide-react";

const MacWindowHeader = ({
  title,
  subtitle,
  icon: Icon,
  className = "",
  actions = null,
  showNav = true,
  rightLabel = "",
}) => {
  return (
    <div
      className={`relative flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 border-b border-black/[0.08] dark:border-white/10 bg-[#e8e8e8] dark:bg-[#28282d] rounded-t-xl select-none text-xs transition-colors duration-300 ${className}`}
    >
      {/* Left Area: Traffic Lights & Navigation Controls */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        {/* macOS Traffic Lights (Clean solid dots as in reference image) */}
        <div className="flex items-center gap-2 group/dots">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/40 transition-all duration-200" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA124]/40 transition-all duration-200" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/40 transition-all duration-200" />
        </div>

        {/* macOS Navigation / Toolbar Controls (Back, Forward, Sidebar Toggle) */}
        {showNav && (
          <div className="flex items-center gap-1 pl-1">
            {/* Back & Forward segment */}
            <div className="flex items-center rounded-md bg-white/80 dark:bg-white/10 border border-black/10 dark:border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.03)] overflow-hidden">
              <button
                type="button"
                aria-label="Back"
                className="p-1 px-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors border-r border-black/10 dark:border-white/10"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                aria-label="Forward"
                className="p-1 px-1.5 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Sidebar / View toggle button */}
            <button
              type="button"
              aria-label="Toggle Sidebar"
              className="p-1 px-1.5 rounded-md bg-white/80 dark:bg-white/10 border border-black/10 dark:border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.03)] text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <PanelLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Center Area: Title without icons/emotes */}
      {title ? (
        <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-gray-700 dark:text-gray-200 truncate flex-1 min-w-0 mx-2 justify-center">
          <span className="truncate">{title}</span>
          {subtitle && (
            <span className="text-gray-400 dark:text-gray-500 font-normal hidden md:inline">
              — {subtitle}
            </span>
          )}
        </div>
      ) : (
        <div className="flex-1" />
      )}

      {/* Right Area: Actions or Default "Explore" Text Button */}
      <div className="flex items-center gap-2 shrink-0">
        {actions ? (
          actions
        ) : (
          <span className="text-[11px] sm:text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer px-1">
            {rightLabel || "Explore"}
          </span>
        )}
      </div>
    </div>
  );
};

export default MacWindowHeader;
