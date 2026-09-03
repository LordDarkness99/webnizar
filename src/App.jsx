import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import Portofolio from "./Pages/Portofolio";
import ContactPage from "./Pages/Contact";
import ProjectDetails from "./components/ProjectDetail";
import WelcomeScreen from "./Pages/WelcomeScreen";
import { AnimatePresence } from 'framer-motion';
import NotFoundPage from "./Pages/404";

const LandingPage = ({ showWelcome, setShowWelcome }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <div className="bg-[#000000] text-[#f5f5f7] font-sans selection:bg-[#0066CC] selection:text-white">
          <Navbar />
          <AnimatedBackground />
          <Home />
          <About />
          <Portofolio />
          <ContactPage />
          
          {/* Apple-style Footer */}
          <footer className="w-full bg-[#000000] border-t border-white/10 py-8 px-6 sm:px-[6%] lg:px-[10%] relative z-10">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <span className="text-xs sm:text-sm text-[#86868b] font-normal">
                © {new Date().getFullYear()}{" "}
                <a href="https://webnizar.vercel.app/" className="hover:text-[#f5f5f7] transition-colors font-medium">
                  Nizar Rama™
                </a>
                . All Rights Reserved.
              </span>
              <div className="flex items-center gap-6 text-xs text-[#86868b]">
                <a href="#Home" className="hover:text-[#f5f5f7] transition-colors">Privacy</a>
                <a href="#Home" className="hover:text-[#f5f5f7] transition-colors">Terms</a>
                <a href="#Contact" className="hover:text-[#f5f5f7] transition-colors">Support</a>
              </div>
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

const ProjectPageLayout = () => (
  <div className="min-h-screen bg-[#000000] text-[#f5f5f7] font-sans selection:bg-[#0066CC] selection:text-white">
    <ProjectDetails />
    
    {/* Apple-style Footer */}
    <footer className="w-full bg-[#000000] border-t border-white/10 py-8 px-6 sm:px-[6%] lg:px-[10%] relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <span className="text-xs sm:text-sm text-[#86868b] font-normal">
          © {new Date().getFullYear()}{" "}
          <a href="https://webnizar.vercel.app/" className="hover:text-[#f5f5f7] transition-colors font-medium">
            Nizar Rama™
          </a>
          . All Rights Reserved.
        </span>
        <div className="flex items-center gap-6 text-xs text-[#86868b]">
          <a href="/" className="hover:text-[#f5f5f7] transition-colors">Home</a>
          <a href="/#Portofolio" className="hover:text-[#f5f5f7] transition-colors">Projects</a>
        </div>
      </div>
    </footer>
  </div>
);

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />} />
        <Route path="/project/:id" element={<ProjectPageLayout />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;