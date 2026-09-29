import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Github, Globe, User, ArrowRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 150);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="inline-block tracking-tight font-medium">
      {displayText}
      <span className="animate-pulse text-[#0071E3]">|</span>
    </span>
  );
};

const IconButton = ({ Icon }) => (
  <div className="relative group transition-transform duration-300 hover:scale-105">
    <div className="relative p-3.5 sm:p-4 mac-glass rounded-2xl border border-black/[0.08] dark:border-white/15 shadow-md flex items-center justify-center transition-all duration-300 group-hover:border-[#0071E3]/40">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800 dark:text-[#f5f5f7]" />
    </div>
  </div>
);

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleFinish = () => {
    setIsLoading(false);
    setTimeout(() => {
      onLoadingComplete?.();
    }, 600);
  };

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
      mirror: false,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    });

    const timer = setTimeout(() => {
      handleFinish();
    }, 4500);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.02,
      filter: "blur(14px)",
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
  };

  const childVariants = {
    exit: {
      y: -15,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 bg-[#f5f5f7]/90 dark:bg-[#070709]/95 backdrop-blur-3xl font-sans selection:bg-[#0071E3] selection:text-white flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
        >
          {/* macOS Ambient Blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-[30%] -left-[15%] w-[65vw] h-[65vw] rounded-full bg-blue-500/15 blur-[120px] animate-pulse" />
            <div className="absolute -bottom-[30%] -right-[15%] w-[65vw] h-[65vw] rounded-full bg-indigo-500/15 blur-[130px] animate-pulse" />
          </div>

          <div className="relative w-full max-w-lg mx-auto flex flex-col items-center">
            {/* macOS Frosted Glass Login Window */}
            <div className="w-full mac-glass rounded-[2.5rem] border border-black/[0.08] dark:border-white/15 p-8 sm:p-10 shadow-2xl flex flex-col items-center text-center">
              {/* Profile Avatar / Traffic Dots */}
              <div className="flex gap-2 mb-6">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              </div>

              {/* Icons Row */}
              <motion.div
                className="flex justify-center gap-3 sm:gap-4 mb-6"
                variants={childVariants}
              >
                {[Code2, User, Github].map((Icon, index) => (
                  <div key={index} data-aos="fade-down" data-aos-delay={index * 150}>
                    <IconButton Icon={Icon} />
                  </div>
                ))}
              </motion.div>

              {/* Welcome Typography */}
              <motion.div className="mb-6" variants={childVariants}>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-[#f5f5f7]">
                  <span className="text-gray-500 dark:text-[#86868b] font-normal block text-lg mb-1">
                    Welcome to
                  </span>
                  Nizar Rama's Portfolio.
                </h1>
              </motion.div>

              {/* macOS Address Pill */}
              <motion.div
                className="mb-8"
                variants={childVariants}
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mac-glass-subtle border border-black/[0.08] dark:border-white/15 shadow-sm">
                  <Globe className="w-4 h-4 text-[#0071E3]" />
                  <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <TypewriterEffect text="webnizar.vercel.app" />
                  </span>
                </div>
              </motion.div>

              {/* Enter / Skip Button */}
              <motion.button
                onClick={handleFinish}
                variants={childVariants}
                className="px-6 py-2.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-[0_4px_14px_rgba(0,113,227,0.35)] transition-all hover:scale-105 active:scale-95"
              >
                <span>Enter Desktop</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;