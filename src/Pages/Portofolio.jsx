import React, { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "../supabase";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-5 py-2.5
      text-gray-800 dark:text-[#f5f5f7]
      text-sm 
      font-semibold 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      mac-glass
      rounded-full
      border 
      border-black/[0.08] dark:border-white/15
      hover:scale-105
      active:scale-95
      shadow-md
    "
  >
    <span>{isShowingMore ? "Show Less" : "Show More"}</span>
    {isShowingMore ? (
      <ChevronUp className="w-4 h-4 text-[#0071E3]" />
    ) : (
      <ChevronDown className="w-4 h-4 text-[#0071E3]" />
    )}
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 2 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const techStacks = [
  { icon: "python.svg", language: "Python" },
  { icon: "java.svg", language: "Java" },
  { icon: "csharp.svg", language: "C#" },
  { icon: "cpp.svg", language: "C++" },
  { icon: "php.svg", language: "PHP" },
  { icon: "mysql.svg", language: "MySQL" },
  { icon: "mongodb.svg", language: "MongoDB" },
  { icon: "c.svg", language: "C" },
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "figma.svg", language: "Figma" },
  { icon: "github.svg", language: "GitHub" },
  { icon: "laravel.svg", language: "Laravel" },
  { icon: "git.svg", language: "Git" },
  { icon: "postgresql.svg", language: "PostgreSQL" },
  { icon: "supabase.svg", language: "Supabase" },
];

export default function FullWidthTabs() {
  const muiTheme = useMuiTheme();
  const { isDark } = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const swiperRef = useRef(null);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(newValue);
    }
  };

  const toggleShowMore = useCallback((type) => {
    if (type === "projects") {
      setShowAllProjects((prev) => !prev);
    } else {
      setShowAllCertificates((prev) => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects
    ? projects
    : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates
    ? certificates
    : certificates.slice(0, initialItems);

  return (
    <div
      className="min-h-screen font-sans px-6 sm:px-8 py-24 relative overflow-hidden selection:bg-[#0071E3] selection:text-white"
      id="Portofolio"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-14" data-aos="fade-up" data-aos-duration="1000">
          <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#0071E3] uppercase block mb-3">
            Applications & Skills
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-[#f5f5f7]">
            Portfolio Showcase.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-[#86868b] max-w-xl mx-auto flex items-center justify-center gap-2 font-normal">
            <Sparkles className="w-4 h-4 text-[#0071E3]" />
            Projects, accredited certifications, and technological toolbelt.
          </p>
        </div>

        <Box sx={{ width: "100%" }}>
          {/* macOS Segmented Control Tabs */}
          <AppBar
            position="static"
            elevation={0}
            sx={{
              bgcolor: isDark
                ? "rgba(22, 22, 28, 0.7)"
                : "rgba(255, 255, 255, 0.75)",
              backdropFilter: "blur(30px)",
              WebkitBackdropFilter: "blur(30px)",
              border: isDark
                ? "1px solid rgba(255, 255, 255, 0.12)"
                : "1px solid rgba(0, 0, 0, 0.08)",
              borderRadius: "24px",
              position: "relative",
              overflow: "hidden",
              boxShadow: isDark
                ? "0 20px 50px rgba(0,0,0,0.5)"
                : "0 10px 40px rgba(0,0,0,0.06)",
              transition: "all 0.3s ease",
            }}
            className="md:px-2"
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              sx={{
                minHeight: "68px",
                "& .MuiTab-root": {
                  fontSize: { xs: "0.85rem", md: "0.95rem" },
                  fontWeight: "600",
                  color: isDark ? "#8e8e93" : "#636366",
                  textTransform: "none",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  padding: "14px 0",
                  zIndex: 1,
                  margin: "6px",
                  borderRadius: "18px",
                  "&:hover": {
                    color: isDark ? "#ffffff" : "#1d1d1f",
                    backgroundColor: isDark
                      ? "rgba(255, 255, 255, 0.06)"
                      : "rgba(0, 0, 0, 0.04)",
                  },
                  "&.Mui-selected": {
                    color: "#ffffff !important",
                    backgroundColor: "#0071E3",
                    boxShadow: "0 4px 16px rgba(0,113,227,0.4)",
                    "& .lucide": {
                      color: "#ffffff",
                    },
                  },
                },
                "& .MuiTabs-indicator": {
                  height: 0,
                },
                "& .MuiTabs-flexContainer": {
                  gap: "4px",
                },
              }}
            >
              <Tab
                icon={<Code className="mb-1 w-4 h-4 transition-all duration-300" />}
                label="Projects"
                {...a11yProps(0)}
              />
              <Tab
                icon={<Award className="mb-1 w-4 h-4 transition-all duration-300" />}
                label="Certificates"
                {...a11yProps(1)}
              />
              <Tab
                icon={<Boxes className="mb-1 w-4 h-4 transition-all duration-300" />}
                label="Tech Stack"
                {...a11yProps(2)}
              />
            </Tabs>
          </AppBar>

          {/* Swiper Content Section */}
          <div className="mt-8">
            <Swiper
              ref={swiperRef}
              initialSlide={value}
              onSlideChange={(swiper) => setValue(swiper.activeIndex)}
              resistance={true}
              resistanceRatio={0.85}
              className="my-swiper"
            >
              {/* Slide 1: Projects */}
              <SwiperSlide>
                <TabPanel value={value} index={0} dir={muiTheme.direction}>
                  <div className="container mx-auto flex justify-center items-center overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-6 w-full">
                      {displayedProjects.map((project, index) => (
                        <div
                          key={project.id || index}
                          data-aos={
                            index % 3 === 0
                              ? "fade-up-right"
                              : index % 3 === 1
                              ? "fade-up"
                              : "fade-up-left"
                          }
                          data-aos-duration="1000"
                          className="h-full"
                        >
                          <CardProject
                            Img={project.Img}
                            Title={project.Title}
                            Description={project.Description}
                            Link={project.Link}
                            id={project.id}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  {projects.length > initialItems && (
                    <div className="mt-10 w-full flex justify-center">
                      <ToggleButton
                        onClick={() => toggleShowMore("projects")}
                        isShowingMore={showAllProjects}
                      />
                    </div>
                  )}
                </TabPanel>
              </SwiperSlide>

              {/* Slide 2: Certificates */}
              <SwiperSlide>
                <TabPanel value={value} index={1} dir={muiTheme.direction}>
                  <div className="container mx-auto flex justify-center items-center overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                      {displayedCertificates.map((certificate, index) => (
                        <div
                          key={certificate.id || index}
                          data-aos={
                            index % 3 === 0
                              ? "fade-up-right"
                              : index % 3 === 1
                              ? "fade-up"
                              : "fade-up-left"
                          }
                          data-aos-duration="1000"
                        >
                          <Certificate
                            ImgSertif={certificate.Img}
                            Link={certificate.Link}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  {certificates.length > initialItems && (
                    <div className="mt-10 w-full flex justify-center">
                      <ToggleButton
                        onClick={() => toggleShowMore("certificates")}
                        isShowingMore={showAllCertificates}
                      />
                    </div>
                  )}
                </TabPanel>
              </SwiperSlide>

              {/* Slide 3: Tech Stack */}
              <SwiperSlide>
                <TabPanel value={value} index={2} dir={muiTheme.direction}>
                  <div className="container mx-auto flex justify-center items-center overflow-hidden">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 w-full">
                      {techStacks.map((stack, index) => (
                        <div
                          key={index}
                          data-aos="zoom-in"
                          data-aos-duration="800"
                          data-aos-delay={index * 30}
                        >
                          <TechStackIcon
                            TechStackIcon={stack.icon}
                            Language={stack.language}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </TabPanel>
              </SwiperSlide>
            </Swiper>
          </div>
        </Box>
      </div>
    </div>
  );
}