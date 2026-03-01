import React, { useState } from 'react';
import { VideoEmbedProps } from '../types/components';
import { ExternalLink } from 'lucide-react';

/**
 * VideoEmbed Component
 * Wrapper for video iframes with loading states and YouTube link overlay
 * 
 * Features:
 * - Loading spinner while video loads
 * - Always-visible "Watch on YouTube" button for videos with embedding disabled
 * - Lazy loading for performance
 * - Accessibility attributes
 * 
 * @param src - Video embed URL
 * @param title - Accessible title for the video
 */
const VideoEmbed: React.FC<VideoEmbedProps> = ({ src, title }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  // Extract video ID from embed URL for YouTube link
  const getYouTubeLink = (embedSrc: string) => {
    const videoIdMatch = embedSrc.match(/embed\/([^?]+)/);
    const playlistMatch = embedSrc.match(/list=([^&]+)/);
    
    if (playlistMatch) {
      return `https://www.youtube.com/playlist?list=${playlistMatch[1]}`;
    } else if (videoIdMatch) {
      return `https://www.youtube.com/watch?v=${videoIdMatch[1]}`;
    }
    return 'https://www.youtube.com';
  };

  const youtubeLink = getYouTubeLink(src);

  return (
    <div className="relative w-full h-full">
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-3 border-neutral-300 border-t-neutral-900 rounded-full animate-spin"></div>
            <p className="text-xs text-neutral-400 uppercase tracking-wider">Loading video</p>
          </div>
        </div>
      )}
      
      {/* Video iframe */}
      <iframe
        src={src}
        title={title}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        loading="lazy"
        onLoad={handleLoad}
      />

      {/* YouTube link overlay - always visible for videos with embedding disabled */}
      <div className="absolute bottom-4 right-4 z-20">
        <a
          href={youtubeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:scale-105"
          aria-label="Watch this video on YouTube"
        >
          <span>Watch on YouTube</span>
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
};

export default React.memo(VideoEmbed);
