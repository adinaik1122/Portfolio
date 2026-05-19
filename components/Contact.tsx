import React, { useRef } from "react";
import { SOCIAL_LINKS } from "../constants";
import { ANIMATION_DELAYS } from "../constants/animations";
import { use3DTilt } from "../hooks/use3DEffect";
import FadeIn from "./FadeIn";
import { Download, ArrowUpRight, FileText, CheckCircle2 } from "lucide-react";

/**
 * Contact Component with 3D card effects
 * Resume card has subtle 3D tilt on hover
 */
const Contact: React.FC = () => {
  const resumeCardRef = useRef<HTMLDivElement>(null);
  const transform = use3DTilt(resumeCardRef, 3);

  return (
    <section
      id="contact"
      className="py-14 sm:py-20 md:py-32 bg-neutral-50 border-t border-neutral-200 scroll-mt-20"
    >
      <div className="px-8 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-24 items-center">
          {/* Left Side: Heading & Contact Links */}
          <div className="text-center md:text-left space-y-8 sm:space-y-10 order-2 md:order-1">
            <FadeIn>
              <div>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-neutral-900 mb-4 sm:mb-6">
                  Let's Create Together
                </h2>
                <p className="text-neutral-500 text-base sm:text-lg leading-relaxed max-w-lg mx-auto md:mx-0">
                  Open for freelance projects, collaborations, and full-time
                  opportunities. Feel free to reach out via email or connect on
                  social media.
                </p>
              </div>
            </FadeIn>

            <div className="flex flex-col gap-3 sm:gap-4 max-w-md mx-auto md:mx-0">
              {SOCIAL_LINKS.map((link, index) => {
                const Icon = link.icon;
                return (
                  <FadeIn key={link.label} delay={ANIMATION_DELAYS.CONTACT_LINK_BASE + index * 100}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-5 p-4 bg-white border border-neutral-200 rounded-sm hover:border-[#C4922A] hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
                      style={{
                        transform: 'translateZ(0)', // Enable 3D context
                        backfaceVisibility: 'hidden', // Smooth animations
                      }}
                    >
                      <div className="p-3 bg-neutral-100 rounded-sm text-neutral-600 group-hover:bg-[#C4922A] group-hover:text-white transition-colors">
                        <Icon size={20} />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                          {link.label}
                        </p>
                        <p className="text-neutral-900 font-medium">
                          {link.value}
                        </p>
                      </div>
                      <ArrowUpRight
                        size={16}
                        className="text-neutral-300 group-hover:text-neutral-900 transition-colors"
                      />
                    </a>
                  </FadeIn>
                );
              })}
            </div>
          </div>

          {/* Right Side: Resume / CV Section with 3D Effect */}
          <div className="order-1 md:order-2 w-full">
            <FadeIn delay={ANIMATION_DELAYS.CONTACT_RESUME} className="h-full">
              <div 
                ref={resumeCardRef}
                className="bg-white p-8 md:p-10 shadow-lg border border-neutral-100 relative overflow-hidden group max-w-lg mx-auto md:ml-auto"
                style={{
                  transform,
                  transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div 
                  className="absolute top-0 right-0 p-6 opacity-5"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <FileText size={120} className="text-neutral-900 rotate-12" />
                </div>

                <div 
                  className="relative z-10 flex flex-col space-y-8"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 text-xs font-medium text-neutral-600 mb-4">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      Available for work
                    </div>
                    <h3 className="font-serif text-3xl text-neutral-900 mb-2">
                      Curriculum Vitae
                    </h3>
                    <p className="text-neutral-500 text-sm leading-relaxed">
                      Detailed breakdown of my experience, technical stack, and
                      creative projects.
                    </p>
                  </div>

                  {/* Resume Meta Data */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-neutral-50 border border-neutral-100">
                      <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block mb-1">
                        Format
                      </span>
                      <span className="text-neutral-900 font-medium">PDF</span>
                    </div>
                    <div className="p-4 bg-neutral-50 border border-neutral-100">
                      <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block mb-1">
                        Size
                      </span>
                      <span className="text-neutral-900 font-medium">
                        96 KB
                      </span>
                    </div>
                  </div>

                  <a
                    href="https://drive.google.com/file/d/1oIlhp_N8nIR8NU087_P3tFqOlv7HZpQJ/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-neutral-900 text-white font-medium tracking-wide py-4 px-8 rounded-sm hover:bg-neutral-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-3"
                  >
                    <span>Download Resume</span>
                    <Download size={18} />
                  </a>

                  <div className="flex items-center justify-center gap-2 text-xs text-neutral-400">
                    <CheckCircle2 size={12} className="text-green-600" />
                    <span>Last updated: January 2026</span>
                  </div>
                </div>

                {/* 3D depth overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.05) 100%)',
                    transform: 'translateZ(40px)',
                  }}
                />
              </div>
            </FadeIn>
          </div>
        </div>

        <FadeIn delay={ANIMATION_DELAYS.CONTACT_FOOTER}>
          <div className="mt-24 text-center text-sm text-neutral-400 border-t border-neutral-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <span>
              © {new Date().getFullYear()} Aditya Naik. All rights reserved.
            </span>
            <span className="text-xs uppercase tracking-widest opacity-60">
              Open for work
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default React.memo(Contact);
