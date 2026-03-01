import React, { useEffect, useState } from 'react';

/**
 * CustomCursor Component
 * Modern custom cursor with smooth following effect
 * 
 * Features:
 * - Smooth cursor dot that follows mouse
 * - Larger outline ring with delay
 * - Expands on hover over interactive elements
 * - Hidden on mobile devices
 */
const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide custom cursor on mobile/touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      
      // Update dot position immediately
      setDotPosition({ x: targetX, y: targetY });
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over interactive elements
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.style.cursor === 'pointer'
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    // Smooth animation for the ring
    const animate = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      
      currentX += dx * 0.15; // Smooth following with delay
      currentY += dy * 0.15;
      
      setPosition({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  // Don't render on mobile
  if (!isVisible) return null;

  return (
    <>
      {/* Cursor Dot - follows immediately */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: `${dotPosition.x}px`,
          top: `${dotPosition.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`bg-white rounded-full transition-all duration-200 ${
            isHovering ? 'w-2 h-2' : 'w-1.5 h-1.5'
          }`}
        />
      </div>

      {/* Cursor Ring - follows with delay */}
      <div
        className="fixed pointer-events-none z-[9998] mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`border-2 border-white rounded-full transition-all duration-300 ${
            isHovering ? 'w-12 h-12 opacity-50' : 'w-8 h-8 opacity-30'
          }`}
        />
      </div>
    </>
  );
};

export default CustomCursor;
