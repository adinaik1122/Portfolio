import React, { useRef } from 'react';
import { use3DTilt } from '../hooks/use3DEffect';
import VideoEmbed from './VideoEmbed';

interface ProjectCardProps {
  src: string;
  title: string;
}

/**
 * ProjectCard Component with 3D tilt effect
 * Applies a subtle 3D transformation based on mouse position
 */
const ProjectCard: React.FC<ProjectCardProps> = ({ src, title }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const transform = use3DTilt(cardRef, 5); // 5 degree max tilt

  return (
    <div
      ref={cardRef}
      className="group relative w-full aspect-video bg-neutral-100 shadow-crisp hover:shadow-crisp-hover transition-all duration-300 rounded-lg border-2 border-neutral-900 overflow-hidden"
      style={{
        transform,
        transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="absolute inset-0">
        <VideoEmbed src={src} title={title} />
      </div>
      
      {/* 3D depth effect overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.1) 100%)',
          transform: 'translateZ(20px)',
        }}
      />
    </div>
  );
};

export default React.memo(ProjectCard);
