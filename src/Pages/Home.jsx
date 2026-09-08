import React, { useState, useEffect, useCallback, memo } from "react"
import { Github, Linkedin, Mail, ExternalLink, Instagram, Sparkles } from "lucide-react"
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { WhatsApp } from "@mui/icons-material"

// Memoized Components (Apple Aesthetic)
const StatusBadge = memo(() => (
  <div className="inline-block w-full sm:w-auto mt-2 sm:mt-4" data-aos="zoom-in" data-aos-delay="200">
    <div className="relative group inline-block">
      <div className="relative px-4 py-1.5 rounded-full bg-[#1d1d1f]/60 backdrop-blur-2xl border border-white/10 shadow-[0_4px_20px_rgb(0,0,0,0.1)] whitespace-nowrap transition-all duration-300 group-hover:border-white/20">
        <span className="text-[#f5f5f7] text-xs sm:text-sm font-medium flex items-center justify-center tracking-tight">
          <Sparkles className="w-3.5 h-3.5 mr-2 text-[#0071E3]" />
          Ready to Innovate
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-1" data-aos="fade-up" data-aos-delay="300">
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-center lg:text-left text-[#f5f5f7] leading-[1.08]">
      <span>Nizar</span>
      <br />
      <span className="text-[#86868b]">Rama.</span>
    </h1>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-3.5 py-1.5 rounded-full bg-[#1d1d1f]/50 backdrop-blur-xl border border-white/10 text-xs sm:text-sm text-[#f5f5f7] font-medium hover:bg-[#2d2d2f]/80 hover:border-white/20 transition-all whitespace-nowrap shadow-sm">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href}>
    <button className="group relative w-[130px] sm:w-[150px] transition-transform duration-300 hover:scale-[1.02]">
      <div className={`relative h-11 rounded-full backdrop-blur-xl border flex items-center justify-center transition-all duration-300 ${
        text === 'Contact' 
          ? 'bg-transparent border-white/20 text-[#f5f5f7] hover:bg-white/10 hover:border-white/30' 
          : 'bg-[#0071E3] border-transparent text-white hover:bg-[#0077ED] shadow-[0_4px_14px_rgba(0,113,227,0.3)]'
      }`}>
        <span className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium">
          <span>{text}</span>
          <Icon className={`w-3.5 h-3.5 ${text === 'Contact' ? 'group-hover:translate-x-0.5' : 'group-hover:rotate-45'} transition-transform duration-300`} />
        </span>
      </div>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="group relative p-2.5 transition-transform duration-300 hover:scale-110">
      <div className="rounded-2xl bg-[#1d1d1f]/60 backdrop-blur-2xl p-2.5 flex items-center justify-center border border-white/10 group-hover:border-white/20 group-hover:bg-[#2d2d2f]/80 transition-all duration-300 shadow-[0_4px_20px_rgb(0,0,0,0.2)]">
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#86868b] group-hover:text-[#f5f5f7] transition-colors" />
      </div>
    </button>
  </a>
));

// Constants
const TYPING_SPEED = 90;
const ERASING_SPEED = 45;
const PAUSE_DURATION = 2000;
const WORDS = ["Information Technology Edu Student", "AI / Machine Learning Enthusiast"];
const TECH_STACK = ["Python", "PostgreSQL", "Java", "Tensorflow"];
const SOCIAL_LINKS = [
  { icon: WhatsApp, link: "https://wa.me/6285334646271" },
  { icon: Github, link: "https://github.com/LordDarkness99" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/nizar-alif-ramadhan-5ba1a2315/" },
  { icon: Instagram, link: "https://www.instagram.com/nizar.ramm?igsh=MWg2ODRoOXg5Zm4x" }
];

const Home = () => {
  const [text, setText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  // Optimize AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      });
    };

    initAOS();
    window.addEventListener('resize', initAOS);
    return () => window.removeEventListener('resize', initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  // Optimize typing effect
  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText(prev => prev + WORDS[wordIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else {
        setWordIndex(prev => (prev + 1) % WORDS.length);
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
      isHovering 
        ? "scale-[110%] rotate-1" 
        : "scale-100"
    }`
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#f5f5f7] font-sans overflow-hidden px-6 sm:px-[6%] lg:px-[10%] selection:bg-[#0066CC] selection:text-white" id="Home">
      {/* Apple-style ambient radial lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[50vw] h-[50vw] rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[50vw] h-[50vw] rounded-full bg-indigo-600/10 blur-[160px]" />
      </div>

      <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <div className="container mx-auto min-h-screen py-16 sm:py-20 flex items-center">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full">
            
            {/* Left Column */}
            <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-center lg:text-left order-1"
              data-aos="fade-right"
              data-aos-delay="100">
              <div className="space-y-4">
                <StatusBadge />
                <MainTitle />

                {/* Typing Effect */}
                <div className="h-8 flex items-center justify-center lg:justify-start" data-aos="fade-up" data-aos-delay="400">
                  <span className="text-lg sm:text-xl font-normal text-[#86868b] tracking-tight">
                    {text}
                  </span>
                  <span className="w-[2px] h-5 bg-[#0071E3] ml-1.5 animate-pulse"></span>
                </div>

                {/* Description */}
                <p className="text-base sm:text-lg text-[#86868b] max-w-xl leading-relaxed font-normal mx-auto lg:mx-0 tracking-normal"
                  data-aos="fade-up"
                  data-aos-delay="500">
                  Creating innovative, functional, and user-friendly machine learning systems for modern digital solutions.
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start pt-1" data-aos="fade-up" data-aos-delay="600">
                  {TECH_STACK.map((tech, index) => (
                    <TechStack key={index} tech={tech} />
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-row gap-4 justify-center lg:justify-start pt-2" data-aos="fade-up" data-aos-delay="700">
                  <CTAButton href="#Portofolio" text="Projects" icon={ExternalLink} />
                  <CTAButton href="#Contact" text="Contact" icon={Mail} />
                </div>

                {/* Social Links */}
                <div className="hidden sm:flex gap-2 justify-center lg:justify-start pt-2" data-aos="fade-up" data-aos-delay="800">
                  {SOCIAL_LINKS.map((social, index) => (
                    <SocialLink key={index} {...social} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Lottie Animation with Apple Card Frame */}
            <div className="w-full lg:w-1/2 flex items-center justify-center order-2"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              data-aos="fade-left"
              data-aos-delay="300">
              
              <div className="relative w-full max-w-md sm:max-w-lg p-6 sm:p-8 rounded-3xl bg-[#1d1d1f]/40 backdrop-blur-3xl border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.5)] transition-all duration-700 hover:border-white/20 group">
                {/* Ambient glow inside card */}
                <div className={`absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-indigo-500/10 rounded-3xl transition-opacity duration-700 pointer-events-none ${
                  isHovering ? "opacity-100" : "opacity-40"
                }`} />

                <div className="relative z-10 w-full flex items-center justify-center">
                  <DotLottieReact {...lottieOptions} />
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