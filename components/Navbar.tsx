import React, { useState, useEffect } from "react";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Work", id: "projects" },
    { name: "Experience", id: "experience" },
    { name: "Skills", id: "skills" },
    { name: "About", id: "about" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? "bg-white/95 backdrop-blur-md  py-4 md:py-4"
          : "bg-transparent py-5 md:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button
          className="font-serif font-bold text-xl md:text-2xl cursor-pointer tracking-tight z-50"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Go to top of page"
        >
          AN.
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8" role="menubar">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.id)}
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors uppercase tracking-widest"
              role="menuitem"
              aria-label={`Navigate to ${link.name} section`}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 -mr-2 text-neutral-800 z-50 relative focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 rounded"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <div className="w-6 h-3.5 relative">
            <span
              className={`absolute left-0 w-full h-0.5 bg-neutral-800 rounded-full transition-all duration-300 ease-in-out ${
                isMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 w-full h-0.5 bg-neutral-800 rounded-full transition-all duration-300 ease-in-out top-1/2 -translate-y-1/2 ${
                isMenuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
              }`}
            />
            <span
              className={`absolute left-0 w-full h-0.5 bg-neutral-800 rounded-full transition-all duration-300 ease-in-out ${
                isMenuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        role="menu"
        aria-hidden={!isMenuOpen}
        className={`md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl shadow-xl border-t border-neutral-100 transition-all duration-300 ease-in-out origin-top ${
          isMenuOpen
            ? "opacity-100 scale-y-100 translate-y-0"
            : "opacity-0 scale-y-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col p-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.id)}
              className="text-left text-lg font-medium text-neutral-800 py-3 border-b border-neutral-50 last:border-0 hover:pl-2 transition-all active:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-inset rounded"
              role="menuitem"
              aria-label={`Navigate to ${link.name} section`}
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
