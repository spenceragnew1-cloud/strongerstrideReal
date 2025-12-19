// Export all blog posts and types
export type { BlogPost } from './types';

import { hipStrengthPost } from './hip-strength';
import { itBandPost } from './it-band';
import { strideLengthPost } from './stride-length';
import { calfStrengthPost } from './calf-strength';
import { heavyWeightsPost } from './heavy-weights';
import { musclesThatMatterPost } from './muscles-that-matter';
import { BlogPost } from './types';

// All blog posts sorted by published date (newest first)
export const blogPosts: BlogPost[] = [
  musclesThatMatterPost,
  heavyWeightsPost,
  calfStrengthPost,
  strideLengthPost,
  itBandPost,
  hipStrengthPost,
].sort((a, b) => {
  const dateA = a.published_at ? new Date(a.published_at).getTime() : 0;
  const dateB = b.published_at ? new Date(b.published_at).getTime() : 0;
  return dateB - dateA;
});

// Get all published posts
export function getPublishedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.is_published);
}

// Get a single post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug && post.is_published);
}

// Get related posts (excluding the current post)
export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  return blogPosts
    .filter(post => post.slug !== currentSlug && post.is_published)
    .slice(0, limit);
}


