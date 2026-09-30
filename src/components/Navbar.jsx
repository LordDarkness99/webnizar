import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Sun,
  Moon,
  Home,
  User,
  Briefcase,
  Mail,
  FileText,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import WhatsAppIcon from "./icons/WhatsAppIcon";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const { isDark, toggleTheme } = useTheme();

  const navItems = [
    { href: "#Home", label: "Home", icon: Home },
    { href: "#About", label: "About", icon: User },
    { href: "#Portofolio", label: "Portfolio", icon: Briefcase },
    { href: "#Contact", label: "Contact", icon: Mail },
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
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
      className={`fixed w-full top-0 z-50 transition-all duration-300 font-sans ${
        isOpen
          ? "bg-white/95 dark:bg-[#09090c]/95 backdrop-blur-3xl border-b border-black/[0.08] dark:border-white/10"
          : scrolled
          ? "bg-white/80 dark:bg-[#070709]/80 backdrop-blur-2xl border-b border-black/[0.06] dark:border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* macOS Brand Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a
              href="#Home"
              onClick={(e) => scrollToSection(e, "#Home")}
              className="flex items-center gap-2.5 sm:gap-3 group"
            >
              <div className="relative w-8 h-8 rounded-xl overflow-hidden p-[1px] bg-gradient-to-tr from-[#0071E3] to-sky-400 shadow-sm group-hover:scale-105 transition-transform duration-300 shrink-0">
                <img
                  src="/logo_ni2.png"
                  alt="Nizar Logo"
                  className="w-full h-full object-cover rounded-[11px] bg-white dark:bg-[#16161a]"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-bold tracking-tight text-gray-900 dark:text-[#f5f5f7] flex items-center gap-0.5 group-hover:text-[#0071E3] transition-colors">
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
                  className={`relative px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 select-none ${
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

          {/* Right Actions: Theme Toggle & Hamburger Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* macOS Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark and Light Mode"
              className="w-10 h-10 rounded-full mac-glass hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center border border-black/[0.08] dark:border-white/15"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                {isDark ? (
                  <Moon className="w-4 h-4 text-amber-300 hover:rotate-12 transition-transform duration-300" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-500 hover:rotate-45 transition-transform duration-300" />
                )}
              </div>
            </button>

            {/* Mobile Hamburger Menu Button (Prominent & Always Accessible) */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Navigation Menu"
                className={`w-10 h-10 rounded-full mac-glass border flex items-center justify-center transition-all duration-300 active:scale-90 ${
                  isOpen
                    ? "bg-[#0071E3] text-white border-transparent shadow-[0_2px_10px_rgba(0,113,227,0.4)]"
                    : "border-black/[0.08] dark:border-white/15 text-gray-800 dark:text-[#f5f5f7] hover:scale-105"
                }`}
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

      {/* Mobile Menu Drawer (Full-Height Scrollable Frosted Glass Sheet) */}
      <div
        className={`md:hidden fixed inset-x-0 top-20 h-[calc(100dvh-5rem)] bg-white/95 dark:bg-[#070709]/95 backdrop-blur-3xl border-b border-black/[0.08] dark:border-white/10 transition-all duration-400 ease-in-out flex flex-col justify-between overflow-y-auto px-5 py-6 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        {/* Navigation Links Group */}
        <div className="space-y-4">
          <div className="px-2 pb-2">
            <span className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              macOS Quick Navigation
            </span>
          </div>

          <div className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`px-4 py-3.5 rounded-2xl text-base font-semibold transition-all duration-300 flex items-center justify-between ${
                    isActive
                      ? "bg-[#0071E3] text-white shadow-[0_4px_16px_rgba(0,113,227,0.35)]"
                      : "text-gray-800 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5 border border-black/[0.04] dark:border-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-xl ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-black/[0.04] dark:bg-white/10 text-[#0071E3]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 ${
                      isActive ? "text-white" : "text-gray-400"
                    }`}
                  />
                </a>
              );
            })}
          </div>

          {/* Quick Action Shortcuts inside Mobile Menu */}
          <div className="pt-4 border-t border-black/[0.06] dark:border-white/10 space-y-2.5">
            <span className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 px-2 block">
              Quick Actions
            </span>

            <div className="grid grid-cols-2 gap-2">
              <a
                href="https://drive.google.com/file/d/1Ijs8s1XyiRPn5DL8Y9CKl6UeVFo9PudM/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="p-3 rounded-2xl mac-glass-subtle border border-black/[0.06] dark:border-white/10 flex items-center gap-2 text-xs font-semibold text-gray-800 dark:text-gray-200 hover:text-[#0071E3]"
              >
                <FileText className="w-4 h-4 text-[#0071E3] shrink-0" />
                <span className="truncate">Download CV</span>
              </a>

              <a
                href="https://wa.me/6285334646271?text=Halo%20Nizar,%20saya%20tertarik%20berdiskusi..."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="p-3 rounded-2xl mac-glass-subtle border border-black/[0.06] dark:border-white/10 flex items-center gap-2 text-xs font-semibold text-gray-800 dark:text-gray-200 hover:text-[#25D366]"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
                <span className="truncate">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Drawer Bar: Appearance & Credits */}
        <div className="pt-6 pb-2 border-t border-black/[0.06] dark:border-white/10 space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
              Appearance Theme
            </span>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full mac-glass border border-black/[0.08] dark:border-white/15 text-xs font-semibold text-gray-800 dark:text-gray-200 shadow-sm"
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

          <div className="text-center text-[11px] text-gray-400 dark:text-gray-500">
            Nizar Rama™ • macOS Ventura Glass Portfolio
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;