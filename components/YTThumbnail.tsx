import React, { useState } from 'react';

const QUALITIES = ['maxresdefault', 'sddefault', 'hqdefault', 'mqdefault'] as const;

// Playlist IDs (PL…, RD…, UU…) can't be used with img.youtube.com/vi/ — skip immediately
const isPlaylistId = (id: string) =>
  id.startsWith('PL') || id.startsWith('RD') || id.startsWith('UU') || id.length > 20;

// YouTube's "no thumbnail" fallback is exactly 120×90
const isPlaceholder = (img: HTMLImageElement) =>
  img.naturalWidth <= 120 && img.naturalHeight <= 90;

interface Props {
  videoId: string;
  alt?: string;
  className?: string;
  draggable?: boolean;
  loading?: 'lazy' | 'eager';
}

export default function YTThumbnail({
  videoId,
  alt = '',
  className,
  draggable = false,
  loading = 'lazy',
}: Props) {
  const [qualityIdx, setQualityIdx] = useState(0);
  const [failed, setFailed]         = useState(() => isPlaylistId(videoId));

  if (failed) return null;

  const src = `https://img.youtube.com/vi/${videoId}/${QUALITIES[qualityIdx]}.jpg`;

  const handleError = () => {
    if (qualityIdx < QUALITIES.length - 1) setQualityIdx(q => q + 1);
    else setFailed(true);
  };

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (isPlaceholder(e.currentTarget)) {
      if (qualityIdx < QUALITIES.length - 1) setQualityIdx(q => q + 1);
      else setFailed(true);
    }
  };

  return (
    <img
      key={src}
      src={src}
      alt={alt}
      className={className}
      draggable={draggable}
      loading={loading}
      onError={handleError}
      onLoad={handleLoad}
    />
  );
}
