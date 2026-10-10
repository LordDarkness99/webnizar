import React, { useState } from "react";
import {
  History,
  FileText,
  Users,
  Megaphone,
  LineChart,
  ShoppingBag,
  Store,
  ExternalLink,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronsUpDown,
  Check,
  ChevronRight,
  Plus,
  Pipette,
  Type,
  Bold,
  Italic,
  Underline,
  Droplet,
  Menu,
} from "lucide-react";

const MacDashboardBox = ({ className = "" }) => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const navItems = [
    { name: "Dashboard", icon: History, hasDropdown: false },
    { name: "Content", icon: FileText, hasDropdown: true },
    { name: "Community", icon: Users, hasDropdown: true },
    { name: "Marketing", icon: Megaphone, hasDropdown: true },
    { name: "Analytics", icon: LineChart, hasDropdown: true },
    { name: "Sales", icon: ShoppingBag, hasDropdown: true },
    { name: "Storefront", icon: Store, isExternal: true },
  ];

  return (
    <div
      className={`w-full bg-[#F6F7F9] dark:bg-[#121319] text-gray-800 dark:text-gray-100 rounded-xl border border-gray-200/80 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.12)] overflow-hidden font-sans select-none flex flex-col md:flex-row text-xs transition-all ${className}`}
    >
      {/* Left Sidebar */}
      <div className="w-full md:w-52 lg:w-56 shrink-0 bg-[#FAFAFC] dark:bg-[#161720] border-b md:border-b-0 md:border-r border-gray-200/70 dark:border-white/10 p-3 sm:p-4 flex flex-col justify-between">
        <div>
          {/* Mac Window Traffic Lights */}
          <div className="flex items-center gap-2 mb-4 px-1">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/60 shadow-xs" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA124]/60 shadow-xs" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/60 shadow-xs" />
          </div>

          {/* User Profile Selector Header */}
          <div className="flex items-center justify-between px-2 py-1.5 mb-3 rounded-xl hover:bg-gray-200/50 dark:hover:bg-white/5 cursor-pointer transition-colors group">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-pink-300 via-rose-300 to-amber-200 flex items-center justify-center overflow-hidden shrink-0 border border-white/80 shadow-xs">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Ryan Schnelzer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <span className="font-medium text-xs text-gray-800 dark:text-gray-200 truncate">
                Ryan Schnelzer
              </span>
            </div>
            <ChevronsUpDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 shrink-0" />
          </div>

          {/* Navigation Items */}
          <nav className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                    isActive
                      ? "bg-gray-200/80 dark:bg-white/10 font-semibold text-gray-900 dark:text-white shadow-xs"
                      : "font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-gray-900 dark:text-white" : "text-gray-400"}`} />
                    <span className="truncate">{item.name}</span>
                  </div>
                  {item.hasDropdown && (
                    <ChevronDown className="w-3 h-3 text-gray-400 shrink-0" />
                  )}
                  {item.isExternal && (
                    <ExternalLink className="w-3 h-3 text-gray-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-3 mt-3 border-t border-gray-200/60 dark:border-white/5 space-y-0.5">
          <button className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
            <Settings className="w-3.5 h-3.5 text-gray-400" />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
            <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
            <span>Help</span>
          </button>
        </div>
      </div>

      {/* Main Right Area */}
      <div className="flex-1 p-4 sm:p-5 lg:p-6 bg-[#F4F5F7] dark:bg-[#111217] space-y-4 overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-800">
        {/* Top Header */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
            Dashboard
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            What would you like to do today?
          </p>
        </div>

        {/* Card 1: Getting Started */}
        <div className="bg-white dark:bg-[#181922] rounded-2xl p-4 sm:p-4 border border-gray-200/70 dark:border-white/5 shadow-xs space-y-3">
          <div>
            <h3 className="text-xs font-bold text-gray-900 dark:text-white">
              Getting started
            </h3>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
              Complete these 4 steps to get a head start
            </p>
          </div>

          <div className="space-y-2 pt-1 text-xs">
            {/* Step 1 */}
            <div className="flex items-center justify-between py-1 border-b border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Add content</span>
              </div>
              <span className="text-[11px] text-gray-400 dark:text-gray-500">Completed</span>
            </div>

            {/* Step 2 */}
            <div className="flex items-center justify-between py-1 border-b border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Invite your team</span>
              </div>
              <span className="text-[11px] text-gray-400 dark:text-gray-500">Completed</span>
            </div>

            {/* Step 3 */}
            <div className="flex items-center justify-between py-1 border-b border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-medium">
                <span className="w-3.5 h-3.5 flex items-center justify-center text-[10px] text-gray-500">3</span>
                <span>Connect payments</span>
              </div>
              <button className="flex items-center gap-0.5 font-semibold text-gray-900 dark:text-white hover:text-[#0066FF] dark:hover:text-[#0066FF] transition-colors cursor-pointer text-xs">
                Connect <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Step 4 */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-medium">
                <span className="w-3.5 h-3.5 flex items-center justify-center text-[10px] text-gray-500">4</span>
                <span>Customize Storefront</span>
              </div>
              <button className="flex items-center gap-0.5 font-semibold text-gray-900 dark:text-white hover:text-[#0066FF] dark:hover:text-[#0066FF] transition-colors cursor-pointer text-xs">
                Customize <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: Book your personalized video call */}
        <div className="bg-white dark:bg-[#181922] rounded-2xl p-4 sm:p-5 border border-gray-200/70 dark:border-white/5 shadow-xs relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="relative z-10 max-w-xs">
            <h3 className="text-xs font-bold text-gray-900 dark:text-white">
              Book your personalized video call
            </h3>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 mb-3 leading-relaxed">
              You'll get a 30 minute product tour to ensure your set-up goes smoothly
            </p>
            <div className="flex items-center gap-2">
              <button className="bg-[#0066FF] hover:bg-[#0052CC] text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg shadow-xs transition-all flex items-center gap-1 cursor-pointer">
                Schedule time <ChevronRight className="w-3 h-3" />
              </button>
              <button className="bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 text-gray-700 dark:text-gray-300 text-[11px] font-medium px-3 py-1.5 rounded-lg transition-all cursor-pointer">
                Learn more
              </button>
            </div>
          </div>

          {/* Avatars Cluster Illustration */}
          <div className="relative w-full sm:w-44 h-24 sm:h-28 shrink-0 flex items-center justify-center overflow-hidden">
            {/* Background Pastel Circles with Avatars */}
            <div className="relative w-36 h-24">
              {/* Green Circle */}
              <div className="absolute top-0 right-10 w-9 h-9 rounded-full bg-[#D8F3DC] flex items-center justify-center shadow-xs border border-white/60">
                <span className="text-sm">👨‍💻</span>
              </div>
              {/* Pink Circle */}
              <div className="absolute top-2 right-1 w-10 h-10 rounded-full bg-[#FFD6A5] flex items-center justify-center shadow-xs border border-white/60">
                <span className="text-sm">👩‍🦰</span>
              </div>
              {/* Purple Big Circle */}
              <div className="absolute top-3 left-10 w-12 h-12 rounded-full bg-[#E8DFF5] flex items-center justify-center shadow-sm border-2 border-white">
                <span className="text-base">🧔‍♂️</span>
              </div>
              {/* Peach Left Circle */}
              <div className="absolute top-6 left-0 w-8 h-8 rounded-full bg-[#FCF6BD] flex items-center justify-center shadow-xs border border-white/60">
                <span className="text-xs">👧</span>
              </div>
              {/* Coral Circle Bottom */}
              <div className="absolute bottom-0 left-8 w-9 h-9 rounded-full bg-[#FFADAD] flex items-center justify-center shadow-xs border border-white/60">
                <span className="text-xs">👨🏻</span>
              </div>
              {/* Blue Circle Right */}
              <div className="absolute bottom-1 right-2 w-9 h-9 rounded-full bg-[#CAFFBF] flex items-center justify-center shadow-xs border border-white/60">
                <span className="text-xs">👦</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: New Page Builder */}
        <div className="bg-white dark:bg-[#181922] rounded-2xl p-4 sm:p-5 border border-gray-200/70 dark:border-white/5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="max-w-xs">
            <h3 className="text-xs font-bold text-gray-900 dark:text-white">
              New Page Builder
            </h3>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 mb-3 leading-relaxed">
              Unlock now design possibilities and experience the evolution of page creation
            </p>
            <div className="flex items-center gap-2">
              <button className="bg-[#0066FF] hover:bg-[#0052CC] text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg shadow-xs transition-all flex items-center gap-1 cursor-pointer">
                Try it out <ChevronRight className="w-3 h-3" />
              </button>
              <button className="bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 text-gray-700 dark:text-gray-300 text-[11px] font-medium px-3 py-1.5 rounded-lg transition-all cursor-pointer">
                Learn more
              </button>
            </div>
          </div>

          {/* Mini Formatting Widget Demo */}
          <div className="w-full sm:w-auto flex items-center gap-3 justify-end">
            <div className="flex flex-col items-center gap-2">
              {/* Rich Text Toolbar */}
              <div className="bg-[#1C2333] text-white px-2.5 py-1 rounded-lg flex items-center gap-2 text-[10px] shadow-sm">
                <span className="font-serif font-bold text-xs">T</span>
                <span className="font-bold">B</span>
                <span className="italic">I</span>
                <span className="underline">U</span>
                <Droplet className="w-2.5 h-2.5 text-blue-400" />
                <Menu className="w-2.5 h-2.5 text-gray-300" />
              </div>

              {/* Blurred Placeholder */}
              <div className="w-20 h-1.5 bg-gray-200 dark:bg-white/10 rounded-full" />

              {/* Color Swatch Toolbar */}
              <div className="bg-gray-50 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 px-2 py-1 rounded-full flex items-center gap-1.5">
                <Pipette className="w-2.5 h-2.5 text-gray-500" />
                <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
                <div className="w-2 h-2 rounded-full bg-[#0066FF]" />
                <div className="w-2 h-2 rounded-full bg-[#9C27B0]" />
              </div>
            </div>

            {/* Right Plus Box */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 dark:bg-white/5 rounded-xl border border-dashed border-gray-300 dark:border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-400 transition-colors cursor-pointer shrink-0">
              <Plus className="w-5 h-5 font-light" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacDashboardBox;
