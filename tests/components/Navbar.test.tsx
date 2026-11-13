import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const renderNav = () => render(<MemoryRouter><Navbar /></MemoryRouter>);

describe('Navbar Component', () => {
  it('offers Work, About and Contact in the simplified menu', () => {
    renderNav();
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    for (const name of ['Work', 'About', 'Contact']) {
      expect(screen.getAllByRole('link', { name: new RegExp(name) }).length).toBeGreaterThan(0);
    }
    expect(screen.queryByText('Experience')).not.toBeInTheDocument();
    expect(screen.queryByText('Skills')).not.toBeInTheDocument();
  });
  it('links the logo home', () => {
    renderNav();
    expect(screen.getByRole('link', { name: 'Aditya Naik — home' })).toHaveAttribute('href', '/');
  });
  it('toggles the menu and its expanded state', () => {
    renderNav();
    const button = screen.getByRole('button', { name: 'Open menu' });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(button);
    expect(button).toHaveAccessibleName('Close menu');
    expect(button).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
  it('labels the main navigation', () => {
    renderNav();
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
  });
});
