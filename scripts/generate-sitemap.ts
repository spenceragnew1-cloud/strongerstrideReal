// scripts/generate-sitemap.ts
import { writeFileSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';

// Static routes - matching src/seo/routes.ts
const staticRoutes = [
  { path: '/' },
  { path: '/assessment' },
  { path: '/programs' },
  { path: '/blog' },
];

const baseUrl = 'https://strongerstride.com';
const currentDate = new Date().toISOString().split('T')[0];

function generateSitemap() {
  const urls: string[] = [];

  // Add static routes
  staticRoutes.forEach((route) => {
    urls.push(`  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${route.path === '/' ? '1.0' : '0.8'}</priority>
  </url>`);
  });

  // Add blog post routes if file exists
  const blogRoutesPath = join(process.cwd(), 'src', 'seo', 'blog-routes.json');
  if (existsSync(blogRoutesPath)) {
    const blogRoutesData = JSON.parse(readFileSync(blogRoutesPath, 'utf-8'));
    blogRoutesData.forEach((route: { path: string; modifiedTime?: string }) => {
      const lastmod = route.modifiedTime
        ? new Date(route.modifiedTime).toISOString().split('T')[0]
        : currentDate;
      urls.push(`  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
    });
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  const outputPath = join(process.cwd(), 'public', 'sitemap.xml');
  writeFileSync(outputPath, sitemap, 'utf-8');
  console.log(`✅ Generated sitemap.xml with ${urls.length} URLs`);
}

generateSitemap();

