import React, { useState } from 'react';
import { X, ArrowRight, ExternalLink } from 'lucide-react';

const ProjectCardModal = ({ title, description, link }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[#f5f5f7] transition-all duration-300 hover:scale-105 active:scale-95 text-xs font-medium"
        onClick={() => setIsOpen(true)}
      >
        <span>Details</span>
        <ArrowRight className="w-3.5 h-3.5 text-[#86868b]" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-[2.5rem] bg-[#1d1d1f]/90 backdrop-blur-3xl border border-white/10 p-6 sm:p-8 text-[#f5f5f7] shadow-[0_30px_100px_rgba(0,0,0,0.8)] transition-all duration-500 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-6 right-6 rounded-full p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-[#86868b] hover:text-[#f5f5f7] transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>
            
            <h3 className="mb-3 text-2xl font-semibold tracking-tight text-[#f5f5f7]">
              {title}
            </h3>
            
            <p className="mb-8 text-[#86868b] text-sm sm:text-base leading-relaxed font-normal">
              {description}
            </p>
            
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
              <button
                className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[#f5f5f7] text-xs sm:text-sm font-medium transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
              
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-6 py-2.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs sm:text-sm font-medium transition-all duration-300 shadow-[0_4px_14px_rgba(0,113,227,0.3)] hover:scale-[1.02]"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCardModal;