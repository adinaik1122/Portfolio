# 3D Effects & Interactions

This document describes the 3D effects and interactive animations implemented throughout the portfolio.

## Overview

The portfolio features several types of 3D interactions:
1. **3D Tilt Effects** - Cards that tilt based on mouse position
2. **Parallax Scrolling** - Elements that move at different speeds
3. **Mouse Parallax** - Content that follows mouse movement
4. **Cursor Tracking** - Dynamic spotlight effects

## Custom Hooks

### `use3DTilt`
Creates a 3D tilt effect on elements based on mouse position.

```typescript
const transform = use3DTilt(elementRef, maxTilt);
```

**Parameters:**
- `elementRef`: Reference to the element
- `maxTilt`: Maximum tilt angle in degrees (default: 10)

**Returns:** Transform CSS string

**Used in:**
- Project cards
- Resume card in Contact section

### `useParallax`
Creates a parallax scroll effect.

```typescript
const offsetY = useParallax(speed);
```

**Parameters:**
- `speed`: Parallax speed multiplier (default: 0.5)

**Returns:** Y offset value

**Used in:**
- About section background image

### `useMouseParallax`
Creates a mouse-following parallax effect.

```typescript
const { x, y } = useMouseParallax(strength);
```

**Parameters:**
- `strength`: Movement strength multiplier (default: 20)

**Returns:** Object with x and y offsets

**Used in:**
- Hero section name and subtitle

## Implementation Details

### Hero Section
- **Mouse Parallax**: Name and subtitle follow mouse movement
- **Cursor Tracking**: Grid spotlight follows cursor position
- **3D Button**: CTA button has 3D context for smooth hover

```typescript
// Name parallax
style={{
  transform: `translate3d(${mouseParallax.x}px, ${mouseParallax.y}px, 0)`,
  transition: 'transform 0.3s ease-out',
}}
```

### Projects Section
- **3D Tilt Cards**: Each project card tilts on hover
- **Depth Overlay**: Gradient overlay adds depth perception
- **Shadow Enhancement**: Dynamic shadows increase on hover

```typescript
// Card tilt effect
const transform = use3DTilt(cardRef, 5);
style={{
  transform,
  transformStyle: 'preserve-3d',
}}
```

### About Section
- **Parallax Background**: Background image moves slower than content
- **3D Image**: Profile image has subtle 3D transformation
- **Layered Depth**: Multiple overlays create depth

```typescript
// Background parallax
const parallaxOffset = useParallax(0.3);
style={{
  transform: `translateY(${parallaxOffset}px)`,
}}
```

### Contact Section
- **3D Resume Card**: Card tilts based on mouse position
- **Layered Elements**: Content layers have different Z-depths
- **Hover Lift**: Contact links lift on hover with 3D context

```typescript
// Resume card 3D
const transform = use3DTilt(resumeCardRef, 3);
style={{
  transform,
  transformStyle: 'preserve-3d',
}}
```

## Performance Considerations

### Optimization Techniques
1. **Passive Event Listeners**: All scroll/mouse events use `{ passive: true }`
2. **Transform over Position**: Using `transform` for better GPU acceleration
3. **Will-Change**: Implicit through transform usage
4. **Debouncing**: Not needed due to passive listeners
5. **Hardware Acceleration**: `translateZ(0)` and `backfaceVisibility: hidden`

### CSS Properties Used
```css
transform: perspective(1000px) rotateX() rotateY() scale3d();
transform-style: preserve-3d;
backface-visibility: hidden;
transition: transform 0.3s ease-out;
```

## Browser Support

All effects use standard CSS transforms and are supported in:
- Chrome/Edge 36+
- Firefox 16+
- Safari 9+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Fallbacks
- Effects gracefully degrade on older browsers
- No JavaScript errors on unsupported features
- Core functionality remains intact

## Accessibility

### Motion Preferences
Consider adding `prefers-reduced-motion` support:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Keyboard Navigation
- All 3D effects are visual enhancements only
- No functionality depends on mouse movement
- Keyboard navigation remains fully functional

## Customization

### Adjusting Effect Strength

**Tilt Intensity:**
```typescript
// Subtle: 3-5 degrees
const transform = use3DTilt(ref, 3);

// Medium: 8-12 degrees
const transform = use3DTilt(ref, 10);

// Strong: 15-20 degrees
const transform = use3DTilt(ref, 18);
```

**Parallax Speed:**
```typescript
// Slow: 0.1-0.3
const offset = useParallax(0.2);

// Medium: 0.4-0.6
const offset = useParallax(0.5);

// Fast: 0.7-1.0
const offset = useParallax(0.8);
```

**Mouse Parallax:**
```typescript
// Subtle: 5-10
const pos = useMouseParallax(8);

// Medium: 15-25
const pos = useMouseParallax(20);

// Strong: 30-50
const pos = useMouseParallax(40);
```

## Examples

### Adding 3D Tilt to a New Component

```typescript
import { useRef } from 'react';
import { use3DTilt } from '../hooks/use3DEffect';

const MyCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const transform = use3DTilt(cardRef, 8);

  return (
    <div
      ref={cardRef}
      style={{
        transform,
        transition: 'transform 0.3s ease-out',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Card content */}
    </div>
  );
};
```

### Adding Parallax to Background

```typescript
import { useParallax } from '../hooks/use3DEffect';

const MySection = () => {
  const offset = useParallax(0.4);

  return (
    <section>
      <div
        style={{
          transform: `translateY(${offset}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Background content */}
      </div>
    </section>
  );
};
```

## Troubleshooting

### Effect Not Working
1. Check if ref is properly attached
2. Verify element has dimensions (not display: none)
3. Ensure parent has proper overflow settings

### Performance Issues
1. Reduce number of elements with effects
2. Lower the update frequency
3. Use `will-change` sparingly
4. Check for memory leaks in event listeners

### Visual Glitches
1. Add `backface-visibility: hidden`
2. Use `translateZ(0)` for hardware acceleration
3. Ensure proper z-index stacking
4. Check for conflicting transforms

## Future Enhancements

Potential additions:
- [ ] Gyroscope support for mobile devices
- [ ] WebGL-based 3D effects
- [ ] Depth-based blur effects
- [ ] Interactive 3D models
- [ ] VR/AR preview mode
