import React, { useState, useEffect } from "react";
import {
  Share2,
  User,
  Mail,
  MessageSquare,
  Send,
  Sparkles,
  Clock,
  MapPin,
  Check,
  Copy,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { WhatsApp } from "@mui/icons-material";
import SocialLinks from "../components/SocialLinks";
import Komentar from "../components/Commentar";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import MacWindowHeader from "../components/MacWindowHeader";
import { useTheme } from "../context/ThemeContext";

const TOPICS = [
  {
    id: "ml",
    label: "🚀 Machine Learning & AI",
    subject: "[Inquiry: Machine Learning & AI Project]",
    placeholder: "Hi Nizar, I'm reaching out regarding an AI/ML project or model development...",
  },
  {
    id: "web",
    label: "💻 Web System Development",
    subject: "[Inquiry: Fullstack Web Project]",
    placeholder: "Hi Nizar, I'd like to discuss developing a modern web application...",
  },
  {
    id: "collab",
    label: "🤝 Research & Collaboration",
    subject: "[Collaboration: Research & Academic]",
    placeholder: "Hi Nizar, I saw your portfolio and would like to collaborate on...",
  },
  {
    id: "general",
    label: "☕ Quick Chat / Hello",
    subject: "[General Inquiry / Networking]",
    placeholder: "Hi Nizar, just wanted to connect and say hello...",
  },
];

const ContactPage = () => {
  const { isDark } = useTheme();
  const [selectedTopic, setSelectedTopic] = useState("ml");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: TOPICS[0].subject,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    AOS.init({
      once: false,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    });
  }, []);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic.id);
    setFormData((prev) => ({
      ...prev,
      subject: topic.subject,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("nizaram4dhan@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: "Mengirim Pesan...",
      html: "Harap tunggu, pesan sedang dikirim ke inbox Nizar",
      allowOutsideClick: false,
      background: isDark ? "#1d1d24" : "#ffffff",
      color: isDark ? "#f5f5f7" : "#1d1d1f",
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const formSubmitUrl = "https://formsubmit.co/nizaram4dhan@gmail.com";

      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("_subject", formData.subject || "Pesan Baru Portfolio");
      submitData.append("message", formData.message);
      submitData.append("_captcha", "false");
      submitData.append("_template", "table");

      await axios.post(formSubmitUrl, submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        title: "Pesan Terkirim!",
        text: "Terima kasih! Pesan Anda telah sukses dikirimkan ke inbox saya.",
        icon: "success",
        background: isDark ? "#1d1d24" : "#ffffff",
        color: isDark ? "#f5f5f7" : "#1d1d1f",
        confirmButtonColor: "#0071E3",
        timer: 2500,
        timerProgressBar: true,
      });

      setFormData({
        name: "",
        email: "",
        subject: TOPICS[0].subject,
        message: "",
      });
    } catch (error) {
      if (error.request && error.request.status === 0) {
        Swal.fire({
          title: "Pesan Terkirim!",
          text: "Terima kasih! Pesan Anda telah sukses dikirimkan ke inbox saya.",
          icon: "success",
          background: isDark ? "#1d1d24" : "#ffffff",
          color: isDark ? "#f5f5f7" : "#1d1d1f",
          confirmButtonColor: "#0071E3",
          timer: 2500,
          timerProgressBar: true,
        });

        setFormData({
          name: "",
          email: "",
          subject: TOPICS[0].subject,
          message: "",
        });
      } else {
        Swal.fire({
          title: "Gagal Mengirim",
          text: "Terjadi gangguan jaringan, Anda dapat menghubungi via WhatsApp langsung.",
          icon: "error",
          background: isDark ? "#1d1d24" : "#ffffff",
          color: isDark ? "#f5f5f7" : "#1d1d1f",
          confirmButtonColor: "#0071E3",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentActivePlaceholder =
    TOPICS.find((t) => t.id === selectedTopic)?.placeholder ||
    "Write your message here...";

  return (
    <section
      className="min-h-screen font-sans px-6 sm:px-8 py-24 relative selection:bg-[#0071E3] selection:text-white"
      id="Contact"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center" data-aos="fade-up" data-aos-duration="1000">
          <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#0071E3] uppercase block mb-3">
            Direct Communication
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-[#f5f5f7]">
            Let's Build Something Exceptional.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-[#86868b] max-w-xl mx-auto font-normal flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#0071E3]" />
            Fast response times, transparent collaboration, and high-impact engineering.
          </p>
        </div>

        {/* Quick Availability & Direct Action Bar */}
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* Card 1: Availability Status */}
          <div className="p-5 rounded-3xl mac-glass border border-black/[0.08] dark:border-white/12 shadow-md flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400 block font-medium">
                  Current Status
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Available for Hire
                </span>
              </div>
            </div>
            <span className="text-[11px] font-mono-code text-gray-500">&lt; 2h Reply</span>
          </div>

          {/* Card 2: 1-Click WhatsApp Direct Chat */}
          <a
            href="https://wa.me/6285334646271?text=Halo%20Nizar,%20saya%20melihat%20portfolio%20Anda%20dan%20tertarik%20untuk%20berdiskusi..."
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-3xl mac-glass border border-black/[0.08] dark:border-white/12 shadow-md flex items-center justify-between group hover:border-[#25D366]/40 transition-all hover:scale-[1.02]"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] shrink-0">
                <WhatsApp className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400 block font-medium">
                  Instant Messaging
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#25D366] transition-colors">
                  WhatsApp Direct Chat
                </span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#25D366] transition-colors" />
          </a>

          {/* Card 3: 1-Click Email Copy */}
          <div
            onClick={copyEmail}
            className="p-5 rounded-3xl mac-glass border border-black/[0.08] dark:border-white/12 shadow-md flex items-center justify-between cursor-pointer group hover:border-[#0071E3]/40 transition-all hover:scale-[1.02]"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-[#0071E3]/10 flex items-center justify-center text-[#0071E3] shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="truncate">
                <span className="text-xs text-gray-500 dark:text-gray-400 block font-medium">
                  Official Email
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-white truncate block">
                  nizaram4dhan@gmail.com
                </span>
              </div>
            </div>
            <button
              className="p-2 rounded-xl mac-glass-subtle text-gray-500 group-hover:text-[#0071E3] transition-colors"
              title="Copy Email Address"
            >
              {copiedEmail ? (
                <Check className="w-4 h-4 text-emerald-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Main Grid: macOS Mail Compose & Messages Discussion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Window Card (macOS Mail Compose Window) - 7 Columns */}
          <div
            className="lg:col-span-7 mac-glass rounded-[2.5rem] border border-black/[0.08] dark:border-white/15 overflow-hidden shadow-2xl transition-all duration-500"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            {/* Window Chrome */}
            <MacWindowHeader title="New Message — Mail.app" icon={Mail} />

            <div className="p-6 sm:p-8 space-y-6">
              {/* Recipient Bar */}
              <div className="p-3.5 px-4 rounded-2xl mac-glass-subtle border border-black/[0.06] dark:border-white/10 flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2 truncate">
                  <span className="font-semibold text-gray-500">To:</span>
                  <span className="font-mono-code font-bold text-[#0071E3] truncate">
                    Nizar Rama &lt;nizaram4dhan@gmail.com&gt;
                  </span>
                </div>
                <span className="text-[11px] text-emerald-500 font-semibold hidden sm:inline">
                  Verified Inbound
                </span>
              </div>

              {/* 1-Tap Intent Selector (Topic Chips) */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-2.5">
                  Select Project Category / Intent:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {TOPICS.map((topic) => (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => handleTopicSelect(topic)}
                      className={`p-2.5 px-3 rounded-2xl text-xs font-semibold text-left transition-all flex items-center justify-between ${
                        selectedTopic === topic.id
                          ? "bg-[#0071E3] text-white shadow-sm"
                          : "mac-glass-subtle text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 border border-black/[0.06] dark:border-white/10"
                      }`}
                    >
                      <span className="truncate">{topic.label}</span>
                      {selectedTopic === topic.id && (
                        <Check className="w-3.5 h-3.5 shrink-0 ml-1" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Compose Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative group">
                    <User className="absolute left-4 top-3.5 w-4 h-4 text-gray-400 group-focus-within:text-[#0071E3] transition-colors" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full p-3.5 pl-11 bg-black/[0.03] dark:bg-white/5 rounded-2xl border border-black/[0.08] dark:border-white/10 placeholder-gray-400 text-gray-900 dark:text-[#f5f5f7] text-sm focus:outline-none focus:border-[#0071E3] transition-all disabled:opacity-50"
                      required
                    />
                  </div>

                  <div className="relative group">
                    <Mail className="absolute left-4 top-3.5 w-4 h-4 text-gray-400 group-focus-within:text-[#0071E3] transition-colors" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full p-3.5 pl-11 bg-black/[0.03] dark:bg-white/5 rounded-2xl border border-black/[0.08] dark:border-white/10 placeholder-gray-400 text-gray-900 dark:text-[#f5f5f7] text-sm focus:outline-none focus:border-[#0071E3] transition-all disabled:opacity-50"
                      required
                    />
                  </div>
                </div>

                <div className="relative group">
                  <MessageSquare className="absolute left-4 top-3.5 w-4 h-4 text-gray-400 group-focus-within:text-[#0071E3] transition-colors" />
                  <textarea
                    name="message"
                    placeholder={currentActivePlaceholder}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full resize-none p-3.5 pl-11 bg-black/[0.03] dark:bg-white/5 rounded-2xl border border-black/[0.08] dark:border-white/10 placeholder-gray-400 text-gray-900 dark:text-[#f5f5f7] text-sm focus:outline-none focus:border-[#0071E3] transition-all h-36 disabled:opacity-50"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0071E3] hover:bg-[#0077ED] text-white py-4 rounded-full font-bold transition-all duration-300 hover:scale-[1.01] shadow-[0_4px_16px_rgba(0,113,227,0.35)] active:scale-[0.98] flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Dispatching Message..." : "Dispatch Message to Nizar"}
                </button>
              </form>

              {/* Profiles Dock */}
              <div className="pt-6 border-t border-black/[0.06] dark:border-white/10">
                <SocialLinks />
              </div>
            </div>
          </div>

          {/* Comments / Discussion Window (macOS Messages.app) - 5 Columns */}
          <div
            className="lg:col-span-5 mac-glass rounded-[2.5rem] border border-black/[0.08] dark:border-white/15 overflow-hidden shadow-2xl transition-all duration-500"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <MacWindowHeader
              title="Community Thread — Messages.app"
              icon={MessageSquare}
              actions={
                <span className="text-[10px] font-mono-code font-bold uppercase text-gray-500">
                  Live Feed
                </span>
              }
            />

            <div className="p-6 sm:p-8">
              <Komentar />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;