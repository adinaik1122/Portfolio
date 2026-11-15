# Local portfolio implementation and verification — 15 November 2026

## Changes in this local pass

- Replaced the Work category landing screen with a project index and accessible filters for All Work, Video Editing, Motion Graphics, VFX & Compositing, and Branding & Packaging. Existing project URLs and assets remain.
- Preserved the black-and-white editorial visual language, serif headings, and restrained transitions.
- Changed public contact actions to `https://wa.me/919762659846`, including the hero, navigation, contact section, and project-page prompt. Removed the public mail link while the address is unresolved.
- Kept the CV download off the site. No employment details, disputed project credits, or performance claims were changed in this pass.
- Added the factual reconciliation checklist in `docs/FACT-RECONCILIATION.md`.
- Removed Travel Documentary II and BELIEVER from the project list and sitemap at the owner's request. Their source history remains in Git.
- Added one Ayurexim Video Editing case study containing eight locally sourced reels. Web-sized MP4 files and posters live in `public/videos/ayurexim/`; original exports were not changed.

## Browser verification performed

- Playwright with installed Chrome opened the local Vite site at 320, 375, 430, 768, 1024, and 1440 px.
- Home and Work had no horizontal document overflow at those widths, and no uncaught page errors were observed.
- Work filters returned 23 total, 12 editing, 4 motion, 1 VFX, and 6 branding projects. The active filter exposed `aria-pressed=true`.
- The VFX project URL opened its project dialog.
- The Ayurexim case study displayed all eight reel selectors. Selecting the eighth updated the video source, and its video and poster URLs returned HTTP 200. The desktop and mobile layouts were visually inspected.
- The home page exposed three WhatsApp links and zero mail links. The `wa.me` URL returned a redirect to WhatsApp's send endpoint.
- The TypeScript check, production build, and 15 existing tests passed.

## Screenshots

- Before: `artifacts/portfolio-review/before-work-desktop.png`, `artifacts/portfolio-review/before-work-mobile.png`
- After: `artifacts/portfolio-review/after-work-desktop.png`, `artifacts/portfolio-review/after-work-mobile.png`, `artifacts/portfolio-review/after-home-375.png`, `artifacts/portfolio-review/after-home-1440.png`
- Ayurexim case study: `artifacts/portfolio-review/after-ayurexim-reels.png`, `artifacts/portfolio-review/after-ayurexim-reels-mobile.png`

## Limits and pending facts

- The Motion Graphics Reel has a public YouTube title and thumbnail, but playback/content could not be independently inspected. It remains labelled as a motion reel and is not presented as a dedicated video-editing showreel.
- Video playback, every external link, detailed keyboard navigation, image loading across all projects, and performance metrics were not fully verified in this pass.
- Employment dates, email, project credits, and outcome claims remain pending owner confirmation. See the reconciliation checklist.
- The changes are local only. No push or production deployment was performed in this pass.
