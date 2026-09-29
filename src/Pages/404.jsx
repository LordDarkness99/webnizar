import React from "react";
import { Home, ArrowLeft, AlertTriangle } from "lucide-react";
import MacWindowHeader from "../components/MacWindowHeader";

export default function NotFoundPage() {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen font-sans flex items-center justify-center px-4 py-12 relative overflow-hidden bg-[#f5f5f7] dark:bg-[#070709] selection:bg-[#0071E3] selection:text-white">
      {/* Background ambient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-blue-500/10 blur-[130px]" />
        <div className="absolute bottom-[20%] right-[20%] w-[50vw] h-[50vw] rounded-full bg-indigo-500/10 blur-[140px]" />
      </div>

      <div className="relative z-10 w-full max-w-md mac-glass rounded-[2rem] border border-black/[0.08] dark:border-white/15 overflow-hidden shadow-2xl">
        <MacWindowHeader title="Finder — 404 Item Not Found" icon={AlertTriangle} />

        <div className="p-8 text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl mac-glass-subtle border border-black/[0.08] dark:border-white/10 flex items-center justify-center text-4xl shadow-inner">
            🧭
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-[#f5f5f7]">
              404
            </h1>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Page Could Not Be Located
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-[#86868b] leading-relaxed max-w-xs mx-auto">
              The requested resource or location has been moved, archived, or is temporarily unreachable.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
            <button
              onClick={handleGoBack}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full mac-glass text-gray-800 dark:text-[#f5f5f7] border border-black/[0.08] dark:border-white/15 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-black/5 dark:hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
            >
              <ArrowLeft size={16} />
              Go Back
            </button>

            <button
              onClick={handleGoHome}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md hover:scale-105 active:scale-95"
            >
              <Home size={16} />
              Return Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}