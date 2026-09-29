import React, { useEffect, useState, useCallback, useMemo } from "react";
import { supabase } from "../supabase";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import {
  Code,
  Award,
  Boxes,
  Sparkles,
  Search,
  X,
  Layers,
  Cpu,
  Database,
  Globe,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

// Grouped Tech Stacks by Domain
const TECH_CATEGORIES = [
  {
    title: "AI, Machine Learning & Core Languages",
    icon: Cpu,
    color: "#0071E3",
    stacks: [
      { icon: "python.svg", language: "Python" },
      { icon: "java.svg", language: "Java" },
      { icon: "cpp.svg", language: "C++" },
      { icon: "csharp.svg", language: "C#" },
      { icon: "c.svg", language: "C" },
    ],
  },
  {
    title: "Web Engineering, Frameworks & UI",
    icon: Globe,
    color: "#38BDF8",
    stacks: [
      { icon: "reactjs.svg", language: "ReactJS" },
      { icon: "javascript.svg", language: "JavaScript" },
      { icon: "tailwind.svg", language: "Tailwind CSS" },
      { icon: "html.svg", language: "HTML" },
      { icon: "css.svg", language: "CSS" },
      { icon: "bootstrap.svg", language: "Bootstrap" },
      { icon: "figma.svg", language: "Figma" },
    ],
  },
  {
    title: "Databases, Cloud & Systems",
    icon: Database,
    color: "#A855F7",
    stacks: [
      { icon: "postgresql.svg", language: "PostgreSQL" },
      { icon: "supabase.svg", language: "Supabase" },
      { icon: "mysql.svg", language: "MySQL" },
      { icon: "mongodb.svg", language: "MongoDB" },
      { icon: "laravel.svg", language: "Laravel" },
      { icon: "php.svg", language: "PHP" },
      { icon: "git.svg", language: "Git" },
      { icon: "github.svg", language: "GitHub" },
    ],
  },
];

export default function Portofolio() {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState("projects"); // "projects" | "certificates" | "stack"
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  const initialItems = 6;

  useEffect(() => {
    AOS.init({
      once: false,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const [projectsResponse, certificatesResponse] = await Promise.all([
        supabase.from("projects").select("*").order("id", { ascending: true }),
        supabase.from("certificates").select("*").order("id", { ascending: true }),
      ]);

      if (projectsResponse.error) throw projectsResponse.error;
      if (certificatesResponse.error) throw certificatesResponse.error;

      const projectData = (projectsResponse.data || []).map((p) => ({
        id: p.id,
        Title: p.Title,
        Description: p.Description,
        Img: p.Img,
        Link: p.Link,
        Github: p.Github,
        TechStack: p.TechStack || [],
        Features: p.Features || [],
      }));

      const certificateData = (certificatesResponse.data || []).map((c) => ({
        id: c.id,
        Img: c.Img,
        Link: c.link,
      }));

      setProjects(projectData);
      setCertificates(certificateData);

      localStorage.setItem("projects", JSON.stringify(projectData));
      localStorage.setItem("certificates", JSON.stringify(certificateData));
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
    }
  }, []);

  useEffect(() => {
    const cachedProjects = localStorage.getItem("projects");
    const cachedCertificates = localStorage.getItem("certificates");

    if (cachedProjects && cachedCertificates) {
      setProjects(JSON.parse(cachedProjects));
      setCertificates(JSON.parse(cachedCertificates));
    }
    fetchData();
  }, [fetchData]);

  // Filter & Search Projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.Description.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedFilter === "all") return true;
      if (selectedFilter === "ai") {
        return (
          project.Title.toLowerCase().includes("ai") ||
          project.Title.toLowerCase().includes("learning") ||
          project.Title.toLowerCase().includes("model") ||
          project.Description.toLowerCase().includes("machine learning") ||
          project.Description.toLowerCase().includes("ai")
        );
      }
      if (selectedFilter === "web") {
        return (
          project.Title.toLowerCase().includes("web") ||
          project.Title.toLowerCase().includes("app") ||
          project.Title.toLowerCase().includes("system") ||
          project.Description.toLowerCase().includes("web")
        );
      }
      return true;
    });
  }, [projects, searchQuery, selectedFilter]);

  const displayedProjects = showAllProjects
    ? filteredProjects
    : filteredProjects.slice(0, initialItems);

  const displayedCertificates = showAllCertificates
    ? certificates
    : certificates.slice(0, initialItems);

  return (
    <section
      className="min-h-screen font-sans px-6 sm:px-8 py-24 relative overflow-hidden selection:bg-[#0071E3] selection:text-white"
      id="Portofolio"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12" data-aos="fade-up" data-aos-duration="1000">
          <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#0071E3] uppercase block mb-3">
            Engineering Portfolio
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-[#f5f5f7]">
            Work, Accreditations & Stack.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-[#86868b] max-w-xl mx-auto flex items-center justify-center gap-2 font-normal">
            <Sparkles className="w-4 h-4 text-[#0071E3]" />
            Curated machine learning models, production web systems, and technical certifications.
          </p>
        </div>

        {/* Custom macOS Segmented Control Bar */}
        <div className="flex justify-center mb-10" data-aos="fade-up" data-aos-delay="100">
          <div className="p-1.5 rounded-full mac-dock flex items-center gap-2 border border-black/[0.08] dark:border-white/15 max-w-2xl w-full justify-between sm:justify-center">
            <button
              onClick={() => setActiveTab("projects")}
              className={`flex-1 sm:flex-initial px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === "projects"
                  ? "bg-[#0071E3] text-white shadow-[0_4px_16px_rgba(0,113,227,0.4)]"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
              }`}
            >
              <Code className="w-4 h-4" />
              <span>Projects ({projects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("certificates")}
              className={`flex-1 sm:flex-initial px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === "certificates"
                  ? "bg-[#0071E3] text-white shadow-[0_4px_16px_rgba(0,113,227,0.4)]"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Certificates ({certificates.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("stack")}
              className={`flex-1 sm:flex-initial px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === "stack"
                  ? "bg-[#0071E3] text-white shadow-[0_4px_16px_rgba(0,113,227,0.4)]"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
              }`}
            >
              <Boxes className="w-4 h-4" />
              <span>Tech Arsenal</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Projects Showcase */}
        {activeTab === "projects" && (
          <div className="space-y-8 animate-fadeIn">
            {/* macOS Spotlight Search & Filter Bar */}
            <div className="p-4 sm:p-5 rounded-3xl mac-glass border border-black/[0.08] dark:border-white/12 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Search Input */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search project or technology..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-9 py-2 rounded-2xl bg-black/[0.03] dark:bg-white/5 border border-black/[0.08] dark:border-white/10 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#0071E3] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <button
                  onClick={() => setSelectedFilter("all")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedFilter === "all"
                      ? "bg-[#0071E3] text-white shadow-sm"
                      : "mac-glass-subtle text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10"
                  }`}
                >
                  All ({projects.length})
                </button>

                <button
                  onClick={() => setSelectedFilter("ai")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedFilter === "ai"
                      ? "bg-[#0071E3] text-white shadow-sm"
                      : "mac-glass-subtle text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10"
                  }`}
                >
                  AI & ML
                </button>

                <button
                  onClick={() => setSelectedFilter("web")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedFilter === "web"
                      ? "bg-[#0071E3] text-white shadow-sm"
                      : "mac-glass-subtle text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10"
                  }`}
                >
                  Web Solutions
                </button>
              </div>
            </div>

            {/* Projects Grid */}
            {filteredProjects.length === 0 ? (
              <div className="p-12 text-center rounded-3xl mac-glass border border-black/[0.08] dark:border-white/12 space-y-3">
                <Search className="w-10 h-10 text-gray-400 mx-auto opacity-50" />
                <h4 className="text-base font-bold text-gray-800 dark:text-gray-200">
                  No matching projects found
                </h4>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Try clearing your search query or switching to "All" to browse the full archive.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedFilter("all");
                  }}
                  className="px-4 py-2 rounded-full bg-[#0071E3] text-white text-xs font-semibold shadow-sm"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
                {displayedProjects.map((project, index) => {
                  const isFeatured = index === 0 && !searchQuery && selectedFilter === "all";
                  return (
                    <div
                      key={project.id || index}
                      data-aos="fade-up"
                      data-aos-duration="800"
                      data-aos-delay={(index % 4) * 80}
                      className={isFeatured ? "col-span-full" : ""}
                    >
                      <CardProject
                        Img={project.Img}
                        Title={project.Title}
                        Description={project.Description}
                        Link={project.Link}
                        id={project.id}
                        isFeatured={isFeatured}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {/* Toggle Show More / Show Less */}
            {filteredProjects.length > initialItems && (
              <div className="pt-6 flex justify-center">
                <button
                  onClick={() => setShowAllProjects((prev) => !prev)}
                  className="px-6 py-3 rounded-full mac-glass text-gray-800 dark:text-[#f5f5f7] border border-black/[0.08] dark:border-white/15 text-sm font-semibold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-md"
                >
                  <span>{showAllProjects ? "Show Less" : `View All Projects (${filteredProjects.length})`}</span>
                  {showAllProjects ? (
                    <ChevronUp className="w-4 h-4 text-[#0071E3]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#0071E3]" />
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Accredited Certifications */}
        {activeTab === "certificates" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="p-4 px-6 rounded-2xl mac-glass-subtle border border-black/[0.06] dark:border-white/10 flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">
                Official Certifications & Professional Licenses
              </span>
              <span>Total: {certificates.length} credentials</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayedCertificates.map((certificate, index) => (
                <div
                  key={certificate.id || index}
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay={(index % 3) * 100}
                >
                  <Certificate
                    ImgSertif={certificate.Img}
                    Link={certificate.Link}
                  />
                </div>
              ))}
            </div>

            {certificates.length > initialItems && (
              <div className="pt-6 flex justify-center">
                <button
                  onClick={() => setShowAllCertificates((prev) => !prev)}
                  className="px-6 py-3 rounded-full mac-glass text-gray-800 dark:text-[#f5f5f7] border border-black/[0.08] dark:border-white/15 text-sm font-semibold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-md"
                >
                  <span>{showAllCertificates ? "Show Less" : `View All Certificates (${certificates.length})`}</span>
                  {showAllCertificates ? (
                    <ChevronUp className="w-4 h-4 text-[#0071E3]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#0071E3]" />
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Categorized Tech Arsenal & Tools */}
        {activeTab === "stack" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 gap-8">
              {TECH_CATEGORIES.map((category, catIndex) => {
                const Icon = category.icon;
                return (
                  <div
                    key={catIndex}
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-delay={catIndex * 100}
                    className="p-6 sm:p-8 rounded-[2.25rem] mac-glass border border-black/[0.08] dark:border-white/15 shadow-xl space-y-5"
                  >
                    <div className="flex items-center gap-3 pb-4 border-b border-black/[0.06] dark:border-white/10">
                      <div
                        className="p-2.5 rounded-2xl"
                        style={{
                          backgroundColor: `${category.color}15`,
                          color: category.color,
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-[#f5f5f7]">
                          {category.title}
                        </h3>
                        <span className="text-xs text-gray-500 dark:text-[#86868b]">
                          {category.stacks.length} technologies in this domain
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {category.stacks.map((tech, techIdx) => (
                        <TechStackIcon
                          key={techIdx}
                          TechStackIcon={tech.icon}
                          Language={tech.language}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}