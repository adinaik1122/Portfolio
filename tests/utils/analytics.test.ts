import { describe, it, expect, vi, beforeEach } from 'vitest';
import { analytics } from '../../utils/analytics';

describe('Analytics Utility', () => {
  beforeEach(() => {
    // Clear any previous gtag calls
    delete (window as any).gtag;
    delete (window as any).dataLayer;
  });

  it('initializes with Google Analytics tracking ID', () => {
    const trackingId = 'G-TEST123';
    analytics.init(trackingId);
    
    expect((window as any).dataLayer).toBeDefined();
  });

  it('does not initialize without tracking ID', () => {
    const consoleSpy = vi.spyOn(console, 'warn');
    analytics.init(undefined);
    
    expect(consoleSpy).toHaveBeenCalledWith('Analytics: No tracking ID provided');
  });

  it('tracks custom events', () => {
    const trackingId = 'G-TEST123';
    analytics.init(trackingId);
    
    const gtagSpy = vi.fn();
    (window as any).gtag = gtagSpy;
    
    analytics.event({
      category: 'Test',
      action: 'Click',
      label: 'Button',
    });
    
    expect(gtagSpy).toHaveBeenCalledWith('event', 'Click', {
      event_category: 'Test',
      event_label: 'Button',
      value: undefined,
    });
  });

  it('tracks outbound links', () => {
    const trackingId = 'G-TEST123';
    analytics.init(trackingId);
    
    const gtagSpy = vi.fn();
    (window as any).gtag = gtagSpy;
    
    analytics.trackOutboundLink('https://example.com', 'Example Site');
    
    expect(gtagSpy).toHaveBeenCalledWith('event', 'Click', {
      event_category: 'Outbound Link',
      event_label: 'Example Site',
      value: undefined,
    });
  });

  it('tracks video interactions', () => {
    const trackingId = 'G-TEST123';
    analytics.init(trackingId);
    
    const gtagSpy = vi.fn();
    (window as any).gtag = gtagSpy;
    
    analytics.trackVideo('play', 'Test Video');
    
    expect(gtagSpy).toHaveBeenCalledWith('event', 'play', {
      event_category: 'Video',
      event_label: 'Test Video',
      value: undefined,
    });
  });
});
