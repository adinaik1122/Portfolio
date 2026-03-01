# Aditya Naik - Digital Artist Portfolio

A modern, performant portfolio website showcasing motion graphics, video editing, and visual effects work.

## Features

- ⚡ Fast loading with code splitting and lazy loading
- 🎨 Smooth animations and transitions
- 📱 Fully responsive design
- 🔍 SEO optimized with meta tags and structured data
- 🛡️ Error boundaries for graceful error handling
- 📊 Analytics ready (Google Analytics support)
- ♿ Accessibility focused

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (icons)

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies
```bash
npm install
```

3. (Optional) Set up analytics
```bash
cp .env.example .env
# Edit .env and add your Google Analytics tracking ID
```

4. Start development server
```bash
npm run dev
```

The site will be available at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

The optimized build will be in the `dist` folder.

## Preview Production Build

```bash
npm run preview
```

## Project Structure

```
├── components/          # React components
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── ErrorBoundary.tsx
│   ├── Experience.tsx
│   ├── FadeIn.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   └── VideoEmbed.tsx
├── utils/              # Utility functions
│   └── analytics.ts    # Analytics tracking
├── public/             # Static assets
├── App.tsx             # Main app component
├── constants.ts        # Site content and data
├── types.ts            # TypeScript type definitions
├── index.tsx           # App entry point
└── index.css           # Global styles

```

## Customization

### Update Content

Edit `constants.ts` to update:
- Personal information
- Projects and portfolio items
- Work experience
- Skills and languages
- Social links

### Update SEO

Edit `index.html` to update:
- Meta tags
- Open Graph tags
- Twitter Card tags
- Structured data

### Add Analytics

1. Get a Google Analytics tracking ID (G-XXXXXXXXXX)
2. Create a `.env` file from `.env.example`
3. Add your tracking ID: `VITE_GA_TRACKING_ID=G-XXXXXXXXXX`
4. Uncomment analytics initialization in `index.tsx`

### Replace Images

- Replace `/public/profile.jpeg` with your profile photo
- Replace `/public/bg.jpeg` with your background image

## Performance Optimizations

- Lazy loading for below-the-fold components
- Code splitting for smaller initial bundle
- React.memo() for preventing unnecessary re-renders
- Loading states for video embeds
- Optimized images and assets

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2026 Aditya Naik. All rights reserved.

## Contact

- Email: adityanaik5736@gmail.com
- LinkedIn: [aditya-naik11](https://www.linkedin.com/in/aditya-naik11)
- Vimeo: [793647723](https://vimeo.com/793647723)
