import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("Home");
    
    const navItems = [
        { href: "#Home", label: "Home" },
        { href: "#About", label: "About" },
        { href: "#Portofolio", label: "Portofolio" },
        { href: "#Contact", label: "Contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            const sections = navItems.map(item => {
                const section = document.querySelector(item.href);
                if (section) {
                    return {
                        id: item.href.replace("#", ""),
                        offset: section.offsetTop - 300,
                        height: section.offsetHeight
                    };
                }
                return null;
            }).filter(Boolean);

            const currentPosition = window.scrollY;
            const active = sections.find(section => 
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
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const scrollToSection = (e, href) => {
        e.preventDefault();
        const section = document.querySelector(href);
        if (section) {
            const top = section.offsetTop - 80;
            window.scrollTo({
                top: top,
                behavior: "smooth"
            });
        }
        setIsOpen(false);
    };

    return (
        <nav
            className={`fixed w-full top-0 z-50 transition-all duration-500 font-sans selection:bg-[#0066CC] selection:text-white ${
                isOpen
                    ? "bg-[#000000]/95 backdrop-blur-3xl"
                    : scrolled
                    ? "bg-[#000000]/70 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                    : "bg-transparent"
            }`}
        >
            <div className="mx-auto px-6 sm:px-[6%] lg:px-[10%]">
                <div className="flex items-center justify-between h-20">
                    {/* Logo (Apple Branding Style) */}
                    <div className="flex-shrink-0 flex items-center gap-3">
                        <img
                            src="/logo_ni2.png"
                            alt="Logo"
                            className="w-7 h-7 object-contain rounded-lg"
                        />
                        <a
                            href="#Home"
                            onClick={(e) => scrollToSection(e, "#Home")}
                            className="text-lg font-semibold tracking-tight text-[#f5f5f7] hover:opacity-80 transition-opacity"
                        >
                            NIZAR<span className="text-[#0071E3]">.</span>
                        </a>
                    </div>
        
                    {/* Desktop Navigation (Apple Pill Style or Minimalist Menu) */}
                    <div className="hidden md:flex items-center space-x-1 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full px-4 py-1.5 shadow-[0_4px_20px_rgb(0,0,0,0.2)]">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => scrollToSection(e, item.href)}
                                className={`relative px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 ${
                                    activeSection === item.href.substring(1)
                                        ? "text-white bg-[#0071E3] shadow-[0_2px_10px_rgba(0,113,227,0.4)]"
                                        : "text-[#86868b] hover:text-[#f5f5f7] hover:bg-white/5"
                                }`}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
        
                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="relative p-2.5 rounded-full bg-white/5 border border-white/10 text-[#f5f5f7] hover:bg-white/10 transition-all duration-300"
                        >
                            {isOpen ? (
                                <X className="w-5 h-5 text-[#f5f5f7]" />
                            ) : (
                                <Menu className="w-5 h-5 text-[#f5f5f7]" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        
            {/* Mobile Menu Overlay */}
            <div
                className={`md:hidden fixed inset-x-0 top-20 bg-[#000000]/95 backdrop-blur-3xl border-b border-white/10 transition-all duration-500 ease-in-out ${
                    isOpen
                        ? "max-h-screen opacity-150 py-8 px-6 shadow-2xl"
                        : "max-h-0 opacity-0 overflow-hidden py-0 px-6"
                }`}
            >
                <div className="flex flex-col space-y-4">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={(e) => scrollToSection(e, item.href)}
                            className={`px-5 py-3 rounded-2xl text-base font-medium transition-all duration-300 ${
                                activeSection === item.href.substring(1)
                                    ? "bg-[#0071E3] text-white shadow-[0_4px_14px_rgba(0,113,227,0.3)]"
                                    : "text-[#86868b] hover:text-[#f5f5f7] hover:bg-white/5"
                            }`}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;