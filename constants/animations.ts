/**
 * Animation timing constants
 * Centralized animation delays and durations for consistent timing across the app
 */

export const ANIMATION_DELAYS = {
  // Hero section
  HERO_TIMECODE: 0,
  HERO_CAMERA_INFO: 100,
  HERO_NAME: 200,
  HERO_SUBTITLE: 400,
  HERO_CTA: 600,

  // Projects section
  PROJECTS_CATEGORY: 100,
  PROJECTS_VIDEO_BASE: 150, // Multiplied by index

  // Experience section
  EXPERIENCE_ITEM_BASE: 100, // Multiplied by index

  // Skills section
  SKILLS_HEADING: 0,
  SKILLS_ITEM_BASE: 50, // Multiplied by index
  SKILLS_LANGUAGES_HEADING: 200,
  SKILLS_LANGUAGE_BASE: 250, // Plus index * 50

  // About section
  ABOUT_HEADING: 200,
  ABOUT_CONTENT: 400,

  // Contact section
  CONTACT_HEADING: 0,
  CONTACT_LINK_BASE: 200, // Plus index * 100
  CONTACT_RESUME: 400,
  CONTACT_FOOTER: 600,
} as const;

export const ANIMATION_DURATIONS = {
  FADE_IN: 1000, // FadeIn component transition duration
  BUTTON_HOVER: 500,
  NAVBAR_TRANSITION: 300,
  MOBILE_MENU: 300,
} as const;

export const TIMECODE_CONFIG = {
  UPDATE_INTERVAL: 1000, // Update every second
  FRAME_RATE: 24, // 24fps for frame counter
  FRAME_UPDATE_INTERVAL: 1000 / 24,
} as const;
