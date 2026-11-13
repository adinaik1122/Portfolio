import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-neutral-50 text-neutral-900 px-8 md:px-12 lg:px-20 py-16 md:py-24 scroll-mt-20">
      <div className="grid md:grid-cols-2 gap-10 md:gap-20">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-5">Start a conversation</p>
          <h2 id="contact-heading" className="font-serif text-5xl md:text-6xl leading-tight">Let's make<br />something memorable.</h2>
          <p className="text-neutral-600 leading-relaxed mt-6 max-w-md">Tell me what you're making, what you need help with, and your timeline. For video projects, include the format and intended audience.</p>
        </div>
        <div className="self-center divide-y divide-neutral-200">
          {SOCIAL_LINKS.map(link => (
            <a key={link.label} href={link.href} {...(link.href.startsWith('https:') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group flex items-center justify-between gap-4 py-6">
              <div className="min-w-0"><p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">{link.label}</p><p className="text-base sm:text-xl break-words group-hover:underline underline-offset-4">{link.value}</p></div>
              <ArrowUpRight size={20} className="shrink-0" />
            </a>
          ))}
        </div>
      </div>
      <footer className="border-t border-neutral-200 mt-16 pt-6 text-xs text-neutral-500 flex flex-wrap justify-between gap-4">
        <span>© {new Date().getFullYear()} Aditya Naik</span><span>Video Editing · Branding &amp; Packaging · VFX</span>
      </footer>
    </section>
  );
}
