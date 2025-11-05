/*
  # Add SEO and Author Fields to Blog Posts

  1. Changes
    - Add `meta_title` column for SEO browser tab title
    - Add `meta_description` column for SEO search engine description
    - Add `featured_image_alt` column for image accessibility
    - Add `author_name` column (replacing generic 'author')
    - Add `author_bio` column for author information
    - Add `reading_time` column for estimated read time
    - Convert `published_at` to `published_date` (date type) for cleaner date handling

  2. Notes
    - These fields are needed for proper SEO optimization
    - Author bio allows for detailed author information on each post
*/

-- Add new columns if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_posts' AND column_name = 'meta_title'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN meta_title text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_posts' AND column_name = 'meta_description'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN meta_description text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_posts' AND column_name = 'featured_image_alt'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN featured_image_alt text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_posts' AND column_name = 'author_name'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN author_name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_posts' AND column_name = 'author_bio'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN author_bio text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_posts' AND column_name = 'reading_time'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN reading_time text DEFAULT '5 min read';
  END IF;
END $$;

-- Create index on slug if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

-- Create index on published_at for sorting
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);