import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, ExternalLink, Github, Code2, Star,
  ChevronRight, Layers, Layout, Globe, Package, Cpu, Code,
} from "lucide-react";
import Swal from 'sweetalert2';

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
    <div className="group relative overflow-hidden px-4 py-2.5 bg-[#1d1d1f]/60 backdrop-blur-3xl rounded-2xl border border-white/10 hover:border-white/25 transition-all duration-300 cursor-default shadow-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative flex items-center gap-2">
        <Icon className="w-4 h-4 text-[#0071E3] group-hover:scale-110 transition-transform" />
        <span className="text-xs md:text-sm font-medium text-[#f5f5f7]">
          {tech}
        </span>
      </div>
    </div>
  );
};

const FeatureItem = ({ feature }) => {
  return (
    <li className="group flex items-start space-x-3 p-3.5 rounded-2xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10">
      <div className="relative mt-2">
        <div className="absolute -inset-1 bg-[#0071E3]/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative w-2 h-2 rounded-full bg-[#0071E3] group-hover:scale-125 transition-transform duration-300" />
      </div>
      <span className="text-sm md:text-base text-[#86868b] group-hover:text-[#f5f5f7] transition-colors font-normal">
        {feature}
      </span>
    </li>
  );
};

const ProjectStats = ({ project }) => {
  const techStackCount = project?.TechStack?.length || 0;
  const featuresCount = project?.Features?.length || 0;

  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-[#1d1d1f]/60 backdrop-blur-3xl rounded-[2rem] border border-white/10 overflow-hidden relative shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/10 pointer-events-none" />

      <div className="relative z-10 flex items-center space-x-3 bg-white/5 p-3.5 rounded-2xl border border-white/10 transition-all duration-300 hover:scale-[1.02] hover:border-white/20">
        <div className="bg-[#0071E3]/20 p-2.5 rounded-xl border border-[#0071E3]/30">
          <Code2 className="text-[#0071E3] w-5 h-5" strokeWidth={1.8} />
        </div>
        <div className="flex-grow">
          <div className="text-xl font-semibold text-[#f5f5f7]">{techStackCount}</div>
          <div className="text-xs text-[#86868b]">Technologies</div>
        </div>
      </div>

      <div className="relative z-10 flex items-center space-x-3 bg-white/5 p-3.5 rounded-2xl border border-white/10 transition-all duration-300 hover:scale-[1.02] hover:border-white/20">
        <div className="bg-[#0071E3]/20 p-2.5 rounded-xl border border-[#0071E3]/30">
          <Layers className="text-[#0071E3] w-5 h-5" strokeWidth={1.8} />
        </div>
        <div className="flex-grow">
          <div className="text-xl font-semibold text-[#f5f5f7]">{featuresCount}</div>
          <div className="text-xs text-[#86868b]">Key Features</div>
        </div>
      </div>
    </div>
  );
};

const handleGithubClick = (githubLink) => {
  if (githubLink === 'Private') {
    Swal.fire({
      icon: 'info',
      title: 'Source Code Private',
      text: 'Maaf, source code untuk proyek ini bersifat privat.',
      confirmButtonText: 'Mengerti',
      confirmButtonColor: '#0071E3',
      background: '#1d1d1f',
      color: '#f5f5f7'
    });
    return false;
  }
  return true;
};

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const selectedProject = storedProjects.find((p) => String(p.id) === id);
    
    if (selectedProject) {
      const enhancedProject = {
        ...selectedProject,
        Features: selectedProject.Features || [],
        TechStack: selectedProject.TechStack || [],
        Github: selectedProject.Github || 'https://github.com/LordDarkness99',
      };
      setProject(enhancedProject);
    }
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#000000] text-[#f5f5f7] font-sans flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-12 h-12 mx-auto rounded-full border-2 border-white/10 border-t-[#0071E3] animate-spin" />
          <h2 className="text-xl font-semibold tracking-tight text-[#f5f5f7]">Loading Project...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000000] text-[#f5f5f7] font-sans px-6 sm:px-[6%] lg:px-[10%] py-12 relative overflow-hidden selection:bg-[#0066CC] selection:text-white">
      
      {/* Apple-style Background Ambient Illumination */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/10 blur-[150px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-indigo-600/10 blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center space-x-3 mb-10">
          <button
            onClick={() => navigate(-1)}
            className="group inline-flex items-center space-x-2 px-4 py-2.5 bg-[#1d1d1f]/60 hover:bg-[#2d2d2f] backdrop-blur-3xl rounded-full text-[#f5f5f7] transition-all duration-300 border border-white/10 hover:border-white/20 text-sm font-medium shadow-md"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#0071E3]" />
            <span>Back</span>
          </button>
          
          <div className="flex items-center space-x-2 text-sm text-[#86868b]">
            <span>Projects</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#f5f5f7] font-medium truncate">{project.Title}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (Info & Actions) */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#f5f5f7] leading-tight">
                {project.Title}
              </h1>
              <div className="h-1 w-20 bg-[#0071E3] rounded-full" />
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-base sm:text-lg text-[#86868b] leading-relaxed font-normal">
                {project.Description}
              </p>
            </div>

            <ProjectStats project={project} />

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={project.Link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3.5 bg-[#0071E3] hover:bg-[#0077ED] text-white rounded-full transition-all duration-300 shadow-[0_4px_14px_rgba(0,113,227,0.3)] hover:scale-[1.02] text-sm font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>

              <a
                href={project.Github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3.5 bg-transparent hover:bg-white/10 border border-white/20 text-[#f5f5f7] rounded-full transition-all duration-300 hover:scale-[1.02] text-sm font-medium"
                onClick={(e) => !handleGithubClick(project.Github) && e.preventDefault()}
              >
                <Github className="w-4 h-4 text-[#0071E3]" />
                <span>GitHub Source</span>
              </a>
            </div>

            {/* Tech Stack Section */}
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-semibold text-[#f5f5f7] flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[#0071E3]" />
                Technologies Used
              </h3>
              {project.TechStack.length > 0 ? (
                <div className="flex flex-wrap gap-2.5">
                  {project.TechStack.map((tech, index) => (
                    <TechBadge key={index} tech={tech} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#86868b] opacity-60">No technologies added.</p>
              )}
            </div>
          </div>

          {/* Right Column (Image Showcase & Features) */}
          <div className="lg:col-span-6 space-y-8">
            <div className="relative rounded-[2.5rem] overflow-hidden bg-[#1d1d1f]/60 backdrop-blur-3xl border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.6)] group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              <img
                src={project.Img}
                alt={project.Title}
                className="w-full aspect-video object-cover transform transition-transform duration-700 group-hover:scale-105"
                onLoad={() => setIsImageLoaded(true)}
              />
            </div>

            {/* Key Features Container */}
            <div className="bg-[#1d1d1f]/60 backdrop-blur-3xl rounded-[2.5rem] p-6 sm:p-8 border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.6)] space-y-6">
              <h3 className="text-xl font-semibold tracking-tight text-[#f5f5f7] flex items-center gap-3">
                <Star className="w-5 h-5 text-[#0071E3] fill-[#0071E3]" />
                Key Features
              </h3>
              {project.Features.length > 0 ? (
                <ul className="list-none space-y-2">
                  {project.Features.map((feature, index) => (
                    <FeatureItem key={index} feature={feature} />
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-[#86868b] opacity-60 font-normal">No features added.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;