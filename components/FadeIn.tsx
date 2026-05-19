import React, { useEffect, useRef, useState } from 'react';
import { FadeInProps } from '../types/components';

/**
 * FadeIn Component
 * Provides intersection observer-based fade-in animation
 * 
 * @param children - Content to animate
 * @param delay - Animation delay in milliseconds (default: 0)
 * @param className - Additional CSS classes
 * @param direction - Animation direction: 'up' (slide up) or 'none' (fade only)
 */
const FadeIn: React.FC<FadeInProps> = ({ 
  children, 
  delay = 0, 
  className = '', 
  direction = 'up' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Unobserve after animation triggers (performance optimization)
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 }); // Trigger when 10% of element is visible

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const translateClass = direction === 'up' ? 'translate-y-6' : 'translate-y-0';
  const visibleClass = isVisible ? 'opacity-100 translate-y-0' : `opacity-0 ${translateClass}`;
  
  return (
    <div
      ref={domRef}
      className={`duration-700 ease-out ${visibleClass} ${className}`}
      style={{
        transitionProperty: 'opacity, transform',
        transitionDuration: '700ms',
        transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;