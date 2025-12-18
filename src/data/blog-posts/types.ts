// Blog post type definition (matches Supabase schema)
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  author: string;
  author_name: string | null;
  author_bio: string | null;
  is_published: boolean;
  published_at: string | null;
  reading_time: string | null;
  meta_title: string | null;
  meta_description: string | null;
  seo_keywords: string | null;
  featured_image_url: string | null;
  featured_image_alt: string | null;
  updated_at: string | null;
}

