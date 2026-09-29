import React, { useState, useEffect, useCallback, memo } from "react";
import { Github, Linkedin, Mail, ExternalLink, Instagram, Sparkles, Terminal } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { WhatsApp } from "@mui/icons-material";
import MacWindowHeader from "../components/MacWindowHeader";

// Status Badge (macOS Pill Style)
const StatusBadge = memo(() => (
  <div className="inline-block w-full sm:w-auto mt-2 sm:mt-4" data-aos="zoom-in" data-aos-delay="200">
    <div className="relative group inline-block">
      <div className="relative px-4 py-1.5 rounded-full mac-glass-subtle shadow-sm whitespace-nowrap transition-all duration-300 group-hover:scale-105 border border-black/[0.08] dark:border-white/15">
        <span className="text-gray-800 dark:text-[#f5f5f7] text-xs sm:text-sm font-medium flex items-center justify-center tracking-tight">
          <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2.5 animate-pulse" />
          <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#0071E3]" />
          Available for Innovation
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-1" data-aos="fade-up" data-aos-delay="300">
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-center lg:text-left text-gray-900 dark:text-[#f5f5f7] leading-[1.08]">
      <span>Nizar</span>
      <br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-700 dark:from-[#86868b] dark:to-[#d2d2d7]">
        Rama.
      </span>
    </h1>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-3.5 py-1.5 rounded-full mac-glass-subtle text-xs sm:text-sm text-gray-700 dark:text-[#f5f5f7] font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-all whitespace-nowrap shadow-sm border border-black/[0.06] dark:border-white/10">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href}>
    <button className="group relative w-[130px] sm:w-[150px] transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]">
      <div
        className={`relative h-11 rounded-full flex items-center justify-center transition-all duration-300 font-medium text-xs sm:text-sm ${
          text === "Contact"
            ? "mac-glass text-gray-900 dark:text-[#f5f5f7] border border-black/[0.1] dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10"
            : "bg-[#0071E3] hover:bg-[#0077ED] text-white shadow-[0_4px_16px_rgba(0,113,227,0.35)]"
        }`}
      >
        <span className="flex items-center justify-center gap-2">
          <span>{text}</span>
          <Icon
            className={`w-3.5 h-3.5 ${
              text === "Contact" ? "group-hover:translate-x-0.5" : "group-hover:rotate-45"
            } transition-transform duration-300`}
          />
        </span>
      </div>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link, name }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" aria-label={name}>
    <button className="group relative p-2 transition-transform duration-300 hover:scale-110 active:scale-95">
      <div className="rounded-2xl mac-glass p-2.5 flex items-center justify-center border border-black/[0.08] dark:border-white/15 hover:border-[#0071E3]/50 transition-all duration-300 shadow-sm">
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-[#86868b] group-hover:text-[#0071E3] transition-colors" />
      </div>
    </button>
  </a>
));

// Constants
const TYPING_SPEED = 90;
const ERASING_SPEED = 45;
const PAUSE_DURATION = 2000;
const WORDS = ["Information Technology Edu Student", "AI / Machine Learning Enthusiast", "Intelligent Systems Developer"];
const TECH_STACK = ["Python", "TensorFlow", "PostgreSQL", "Java", "Scikit-Learn"];
const SOCIAL_LINKS = [
  { icon: WhatsApp, link: "https://wa.me/6285334646271", name: "WhatsApp" },
  { icon: Github, link: "https://github.com/LordDarkness99", name: "GitHub" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/nizar-alif-ramadhan-5ba1a2315/", name: "LinkedIn" },
  { icon: Instagram, link: "https://www.instagram.com/nizar.ramm?igsh=MWg2ODRoOXg5Zm4x", name: "Instagram" },
];

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      });
    };

    initAOS();
    window.addEventListener("resize", initAOS);
    return () => window.removeEventListener("resize", initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  const lottieOptions = {
    src: "/Coding.json",
    loop: true,
    autoplay: true,
    style: { width: "100%", height: "100%" },
    className: `w-full h-full transition-all duration-700 ${
      isHovering ? "scale-[105%]" : "scale-100"
    }`,
  };

  return (
    <div
      className="min-h-screen font-sans overflow-hidden px-6 sm:px-8 relative selection:bg-[#0071E3] selection:text-white"
      id="Home"
    >
      <div
        className={`relative z-10 transition-all duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto min-h-screen py-24 sm:py-28 flex items-center">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full">
            {/* Left Column */}
            <div
              className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-center lg:text-left order-1"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <div className="space-y-4">
                <StatusBadge />
                <MainTitle />

                {/* Typing Effect */}
                <div
                  className="h-8 flex items-center justify-center lg:justify-start"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <span className="text-lg sm:text-xl font-normal text-gray-600 dark:text-[#86868b] tracking-tight">
                    {text}
                  </span>
                  <span className="w-[2px] h-5 bg-[#0071E3] ml-1.5 animate-pulse"></span>
                </div>

                {/* Description */}
                <p
                  className="text-base sm:text-lg text-gray-600 dark:text-[#86868b] max-w-xl leading-relaxed font-normal mx-auto lg:mx-0 tracking-normal"
                  data-aos="fade-up"
                  data-aos-delay="500"
                >
                  Crafting functional, scalable, and intuitive machine learning models & data-driven software solutions with sleek aesthetic engineering.
                </p>

                {/* Tech Stack */}
                <div
                  className="flex flex-wrap gap-2.5 justify-center lg:justify-start pt-1"
                  data-aos="fade-up"
                  data-aos-delay="600"
                >
                  {TECH_STACK.map((tech, index) => (
                    <TechStack key={index} tech={tech} />
                  ))}
                </div>

                {/* CTA Buttons */}
                <div
                  className="flex flex-row gap-4 justify-center lg:justify-start pt-3"
                  data-aos="fade-up"
                  data-aos-delay="700"
                >
                  <CTAButton href="#Portofolio" text="Projects" icon={ExternalLink} />
                  <CTAButton href="#Contact" text="Contact" icon={Mail} />
                </div>

                {/* Social Links */}
                <div
                  className="hidden sm:flex gap-2 justify-center lg:justify-start pt-3"
                  data-aos="fade-up"
                  data-aos-delay="800"
                >
                  {SOCIAL_LINKS.map((social, index) => (
                    <SocialLink key={index} {...social} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - macOS Window Frame containing Lottie Animation */}
            <div
              className="w-full lg:w-1/2 flex items-center justify-center order-2"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              data-aos="fade-left"
              data-aos-delay="300"
            >
              <div className="relative w-full max-w-md sm:max-w-lg mac-glass rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-700 hover:scale-[1.01] group border border-black/[0.08] dark:border-white/15">
                {/* macOS Window Header with Traffic Lights */}
                <MacWindowHeader
                  title="DeveloperWorkspace.app"
                  icon={Terminal}
                  actions={
                    <span className="text-[10px] uppercase font-semibold text-[#0071E3] px-2 py-0.5 rounded-full bg-[#0071E3]/10">
                      Active
                    </span>
                  }
                />

                {/* Window Body Container */}
                <div className="p-6 sm:p-8 flex items-center justify-center relative">
                  {/* Subtle inner illumination */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-indigo-500/5 to-cyan-500/10 transition-opacity duration-700 pointer-events-none ${
                      isHovering ? "opacity-100" : "opacity-40"
                    }`}
                  />

                  <div className="relative z-10 w-full flex items-center justify-center max-h-[360px]">
                    <DotLottieReact {...lottieOptions} />
                  </div>
                </div>

                {/* macOS Window Footer Bar */}
                <div className="px-5 py-2.5 bg-black/[0.02] dark:bg-white/[0.02] border-t border-black/[0.05] dark:border-white/10 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    ML Training Pipeline ready
                  </span>
                  <span>macOS Ventura Glass</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);