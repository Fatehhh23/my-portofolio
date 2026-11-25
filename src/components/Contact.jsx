import React, { useState, useEffect, useRef } from 'react';
import {
  Mail,
  Send,
  MapPin,
  CheckCircle2,
  Copy,
  Github,
  Linkedin,
  Instagram,
} from 'lucide-react';
import rinjaniBg from '../assets/rinjani-bg.jpg';
import contactPhoto from '../assets/contact-photo.jpg';

export default function Contact({ lang = 'id' }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isId = lang === 'id';

  // ── Scroll-Reveal Observer saat scroll dari halaman Portfolio ke Contact ──
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else if (entry.boundingClientRect.top > window.innerHeight * 0.9) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('muhamadfatirizki@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  const socialLinks = [
    { label: 'GitHub', icon: Github, href: 'https://github.com/Fatehhh23' },
    { label: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/muhamad-fatih-rizqi-9437b7268' },
    { label: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/faatihrizqy?gwpx=aG8xM2swYmh6aW9l' },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-20 w-full overflow-hidden py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
    >
      {/* ── Background Gunung Rinjani & Danau Segara Anak ── */}
      <div className="absolute inset-0 -z-20 pointer-events-none overflow-hidden">
        <img
          src={rinjaniBg}
          alt="Gunung Rinjani & Segara Anak"
          style={{
            transform: isVisible ? 'scale(1.02)' : 'scale(1.08)',
            transition: 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#ebe2da]/20 via-slate-950/40 to-[#06070a]/90" />
      </div>

      {/* Top Silky Feathering: Menyatu dengan BG awan-awan Portfolio di atas */}
      <div className="absolute top-0 inset-x-0 h-28 sm:h-40 bg-gradient-to-b from-[#ebe2da] via-[#ebe2da]/55 to-transparent pointer-events-none -z-10" />

      {/* Bottom Feathering: Menyatu mulus ke Footer gelap */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#02040a] via-[#02040a]/60 to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Simple Clean White Section Header: "Hubungi Saya" ── */}
        <div
          style={{
            transitionDuration: '850ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className={`flex flex-col items-center text-center mb-10 sm:mb-14 transform transition-all ${
            isVisible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-10 scale-95'
          }`}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)] select-none">
            {isId ? 'Hubungi Saya' : 'Contact Me'}
          </h2>
        </div>

        {/* ── Dual Column Layout: iOS 18 Liquid Glass Panels ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7 items-stretch">
          {/* Left Column: Info Kontak + Bingkai Besar Foto & Sosmed iOS 18 (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-6">
            {/* Contact Details Card */}
            <div
              style={{
                transitionDelay: '120ms',
                transitionDuration: '850ms',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className={`rounded-[2rem] p-5 sm:p-6 space-y-3.5 bg-slate-950/55 backdrop-blur-2xl border border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)] transform transition-all ${
                isVisible
                  ? 'opacity-100 translate-y-0 translate-x-0'
                  : 'opacity-0 translate-y-10 -translate-x-6'
              }`}
            >
              <div className="flex items-center justify-between gap-2 p-3.5 rounded-2xl bg-white/[0.06] border border-white/15">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] text-white/60 block">
                      {isId ? 'Email Langsung' : 'Direct Email'}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white truncate block">
                      muhamadfatirizki@gmail.com
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-xs text-white flex items-center gap-1.5 transition-all cursor-pointer select-none active:scale-95 shrink-0"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                      <span>{isId ? 'Disalin!' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-white/80" />
                      <span>{isId ? 'Salin' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.06] border border-white/15">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-cyan-300 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-white/60 block">
                    {isId ? 'Lokasi' : 'Location'}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white">
                    {isId ? 'Jakarta Timur, Indonesia' : 'East Jakarta, Indonesia'}
                  </span>
                </div>
              </div>
            </div>

            {/* Unified iOS 18 Liquid Glass Frame: Full-Body Portrait Photo + GitHub, LinkedIn, Instagram */}
            <div
              style={{
                transitionDelay: '240ms',
                transitionDuration: '900ms',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className={`flex-1 rounded-[2rem] p-4 sm:p-5 bg-slate-950/55 backdrop-blur-2xl border border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.22)] flex flex-col justify-between gap-4 transform transition-all ${
                isVisible
                  ? 'opacity-100 translate-y-0 translate-x-0'
                  : 'opacity-0 translate-y-12 -translate-x-6'
              }`}
            >
              {/* Full-Body Portrait Photo */}
              <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-white/25 shadow-[0_12px_30px_rgba(0,0,0,0.45)] group bg-slate-900">
                <img
                  src={contactPhoto}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover object-center blur-xl scale-110 opacity-65 pointer-events-none"
                />
                <img
                  src={contactPhoto}
                  alt="Muhamad Fatih Rizqi"
                  className="relative z-10 w-full h-full object-contain object-bottom transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none z-20" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between z-20">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-tight drop-shadow">
                      Muhamad Fatih Rizqi
                    </h3>
                    <span className="text-[11px] text-amber-200/90 font-medium">
                      {isId ? 'Media Sosial & Profil Profesional' : 'Social Media & Professional Profiles'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Integrated iOS 18 Social Buttons */}
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                {socialLinks.map((soc, idx) => {
                  const Icon = soc.icon;
                  return (
                    <a
                      key={idx}
                      href={soc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 sm:py-3 px-2 sm:px-2.5 rounded-2xl bg-white/[0.1] hover:bg-white/[0.22] border border-white/20 hover:border-white/45 backdrop-blur-md flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-white transition-all duration-200 group active:scale-95 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                    >
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/85 group-hover:text-cyan-300 transition-colors shrink-0" />
                      <span>{soc.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: iOS 18 Glass Contact Form (7 Cols) */}
          <div
            style={{
              transitionDelay: '180ms',
              transitionDuration: '900ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className={`lg:col-span-7 flex transform transition-all ${
              isVisible
                ? 'opacity-100 translate-y-0 translate-x-0'
                : 'opacity-0 translate-y-12 translate-x-6'
            }`}
          >
            <div className="w-full rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 bg-slate-950/55 backdrop-blur-2xl border border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)] flex flex-col justify-between">
              <div className="mb-6 sm:mb-7 pb-4 border-b border-white/15">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {isId ? 'Kirim Pesan Langsung' : 'Send Direct Message'}
                </h3>
                <p className="text-xs text-white/70 mt-1">
                  {isId
                    ? 'Isi formulir berikut dan pesan Anda akan segera terhubung.'
                    : 'Fill out the form below and your message will be connected right away.'}
                </p>
              </div>

              {submitted ? (
                <div className="py-14 sm:py-16 text-center space-y-4 my-auto">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-300/40 flex items-center justify-center mx-auto text-cyan-300">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">
                    {isId ? 'Pesan Anda Berhasil Terkirim!' : 'Message Sent Successfully!'}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto">
                    {isId
                      ? 'Terima kasih telah menghubungi. Saya akan meninjau pesan Anda dan membalasnya secepat mungkin.'
                      : 'Thank you for reaching out. I will review your message and reply as soon as possible.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-5">
                    {/* Name & Email Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-white/80 block mb-2">
                          {isId ? 'Nama Lengkap' : 'Full Name'}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder={isId ? 'cth. Budi Santoso' : 'e.g. John Doe'}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full rounded-2xl px-4 py-3 text-sm text-white placeholder-white/40 bg-white/[0.08] border border-white/20 focus:border-cyan-300/60 focus:bg-white/[0.12] outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-white/80 block mb-2">
                          {isId ? 'Alamat Email' : 'Email Address'}
                        </label>
                        <input
                          type="email"
                          required
                          placeholder={isId ? 'cth. budi@contoh.com' : 'e.g. john@example.com'}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full rounded-2xl px-4 py-3 text-sm text-white placeholder-white/40 bg-white/[0.08] border border-white/20 focus:border-cyan-300/60 focus:bg-white/[0.12] outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Message Input */}
                    <div>
                      <label className="text-xs font-semibold text-white/80 block mb-2">
                        {isId ? 'Detail Pesan / Ide Proyek' : 'Message / Project Idea'}
                      </label>
                      <textarea
                        rows="6"
                        required
                        placeholder={
                          isId
                            ? 'Ceritakan tentang proyek Anda, ekspektasi, atau pertanyaan yang ingin didiskusikan...'
                            : 'Tell me about your project, expectations, or any questions you would like to discuss...'
                        }
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full rounded-2xl px-4 py-3 text-sm text-white placeholder-white/40 bg-white/[0.08] border border-white/20 focus:border-cyan-300/60 focus:bg-white/[0.12] outline-none resize-none transition-all"
                      ></textarea>
                    </div>
                  </div>

                  {/* Submit Action Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500/85 via-orange-500/85 to-teal-600/85 hover:from-amber-500 hover:via-orange-500 hover:to-teal-600 text-white font-bold text-sm border border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.35)] flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer active:scale-[0.98]"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isId ? 'Kirimkan Pesan Sekarang' : 'Send Message Now'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
