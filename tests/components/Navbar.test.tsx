import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import Navbar from '../../components/Navbar';

describe('Navbar Component', () => {
  it('renders navigation links', () => {
    render(<Navbar />);
    
    // Use getAllByText since links appear in both desktop and mobile menus
    const workLinks = screen.getAllByText('Work');
    expect(workLinks.length).toBeGreaterThan(0);
    
    const experienceLinks = screen.getAllByText('Experience');
    expect(experienceLinks.length).toBeGreaterThan(0);
  });

  it('renders logo', () => {
    render(<Navbar />);
    
    expect(screen.getByText('AN.')).toBeInTheDocument();
  });

  it('toggles mobile menu on button click', () => {
    render(<Navbar />);
    
    const menuButton = screen.getByLabelText(/open navigation menu/i);
    fireEvent.click(menuButton);
    
    expect(screen.getByLabelText(/close navigation menu/i)).toBeInTheDocument();
  });

  it('has proper ARIA attributes', () => {
    render(<Navbar />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
  });

  it('scrolls to top when logo is clicked', () => {
    const scrollToSpy = vi.spyOn(window, 'scrollTo');
    render(<Navbar />);
    
    const logo = screen.getByLabelText('Go to top of page');
    fireEvent.click(logo);
    
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
