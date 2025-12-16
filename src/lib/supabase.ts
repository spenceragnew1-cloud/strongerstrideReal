import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Exercise = {
  id: string;
  name: string;
  description: string;
  instructions: string;
  common_mistakes: string;
  why_matters: string;
  order_number: number;
};

export type Assessment = {
  id: string;
  user_email: string;
  started_at: string;
  completed_at: string | null;
  is_complete: boolean;
};

export type AssessmentResult = {
  id: string;
  assessment_id: string;
  exercise_id: string;
  result: 1 | 2 | 3;
};

export type Program = {
  id: string;
  name: string;
  description: string;
  full_description: string;
  price: number;
  duration_weeks: number;
  target_deficits: string[];
  week_1_content: string;
  week_2_content: string;
  week_3_content: string;
  week_4_content: string;
  week_5_content: string;
  week_6_content: string;
  week_7_content: string;
  week_8_content: string;
  week_9_content: string;
  week_10_content: string;
  week_11_content: string;
  week_12_content: string;
  order_number: number;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_url: string | null;
  featured_image_alt: string | null;
  author: string;
  author_name: string | null;
  author_bio: string | null;
  reading_time: string | null;
  meta_title: string | null;
  meta_description: string | null;
  seo_keywords: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  is_published: boolean;
};
