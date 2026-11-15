import { useEffect } from 'react';

const SITE_URL = 'https://adityanaik.motioncraft.co.in';

export function usePageMeta(title: string, description: string, path: string) {
  useEffect(() => {
    document.title = title;
    const url = `${SITE_URL}${path}`;
    const setContent = (selector: string, value: string) => {
      const element = document.querySelector<HTMLMetaElement>(selector);
      if (element) element.content = value;
    };
    setContent('meta[name="description"]', description);
    setContent('meta[property="og:title"]', title);
    setContent('meta[property="og:description"]', description);
    setContent('meta[property="og:url"]', url);
    setContent('meta[property="twitter:title"]', title);
    setContent('meta[property="twitter:description"]', description);
    setContent('meta[property="twitter:url"]', url);
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', url);
  }, [title, description, path]);
}
