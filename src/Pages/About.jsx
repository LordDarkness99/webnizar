import React, { useEffect, memo, useMemo } from "react"
import { FileText, Code, Award, Globe, ArrowUpRight, Sparkles } from "lucide-react"
import AOS from 'aos'
import 'aos/dist/aos.css'

// Memoized Components (Apple Aesthetic)
const Header = memo(() => (
  <div className="text-center mb-12 sm:mb-16 px-[5%]" data-aos="fade-up" data-aos-duration="1000">
    <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#0071E3] uppercase block mb-3">
      Get to Know
    </span>
    <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#f5f5f7]">
      About Me.
    </h2>
    <p className="mt-3 text-sm sm:text-base text-[#86868b] max-w-xl mx-auto flex items-center justify-center gap-2 font-normal">
      <Sparkles className="w-4 h-4 text-[#0071E3]" />
      Transforming data into intelligent insights and experiences.
    </p>
  </div>
));

const ProfileImage = memo(() => (
  <div className="flex justify-center items-center p-4 sm:p-0">
    <div className="relative group" data-aos="fade-up" data-aos-duration="1200">
      
      {/* Apple-style Multi-Layered Glowing Ambiance around the Picture */}
      <div className="absolute -inset-8 bg-gradient-to-tr from-blue-600/30 via-indigo-500/25 to-sky-400/20 rounded-full blur-[60px] opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute -inset-16 bg-gradient-to-br from-blue-500/15 via-transparent to-purple-600/15 rounded-full blur-[80px] opacity-60 pointer-events-none" />

      {/* Main Glass Card Frame Container */}
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-3xl sm:rounded-[2.5rem] overflow-hidden p-3 bg-[#1d1d1f]/60 backdrop-blur-3xl border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.6)] transition-all duration-700 group-hover:border-white/20 group-hover:scale-[1.02]">
        
        {/* Inner Image Wrapper */}
        <div className="w-full h-full rounded-2xl sm:rounded-[2rem] overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10 opacity-60 pointer-events-none" />
          <img
            src="/niz2.png"
            alt="Nizar Rama"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>

      </div>
    </div>
  </div>
));

const StatCard = memo(({ icon: Icon, value, label, description, animation }) => (
  <div data-aos={animation} data-aos-duration="1000" className="relative group h-full">
    <div className="relative z-10 bg-[#1d1d1f]/60 backdrop-blur-3xl rounded-3xl p-6 sm:p-8 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.3)] h-full flex flex-col justify-between">
      
      {/* Subtle card interior illumination */}
      <div className="absolute -z-10 inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex items-center justify-between mb-6">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-white/20 transition-all duration-300">
          <Icon className="w-6 h-6 text-[#0071E3]" />
        </div>
        <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#f5f5f7]">
          {value}
        </span>
      </div>

      <div>
        <h3 className="text-base sm:text-lg font-medium text-[#f5f5f7] mb-1">
          {label}
        </h3>
        <div className="flex items-center justify-between pt-1">
          <p className="text-xs sm:text-sm text-[#86868b] font-normal">
            {description}
          </p>
          <ArrowUpRight className="w-4 h-4 text-[#86868b] group-hover:text-[#f5f5f7] transition-colors" />
        </div>
      </div>
    </div>
  </div>
));

const AboutPage = () => {
  // Memoized calculations
  const { totalProjects, totalCertificates, YearExperience } = useMemo(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const storedCertificates = JSON.parse(localStorage.getItem("certificates") || "[]");
    
    const startDate = new Date("2023-08-17");
    const today = new Date();
    const experience = today.getFullYear() - startDate.getFullYear() -
      (today < new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate()) ? 1 : 0);

    return {
      totalProjects: storedProjects.length,
      totalCertificates: storedCertificates.length,
      YearExperience: experience
    };
  }, []);

  // Optimized AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: false, 
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      });
    };

    initAOS();
    
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initAOS, 250);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Memoized stats data
  const statsData = useMemo(() => [
    {
      icon: Code,
      value: totalProjects,
      label: "Total Projects",
      description: "Innovative web solutions crafted",
      animation: "fade-right",
    },
    {
      icon: Award,
      value: totalCertificates,
      label: "Certificates",
      description: "Professional skills validated",
      animation: "fade-up",
    },
    {
      icon: Globe,
      value: YearExperience,
      label: "Years of Experience",
      description: "Continuous learning journey",
      animation: "fade-left",
    },
  ], [totalProjects, totalCertificates, YearExperience]);

  return (
    <div className="min-h-screen bg-[#000000] text-[#f5f5f7] font-sans overflow-hidden px-6 sm:px-[6%] lg:px-[10%] py-20 relative selection:bg-[#0066CC] selection:text-white" id="About">
      
      {/* Background Ambient Apple Lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[45vw] h-[45vw] rounded-full bg-blue-600/10 blur-[150px]" />
        <div className="absolute bottom-[10%] left-[5%] w-[45vw] h-[45vw] rounded-full bg-indigo-600/10 blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <Header />

        <div className="w-full pt-6 sm:pt-10">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content Column */}
            <div className="w-full lg:col-span-7 space-y-6 text-center lg:text-left" data-aos="fade-right" data-aos-duration="1000">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1]">
                <span className="text-[#86868b] block mb-1">Hello, I'm</span>
                <span className="text-[#f5f5f7]">Nizar Rama</span>
              </h2>
              
              <p className="text-base sm:text-lg text-[#86868b] leading-relaxed font-normal text-justify lg:text-left tracking-normal">
                I am a 4th-semester Information Systems student at State University of Surabaya with a strong interest in Machine Learning, data science, and artificial intelligence. Currently, I focus on leveraging Machine Learning techniques to build intelligent and data-driven solutions. I am also passionate about exploring new technologies, tools, and algorithms to continuously enhance my skills and expand my knowledge in the field of Machine Learning.
              </p>

              {/* Apple-style Quote Glass Box */}
              <div className="relative bg-[#1d1d1f]/40 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 my-6 shadow-xl overflow-hidden text-left" data-aos="fade-up" data-aos-duration="1200">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
                <blockquote className="text-[#f5f5f7] italic font-normal text-sm sm:text-base relative z-10 leading-snug">
                  "Building intelligent solutions with Machine Learning as a tool, not a substitute for human insight."
                </blockquote>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a href="https://drive.google.com/file/d/1mnE8p7czQLa9ovu_oAf27bQ1kfMqWsoa/view?usp=sharing" className="w-full sm:w-auto" target="_blank" rel="noopener noreferrer">
                  <button 
                    data-aos="fade-up"
                    data-aos-duration="800"
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white font-medium transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(0,113,227,0.3)] text-sm sm:text-base"
                  >
                    <FileText className="w-4 h-4" /> Download CV
                  </button>
                </a>
                
                <a href="#Portofolio" className="w-full sm:w-auto">
                  <button 
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-transparent hover:bg-white/10 border border-white/20 text-[#f5f5f7] font-medium transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <Code className="w-4 h-4 text-[#0071E3]" /> View Projects
                  </button>
                </a>
              </div>
            </div>

            {/* Right Picture Column with Light Textures */}
            <div className="w-full lg:col-span-5">
              <ProfileImage />
            </div>

          </div>

          {/* Stat Cards Grid */}
          <a href="#Portofolio" className="block mt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {statsData.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default memo(AboutPage);