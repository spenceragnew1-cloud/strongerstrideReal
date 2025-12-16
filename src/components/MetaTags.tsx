import { useEffect } from 'react';

interface MetaTagsProps {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  imageAlt?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string;
  type?: 'website' | 'article';
}

export default function MetaTags({
  title,
  description,
  canonical,
  image,
  imageAlt,
  publishedTime,
  modifiedTime,
  author,
  keywords,
  type = 'article',
}: MetaTagsProps) {
  useEffect(() => {
    // Set title
    document.title = title;

    // Helper function to set or update meta tag
    const setMetaTag = (selector: string, attribute: string, content: string) => {
      let meta = document.querySelector(selector);
      if (!meta) {
        meta = document.createElement('meta');
        if (attribute === 'property') {
          meta.setAttribute('property', selector.replace('meta[property="', '').replace('"]', ''));
        } else {
          meta.setAttribute('name', selector.replace('meta[name="', '').replace('"]', ''));
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Helper function to set or update link tag
    const setLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.href = href;
    };

    // Basic meta tags
    setMetaTag('meta[name="description"]', 'name', description);
    if (keywords) {
      setMetaTag('meta[name="keywords"]', 'name', keywords);
    }

    // Canonical URL
    setLinkTag('canonical', canonical);

    // Open Graph tags
    setMetaTag('meta[property="og:title"]', 'property', title);
    setMetaTag('meta[property="og:description"]', 'property', description);
    setMetaTag('meta[property="og:url"]', 'property', canonical);
    setMetaTag('meta[property="og:type"]', 'property', type);
    if (image) {
      setMetaTag('meta[property="og:image"]', 'property', image);
      setMetaTag('meta[property="og:image:width"]', 'property', '1200');
      setMetaTag('meta[property="og:image:height"]', 'property', '630');
      if (imageAlt) {
        setMetaTag('meta[property="og:image:alt"]', 'property', imageAlt);
      }
    }

    // Twitter Card tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', title);
    setMetaTag('meta[name="twitter:description"]', 'name', description);
    if (image) {
      setMetaTag('meta[name="twitter:image"]', 'name', image);
      if (imageAlt) {
        setMetaTag('meta[name="twitter:image:alt"]', 'name', imageAlt);
      }
    }

    // Article-specific tags
    if (type === 'article') {
      if (publishedTime) {
        setMetaTag('meta[property="article:published_time"]', 'property', publishedTime);
      }
      if (modifiedTime) {
        setMetaTag('meta[property="article:modified_time"]', 'property', modifiedTime);
      }
      if (author) {
        setMetaTag('meta[property="article:author"]', 'property', author);
      }
    }

    // Cleanup function
    return () => {
      // Reset to default title on unmount
      document.title = 'StrongerStride - Strength Training for Runners';
    };
  }, [title, description, canonical, image, imageAlt, publishedTime, modifiedTime, author, keywords, type]);

  return null;
}
