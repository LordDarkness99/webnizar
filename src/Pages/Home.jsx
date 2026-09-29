import React, { useState, useEffect, useCallback, memo } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Instagram,
  Sparkles,
  Terminal,
  Code2,
  Activity,
  Cpu,
  CheckCircle2,
  Copy,
  Check,
  FileText,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { WhatsApp } from "@mui/icons-material";
import MacWindowHeader from "../components/MacWindowHeader";

// Constants
const TYPING_SPEED = 85;
const ERASING_SPEED = 45;
const PAUSE_DURATION = 2200;
const ROLES = [
  "Machine Learning Engineer",
  "AI & Data Science Enthusiast",
  "Intelligent Systems Builder",
  "Information Technology Edu Student",
];

const CODE_SNIPPET = `# pipeline_inference.py
import torch
import torch.nn as nn
from nizar_ml import VisionTransformer, Evaluator

class IntelligentPipeline:
    def __init__(self, checkpoint="best_model.pt"):
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model = VisionTransformer.load(checkpoint).to(self.device)
        self.evaluator = Evaluator(metrics=["accuracy", "f1_score"])
        
    def predict(self, input_tensor):
        self.model.eval()
        with torch.no_grad():
            outputs = self.model(input_tensor.to(self.device))
            confidence, preds = torch.max(outputs, 1)
        return {"prediction": preds.item(), "confidence": f"{confidence.item()*100:.2f}%"}

# Status: 98.4% Accuracy achieved on benchmark`;

const METRICS_DATA = [
  { label: "Model Architecture", value: "Custom CNN & ViT", detail: "Optimized for latency" },
  { label: "Validation Accuracy", value: "98.4%", detail: "+2.1% vs baseline" },
  { label: "Inference Latency", value: "12.8 ms", detail: "CUDA accelerated batch=1" },
  { label: "Dataset Processed", value: "15,000+ samples", detail: "Cleaned & augmented" },
];

const SOCIAL_LINKS = [
  { icon: WhatsApp, link: "https://wa.me/6285334646271", name: "WhatsApp", color: "#25D366" },
  { icon: Github, link: "https://github.com/LordDarkness99", name: "GitHub", color: "#181717" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/nizar-alif-ramadhan-5ba1a2315/", name: "LinkedIn", color: "#0A66C2" },
  { icon: Instagram, link: "https://www.instagram.com/nizar.ramm?igsh=MWg2ODRoOXg5Zm4x", name: "Instagram", color: "#E4405F" },
];

const Home = () => {
  const [roleText, setRoleText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("visual"); // "visual" | "code" | "metrics"
  const [hasCopiedCode, setHasCopiedCode] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Live Surabaya GMT+7 Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    AOS.init({
      once: true,
      offset: 10,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    });
  }, []);

  // Typing Effect
  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < ROLES[roleIndex].length) {
        setRoleText((prev) => prev + ROLES[roleIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setRoleText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, roleIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(CODE_SNIPPET);
    setHasCopiedCode(true);
    setTimeout(() => setHasCopiedCode(false), 2000);
  };

  const lottieOptions = {
    src: "/Coding.json",
    loop: true,
    autoplay: true,
    style: { width: "100%", height: "100%" },
    className: "w-full h-full object-contain max-h-[300px]",
  };

  return (
    <section
      className="min-h-screen font-sans overflow-hidden px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative selection:bg-[#0071E3] selection:text-white"
      id="Home"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Command Banner / Status Bar */}
        <div
          data-aos="fade-down"
          data-aos-duration="800"
          className="flex flex-wrap items-center justify-between gap-3 p-3 px-4 sm:px-5 mb-8 rounded-2xl mac-glass border border-black/[0.08] dark:border-white/12 shadow-sm text-xs"
        >
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              Active Status:
            </span>
            <span className="text-gray-600 dark:text-gray-400 truncate">
              Open for Machine Learning & Software Engineering
            </span>
          </div>

          <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 hidden sm:flex">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#0071E3]" />
              Surabaya, ID
            </span>
            <span className="flex items-center gap-1.5 font-mono-code text-[11px]">
              <Clock className="w-3.5 h-3.5 text-[#0071E3]" />
              {currentTime ? `${currentTime} WIB` : "GMT+7"}
            </span>
          </div>
        </div>

        {/* Main Stage Grid: Non-template Asymmetric Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Developer Profile & Mission (7 Columns) */}
          <div
            className="lg:col-span-7 flex flex-col justify-between space-y-6 sm:space-y-8 mac-glass rounded-[2rem] sm:rounded-[2.5rem] border border-black/[0.08] dark:border-white/15 p-5 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            {/* Subtle inner background glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              {/* Identity Capsule */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mac-glass-subtle border border-black/[0.08] dark:border-white/15 text-xs font-medium text-gray-800 dark:text-gray-200 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#0071E3]" />
                <span>Nizar Alif Ramadhan</span>
                <span className="text-gray-400">•</span>
                <span className="text-[#0071E3] font-semibold">AI Practitioner</span>
              </div>

              {/* Bold Executive Headline */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-[#f5f5f7] leading-[1.1]">
                  Engineering{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] via-sky-500 to-indigo-500">
                    Intelligent
                  </span>{" "}
                  Systems.
                </h1>

                {/* Interactive Dynamic Role Indicator */}
                <div className="h-8 flex items-center pt-1">
                  <span className="text-xs uppercase tracking-wider font-semibold text-gray-400 dark:text-gray-500 mr-2">
                    Focus /
                  </span>
                  <span className="text-base sm:text-lg font-mono-code font-medium text-gray-800 dark:text-gray-200">
                    {roleText}
                  </span>
                  <span className="w-2 h-4 bg-[#0071E3] ml-1 animate-pulse" />
                </div>
              </div>

              {/* Value Proposition Description */}
              <p className="text-base sm:text-lg text-gray-600 dark:text-[#86868b] leading-relaxed max-w-2xl font-normal">
                I design, train, and deploy data-driven Machine Learning architectures and modern web software. Combining algorithmic precision with human-centered product craftsmanship to solve real-world problems.
              </p>

              {/* Quick Tech Arsenal Chips */}
              <div className="pt-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-gray-400 dark:text-gray-500 block mb-2.5">
                  Core Engineering Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {["Python", "PyTorch / TF", "PostgreSQL", "Java", "Scikit-Learn", "React.js"].map(
                    (tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-xl text-xs font-medium mac-glass-subtle text-gray-700 dark:text-gray-300 border border-black/[0.06] dark:border-white/10 hover:border-[#0071E3]/50 transition-colors"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Action Group & Social Dock */}
            <div className="pt-6 border-t border-black/[0.06] dark:border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 relative z-10">
              <div className="flex flex-wrap items-center gap-3">
                <a href="#Portofolio">
                  <button className="px-6 py-3 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white text-sm font-semibold transition-all duration-300 shadow-[0_4px_16px_rgba(0,113,227,0.35)] hover:scale-105 active:scale-95 flex items-center gap-2">
                    <span>Explore Showcase</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </a>

                <a href="#Contact">
                  <button className="px-5 py-3 rounded-full mac-glass text-gray-800 dark:text-[#f5f5f7] text-sm font-semibold border border-black/[0.08] dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/10 transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#0071E3]" />
                    <span>Get in Touch</span>
                  </button>
                </a>
              </div>

              {/* Social Channels Pills */}
              <div className="flex items-center gap-2">
                {SOCIAL_LINKS.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={index}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.name}
                      className="p-2.5 rounded-full mac-glass border border-black/[0.08] dark:border-white/15 text-gray-600 dark:text-gray-300 hover:text-[#0071E3] hover:scale-110 active:scale-95 transition-all shadow-sm"
                      title={item.name}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive macOS AI & Code Studio Inspector (5 Columns) */}
          <div
            className="lg:col-span-5 mac-glass rounded-[2.5rem] border border-black/[0.08] dark:border-white/15 overflow-hidden shadow-2xl flex flex-col justify-between"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            {/* macOS Window Chrome */}
            <MacWindowHeader
              title="AI_Studio_Inspector.app"
              icon={Terminal}
              actions={
                <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  Online
                </span>
              }
            />

            {/* Segmented Tab Switcher (Visual vs Code vs Metrics) */}
            <div className="p-3 px-4 border-b border-black/[0.06] dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
              <div className="grid grid-cols-3 gap-1 p-1 rounded-2xl mac-glass-subtle border border-black/[0.06] dark:border-white/10">
                <button
                  onClick={() => setActiveTab("visual")}
                  className={`py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-300 ${activeTab === "visual"
                      ? "bg-[#0071E3] text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>

                <button
                  onClick={() => setActiveTab("code")}
                  className={`py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-300 ${activeTab === "code"
                      ? "bg-[#0071E3] text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Pipeline.py</span>
                </button>

                <button
                  onClick={() => setActiveTab("metrics")}
                  className={`py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-300 ${activeTab === "metrics"
                      ? "bg-[#0071E3] text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Telemetry</span>
                </button>
              </div>
            </div>

            {/* Tab Viewport */}
            <div className="p-6 flex-1 flex flex-col justify-center min-h-[340px]">
              {/* Tab 1: Visual Lottie Animation with telemetry pill */}
              {activeTab === "visual" && (
                <div className="flex flex-col items-center justify-center space-y-4 animate-fadeIn">
                  <div className="w-full max-w-[280px] h-[220px] flex items-center justify-center">
                    <DotLottieReact {...lottieOptions} />
                  </div>
                  <div className="w-full grid grid-cols-2 gap-2 pt-2">
                    <div className="p-2.5 rounded-xl bg-black/[0.03] dark:bg-white/5 border border-black/[0.05] dark:border-white/10 text-center">
                      <span className="text-[10px] text-gray-500 uppercase block font-semibold">
                        Model Training
                      </span>
                      <span className="text-xs font-bold text-[#0071E3]">
                        PyTorch ViT
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-black/[0.03] dark:bg-white/5 border border-black/[0.05] dark:border-white/10 text-center">
                      <span className="text-[10px] text-gray-500 uppercase block font-semibold">
                        Status
                      </span>
                      <span className="text-xs font-bold text-emerald-500 flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Optimal 98.4%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Syntax Highlighted Python Code */}
              {activeTab === "code" && (
                <div className="relative flex flex-col h-full animate-fadeIn">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono-code text-gray-500 dark:text-gray-400">
                      python 3.11 • pytorch 2.3
                    </span>
                    <button
                      onClick={copyCodeToClipboard}
                      className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg mac-glass-subtle hover:text-[#0071E3] transition-colors"
                      title="Copy code"
                    >
                      {hasCopiedCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-500 font-semibold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="p-3.5 rounded-2xl bg-black/80 dark:bg-black/90 text-gray-200 font-mono-code text-[11px] leading-relaxed overflow-x-auto max-h-[260px] border border-white/10">
                    <code>{CODE_SNIPPET}</code>
                  </pre>
                </div>
              )}

              {/* Tab 3: Live Engineering Telemetry */}
              {activeTab === "metrics" && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-black/[0.06] dark:border-white/10">
                    <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Model Benchmark Metrics
                    </span>
                    <span className="text-[11px] font-mono-code text-[#0071E3] bg-[#0071E3]/10 px-2 py-0.5 rounded-full">
                      Evaluation Set
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {METRICS_DATA.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-2xl bg-black/[0.03] dark:bg-white/5 border border-black/[0.05] dark:border-white/10 flex items-center justify-between"
                      >
                        <div>
                          <span className="text-xs font-medium text-gray-800 dark:text-gray-200 block">
                            {m.label}
                          </span>
                          <span className="text-[11px] text-gray-500 dark:text-gray-400">
                            {m.detail}
                          </span>
                        </div>
                        <span className="text-sm font-bold font-mono-code text-[#0071E3]">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Window Footer Status */}
            <div className="px-5 py-2.5 bg-black/[0.03] dark:bg-white/[0.02] border-t border-black/[0.06] dark:border-white/10 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 font-mono-code">
              <span>mode: interactive_inspector</span>
              <span>macOS Liquid Retina</span>
            </div>
          </div>
        </div>

        {/* Bottom Bento Highlight Strip (3 Cards) */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="p-5 rounded-3xl mac-glass border border-black/[0.08] dark:border-white/12 shadow-md flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0071E3]/10 flex items-center justify-center text-[#0071E3] shrink-0">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                Machine Learning Solutions
              </h4>
              <p className="text-xs text-gray-600 dark:text-[#86868b] mt-0.5">
                From predictive models to Computer Vision & NLP applications.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-3xl mac-glass border border-black/[0.08] dark:border-white/12 shadow-md flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 shrink-0">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                Fullstack Web Architecture
              </h4>
              <p className="text-xs text-gray-600 dark:text-[#86868b] mt-0.5">
                Clean, resilient frontend & backend data integration.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-3xl mac-glass border border-black/[0.08] dark:border-white/12 shadow-md flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                Production-Ready Rigor
              </h4>
              <p className="text-xs text-gray-600 dark:text-[#86868b] mt-0.5">
                Maintainable code, tested logic, and scalable performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Home);