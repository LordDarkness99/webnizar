import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Code2,
  Star,
  ChevronRight,
  Layers,
  Layout,
  Globe,
  Package,
  Cpu,
  Code,
  Compass,
} from "lucide-react";
import Swal from "sweetalert2";
import MacWindowHeader from "./MacWindowHeader";
import { useTheme } from "../context/ThemeContext";

const TECH_ICONS = {
  React: Globe,
  Tailwind: Layout,
  Express: Cpu,
  Python: Code,
  Javascript: Code,
  HTML: Code,
  CSS: Code,
  default: Package,
};

const TechBadge = ({ tech }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS["default"];

  return (
    <div className="group relative overflow-hidden px-4 py-2.5 mac-glass-subtle rounded-2xl border border-black/[0.08] dark:border-white/12 hover:border-[#0071E3]/40 transition-all duration-300 cursor-default shadow-sm hover:scale-105">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-[#0071E3] group-hover:scale-110 transition-transform" />
        <span className="text-xs md:text-sm font-semibold text-gray-800 dark:text-[#f5f5f7]">
          {tech}
        </span>
      </div>
    </div>
  );
};

const FeatureItem = ({ feature }) => {
  return (
    <li className="group flex items-start space-x-3 p-3.5 rounded-2xl hover:bg-black/[0.03] dark:hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-black/[0.06] dark:hover:border-white/10">
      <div className="relative mt-1.5 shrink-0">
        <div className="w-2 h-2 rounded-full bg-[#0071E3] group-hover:scale-125 transition-transform duration-300" />
      </div>
      <span className="text-sm md:text-base text-gray-600 dark:text-[#86868b] group-hover:text-gray-900 dark:group-hover:text-[#f5f5f7] transition-colors font-normal">
        {feature}
      </span>
    </li>
  );
};

const ProjectStats = ({ project }) => {
  const techStackCount = project?.TechStack?.length || 0;
  const featuresCount = project?.Features?.length || 0;

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-4 p-3 sm:p-4 mac-glass rounded-[1.5rem] sm:rounded-[2rem] border border-black/[0.08] dark:border-white/12 shadow-lg w-full min-w-0">
      <div className="flex items-center gap-2.5 sm:gap-3.5 bg-black/[0.03] dark:bg-white/5 p-2.5 sm:p-3.5 rounded-2xl border border-black/[0.05] dark:border-white/10 transition-all duration-300 hover:scale-[1.02] min-w-0 overflow-hidden">
        <div className="bg-[#0071E3]/15 p-2 sm:p-2.5 rounded-xl border border-[#0071E3]/25 shrink-0">
          <Code2 className="text-[#0071E3] w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
        </div>
        <div className="min-w-0">
          <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-[#f5f5f7]">
            {techStackCount}
          </div>
          <div className="text-[11px] sm:text-xs text-gray-500 dark:text-[#86868b] leading-tight">
            Technologies
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-3.5 bg-black/[0.03] dark:bg-white/5 p-2.5 sm:p-3.5 rounded-2xl border border-black/[0.05] dark:border-white/10 transition-all duration-300 hover:scale-[1.02] min-w-0 overflow-hidden">
        <div className="bg-[#0071E3]/15 p-2 sm:p-2.5 rounded-xl border border-[#0071E3]/25 shrink-0">
          <Layers className="text-[#0071E3] w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
        </div>
        <div className="min-w-0">
          <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-[#f5f5f7]">
            {featuresCount}
          </div>
          <div className="text-[11px] sm:text-xs text-gray-500 dark:text-[#86868b] leading-tight">
            Key Features
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [project, setProject] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const selectedProject = storedProjects.find((p) => String(p.id) === id);

    if (selectedProject) {
      const enhancedProject = {
        ...selectedProject,
        Features: selectedProject.Features || [],
        TechStack: selectedProject.TechStack || [],
        Github: selectedProject.Github || "https://github.com/LordDarkness99",
      };
      setProject(enhancedProject);
    }
  }, [id]);

  const handleGithubClick = (githubLink) => {
    if (githubLink === "Private") {
      Swal.fire({
        icon: "info",
        title: "Source Code Private",
        text: "Maaf, source code untuk proyek ini bersifat privat.",
        confirmButtonText: "Mengerti",
        confirmButtonColor: "#0071E3",
        background: isDark ? "#1d1d24" : "#ffffff",
        color: isDark ? "#f5f5f7" : "#1d1d1f",
      });
      return false;
    }
    return true;
  };

  if (!project) {
    return (
      <div className="min-h-screen font-sans flex items-center justify-center">
        <div className="text-center space-y-6 mac-glass p-8 rounded-[2rem]">
          <div className="w-12 h-12 mx-auto rounded-full border-2 border-black/10 dark:border-white/10 border-t-[#0071E3] animate-spin" />
          <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-[#f5f5f7]">
            Loading Project Preview...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden font-sans px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 relative selection:bg-[#0071E3] selection:text-white">
      <div className="relative z-10 w-full min-w-0 max-w-7xl mx-auto">
        {/* Navigation Breadcrumb & Back */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0 sm:space-x-3 mb-8 sm:mb-10">
          <button
            onClick={() => navigate(-1)}
            className="group inline-flex w-fit shrink-0 items-center space-x-2 px-4 py-2.5 mt-2 sm:mt-0 mac-glass hover:bg-black/5 dark:hover:bg-white/10 rounded-full text-gray-900 dark:text-[#f5f5f7] transition-all duration-300 border border-black/[0.08] dark:border-white/15 text-sm font-semibold shadow-md active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#0071E3]" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-[#86868b] min-w-0 max-w-full">
            <span className="cursor-pointer hover:underline shrink-0" onClick={() => navigate("/")}>Home</span>
            <ChevronRight className="w-4 h-4 shrink-0" />
            <span className="text-gray-900 dark:text-[#f5f5f7] font-semibold truncate min-w-0 flex-1">
              {project.Title}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 items-start w-full min-w-0">
          {/* Left Column (Info & Actions) */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 w-full min-w-0 max-w-full">
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-widest text-[#0071E3] uppercase">
                Project Detail View
              </span>
              <h1 className="text-[1.7rem] sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-[#f5f5f7] leading-[1.2] break-words">
                {project.Title}
              </h1>
              <div className="h-1 w-20 bg-[#0071E3] rounded-full" />
            </div>

            <div className="prose max-w-none">
              <p className="text-base sm:text-lg text-gray-600 dark:text-[#86868b] leading-relaxed font-normal break-words">
                {project.Description}
              </p>
            </div>

            <ProjectStats project={project} />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href={project.Link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 bg-[#0071E3] hover:bg-[#0077ED] text-white rounded-full transition-all duration-300 shadow-[0_4px_16px_rgba(0,113,227,0.35)] hover:scale-[1.02] text-sm font-semibold w-full sm:w-auto"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Launch Live Demo</span>
              </a>

              <a
                href={project.Github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 mac-glass text-gray-900 dark:text-[#f5f5f7] hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-[1.02] text-sm font-semibold border border-black/[0.08] dark:border-white/15 w-full sm:w-auto"
                onClick={(e) => !handleGithubClick(project.Github) && e.preventDefault()}
              >
                <Github className="w-4 h-4 text-[#0071E3]" />
                <span>Repository</span>
              </a>
            </div>

            {/* Tech Stack Section */}
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-[#f5f5f7] flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[#0071E3]" />
                Technologies Applied
              </h3>
              {project.TechStack.length > 0 ? (
                <div className="flex flex-wrap gap-2.5">
                  {project.TechStack.map((tech, index) => (
                    <TechBadge key={index} tech={tech} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No technologies added.</p>
              )}
            </div>
          </div>

          {/* Right Column (macOS Window Showcase & Features) */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 w-full min-w-0 max-w-full">
            <div className="mac-glass rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden border border-black/[0.08] dark:border-white/15 shadow-2xl group w-full min-w-0 max-w-full">
              <MacWindowHeader title={`${project.Title} — Safari.app`} icon={Compass} />
              <div className="relative overflow-hidden aspect-video bg-black/5 dark:bg-white/5">
                <img
                  src={project.Img}
                  alt={project.Title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Key Features Container */}
            <div className="mac-glass rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-8 border border-black/[0.08] dark:border-white/15 shadow-xl space-y-5 w-full min-w-0 max-w-full">
              <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-[#f5f5f7] flex items-center gap-2.5">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                Key Capabilities & Features
              </h3>
              {project.Features.length > 0 ? (
                <ul className="list-none space-y-2">
                  {project.Features.map((feature, index) => (
                    <FeatureItem key={index} feature={feature} />
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400 font-normal">
                  Standard capabilities deployed.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;