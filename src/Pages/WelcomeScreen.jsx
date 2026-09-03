import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Github, Globe, User, ArrowRight } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 180);
    
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="inline-block tracking-tight">
      {displayText}
      <span className="animate-pulse text-[#0066CC]">|</span>
    </span>
  );
};

const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Subtle, smooth Apple-style radial ambient glows */}
    <div className="absolute -top-[40%] -left-[20%] w-[70vw] h-[70vw] rounded-full bg-blue-500/10 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
    <div className="absolute -bottom-[40%] -right-[20%] w-[70vw] h-[70vw] rounded-full bg-indigo-500/10 blur-[140px] animate-pulse" style={{ animationDuration: '10s' }} />
  </div>
);

const IconButton = ({ Icon }) => (
  <div className="relative group transition-transform duration-300 hover:scale-105">
    <div className="relative p-3.5 sm:p-4 bg-[#1d1d1f]/60 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex items-center justify-center transition-all duration-300 group-hover:border-white/20 group-hover:bg-[#2d2d2f]/80">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#f5f5f7]" />
    </div>
  </div>
);

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
      mirror: false,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    });

    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 800);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.03,
      filter: "blur(12px)",
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        when: "beforeChildren",
        staggerChildren: 0.08
      }
    }
  };

  const childVariants = {
    exit: {
      y: -15,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-[#000000] text-[#f5f5f7] font-sans selection:bg-[#0066CC] selection:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
        >
          <BackgroundEffect />
          
          <div className="relative min-h-screen flex items-center justify-center px-6">
            <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
              
              {/* Icons Grid / Row */}
              <motion.div 
                className="flex justify-center gap-3 sm:gap-4 mb-8 sm:mb-10"
                variants={childVariants}
              >
                {[Code2, User, Github].map((Icon, index) => (
                  <div key={index} data-aos="fade-down" data-aos-delay={index * 150}>
                    <IconButton Icon={Icon} />
                  </div>
                ))}
              </motion.div>

              {/* Welcome Typography (Apple Headline Style) */}
              <motion.div 
                className="text-center mb-8 sm:mb-10"
                variants={childVariants}
              >
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.08]">
                  <div className="mb-1 sm:mb-2 text-[#86868b]">
                    <span data-aos="fade-right" data-aos-delay="100" className="inline-block px-1.5">Welcome</span>{' '}
                    <span data-aos="fade-right" data-aos-delay="250" className="inline-block px-1.5">to</span>{' '}
                    <span data-aos="fade-right" data-aos-delay="400" className="inline-block px-1.5">my</span>
                  </div>
                  <div>
                    <span data-aos="fade-up" data-aos-delay="550" className="inline-block px-1.5 text-[#f5f5f7] font-bold">
                      portfolio
                    </span>{' '}
                    <span data-aos="fade-up" data-aos-delay="700" className="inline-block px-1.5 text-[#86868b]">
                      experience.
                    </span>
                  </div>
                </h1>
              </motion.div>

              {/* Website Link (Apple Pill Button Style) */}
              <motion.div 
                className="text-center"
                variants={childVariants}
                data-aos="fade-up"
                data-aos-delay="900"
              >
                <a
                  href="https://webnizar.vercel.app/"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#1d1d1f]/80 hover:bg-[#2d2d2f] border border-white/10 hover:border-white/20 backdrop-blur-xl shadow-lg transition-all duration-300 group hover:scale-[1.02]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="w-4 h-4 text-[#0071E3]" />
                  <span className="text-sm sm:text-base font-medium text-[#f5f5f7] tracking-normal">
                    <TypewriterEffect text="webnizar.vercel.app" />
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#86868b] group-hover:translate-x-0.5 transition-transform duration-300" />
                </a>
              </motion.div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;