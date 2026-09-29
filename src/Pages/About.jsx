import React, { useEffect, memo, useMemo } from "react";
import { FileText, Code, Award, Globe, ArrowUpRight, Sparkles, UserCheck, Laptop } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import MacWindowHeader from "../components/MacWindowHeader";

// Header
const Header = memo(() => (
  <div className="text-center mb-12 sm:mb-16 px-4" data-aos="fade-up" data-aos-duration="1000">
    <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#0071E3] uppercase block mb-3">
      System Overview
    </span>
    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-[#f5f5f7]">
      About Me.
    </h2>
    <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-[#86868b] max-w-xl mx-auto flex items-center justify-center gap-2 font-normal">
      <Sparkles className="w-4 h-4 text-[#0071E3]" />
      Transforming data into intelligent insights and human-centric experiences.
    </p>
  </div>
));

// Profile Image in macOS Glass Card
const ProfileImage = memo(() => (
  <div className="flex justify-center items-center p-2 sm:p-0">
    <div className="relative group w-full max-w-[340px] sm:max-w-[380px]" data-aos="fade-up" data-aos-duration="1200">
      {/* Multi-Layered Glowing Ambiance */}
      <div
        className="absolute -inset-6 bg-gradient-to-tr from-blue-600/25 via-indigo-500/20 to-sky-400/20 rounded-[2.5rem] blur-[40px] opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
      />

      {/* Main Glass Window Frame */}
      <div className="relative mac-glass rounded-[2rem] overflow-hidden border border-black/[0.08] dark:border-white/15 shadow-2xl transition-all duration-700 group-hover:scale-[1.02]">
        <MacWindowHeader title="PhotoPreview.app" icon={UserCheck} />

        {/* Inner Image Wrapper */}
        <div className="p-4 sm:p-5">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-black/5 dark:bg-white/5 border border-black/[0.05] dark:border-white/10">
            <img
              src="/niz.png"
              alt="Nizar Rama"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 pointer-events-none" />
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 px-1">
            <span className="font-medium text-gray-800 dark:text-gray-200">Nizar Alif Ramadhan</span>
            <span className="font-mono text-[11px]">Surabaya, ID</span>
          </div>
        </div>
      </div>
    </div>
  </div>
));

// macOS Widget Stat Card
const StatCard = memo(({ icon: Icon, value, label, description, animation }) => (
  <div data-aos={animation} data-aos-duration="1000" className="relative group h-full">
    <div className="relative z-10 mac-glass rounded-[2rem] p-6 sm:p-7 border border-black/[0.08] dark:border-white/15 overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-lg flex flex-col justify-between h-full">
      {/* Subtle interior glow */}
      <div className="absolute -z-10 inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex items-center justify-between mb-5">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#0071E3]/10 dark:bg-white/10 border border-[#0071E3]/20 dark:border-white/10 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6 text-[#0071E3]" />
        </div>
        <span className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-[#f5f5f7]">
          {value}
        </span>
      </div>

      <div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-[#f5f5f7] mb-1">
          {label}
        </h3>
        <div className="flex items-center justify-between pt-1">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-[#86868b] font-normal">
            {description}
          </p>
          <ArrowUpRight className="w-4 h-4 text-gray-400 dark:text-[#86868b] group-hover:text-[#0071E3] transition-colors" />
        </div>
      </div>
    </div>
  </div>
));

const AboutPage = () => {
  const { totalProjects, totalCertificates, YearExperience } = useMemo(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const storedCertificates = JSON.parse(localStorage.getItem("certificates") || "[]");

    const startDate = new Date("2023-08-17");
    const today = new Date();
    const experience =
      today.getFullYear() -
      startDate.getFullYear() -
      (today < new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate()) ? 1 : 0);

    return {
      totalProjects: storedProjects.length,
      totalCertificates: storedCertificates.length,
      YearExperience: experience || 2,
    };
  }, []);

  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: false,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      });
    };

    initAOS();
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initAOS, 250);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  const statsData = useMemo(
    () => [
      {
        icon: Code,
        value: totalProjects,
        label: "Total Projects",
        description: "Innovative web & AI solutions",
        animation: "fade-right",
      },
      {
        icon: Award,
        value: totalCertificates,
        label: "Certificates",
        description: "Professional skills verified",
        animation: "fade-up",
      },
      {
        icon: Globe,
        value: YearExperience,
        label: "Years Experience",
        description: "Deep continuous tech learning",
        animation: "fade-left",
      },
    ],
    [totalProjects, totalCertificates, YearExperience]
  );

  return (
    <div
      className="min-h-screen font-sans overflow-hidden px-6 sm:px-8 py-20 relative selection:bg-[#0071E3] selection:text-white"
      id="About"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        <Header />

        <div className="w-full pt-4 sm:pt-8">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Content Column */}
            <div
              className="w-full lg:col-span-7 space-y-6 text-center lg:text-left"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <div className="space-y-2">
                <span className="text-gray-500 dark:text-[#86868b] font-medium text-lg block">
                  Hello, I'm
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-[#f5f5f7]">
                  Nizar Rama
                </h2>
              </div>

              <p className="text-base sm:text-lg text-gray-600 dark:text-[#86868b] leading-relaxed font-normal text-justify lg:text-left tracking-normal">
                I am a 5th-semester Information Systems student at State University of Surabaya with a strong interest in Machine Learning, data science, and artificial intelligence. Currently, I focus on leveraging Machine Learning techniques to build intelligent and data-driven solutions. I am also passionate about exploring new technologies, tools, and algorithms to continuously enhance my skills and expand my knowledge in the field of Machine Learning.
              </p>

              {/* macOS Glass Quote Box */}
              <div
                className="relative mac-glass rounded-2xl p-5 my-6 shadow-md overflow-hidden text-left border border-black/[0.08] dark:border-white/10"
                data-aos="fade-up"
                data-aos-duration="1200"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                <blockquote className="text-gray-800 dark:text-[#f5f5f7] italic font-normal text-sm sm:text-base relative z-10 leading-snug">
                  "Building intelligent solutions with Machine Learning as a tool, not a substitute for human insight."
                </blockquote>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="https://drive.google.com/file/d/1Ijs8s1XyiRPn5DL8Y9CKl6UeVFo9PudM/view?usp=sharing"
                  className="w-full sm:w-auto"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    data-aos="fade-up"
                    data-aos-duration="800"
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(0,113,227,0.35)] text-sm sm:text-base"
                  >
                    <FileText className="w-4 h-4" /> Download CV
                  </button>
                </a>

                <a href="#Portofolio" className="w-full sm:w-auto">
                  <button
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    className="w-full sm:w-auto px-6 py-3 rounded-full mac-glass text-gray-900 dark:text-[#f5f5f7] font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 text-sm sm:text-base border border-black/[0.1] dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10"
                  >
                    <Code className="w-4 h-4 text-[#0071E3]" /> View Projects
                  </button>
                </a>
              </div>
            </div>

            {/* Right Picture Column with macOS Frame */}
            <div className="w-full lg:col-span-5">
              <ProfileImage />
            </div>
          </div>

          {/* Stat Cards Grid (macOS Desktop Widgets) */}
          <a href="#Portofolio" className="block mt-16">
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