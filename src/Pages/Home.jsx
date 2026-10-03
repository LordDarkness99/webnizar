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
import CrowdCanvas from "../components/ui/CrowdCanvas";
import WhatsAppIcon from "../components/icons/WhatsAppIcon";
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
  { icon: WhatsAppIcon, link: "https://wa.me/6285334646271", name: "WhatsApp", color: "#25D366" },
  { icon: Github, link: "https://github.com/LordDarkness99", name: "GitHub", color: "#181717" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/nizar-alif-ramadhan-5ba1a2315/", name: "LinkedIn", color: "#0A66C2" },
  { icon: Instagram, link: "https://www.instagram.com/nizar.ramm?igsh=MWg2ODRoOXg5Zm4x", name: "Instagram", color: "#E4405F" },
];

const Home = () => {
  const [roleText, setRoleText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState("");

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
    const timeout = setTimeout(handleTyping, isTyping ? TYPING_SPEED : ERASING_SPEED);
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  return (
    <section
      className="min-h-screen font-sans overflow-hidden px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative selection:bg-[#0071E3] selection:text-white"
      id="Home"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 px-1 py-2 text-xs">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="shrink-0 font-semibold text-gray-800 dark:text-gray-200">Active Status:</span>
            <span className="break-words text-gray-600 dark:text-gray-400">Open for Machine Learning & Software Engineering</span>
          </div>

          <div className="hidden items-center gap-4 text-gray-500 dark:text-gray-400 sm:flex">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#0071E3]" />
              Surabaya, ID
            </span>
            <span className="flex items-center gap-1.5 font-mono-code text-[11px]">
              <Clock className="h-3.5 w-3.5 text-[#0071E3]" />
              {currentTime ? `${currentTime} WIB` : "GMT+7"}
            </span>
          </div>
        </div>

        <div className="grid items-center gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative flex flex-col justify-between overflow-hidden p-5 sm:p-8">
            <div className="pointer-events-none absolute right-0 top-0 h-36 w-36 rounded-full bg-blue-500/5 blur-3xl" />

            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full px-0 py-1 text-xs font-medium text-gray-800 dark:text-gray-200">
                <Sparkles className="h-3.5 w-3.5 text-[#0071E3]" />
                <span>Nizar Alif Ramadhan</span>
                <span className="text-gray-400">•</span>
                <span className="font-semibold text-[#0071E3]">AI Practitioner</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-gray-900 dark:text-[#f5f5f7] sm:text-5xl lg:text-[4rem]">
                  Engineering{" "}
                  <span className="bg-gradient-to-r from-[#0071E3] via-sky-500 to-indigo-500 bg-clip-text text-transparent">
                    Intelligent
                  </span>{" "}
                  Systems.
                </h1>

                <div className="flex h-8 items-center">
                  <span className="mr-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                    Focus /
                  </span>
                  <span className="font-mono-code text-base font-medium text-gray-800 dark:text-gray-200 sm:text-lg">
                    {roleText}
                  </span>
                  <span className="ml-1 h-4 w-1.5 animate-pulse bg-[#0071E3]" />
                </div>
              </div>

              <p className="max-w-xl text-base leading-relaxed text-gray-600 dark:text-[#86868b] sm:text-lg">
                I design, train, and deploy data-driven Machine Learning systems and modern digital products with a strong focus on practical impact and clean execution.
              </p>

              <div className="flex flex-wrap gap-2">
                {['Python', 'PyTorch', 'React', 'SQL', 'Computer Vision', 'MLOps'].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-black/[0.04] bg-transparent px-2.5 py-1 text-[11px] font-medium text-gray-700 dark:border-white/10 dark:text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-6 flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href="#Portofolio" className="w-full sm:w-auto">
                  <button className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0071E3] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#0077ED] active:scale-95 sm:w-auto">
                    Explore Showcase
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </a>

                <a href="#Contact" className="w-full sm:w-auto">
                  <button className="flex w-full items-center justify-center gap-2 rounded-full border border-black/[0.06] bg-transparent px-5 py-3 text-sm font-semibold text-gray-800 transition-all duration-300 hover:bg-black/5 dark:border-white/10 dark:text-[#f5f5f7] dark:hover:bg-white/10 sm:w-auto">
                    <Mail className="h-4 w-4 text-[#0071E3]" />
                    Get in Touch
                  </button>
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 sm:justify-start">
                {SOCIAL_LINKS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.name}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.06] bg-transparent text-gray-600 transition-all duration-300 hover:-translate-y-0.5 hover:text-[#0071E3] dark:border-white/10 dark:text-gray-300"
                      title={item.name}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="relative mx-auto mt-4 h-[220px] w-full overflow-hidden sm:h-[280px] lg:mt-0 lg:h-[360px]">
            <CrowdCanvas src="/CrowdSprite.png" rows={15} cols={7} maxPeeps={60} />
            <div className="pointer-events-none absolute inset-x-2 top-3 flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
              <span>Overview</span>
              <span className="inline-flex items-center gap-1.5 text-emerald-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Online
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-1 text-center text-[10px] text-gray-400 dark:text-gray-500">
              Animation by <a className="pointer-events-auto underline underline-offset-2" href="https://21st.dev/" target="_blank" rel="noreferrer">Skiper UI</a>
              {" · Illustration by "}
              <a className="pointer-events-auto underline underline-offset-2" href="https://www.openpeeps.com/" target="_blank" rel="noreferrer">Open Peeps</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default memo(Home);