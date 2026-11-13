import React from 'react';

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-neutral-900 text-white px-8 md:px-12 lg:px-20 py-16 md:py-24 scroll-mt-20">
      <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-center">
        <img src="/profile.jpeg" alt="Aditya Naik" loading="lazy" className="md:col-span-2 w-full max-w-sm aspect-[4/5] object-cover" />
        <div className="md:col-span-3">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-5">Behind the work</p>
          <h2 id="about-heading" className="font-serif text-4xl md:text-5xl leading-tight mb-6">Design thinking.<br />An editor's eye.</h2>
          <div className="space-y-5 text-neutral-300 text-base md:text-lg leading-relaxed max-w-2xl">
            <p>I'm Aditya, a digital artist working across video editing, branding and packaging, and VFX compositing. My work connects visual identity with the way a story unfolds on screen.</p>
            <p>I studied Digital Effects at Bournemouth University and have worked with Kingbee Animation and StudioB in the UK. I work remotely with creators and brands, from identity and packaging projects to video post-production.</p>
          </div>
          <p className="border-t border-neutral-700 mt-8 pt-5 text-sm text-neutral-400">MA Digital Effects · Bournemouth University</p>
        </div>
      </div>
    </section>
  );
}
