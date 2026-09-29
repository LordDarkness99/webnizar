import React from "react";
import { Linkedin, Github, Instagram, ExternalLink } from "lucide-react";

const socialLinks = [
  {
    name: "LinkedIn",
    displayName: "LinkedIn Profile",
    subText: "Nizar Alif Ramadhan",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/nizar-alif-ramadhan-5ba1a2315/",
    color: "#0A66C2",
    badge: "Professional Network",
  },
  {
    name: "GitHub",
    displayName: "GitHub Repositories",
    subText: "@LordDarkness99",
    icon: Github,
    url: "https://github.com/LordDarkness99",
    color: "#181717",
    badge: "Code Repositories",
  },
  {
    name: "Instagram",
    displayName: "Instagram Social",
    subText: "@nizar.ramm",
    icon: Instagram,
    url: "https://www.instagram.com/nizar.ramm?igsh=MWg2ODRoOXg5Zm4x",
    color: "#E4405F",
    badge: "Personal Updates",
  },
];

const SocialLinks = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Verified Profiles & Channels
        </span>
        <span className="text-[11px] text-[#0071E3] font-medium">Direct Links</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-2xl mac-glass-subtle border border-black/[0.06] dark:border-white/10 hover:border-[#0071E3]/50 hover:bg-[#0071E3]/5 dark:hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] flex items-center justify-between"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2.5 rounded-xl bg-black/[0.04] dark:bg-white/10 text-gray-800 dark:text-[#f5f5f7] group-hover:text-[#0071E3] transition-colors shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col truncate">
                  <span className="text-xs font-bold text-gray-800 dark:text-[#f5f5f7] truncate group-hover:text-[#0071E3] transition-colors">
                    {link.displayName}
                  </span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                    {link.subText}
                  </span>
                </div>
              </div>

              <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0071E3] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1.5" />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SocialLinks;