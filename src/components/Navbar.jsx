import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Sparkles } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const { isDark, toggleTheme } = useTheme();

  const navItems = [
    { href: "#Home", label: "Home" },
    { href: "#About", label: "About" },
    { href: "#Portofolio", label: "Portfolio" },
    { href: "#Contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navItems
        .map((item) => {
          const section = document.querySelector(item.href);
          if (section) {
            return {
              id: item.href.replace("#", ""),
              offset: section.offsetTop - 250,
              height: section.offsetHeight,
            };
          }
          return null;
        })
        .filter(Boolean);

      const currentPosition = window.scrollY;
      const active = sections.find(
        (section) =>
          currentPosition >= section.offset &&
          currentPosition < section.offset + section.height
      );

      if (active) {
        setActiveSection(active.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const section = document.querySelector(href);
    if (section) {
      const top = section.offsetTop - 80;
      window.scrollTo({
        top: top,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-500 font-sans ${
        isOpen
          ? "bg-white/90 dark:bg-[#0c0c0e]/95 backdrop-blur-3xl border-b border-black/[0.08] dark:border-white/10"
          : scrolled
          ? "bg-white/75 dark:bg-[#0c0c0e]/75 backdrop-blur-2xl border-b border-black/[0.06] dark:border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-20">
          {/* macOS Brand Logo */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <a
              href="#Home"
              onClick={(e) => scrollToSection(e, "#Home")}
              className="flex items-center gap-3 group"
            >
              <div className="relative w-8 h-8 rounded-xl overflow-hidden p-[1px] bg-gradient-to-tr from-[#0071E3] to-sky-400 shadow-sm group-hover:scale-105 transition-transform duration-300">
                <img
                  src="/logo_ni2.png"
                  alt="Logo"
                  className="w-full h-full object-cover rounded-[11px] bg-white dark:bg-[#16161a]"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold tracking-tight text-gray-900 dark:text-[#f5f5f7] flex items-center gap-1 group-hover:text-[#0071E3] transition-colors">
                  NIZAR<span className="text-[#0071E3]">.</span>
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation (macOS Floating Glass Pill) */}
          <div className="hidden md:flex items-center space-x-1.5 p-1.5 rounded-full mac-dock transition-all duration-300">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`relative px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 select-none ${
                    isActive
                      ? "text-white bg-[#0071E3] shadow-[0_2px_12px_rgba(0,113,227,0.45)]"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Right Actions: Theme Switcher & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            {/* macOS Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark and Light Mode"
              className="relative p-2.5 rounded-full mac-glass hover:scale-105 active:scale-95 transition-all duration-300 group flex items-center justify-center border border-black/[0.08] dark:border-white/15"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                {isDark ? (
                  <Moon className="w-4 h-4 text-amber-300 transform group-hover:-rotate-12 transition-transform duration-300" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-500 transform group-hover:rotate-45 transition-transform duration-300" />
                )}
              </div>
            </button>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Open Navigation Menu"
                className="p-2.5 rounded-full mac-glass border border-black/[0.08] dark:border-white/15 text-gray-800 dark:text-[#f5f5f7] hover:scale-105 transition-all duration-300"
              >
                {isOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay (macOS Frosted Glass Sheet) */}
      <div
        className={`md:hidden fixed inset-x-0 top-20 bg-white/95 dark:bg-[#0c0c0e]/95 backdrop-blur-3xl border-b border-black/[0.08] dark:border-white/10 transition-all duration-500 ease-in-out ${
          isOpen
            ? "max-h-screen opacity-100 py-6 px-6 shadow-2xl"
            : "max-h-0 opacity-0 overflow-hidden py-0 px-6 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-3">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`px-5 py-3 rounded-2xl text-base font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-[#0071E3] text-white shadow-[0_4px_16px_rgba(0,113,227,0.35)]"
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {item.label}
              </a>
            );
          })}

          {/* Mobile Theme Toggle in Menu */}
          <div className="pt-3 border-t border-black/[0.06] dark:border-white/10 flex items-center justify-between px-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Appearance
            </span>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-4 py-2 rounded-full mac-glass text-xs font-semibold text-gray-800 dark:text-gray-200"
            >
              {isDark ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-amber-300" />
                  <span>Dark Glass</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Light Glass</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;