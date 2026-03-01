// Analytics utility for tracking page views and events
// Supports Google Analytics, Plausible, and custom analytics

interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

class Analytics {
  private isEnabled: boolean = false;

  // Initialize analytics (call this in your app entry point)
  init(trackingId?: string) {
    if (!trackingId) {
      console.warn('Analytics: No tracking ID provided');
      return;
    }

    this.isEnabled = true;

    // Google Analytics 4 (gtag.js)
    if (trackingId.startsWith('G-')) {
      this.initGoogleAnalytics(trackingId);
    }
    // Add other analytics providers here
  }

  private initGoogleAnalytics(trackingId: string) {
    // Load gtag.js script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script);

    // Initialize gtag
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    (window as any).gtag = gtag;

    gtag('js', new Date());
    gtag('config', trackingId, {
      page_path: window.location.pathname,
    });
  }

  // Track page views
  pageView(path: string) {
    if (!this.isEnabled) return;

    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'page_view', {
        page_path: path,
      });
    }
  }

  // Track custom events
  event({ category, action, label, value }: AnalyticsEvent) {
    if (!this.isEnabled) return;

    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  }

  // Track outbound links
  trackOutboundLink(url: string, label?: string) {
    this.event({
      category: 'Outbound Link',
      action: 'Click',
      label: label || url,
    });
  }

  // Track video interactions
  trackVideo(action: 'play' | 'pause' | 'complete', videoTitle: string) {
    this.event({
      category: 'Video',
      action: action,
      label: videoTitle,
    });
  }

  // Track downloads
  trackDownload(fileName: string) {
    this.event({
      category: 'Download',
      action: 'Click',
      label: fileName,
    });
  }
}

export const analytics = new Analytics();
