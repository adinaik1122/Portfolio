# Accessibility Features

This portfolio website follows WCAG 2.1 Level AA guidelines and implements best practices for web accessibility.

## Implemented Features

### 1. Semantic HTML
- Proper use of semantic elements (`<nav>`, `<main>`, `<section>`, `<button>`, etc.)
- Heading hierarchy (h1, h2, h3) properly structured
- Landmark regions for screen reader navigation

### 2. Keyboard Navigation
- All interactive elements are keyboard accessible
- Skip to main content link for keyboard users
- Focus indicators on all interactive elements
- Logical tab order throughout the site

### 3. ARIA Labels & Attributes
- `aria-label` on buttons and navigation elements
- `aria-labelledby` for section headings
- `aria-hidden` on decorative elements
- `aria-expanded` and `aria-controls` for mobile menu
- `role` attributes for navigation and menus
- `aria-live` regions for dynamic content

### 4. Screen Reader Support
- Screen reader only content (`.sr-only` class)
- Descriptive labels for all interactive elements
- Alternative text strategy for images
- Time elements with proper labels

### 5. Visual Accessibility
- High contrast text (WCAG AA compliant)
- Focus visible states on all interactive elements
- No reliance on color alone for information
- Sufficient spacing between interactive elements

### 6. Image Alt Text Strategy
- Profile images: Descriptive alt text with person's name
- Background/decorative images: Empty alt (`alt=""`) with `aria-hidden="true"`
- Functional images: Alt text describes the function

### 7. Forms & Inputs
- All form controls have associated labels
- Error states are clearly communicated
- Focus management in modals and overlays

## Testing Recommendations

### Keyboard Testing
1. Tab through all interactive elements
2. Verify skip link appears on first Tab press
3. Test mobile menu with keyboard
4. Ensure all buttons and links are reachable

### Screen Reader Testing
Test with:
- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS/iOS)
- TalkBack (Android)

### Automated Testing
Run these tools:
```bash
# Install axe-core for accessibility testing
npm install -D @axe-core/cli

# Run accessibility audit
npx axe https://your-site-url
```

### Manual Checks
- [ ] All images have appropriate alt text
- [ ] Color contrast meets WCAG AA standards
- [ ] Focus indicators are visible
- [ ] Skip link works correctly
- [ ] Mobile menu is keyboard accessible
- [ ] All content is accessible without JavaScript

## Known Limitations

1. **Video Embeds**: YouTube iframes have their own accessibility features that we cannot control
2. **Animations**: Some users may prefer reduced motion - consider adding `prefers-reduced-motion` support

## Future Improvements

- [ ] Add `prefers-reduced-motion` media query support
- [ ] Implement focus trap for mobile menu
- [ ] Add live region announcements for lazy-loaded content
- [ ] Consider adding a high contrast mode toggle
- [ ] Add language switcher if multilingual support is needed

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

## Reporting Issues

If you encounter any accessibility issues, please report them with:
- Description of the issue
- Steps to reproduce
- Assistive technology used (if applicable)
- Browser and operating system
