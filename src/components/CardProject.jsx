import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight, Compass, ShieldCheck, Star } from "lucide-react";
import MacWindowHeader from "./MacWindowHeader";

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id, isFeatured = false }) => {
  const handleLiveDemo = (e) => {
    if (!ProjectLink) {
      e.preventDefault();
      alert("Live demo link is currently offline or under deployment.");
    }
  };

  const handleDetails = (e) => {
    if (!id) {
      e.preventDefault();
      alert("Project documentation details are not available.");
    }
  };

  return (
    <div className={`group relative w-full h-full flex flex-col ${isFeatured ? "col-span-full mb-4" : ""}`}>
      <div className="relative overflow-hidden rounded-[2.25rem] mac-glass border border-black/[0.08] dark:border-white/15 shadow-xl transition-all duration-500 hover:scale-[1.015] hover:shadow-2xl flex flex-col h-full justify-between">
        
        {/* macOS Window Chrome with Traffic Lights & URL Bar */}
        <div>
          <MacWindowHeader
            title={Title}
            icon={Compass}
            actions={
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Production
              </span>
            }
          />

          {/* Safari-like Address Bar Mockup */}
          <div className="px-5 py-2 border-b border-black/[0.05] dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] flex items-center justify-between gap-3 text-xs">
            <div className="flex-1 max-w-md mx-auto py-1 px-3 rounded-xl mac-glass-subtle border border-black/[0.05] dark:border-white/10 flex items-center justify-center gap-1.5 text-gray-500 dark:text-gray-400 font-mono-code text-[11px] truncate">
              <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />
              <span className="truncate">
                {ProjectLink ? ProjectLink.replace("https://", "") : `webnizar.app/project/${id || "demo"}`}
              </span>
            </div>
          </div>
        </div>

        {/* Card Content Area */}
        <div className={`p-5 sm:p-6 flex-1 flex flex-col justify-between ${isFeatured ? "lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center" : ""}`}>
          
          {/* Project Preview Window Frame */}
          <div className={`relative overflow-hidden rounded-2xl aspect-video bg-black/5 dark:bg-white/5 border border-black/[0.06] dark:border-white/10 shadow-inner group/img ${isFeatured ? "lg:col-span-7" : ""}`}>
            <img
              src={Img}
              alt={Title}
              className="w-full h-full object-cover transform group-hover/img:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/img:opacity-70 transition-opacity duration-500 flex items-end p-4">
              {ProjectLink && (
                <a
                  href={ProjectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="px-4 py-2 rounded-full bg-white/90 text-black text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 shadow-lg hover:scale-105 transition-transform"
                >
                  <span>Launch Application</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Details & Actions */}
          <div className={`mt-5 space-y-4 flex-1 flex flex-col justify-between ${isFeatured ? "lg:col-span-5 lg:mt-0" : ""}`}>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0071E3]">
                  {isFeatured ? "Featured Key Milestone" : "Verified Project"}
                </span>
                {isFeatured && (
                  <span className="flex items-center gap-1 text-xs text-amber-500 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    Top Pick
                  </span>
                )}
              </div>

              <h3 className={`font-bold tracking-tight text-gray-900 dark:text-[#f5f5f7] ${isFeatured ? "text-2xl sm:text-3xl" : "text-xl"}`}>
                {Title}
              </h3>

              <p className="text-gray-600 dark:text-[#86868b] text-sm leading-relaxed font-normal line-clamp-3">
                {Description}
              </p>
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-4 flex items-center justify-between border-t border-black/[0.06] dark:border-white/10">
              {ProjectLink ? (
                <a
                  href={ProjectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white transition-all duration-200 text-xs font-semibold shadow-[0_2px_10px_rgba(0,113,227,0.3)] hover:scale-105 active:scale-95"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-gray-400 text-xs font-medium">Demo Private</span>
              )}

              {id ? (
                <Link
                  to={`/project/${id}`}
                  onClick={handleDetails}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full mac-glass-subtle hover:bg-black/5 dark:hover:bg-white/10 text-gray-800 dark:text-[#f5f5f7] transition-all duration-300 hover:scale-105 active:scale-95 text-xs font-semibold border border-black/[0.08] dark:border-white/12"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#0071E3]" />
                </Link>
              ) : (
                <span className="text-gray-400 text-xs font-medium">Details N/A</span>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CardProject;