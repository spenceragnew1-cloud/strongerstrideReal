import puppeteer from 'puppeteer';
import express from 'express';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DIST_DIR = join(__dirname, '../dist');
const PORT = 4173;

// Routes to prerender
const routes = [
  '/',
  '/assessment',
  '/programs',
  '/blog',
  '/about',
  '/blog/calf-strength-distance-runners',
  '/blog/stride-length-vs-stride-frequency-distance-runners',
  '/blog/heavy-weights-vs-high-reps-for-runners',
  '/blog/hip-strength-running-performance',
  '/blog/it-band-syndrome-runners-hip-strength',
  '/blog/muscles-that-matter-for-distance-running',
];

async function prerender() {
  console.log('Starting prerender...');
  
  if (!existsSync(DIST_DIR)) {
    console.error('Dist directory not found. Please run "npm run build" first.');
    process.exit(1);
  }

  // Start a simple static server
  const app = express();
  app.use(express.static(DIST_DIR));
  
  // SPA fallback - serve index.html for all routes
  app.use((req, res) => {
    res.sendFile(join(DIST_DIR, 'index.html'));
  });

  const server = app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    for (const route of routes) {
      try {
        console.log(`Prerendering ${route}...`);
        
        const page = await browser.newPage();
        
        // Navigate to the route
        await page.goto(`http://localhost:${PORT}${route}`, {
          waitUntil: 'networkidle0',
          timeout: 30000,
        });
        
        // Wait for React to render and Helmet to update
        // Check for canonical tag to ensure SEO metadata is loaded
        await page.waitForSelector('link[rel="canonical"]', { timeout: 10000 }).catch(() => {
          console.warn(`Warning: No canonical tag found for ${route}, continuing anyway...`);
        });
        
        // Additional wait to ensure all content is rendered
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Get the fully rendered HTML
        const html = await page.content();
        
      // Determine output path
      let outputPath;
      if (route === '/') {
        outputPath = join(DIST_DIR, 'index.html');
      } else {
        const routeDir = join(DIST_DIR, route);
        mkdirSync(routeDir, { recursive: true });
        outputPath = join(routeDir, 'index.html');
      }
      
      // Write the prerendered HTML
      writeFileSync(outputPath, html, 'utf-8');
      console.log(`✓ Prerendered ${route} -> ${outputPath}`);
      
      await page.close();
      } catch (error) {
        console.error(`Error prerendering ${route}:`, error.message);
      }
    }

    await browser.close();
    server.close();
    console.log('Prerender complete!');
  });
}

prerender().catch(console.error);

