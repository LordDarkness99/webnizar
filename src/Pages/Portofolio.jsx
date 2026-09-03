import React, { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "../supabase";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useTheme } from "@mui/material/styles";
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
import { Code, Award, Boxes, Sparkles } from "lucide-react";

const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-5 py-2.5
      text-[#f5f5f7] 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-[#1d1d1f]/60 
      hover:bg-[#2d2d2f]/80
      rounded-full
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-2xl
      group
      relative
      overflow-hidden
      shadow-[0_4px_20px_rgb(0,0,0,0.2)]
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          text-[#0071E3]
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
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
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
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
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const swiperRef = useRef(null);
  
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({
      once: false,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const [projectsResponse, certificatesResponse] = await Promise.all([
        supabase.from("projects").select("*").order('id', { ascending: true }),
        supabase.from("certificates").select("*").order('id', { ascending: true }),
      ]);

      if (projectsResponse.error) throw projectsResponse.error;
      if (certificatesResponse.error) throw certificatesResponse.error;

      const projectData = (projectsResponse.data || []).map(p => ({
        id: p.id,
        Title: p.Title,
        Description: p.Description,
        Img: p.Img,
        Link: p.Link,
        Github: p.Github,
        TechStack: p.TechStack || [],
        Features: p.Features || [],
      }));

      const certificateData = (certificatesResponse.data || []).map(c => ({
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
    const cachedProjects = localStorage.getItem('projects');
    const cachedCertificates = localStorage.getItem('certificates');

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
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else {
      setShowAllCertificates(prev => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  return (
    <div className="min-h-screen bg-[#000000] text-[#f5f5f7] font-sans px-6 sm:px-[6%] lg:px-[10%] py-24 relative overflow-hidden selection:bg-[#0066CC] selection:text-white" id="Portofolio">
      
      {/* Apple-style Background Ambient Illumination */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-blue-600/10 blur-[150px]" />
        <div className="absolute bottom-[10%] right-[15%] w-[50vw] h-[50vw] rounded-full bg-indigo-600/10 blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
          <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#0071E3] uppercase block mb-3">
            Explore Work
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#f5f5f7]">
            Portfolio Showcase.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#86868b] max-w-xl mx-auto flex items-center justify-center gap-2 font-normal">
            <Sparkles className="w-4 h-4 text-[#0071E3]" />
            Projects, certifications, and technological stack milestones.
          </p>
        </div>

        <Box sx={{ width: "100%" }}>
          {/* Apple Glassmorphism Tab Bar */}
          <AppBar
            position="static"
            elevation={0}
            sx={{
              bgcolor: "rgba(29, 29, 31, 0.6)",
              backdropFilter: "blur(30px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "24px",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
            }}
            className="md:px-2"
          >
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              variant="fullWidth"
              sx={{
                minHeight: "72px",
                "& .MuiTab-root": {
                  fontSize: { xs: "0.85rem", md: "0.95rem" },
                  fontWeight: "500",
                  color: "#86868b",
                  textTransform: "none",
                  transition: "all 0.3s ease",
                  padding: "16px 0",
                  zIndex: 1,
                  margin: "6px",
                  borderRadius: "18px",
                  "&:hover": {
                    color: "#f5f5f7",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                  },
                  "&.Mui-selected": {
                    color: "#ffffff",
                    backgroundColor: "#0071E3",
                    boxShadow: "0 4px 14px rgba(0,113,227,0.4)",
                    fontWeight: "600",
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
                icon={<Code className="mb-1 w-4 h-4 transition-all duration-300 text-[#86868b]" />}
                label="Projects"
                {...a11yProps(0)}
              />
              <Tab
                icon={<Award className="mb-1 w-4 h-4 transition-all duration-300 text-[#86868b]" />}
                label="Certificates"
                {...a11yProps(1)}
              />
              <Tab
                icon={<Boxes className="mb-1 w-4 h-4 transition-all duration-300 text-[#86868b]" />}
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
              <SwiperSlide>
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <div className="container mx-auto flex justify-center items-center overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
                      {displayedProjects.map((project, index) => (
                        <div
                          key={project.id || index}
                          data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                          data-aos-duration="1000"
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
                    <div className="mt-8 w-full flex justify-start">
                      <ToggleButton
                        onClick={() => toggleShowMore('projects')}
                        isShowingMore={showAllProjects}
                      />
                    </div>
                  )}
                </TabPanel>
              </SwiperSlide>

              <SwiperSlide>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <div className="container mx-auto flex justify-center items-center overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {displayedCertificates.map((certificate, index) => (
                        <div
                          key={certificate.id || index}
                          data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                          data-aos-duration="1000"
                        >
                          <Certificate ImgSertif={certificate.Img} Link={certificate.Link} />
                        </div>
                      ))}
                    </div>
                  </div>
                  {certificates.length > initialItems && (
                    <div className="mt-8 w-full flex justify-start">
                      <ToggleButton
                        onClick={() => toggleShowMore('certificates')}
                        isShowingMore={showAllCertificates}
                      />
                    </div>
                  )}
                </TabPanel>
              </SwiperSlide>

              <SwiperSlide>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  <div className="container mx-auto flex justify-center items-center overflow-hidden pb-12">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 w-full">
                      {techStacks.map((stack, index) => (
                        <div
                          key={index}
                          data-aos="fade-up"
                          data-aos-duration="800"
                          data-aos-delay={index * 30}
                        >
                          <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
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