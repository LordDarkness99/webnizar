import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import Portofolio from "./Pages/Portofolio";
import ContactPage from "./Pages/Contact";
import ProjectDetails from "./components/ProjectDetail";
import WelcomeScreen from "./Pages/WelcomeScreen";
import { AnimatePresence } from "framer-motion";
import NotFoundPage from "./Pages/404";
import { ThemeProvider } from "./context/ThemeContext";

const LandingPage = ({ showWelcome, setShowWelcome }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <div className="min-h-screen text-gray-900 dark:text-[#f5f5f7] font-sans selection:bg-[#0071E3] selection:text-white transition-colors duration-500">
          <Navbar />
          <AnimatedBackground />
          <main className="relative z-10">
            <Home />
            <About />
            <Portofolio />
            <ContactPage />
          </main>

          {/* macOS Glass Footer Bar */}
          <footer className="w-full mac-glass border-t border-black/[0.08] dark:border-white/10 py-8 px-6 sm:px-8 relative z-10 transition-colors duration-500">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs sm:text-sm text-gray-600 dark:text-[#86868b] font-normal">
                  © {new Date().getFullYear()}{" "}
                  <a
                    href="https://webnizar.vercel.app/"
                    className="hover:text-[#0071E3] dark:hover:text-white transition-colors font-semibold"
                  >
                    Nizar Rama™
                  </a>
                  . Designed with macOS Glass UI.
                </span>
              </div>
              <div className="flex items-center gap-6 text-xs text-gray-500 dark:text-[#86868b]">
                <a href="#Home" className="hover:text-[#0071E3] dark:hover:text-white transition-colors">
                  Home
                </a>
                <a href="#About" className="hover:text-[#0071E3] dark:hover:text-white transition-colors">
                  About
                </a>
                <a href="#Portofolio" className="hover:text-[#0071E3] dark:hover:text-white transition-colors">
                  Portfolio
                </a>
                <a href="#Contact" className="hover:text-[#0071E3] dark:hover:text-white transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

const ProjectPageLayout = () => (
  <div className="min-h-screen text-gray-900 dark:text-[#f5f5f7] font-sans selection:bg-[#0071E3] selection:text-white transition-colors duration-500">
    <Navbar />
    <AnimatedBackground />
    <main className="relative z-10">
      <ProjectDetails />
    </main>

    {/* macOS Glass Footer Bar */}
    <footer className="w-full mac-glass border-t border-black/[0.08] dark:border-white/10 py-8 px-6 sm:px-8 relative z-10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <span className="text-xs sm:text-sm text-gray-600 dark:text-[#86868b] font-normal">
          © {new Date().getFullYear()}{" "}
          <a
            href="https://webnizar.vercel.app/"
            className="hover:text-[#0071E3] dark:hover:text-white transition-colors font-semibold"
          >
            Nizar Rama™
          </a>
          . All Rights Reserved.
        </span>
        <div className="flex items-center gap-6 text-xs text-gray-500 dark:text-[#86868b]">
          <a href="/" className="hover:text-[#0071E3] dark:hover:text-white transition-colors">
            Home
          </a>
          <a href="/#Portofolio" className="hover:text-[#0071E3] dark:hover:text-white transition-colors">
            Projects
          </a>
        </div>
      </div>
    </footer>
  </div>
);

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                showWelcome={showWelcome}
                setShowWelcome={setShowWelcome}
              />
            }
          />
          <Route path="/project/:id" element={<ProjectPageLayout />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;