import React, { useEffect, memo, useMemo, useState } from "react";
import {
  FileText,
  Code,
  Award,
  Globe,
  ArrowUpRight,
  Sparkles,
  UserCheck,
  Cpu,
  GraduationCap,
  MapPin,
  Compass,
  CheckCircle2,
  BookOpen,
  Terminal,
  Layers,
  BrainCircuit,
  ArrowRight,
} from "lucide-react";
import MacWindowHeader from "../components/MacWindowHeader";

// Section Header
const Header = memo(() => (
  <div className="text-center mb-12 sm:mb-16">
    <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#0071E3] uppercase block mb-3">
      System Overview & Trajectory
    </span>
    <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-[#f5f5f7]">
      Behind the Architecture.
    </h2>
    <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-[#86868b] max-w-2xl mx-auto flex items-center justify-center gap-2 font-normal">
      <Sparkles className="w-4 h-4 text-[#0071E3]" />
      Bridging foundational data science, machine learning models, and modern software craft.
    </p>
  </div>
));

const AboutPage = () => {
  const [activeStoryTab, setActiveStoryTab] = useState("journey"); // "journey" | "research" | "philosophy"

  // Dynamic calculations
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
      totalProjects: storedProjects.length || 6,
      totalCertificates: storedCertificates.length || 3,
      YearExperience: experience || 2,
    };
  }, []);

  return (
    <section
      className="min-h-screen font-sans overflow-hidden px-4 sm:px-6 lg:px-8 py-24 relative selection:bg-[#0071E3] selection:text-white"
      id="About"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <Header />

        {/* Top Executive Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">

          {/* Card 1: Developer Profiler & Identity Window (5 Columns) */}
          <div
            className="lg:col-span-5 mac-glass rounded-[2rem] sm:rounded-[2.5rem] border border-black/[0.08] dark:border-white/15 overflow-hidden shadow-2xl flex flex-col justify-between"
          >
            <MacWindowHeader
              title="DeveloperProfiler.app"
              icon={UserCheck}
              actions={
                <span className="text-[10px] font-mono-code font-bold uppercase text-[#0071E3] bg-[#0071E3]/10 px-2 py-0.5 rounded-full">
                  Verified
                </span>
              }
            />

            <div className="p-5 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              {/* Photo Viewport */}
              <div className="relative group mx-auto w-full max-w-[280px] sm:max-w-[320px]">
                <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-black/5 dark:bg-white/5 border border-black/[0.08] dark:border-white/10 shadow-lg">
                  <img
                    src="/niz.png"
                    alt="Nizar Rama"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-30 pointer-events-none" />
                </div>
              </div>

              {/* Developer Specs List */}
              <div className="space-y-2.5 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 px-3.5 rounded-xl bg-black/[0.02] dark:bg-white/5 border border-black/[0.04] dark:border-white/10 text-xs gap-1 sm:gap-2">
                  <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5 shrink-0">
                    <UserCheck className="w-3.5 h-3.5 text-[#0071E3] shrink-0" />
                    Full Name
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white sm:text-right break-words">
                    Nizar Alif Ramadhan
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 px-3.5 rounded-xl bg-black/[0.02] dark:bg-white/5 border border-black/[0.04] dark:border-white/10 text-xs gap-1 sm:gap-2">
                  <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5 shrink-0">
                    <GraduationCap className="w-3.5 h-3.5 text-[#0071E3] shrink-0" />
                    University
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white sm:text-right break-words">
                    State University of Surabaya
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 px-3.5 rounded-xl bg-black/[0.02] dark:bg-white/5 border border-black/[0.04] dark:border-white/10 text-xs gap-1 sm:gap-2">
                  <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5 shrink-0">
                    <BookOpen className="w-3.5 h-3.5 text-[#0071E3] shrink-0" />
                    Department
                  </span>
                  <span className="font-semibold text-[#0071E3] sm:text-right break-words">
                    Information Technology Edu (Sem 5)
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 px-3.5 rounded-xl bg-black/[0.02] dark:bg-white/5 border border-black/[0.04] dark:border-white/10 text-xs gap-1 sm:gap-2">
                  <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5 shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-[#0071E3] shrink-0" />
                    Location
                  </span>
                  <span className="font-medium text-gray-800 dark:text-gray-200 sm:text-right break-words">
                    Surabaya, Indonesia
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2">
                <a
                  href="https://drive.google.com/file/d/1Ijs8s1XyiRPn5DL8Y9CKl6UeVFo9PudM/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <button className="w-full py-3 px-4 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(0,113,227,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98]">
                    <FileText className="w-4 h-4" />
                    <span>Download Official Resume (CV)</span>
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: Interactive Narrative & Research Studio (7 Columns) */}
          <div
            className="lg:col-span-7 mac-glass rounded-[2rem] sm:rounded-[2.5rem] border border-black/[0.08] dark:border-white/15 overflow-hidden shadow-2xl flex flex-col justify-between"
          >
            <MacWindowHeader
              title="Engineering_Narrative.md"
              icon={BrainCircuit}
              actions={
                <span className="text-[11px] font-mono-code text-gray-500 dark:text-gray-400">
                  ReadMode: Interactive
                </span>
              }
            />

            {/* Interactive Narrative Tabs */}
            <div className="p-2.5 sm:p-3 px-3 sm:px-6 border-b border-black/[0.06] dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
              <div className="grid grid-cols-3 gap-1 sm:gap-1.5 p-1 rounded-2xl mac-glass-subtle border border-black/[0.06] dark:border-white/10">
                <button
                  onClick={() => setActiveStoryTab("journey")}
                  className={`py-2 px-1.5 sm:px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 sm:gap-1.5 transition-all duration-300 ${activeStoryTab === "journey"
                    ? "bg-[#0071E3] text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                >
                  <UserCheck className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden sm:inline truncate">Background</span>
                  <span className="sm:hidden truncate">Bio</span>
                </button>

                <button
                  onClick={() => setActiveStoryTab("research")}
                  className={`py-2 px-1.5 sm:px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 sm:gap-1.5 transition-all duration-300 ${activeStoryTab === "research"
                    ? "bg-[#0071E3] text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                >
                  <Cpu className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden sm:inline truncate">AI & ML Focus</span>
                  <span className="sm:hidden truncate">AI & ML</span>
                </button>

                <button
                  onClick={() => setActiveStoryTab("philosophy")}
                  className={`py-2 px-1.5 sm:px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 sm:gap-1.5 transition-all duration-300 ${activeStoryTab === "philosophy"
                    ? "bg-[#0071E3] text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                >
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden sm:inline truncate">Philosophy</span>
                  <span className="sm:hidden truncate">Values</span>
                </button>
              </div>
            </div>

            {/* Tab Viewport */}
            <div className="p-5 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              {/* Tab 1: Journey */}
              {activeStoryTab === "journey" && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="space-y-1">
                    <span className="text-xs font-mono-code uppercase tracking-wider text-[#0071E3] font-bold">
                      Section 01 // The Trajectory
                    </span>
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      From Code Fundamentals to Intelligent Systems.
                    </h3>
                  </div>

                  <p className="text-base text-gray-600 dark:text-[#86868b] leading-relaxed font-normal text-justify">
                    I am a 5th-semester Information Technology Edu undergraduate at the State University of Surabaya with a dedicated specialization in Machine Learning, predictive modeling, and intelligent software engineering. My technical foundation spans algorithmic problem solving, structured database design, and end-to-end fullstack web implementations.
                  </p>

                  <p className="text-base text-gray-600 dark:text-[#86868b] leading-relaxed font-normal text-justify">
                    Throughout my university career, I have consistently balanced classroom theoretical depth with practical projects: writing modular Python pipelines, fine-tuning neural architectures, and deploying web interfaces that make complex models useful for end users.
                  </p>
                </div>
              )}

              {/* Tab 2: AI & ML Focus */}
              {activeStoryTab === "research" && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="space-y-1">
                    <span className="text-xs font-mono-code uppercase tracking-wider text-[#0071E3] font-bold">
                      Section 02 // Research & Technical Depth
                    </span>
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Deep Learning, Computer Vision & Data Pipelines.
                    </h3>
                  </div>

                  <p className="text-base text-gray-600 dark:text-[#86868b] leading-relaxed font-normal text-justify">
                    My current focus revolves around leveraging PyTorch and TensorFlow for Computer Vision, classification, and predictive analytics. I prioritize clean data preprocessing, model evaluation with rigorous validation metrics (Precision, Recall, F1), and model quantization to ensure practical, latency-conscious inference.
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-2xl mac-glass-subtle border border-black/[0.06] dark:border-white/10">
                      <span className="text-xs font-bold text-gray-900 dark:text-white block">
                        Computer Vision
                      </span>
                      <span className="text-[11px] text-gray-500">
                        Object Detection, YOLOv8, CNN architectures
                      </span>
                    </div>
                    <div className="p-3 rounded-2xl mac-glass-subtle border border-black/[0.06] dark:border-white/10">
                      <span className="text-xs font-bold text-gray-900 dark:text-white block">
                        Predictive Modeling
                      </span>
                      <span className="text-[11px] text-gray-500">
                        Supervised & Unsupervised learning, Scikit-Learn
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Philosophy */}
              {activeStoryTab === "philosophy" && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="space-y-1">
                    <span className="text-xs font-mono-code uppercase tracking-wider text-[#0071E3] font-bold">
                      Section 03 // Core Principles
                    </span>
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Intelligent Tools, Human Judgment.
                    </h3>
                  </div>

                  <p className="text-base text-gray-600 dark:text-[#86868b] leading-relaxed font-normal text-justify">
                    Technology is most valuable when it solves genuine friction for people. I believe Machine Learning should be treated not as an opaque black box, but as a disciplined mathematical tool that amplifies human insight and enables data-driven decisions.
                  </p>

                  {/* Quote Block */}
                  <div className="p-5 rounded-2xl mac-glass border-l-4 border-l-[#0071E3] border border-black/[0.08] dark:border-white/10 shadow-sm">
                    <blockquote className="italic text-sm sm:text-base font-normal text-gray-800 dark:text-[#f5f5f7] leading-relaxed">
                      "Building intelligent solutions with Machine Learning as a tool, not a substitute for human insight."
                    </blockquote>
                  </div>
                </div>
              )}

              {/* Bottom Quick-Action Link */}
              <div className="pt-4 border-t border-black/[0.06] dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Ready to collaborate on data-driven projects?
                </span>
                <a
                  href="#Contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0071E3] hover:text-[#0077ED] transition-colors shrink-0"
                >
                  <span>Connect with Nizar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Middle Bento: 4 High-Impact Metric Widgets */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {/* Metric 1 */}
          <div className="p-6 rounded-[2rem] mac-glass border border-black/[0.08] dark:border-white/12 shadow-lg flex flex-col justify-between space-y-4 hover:scale-[1.02] transition-transform">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#0071E3]/10 text-[#0071E3] flex items-center justify-center">
                <Code className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0071E3] bg-[#0071E3]/10 px-2.5 py-1 rounded-full">
                Delivered
              </span>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-gray-900 dark:text-white">
                {totalProjects}+
              </div>
              <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-1">
                Completed Projects
              </div>
              <p className="text-xs text-gray-500 dark:text-[#86868b] mt-0.5">
                Machine Learning apps & modern web software
              </p>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="p-6 rounded-[2rem] mac-glass border border-black/[0.08] dark:border-white/12 shadow-lg flex flex-col justify-between space-y-4 hover:scale-[1.02] transition-transform">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-500/10 px-2.5 py-1 rounded-full">
                Accredited
              </span>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-gray-900 dark:text-white">
                {totalCertificates}+
              </div>
              <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-1">
                Verified Certificates
              </div>
              <p className="text-xs text-gray-500 dark:text-[#86868b] mt-0.5">
                Validated technical & academic credentials
              </p>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="p-6 rounded-[2rem] mac-glass border border-black/[0.08] dark:border-white/12 shadow-lg flex flex-col justify-between space-y-4 hover:scale-[1.02] transition-transform">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-500/10 px-2.5 py-1 rounded-full">
                Experience
              </span>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-gray-900 dark:text-white">
                {YearExperience}+ Years
              </div>
              <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-1">
                Continuous Craft
              </div>
              <p className="text-xs text-gray-500 dark:text-[#86868b] mt-0.5">
                Hands-on algorithmic & fullstack development
              </p>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="p-6 rounded-[2rem] mac-glass border border-black/[0.08] dark:border-white/12 shadow-lg flex flex-col justify-between space-y-4 hover:scale-[1.02] transition-transform">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                Active
              </span>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-gray-900 dark:text-white">
                5th Sem
              </div>
              <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-1">
                Academic Standing
              </div>
              <p className="text-xs text-gray-500 dark:text-[#86868b] mt-0.5">
                Information Technology Edu • State University of Surabaya
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Milestone Roadmap: Growth & Trajectory */}
        <div
          className="p-6 sm:p-8 rounded-[2.5rem] mac-glass border border-black/[0.08] dark:border-white/12 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#0071E3]/10 text-[#0071E3]">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                  Technical Evolution & Milestones
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Continuous progression from core programming to deep learning architectures
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-black/[0.02] dark:bg-white/5 border border-black/[0.05] dark:border-white/10 space-y-2">
              <span className="text-xs font-mono-code font-bold text-[#0071E3]">
                Phase 01 // 2022 - 2023
              </span>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                Software & Algorithm Fundamentals
              </h4>
              <p className="text-xs text-gray-600 dark:text-[#86868b] leading-relaxed">
                Mastering core OOP in Java, Python, and C++, relational schema modeling in MySQL/PostgreSQL, and foundational web protocols.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-black/[0.02] dark:bg-white/5 border border-black/[0.05] dark:border-white/10 space-y-2">
              <span className="text-xs font-mono-code font-bold text-[#0071E3]">
                Phase 02 // 2023 - 2024
              </span>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                Data Science & Machine Learning
              </h4>
              <p className="text-xs text-gray-600 dark:text-[#86868b] leading-relaxed">
                Exploring mathematical foundations, Scikit-Learn pipelines, TensorFlow neural nets, and statistical data cleansing for real datasets.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-black/[0.02] dark:bg-white/5 border border-black/[0.05] dark:border-white/10 space-y-2">
              <span className="text-xs font-mono-code font-bold text-emerald-500">
                Phase 03 // 2024 - Present
              </span>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                Intelligent Production Systems
              </h4>
              <p className="text-xs text-gray-600 dark:text-[#86868b] leading-relaxed">
                Building Computer Vision models, PyTorch pipelines, and deploying high-performance web systems with modern React & Supabase cloud backend.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(AboutPage);