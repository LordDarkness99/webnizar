import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight, AppWindow } from "lucide-react";
import MacWindowHeader from "./MacWindowHeader";

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  const handleLiveDemo = (e) => {
    if (!ProjectLink) {
      e.preventDefault();
      alert("Live demo link is not available");
    }
  };

  const handleDetails = (e) => {
    if (!id) {
      e.preventDefault();
      alert("Project details are not available");
    }
  };

  return (
    <div className="group relative w-full h-full">
      <div className="relative overflow-hidden rounded-[2rem] mac-glass border border-black/[0.08] dark:border-white/15 shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl flex flex-col h-full">
        {/* macOS Window Titlebar with Traffic Lights */}
        <MacWindowHeader
          title={Title}
          icon={AppWindow}
          actions={
            <span className="w-2 h-2 rounded-full bg-emerald-500" title="Online" />
          }
        />

        {/* Ambient glow inside card */}
        <div className="absolute -inset-10 bg-gradient-to-tr from-blue-600/15 via-indigo-500/10 to-sky-400/10 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between relative z-10">
          {/* Project Preview Window Container */}
          <div className="relative overflow-hidden rounded-2xl aspect-video bg-black/5 dark:bg-white/5 border border-black/[0.05] dark:border-white/10 shadow-inner">
            <img
              src={Img}
              alt={Title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" />
          </div>

          {/* Details & Actions */}
          <div className="mt-5 space-y-3 flex-1 flex flex-col justify-between">
            <div className="space-y-1.5">
              <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-[#f5f5f7]">
                {Title}
              </h3>
              <p className="text-gray-600 dark:text-[#86868b] text-sm leading-relaxed line-clamp-2 font-normal">
                {Description}
              </p>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-black/[0.06] dark:border-white/10">
              {ProjectLink ? (
                <a
                  href={ProjectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="inline-flex items-center space-x-1.5 text-[#0071E3] hover:text-[#0077ED] transition-colors duration-200 text-sm font-semibold group/demo"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5 transition-transform" />
                </a>
              ) : (
                <span className="text-gray-400 dark:text-[#86868b] text-xs font-medium">
                  Demo Unavailable
                </span>
              )}

              {id ? (
                <Link
                  to={`/project/${id}`}
                  onClick={handleDetails}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full mac-glass-subtle hover:bg-[#0071E3] hover:text-white text-gray-800 dark:text-[#f5f5f7] transition-all duration-300 hover:scale-105 active:scale-95 text-xs font-medium border border-black/[0.08] dark:border-white/15"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <span className="text-gray-400 dark:text-[#86868b] text-xs font-medium">
                  Details Unavailable
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;