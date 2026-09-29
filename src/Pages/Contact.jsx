import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send, Sparkles } from "lucide-react";
import SocialLinks from "../components/SocialLinks";
import Komentar from "../components/Commentar";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import MacWindowHeader from "../components/MacWindowHeader";
import { useTheme } from "../context/ThemeContext";

const ContactPage = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      once: false,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: "Mengirim Pesan...",
      html: "Harap tunggu selagi kami mengirim pesan Anda",
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
      submitData.append("message", formData.message);
      submitData.append("_subject", "Pesan Baru dari Website Portfolio");
      submitData.append("_captcha", "false");
      submitData.append("_template", "table");

      await axios.post(formSubmitUrl, submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        title: "Pesan Terkirim!",
        text: "Pesan Anda berhasil dikirimkan.",
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
        message: "",
      });
    } catch (error) {
      if (error.request && error.request.status === 0) {
        Swal.fire({
          title: "Pesan Terkirim!",
          text: "Pesan Anda berhasil dikirimkan.",
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
          message: "",
        });
      } else {
        Swal.fire({
          title: "Gagal Mengirim",
          text: "Terjadi kesalahan, silakan coba lagi nanti.",
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

  return (
    <div
      className="min-h-screen font-sans px-6 sm:px-8 py-24 relative selection:bg-[#0071E3] selection:text-white"
      id="Contact"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
          <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#0071E3] uppercase block mb-3">
            Communication Center
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-[#f5f5f7]">
            Get In Touch.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-[#86868b] max-w-xl mx-auto font-normal flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#0071E3]" />
            Have a project in mind, query, or collaboration? Drop me a message.
          </p>
        </div>

        {/* Main Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Window Card (macOS Mail Compose Window) */}
          <div
            className="lg:col-span-5 mac-glass rounded-[2rem] border border-black/[0.08] dark:border-white/15 overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.005]"
            data-aos="fade-right"
            data-aos-duration="1100"
          >
            {/* macOS Window Titlebar with Traffic Lights */}
            <MacWindowHeader title="New Message — Mail.app" icon={Mail} />

            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-[#f5f5f7] mb-1">
                    Send a Message
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-[#86868b] font-normal">
                    Direct communication to my personal inbox.
                  </p>
                </div>
                <div className="p-2.5 rounded-2xl bg-[#0071E3]/10 dark:bg-white/10 text-[#0071E3]">
                  <Share2 className="w-5 h-5" />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div data-aos="fade-up" data-aos-delay="100" className="relative group">
                  <User className="absolute left-4 top-4 w-4 h-4 text-gray-400 group-focus-within:text-[#0071E3] transition-colors" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full p-3.5 pl-11 bg-black/[0.03] dark:bg-white/5 rounded-2xl border border-black/[0.08] dark:border-white/10 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-[#f5f5f7] text-sm focus:outline-none focus:border-[#0071E3] focus:bg-white dark:focus:bg-white/10 transition-all duration-300 disabled:opacity-50"
                    required
                  />
                </div>

                <div data-aos="fade-up" data-aos-delay="200" className="relative group">
                  <Mail className="absolute left-4 top-4 w-4 h-4 text-gray-400 group-focus-within:text-[#0071E3] transition-colors" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full p-3.5 pl-11 bg-black/[0.03] dark:bg-white/5 rounded-2xl border border-black/[0.08] dark:border-white/10 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-[#f5f5f7] text-sm focus:outline-none focus:border-[#0071E3] focus:bg-white dark:focus:bg-white/10 transition-all duration-300 disabled:opacity-50"
                    required
                  />
                </div>

                <div data-aos="fade-up" data-aos-delay="300" className="relative group">
                  <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-gray-400 group-focus-within:text-[#0071E3] transition-colors" />
                  <textarea
                    name="message"
                    placeholder="Type your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full resize-none p-3.5 pl-11 bg-black/[0.03] dark:bg-white/5 rounded-2xl border border-black/[0.08] dark:border-white/10 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-[#f5f5f7] text-sm focus:outline-none focus:border-[#0071E3] focus:bg-white dark:focus:bg-white/10 transition-all duration-300 h-32 disabled:opacity-50"
                    required
                  />
                </div>

                <button
                  data-aos="fade-up"
                  data-aos-delay="400"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0071E3] hover:bg-[#0077ED] text-white py-3.5 rounded-full font-semibold transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_16px_rgba(0,113,227,0.35)] active:scale-[0.98] flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>

              {/* Social Connect Dock Inside Window */}
              <div className="mt-8 pt-6 border-t border-black/[0.06] dark:border-white/10">
                <SocialLinks />
              </div>
            </div>
          </div>

          {/* Comments Window Card (macOS Messages / Discussion) */}
          <div
            className="lg:col-span-7 mac-glass rounded-[2rem] border border-black/[0.08] dark:border-white/15 overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.005]"
            data-aos="fade-left"
            data-aos-duration="1100"
          >
            <MacWindowHeader title="Discussion Board — Messages.app" icon={MessageSquare} />

            <div className="p-6 sm:p-8">
              <Komentar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;