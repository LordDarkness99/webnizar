import React from "react";
import { Linkedin, Github, Instagram, ExternalLink } from "lucide-react";

const socialLinks = [
  {
    name: "LinkedIn",
    displayName: "Connect on LinkedIn",
    subText: "Nizar Alif Ramadhan",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/nizar-alif-ramadhan-5ba1a2315/",
    color: "#0A66C2",
    isPrimary: true,
  },
  {
    name: "Instagram",
    displayName: "Instagram",
    subText: "@nizar.ramm",
    icon: Instagram,
    url: "https://www.instagram.com/nizar.ramm?igsh=MWg2ODRoOXg5Zm4x",
    color: "#E4405F",
  },
  {
    name: "GitHub",
    displayName: "GitHub",
    subText: "@LordDarkness99",
    icon: Github,
    url: "https://github.com/LordDarkness99",
    color: "#181717",
  },
  {
    name: "TikTok",
    displayName: "TikTok",
    subText: "@nizramlif",
    icon: ({ className, ...props }) => (
      <svg
        width="18px"
        height="18px"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        {...props}
      >
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.43c.06-.06.12-.13.18-.2a6.3 6.3 0 0 0 1.96-4.56V8.67a8.21 8.21 0 0 0 4.59 1.48v-3.46z" />
      </svg>
    ),
    url: "https://www.tiktok.com/@nizramlif?_r=1&_t=ZS-953xSVN66o0",
    color: "#000000",
  },
];

const SocialLinks = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-1.5 rounded-full bg-[#0071E3]" />
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Direct Channels
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-between p-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/10 hover:border-[#0071E3]/40 hover:bg-[#0071E3]/5 dark:hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-xl bg-black/[0.04] dark:bg-white/10 text-gray-800 dark:text-[#f5f5f7] group-hover:text-[#0071E3] transition-colors shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col truncate">
                  <span className="text-xs font-semibold text-gray-800 dark:text-[#f5f5f7] truncate group-hover:text-[#0071E3] transition-colors">
                    {link.displayName}
                  </span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                    {link.subText}
                  </span>
                </div>
              </div>

              <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0071E3] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1" />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SocialLinks;