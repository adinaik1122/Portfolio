import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import VideoEmbed from '../../components/VideoEmbed';

describe('VideoEmbed Component', () => {
  it('renders iframe with correct src', () => {
    const testSrc = 'https://www.youtube.com/embed/test123';
    const testTitle = 'Test Video';
    
    render(<VideoEmbed src={testSrc} title={testTitle} />);
    
    const iframe = screen.getByTitle(testTitle);
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', testSrc);
  });

  it('shows loading state initially', () => {
    render(<VideoEmbed src="https://test.com" title="Test" />);
    
    expect(screen.getByText(/loading video/i)).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<VideoEmbed src="https://test.com" title="Test Video" />);
    
    const iframe = screen.getByTitle('Test Video');
    expect(iframe).toHaveAttribute('allowFullScreen');
    expect(iframe).toHaveAttribute('loading', 'lazy');
  });
});
