import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send, Sparkles } from "lucide-react";
import SocialLinks from "../components/SocialLinks";
import Komentar from "../components/Commentar";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      once: false,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
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
      title: 'Mengirim Pesan...',
      html: 'Harap tunggu selagi kami mengirim pesan Anda',
      allowOutsideClick: false,
      background: '#1d1d1f',
      color: '#f5f5f7',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const formSubmitUrl = 'https://formsubmit.co/nizaram4dhan@gmail.com';
      
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('message', formData.message);
      submitData.append('_subject', 'Pesan Baru dari Website Portfolio');
      submitData.append('_captcha', 'false');
      submitData.append('_template', 'table');

      await axios.post(formSubmitUrl, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Swal.fire({
        title: 'Success!',
        text: 'Your message has been successfully sent!',
        icon: 'success',
        background: '#1d1d1f',
        color: '#f5f5f7',
        confirmButtonColor: '#0071E3',
        timer: 2000,
        timerProgressBar: true
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });

    } catch (error) {
      if (error.request && error.request.status === 0) {
        Swal.fire({
          title: 'Success!',
          text: 'Your message has been successfully sent!',
          icon: 'success',
          background: '#1d1d1f',
          color: '#f5f5f7',
          confirmButtonColor: '#0071E3',
          timer: 2000,
          timerProgressBar: true
        });

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        Swal.fire({
          title: 'Failed!',
          text: 'An error occurred. Please try again later.',
          icon: 'error',
          background: '#1d1d1f',
          color: '#f5f5f7',
          confirmButtonColor: '#0071E3'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#f5f5f7] font-sans px-6 sm:px-[6%] lg:px-[10%] py-20 relative selection:bg-[#0066CC] selection:text-white" id="Contact">
      
      {/* Apple-style Background Ambient Illumination */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[30%] left-[10%] w-[45vw] h-[45vw] rounded-full bg-blue-600/10 blur-[150px]" />
        <div className="absolute bottom-[20%] right-[5%] w-[45vw] h-[45vw] rounded-full bg-indigo-600/10 blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
          <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#0071E3] uppercase block mb-3">
            Get in Touch
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#f5f5f7]">
            Contact Me.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#86868b] max-w-xl mx-auto font-normal">
            Have a question or want to chat? Send me a message, and I’ll get back to you right away.
          </p>
        </div>

        {/* Main Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Form Card (Apple Glassmorphism Style) */}
          <div 
            className="lg:col-span-5 bg-[#1d1d1f]/60 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 p-6 sm:p-10 shadow-[0_30px_100px_rgba(0,0,0,0.6)] transition-all duration-500 hover:border-white/20"
            data-aos="fade-right"
            data-aos-duration="1100"
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#f5f5f7] mb-2">
                  Let's Talk
                </h3>
                <p className="text-sm text-[#86868b] font-normal">
                  Want to talk about something? Send a message and let's connect.
                </p>
              </div>
              <Share2 className="w-8 h-8 text-[#0071E3] opacity-80" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div data-aos="fade-up" data-aos-delay="100" className="relative group">
                <User className="absolute left-4 top-4 w-5 h-5 text-[#86868b] group-focus-within:text-[#0071E3] transition-colors" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-white/5 rounded-2xl border border-white/10 placeholder-[#86868b] text-[#f5f5f7] text-sm focus:outline-none focus:border-[#0071E3]/60 focus:bg-white/10 transition-all duration-300 disabled:opacity-50"
                  required
                />
              </div>

              <div data-aos="fade-up" data-aos-delay="200" className="relative group">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-[#86868b] group-focus-within:text-[#0071E3] transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-white/5 rounded-2xl border border-white/10 placeholder-[#86868b] text-[#f5f5f7] text-sm focus:outline-none focus:border-[#0071E3]/60 focus:bg-white/10 transition-all duration-300 disabled:opacity-50"
                  required
                />
              </div>

              <div data-aos="fade-up" data-aos-delay="300" className="relative group">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-[#86868b] group-focus-within:text-[#0071E3] transition-colors" />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full resize-none p-4 pl-12 bg-white/5 rounded-2xl border border-white/10 placeholder-[#86868b] text-[#f5f5f7] text-sm focus:outline-none focus:border-[#0071E3]/60 focus:bg-white/10 transition-all duration-300 h-36 disabled:opacity-50"
                  required
                />
              </div>

              <button
                data-aos="fade-up"
                data-aos-delay="400"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0071E3] hover:bg-[#0077ED] text-white py-4 rounded-full font-medium transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_14px_rgba(0,113,227,0.3)] active:scale-[0.98] flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/10 flex justify-center">
              <SocialLinks />
            </div>
          </div>

          {/* Comments Section (Apple Glassmorphism Style) */}
          <div 
            className="lg:col-span-7 bg-[#1d1d1f]/60 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 p-6 sm:p-10 shadow-[0_30px_100px_rgba(0,0,0,0.6)] transition-all duration-500 hover:border-white/20"
            data-aos="fade-left"
            data-aos-duration="1100"
          >
            <Komentar />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;