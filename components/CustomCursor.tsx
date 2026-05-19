import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let hovering = false;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const el = e.target;
      if (!(el instanceof Element)) return;
      const isInteractive =
        el.tagName === 'A' ||
        el.tagName === 'BUTTON' ||
        !!el.closest('a') ||
        !!el.closest('button');
      if (hovering !== isInteractive) {
        hovering = isInteractive;
        applyHoverState(hovering);
      }
    };

    const applyHoverState = (isHovering: boolean) => {
      const ring = ringRef.current;
      if (!ring) return;
      if (isHovering) {
        ring.style.width  = '48px';
        ring.style.height = '48px';
        ring.style.opacity = '0.55';
      } else {
        ring.style.width  = '32px';
        ring.style.height = '32px';
        ring.style.opacity = '0.35';
      }
    };

    const tick = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      currentX += dx * 0.15;
      currentY += dy * 0.15;

      const dot  = dotRef.current;
      const ring = ringRef.current;

      if (dot) {
        dot.style.transform  = `translate(${targetX}px, ${targetY}px)`;
      }
      if (ring) {
        ring.style.transform = `translate(${currentX}px, ${currentY}px)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, true);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver, true);
      cancelAnimationFrame(rafId);
    };
  }, []); // empty — runs once

  if (!visible) return null;

  return (
    <>
      {/* Dot — snaps instantly to cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ willChange: 'transform', transform: 'translate(-100px,-100px)' }}
      >
        <div className="w-1.5 h-1.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Ring — follows with smooth lag */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference rounded-full border-2 border-white -translate-x-1/2 -translate-y-1/2"
        style={{
          willChange: 'transform',
          width: '32px',
          height: '32px',
          opacity: 0.35,
          transition: 'width 0.25s ease, height 0.25s ease, opacity 0.25s ease',
          transform: 'translate(-100px,-100px)',
        }}
      />
    </>
  );
};

export default CustomCursor;
