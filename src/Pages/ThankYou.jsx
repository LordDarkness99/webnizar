import React from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ThankYouPage = () => {
  return (
    <div className="min-h-screen bg-[#000000] text-[#f5f5f7] font-sans flex items-center justify-center px-6 relative overflow-hidden selection:bg-[#0066CC] selection:text-white">
      
      {/* Apple-style Background Ambient Illumination */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-blue-600/10 blur-[150px]" />
        <div className="absolute bottom-[20%] right-[30%] w-[40vw] h-[40vw] rounded-full bg-indigo-600/10 blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-lg w-full bg-[#1d1d1f]/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 sm:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.6)] text-center transition-all duration-500 hover:border-white/20">
        
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-[#0071E3]/10 border border-[#0071E3]/30 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-[#0071E3]" />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#f5f5f7] mb-3">
          Thank You!
        </h1>

        <p className="text-[#86868b] text-sm sm:text-base font-normal mb-8 leading-relaxed">
          Your message has been received. I'll get back to you as soon as possible.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 bg-[#0071E3] hover:bg-[#0077ED] text-white rounded-full font-medium transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_14px_rgba(0,113,227,0.3)] active:scale-[0.98] text-sm sm:text-base"
        >
          Back to Home
        </Link>

      </div>
    </div>
  );
};

export default ThankYouPage;