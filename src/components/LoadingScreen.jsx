import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-[#000000] text-[#f5f5f7] font-sans flex items-center justify-center z-50 selection:bg-[#0066CC] selection:text-white">
      
      {/* Apple-style Background Ambient Illumination */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[35%] left-[35%] w-[30vw] h-[30vw] rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute bottom-[30%] right-[35%] w-[30vw] h-[30vw] rounded-full bg-indigo-600/10 blur-[150px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 p-8">
        
        {/* Modern Minimalist Apple Spinner */}
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
          <div className="absolute inset-0 rounded-full border-2 border-t-[#0071E3] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        </div>

        {/* Status Text */}
        <div className="relative">
          <span className="text-xs sm:text-sm text-[#86868b] font-medium tracking-widest uppercase animate-pulse">
            Loading...
          </span>
        </div>

      </div>
    </div>
  );
};

export default LoadingScreen;