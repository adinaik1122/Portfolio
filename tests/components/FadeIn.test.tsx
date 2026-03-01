import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FadeIn from '../../components/FadeIn';

describe('FadeIn Component', () => {
  it('renders children correctly', () => {
    render(
      <FadeIn>
        <div>Test Content</div>
      </FadeIn>
    );
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <FadeIn className="custom-class">
        <div>Test</div>
      </FadeIn>
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('applies delay style', () => {
    const { container } = render(
      <FadeIn delay={500}>
        <div>Test</div>
      </FadeIn>
    );
    
    const element = container.firstChild as HTMLElement;
    expect(element.style.transitionDelay).toBe('500ms');
  });
});
