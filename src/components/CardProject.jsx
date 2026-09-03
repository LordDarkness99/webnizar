import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  const handleLiveDemo = (e) => {
    if (!ProjectLink) {
      console.log("ProjectLink kosong");
      e.preventDefault();
      alert("Live demo link is not available");
    }
  };
  
  const handleDetails = (e) => {
    if (!id) {
      console.log("ID kosong");
      e.preventDefault();
      alert("Project details are not available");
    }
  };

  return (
    <div className="group relative w-full">
      <div className="relative overflow-hidden rounded-[2rem] bg-[#1d1d1f]/60 backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-500 hover:border-white/20 hover:scale-[1.01]">
        
        {/* Apple-style Multi-Layered Glowing Ambiance & Light Texture */}
        <div className="absolute -inset-10 bg-gradient-to-tr from-blue-600/20 via-indigo-500/15 to-sky-400/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/15 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/30 transition-all duration-700"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/30 transition-all duration-700"></div>

        <div className="relative p-5 sm:p-6 z-10 flex flex-col h-full">
          
          {/* Project Image Container */}
          <div className="relative overflow-hidden rounded-2xl aspect-video bg-white/5 border border-white/5">
            <img
              src={Img}
              alt={Title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
          </div>
          
          <div className="mt-5 space-y-3 flex-1 flex flex-col justify-between">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold tracking-tight text-[#f5f5f7]">
                {Title}
              </h3>
              
              <p className="text-[#86868b] text-sm leading-relaxed line-clamp-2 font-normal">
                {Description}
              </p>
            </div>
            
            <div className="pt-4 flex items-center justify-between border-t border-white/5">
              {ProjectLink ? (
                <a
                  href={ProjectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="inline-flex items-center space-x-1.5 text-[#0071E3] hover:text-[#0077ED] transition-colors duration-200 text-sm font-medium"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-[#86868b] text-xs font-medium">Demo Unavailable</span>
              )}
              
              {id ? (
                <Link
                  to={`/project/${id}`}
                  onClick={handleDetails}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[#f5f5f7] transition-all duration-300 hover:scale-105 active:scale-95 text-xs font-medium"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#86868b]" />
                </Link>
              ) : (
                <span className="text-[#86868b] text-xs font-medium">Details Unavailable</span>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default CardProject;