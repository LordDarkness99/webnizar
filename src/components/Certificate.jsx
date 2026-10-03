import React, { useState, useEffect } from "react";
import { Maximize2, ExternalLink, X, Award } from "lucide-react";
import MacWindowHeader from "./MacWindowHeader";

const Certificate = ({ ImgSertif, Link }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className="w-full">
      {/* Thumbnail Card with macOS Glass */}
      <div
        onClick={handleOpen}
        className="group relative overflow-hidden rounded-[1.75rem] mac-glass border border-black/[0.08] dark:border-white/12 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-black/5 dark:bg-white/5">
          <img
            src={ImgSertif}
            alt="Certificate"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* QuickLook Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-2 p-4 text-white">
            <div className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <Maximize2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-semibold tracking-wide uppercase">
              QuickLook Preview
            </span>
          </div>
        </div>

        {/* Certificate Card Bottom Pill */}
        <div className="p-3 px-4 flex items-center justify-between border-t border-black/[0.06] dark:border-white/10 text-xs">
          <span className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5 truncate">
            <Award className="w-3.5 h-3.5 text-[#0071E3] shrink-0" />
            Verified Credential
          </span>
          {Link && (
            <a
              href={Link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[#0071E3] hover:text-[#0077ED] font-semibold flex items-center gap-1 shrink-0"
            >
              <span>Link</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* Lightweight Pure React/Tailwind QuickLook Modal - Enlarged Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-1.5 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={handleClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="mac-glass rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border border-white/20 shadow-2xl flex flex-col w-[95vw] sm:w-[90vw] max-w-[900px] max-h-[92vh] lg:max-h-[94vh] animate-scaleUp"
          >
            {/* Window Header */}
            <MacWindowHeader
              title="Certificate - QuickLook Preview"
              actions={
                <button
                  onClick={handleClose}
                  className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
              }
            />

            {/* Modal Image Display */}
            <div className="p-2 sm:p-4 md:p-6 overflow-auto flex-1 flex items-center justify-center bg-black/10 dark:bg-black/30 min-h-[240px] max-h-[72vh] sm:max-h-[80vh] lg:max-h-[82vh]">
              <img
                src={ImgSertif}
                alt="Certificate Full View"
                className="max-h-[62vh] sm:max-h-[68vh] md:max-h-[72vh] lg:max-h-[76vh] w-auto max-w-full rounded-xl object-contain shadow-lg"
              />
            </div>

            {/* Modal Footer Bar */}
            <div className="px-3 py-2 sm:px-4 border-t border-black/[0.06] dark:border-white/10 bg-white/40 dark:bg-black/20 shrink-0">
              <div className="flex items-center justify-end">
                {Link && (
                  <a
                    href={Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white text-[10px] sm:text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md hover:scale-105"
                  >
                    <span>Open Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificate;