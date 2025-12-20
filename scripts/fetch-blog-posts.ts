// scripts/fetch-blog-posts.ts
import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { config } from 'dotenv';

// Load environment variables
config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️  Missing Supabase environment variables. Creating empty blog routes file.');
  const outputPath = join(process.cwd(), 'src', 'seo', 'blog-routes.json');
  writeFileSync(outputPath, JSON.stringify([], null, 2), 'utf-8');
  console.log(`✅ Created empty blog-routes.json at ${outputPath}`);
  process.exit(0);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface BlogPost {
  slug: string;
  title: string;
  meta_title: string | null;
  meta_description: string | null;
  excerpt: string;
  featured_image_url: string | null;
  published_at: string | null;
  updated_at: string;
  author_name: string | null;
  author: string;
  seo_keywords: string | null;
}

async function fetchBlogPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug, title, meta_title, meta_description, excerpt, featured_image_url, published_at, updated_at, author_name, author, seo_keywords')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch blog posts: ${error.message}`);
  }

  const routes = (data || []).map((post: BlogPost) => ({
    path: `/blog/${post.slug}`,
    slug: post.slug,
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt || '',
    image: post.featured_image_url || undefined,
    publishedTime: post.published_at || undefined,
    modifiedTime: post.updated_at || undefined,
    author: post.author_name || post.author || undefined,
    keywords: post.seo_keywords || undefined,
  }));

  const outputPath = join(process.cwd(), 'src', 'seo', 'blog-routes.json');
  writeFileSync(outputPath, JSON.stringify(routes, null, 2), 'utf-8');
  
  console.log(`✅ Fetched ${routes.length} blog posts and saved to ${outputPath}`);
  return routes;
}

fetchBlogPosts().catch((error) => {
  console.error('Error fetching blog posts:', error);
  process.exit(1);
});

