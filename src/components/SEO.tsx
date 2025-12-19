import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://strongerstride.com';

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  image?: string;
  imageAlt?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string;
  type?: 'website' | 'article';
}

export default function SEO({
  title,
  description,
  canonicalPath,
  image,
  imageAlt,
  publishedTime,
  modifiedTime,
  author,
  keywords,
  type = 'website',
}: SEOProps) {
  // Infer canonical path from current location if not provided
  const pathname = canonicalPath || window.location.pathname;
  const canonicalUrl = `${SITE_URL}${pathname === '/' ? '/' : pathname}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      {image && (
        <>
          <meta property="og:image" content={image} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
        </>
      )}

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && (
        <>
          <meta name="twitter:image" content={image} />
          {imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}
        </>
      )}

      {/* Article-specific tags */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
        </>
      )}
    </Helmet>
  );
}

