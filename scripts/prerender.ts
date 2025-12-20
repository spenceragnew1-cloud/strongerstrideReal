// Custom prerender script using Puppeteer
import puppeteer from 'puppeteer';
import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { spawn } from 'child_process';

const baseUrl = 'http://localhost:4173'; // Vite preview server
const distDir = join(process.cwd(), 'dist');

async function waitForServer(url: string, maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return true;
    } catch (e) {
      // Server not ready yet
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  throw new Error('Server did not start in time');
}

async function prerenderRoute(browser: any, route: string) {
  const page = await browser.newPage();
  const url = `${baseUrl}${route}`;
  
  console.log(`Prerendering: ${url}`);
  
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  
  // Wait for render event
  await page.evaluate(() => {
    return new Promise((resolve) => {
      document.addEventListener('render-event', resolve, { once: true });
      setTimeout(resolve, 2000); // Fallback timeout
    });
  });
  
  const html = await page.content();
  await page.close();
  
  // Save HTML to appropriate path
  let filePath: string;
  if (route === '/') {
    filePath = join(distDir, 'index.html');
  } else {
    const pathParts = route.split('/').filter(Boolean);
    const dir = join(distDir, ...pathParts);
    mkdirSync(dir, { recursive: true });
    filePath = join(dir, 'index.html');
  }
  
  writeFileSync(filePath, html, 'utf-8');
  console.log(`✅ Saved: ${filePath}`);
}

async function prerender() {
  // Load routes
  const staticRoutes = ['/', '/assessment', '/programs', '/blog'];
  
  const blogRoutesPath = join(process.cwd(), 'src', 'seo', 'blog-routes.json');
  let blogRoutes: string[] = [];
  if (existsSync(blogRoutesPath)) {
    const blogData = JSON.parse(readFileSync(blogRoutesPath, 'utf-8'));
    blogRoutes = blogData.map((r: { path: string }) => r.path);
  }
  
  const allRoutes = [...staticRoutes, ...blogRoutes];
  
  console.log(`Starting prerender for ${allRoutes.length} routes...`);
  
  // Start preview server
  console.log('Starting preview server...');
  const previewProcess = spawn('npm', ['run', 'preview'], {
    stdio: 'pipe',
    shell: true,
  });
  
  let serverReady = false;
  previewProcess.stdout?.on('data', (data) => {
    const output = data.toString();
    if (output.includes('Local:') || output.includes('localhost')) {
      serverReady = true;
    }
  });
  
  try {
    await waitForServer(baseUrl);
    console.log('Preview server ready!');
    
    const browser = await puppeteer.launch({ headless: true });
    
    try {
      for (const route of allRoutes) {
        await prerenderRoute(browser, route);
      }
    } finally {
      await browser.close();
    }
    
    console.log('✅ Prerender complete!');
  } finally {
    previewProcess.kill();
  }
}

prerender().catch((error) => {
  console.error('Prerender failed:', error);
  process.exit(1);
});

