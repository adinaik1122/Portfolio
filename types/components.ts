import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

/**
 * Component prop type definitions
 */

export interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'none';
}

export interface VideoEmbedProps {
  src: string;
  title: string;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
  value: string;
}

export interface NavLink {
  name: string;
  id: string;
}
