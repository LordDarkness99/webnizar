import React from "react";

const MacWindowHeader = ({
  title,
  subtitle,
  icon: Icon,
  className = "",
  actions = null,
}) => {
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 border-b border-black/[0.06] dark:border-white/10 bg-white/40 dark:bg-black/30 backdrop-blur-md rounded-t-[1.75rem] select-none ${className}`}
    >
      {/* Traffic Light Buttons */}
      <div className="flex items-center gap-2 group/dots">
        <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/60 flex items-center justify-center transition-all duration-200 group-hover/dots:shadow-sm">
          <span className="opacity-0 group-hover/dots:opacity-100 text-[8px] text-[#4A0002] font-black leading-none">
            ×
          </span>
        </div>
        <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA124]/60 flex items-center justify-center transition-all duration-200 group-hover/dots:shadow-sm">
          <span className="opacity-0 group-hover/dots:opacity-100 text-[8px] text-[#543500] font-black leading-none -translate-y-[1px]">
            −
          </span>
        </div>
        <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/60 flex items-center justify-center transition-all duration-200 group-hover/dots:shadow-sm">
          <span className="opacity-0 group-hover/dots:opacity-100 text-[6px] text-[#0A3D0C] font-black leading-none">
            +
          </span>
        </div>
      </div>

      {/* Window Title */}
      {title && (
        <div className="flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-300 truncate max-w-[60%]">
          {Icon && <Icon className="w-3.5 h-3.5 text-[#0071E3] shrink-0" />}
          <span className="truncate">{title}</span>
          {subtitle && (
            <span className="text-gray-400 dark:text-gray-500 font-normal hidden sm:inline">
              — {subtitle}
            </span>
          )}
        </div>
      )}

      {/* Right side or empty spacer to balance layout */}
      <div className="flex items-center gap-2">
        {actions || <div className="w-12 h-3" />}
      </div>
    </div>
  );
};

export default MacWindowHeader;
