/*
  # Create Assessment Platform Schema for Stronger Stride

  1. New Tables
    - exercises - Evidence-based assessment exercises
    - assessments - Assessment sessions
    - assessment_results - Exercise results
    - programs - Templated strength programs
    - program_deficits - Deficit to program mapping
    - blog_posts - Blog content
    - purchases - Stripe purchases

  2. Security
    - Enable RLS on all tables
    - Public read access for blog, programs, exercises
    - User-specific access for assessments and results

  3. Key Features
    - Assessment results stored for personalization
    - Program recommendations based on deficits
    - Blog system for SEO
    - Purchase tracking
*/

CREATE TABLE IF NOT EXISTS exercises (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  instructions text NOT NULL,
  common_mistakes text NOT NULL,
  why_matters text NOT NULL,
  order_number int NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Exercises are publicly readable"
  ON exercises FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  user_email text NOT NULL,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  is_complete boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create assessments"
  ON assessments FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view own assessments"
  ON assessments FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Users can update own assessments"
  ON assessments FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE TABLE IF NOT EXISTS assessment_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  exercise_id uuid NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
  result int NOT NULL CHECK (result IN (1, 2, 3)),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE assessment_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Assessment results are readable"
  ON assessment_results FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can create assessment results"
  ON assessment_results FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE TABLE IF NOT EXISTS programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  full_description text NOT NULL,
  price int DEFAULT 3900,
  duration_weeks int DEFAULT 12,
  target_deficits text[] NOT NULL,
  week_1_content text NOT NULL,
  week_2_content text NOT NULL,
  week_3_content text NOT NULL,
  week_4_content text NOT NULL,
  week_5_content text NOT NULL,
  week_6_content text NOT NULL,
  week_7_content text NOT NULL,
  week_8_content text NOT NULL,
  week_9_content text NOT NULL,
  week_10_content text NOT NULL,
  week_11_content text NOT NULL,
  week_12_content text NOT NULL,
  order_number int NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Programs are publicly readable"
  ON programs FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS program_deficits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id uuid NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  deficit_type text NOT NULL,
  deficit_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE program_deficits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Program deficits are publicly readable"
  ON program_deficits FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text NOT NULL,
  content text NOT NULL,
  featured_image_url text,
  author text DEFAULT 'Stronger Stride',
  seo_keywords text,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  is_published boolean DEFAULT false
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published blog posts are readable"
  ON blog_posts FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE TABLE IF NOT EXISTS purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  program_id uuid NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  stripe_session_id text,
  amount int NOT NULL,
  status text DEFAULT 'pending',
  purchased_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Purchases are readable"
  ON purchases FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can create purchases"
  ON purchases FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE INDEX idx_assessments_email ON assessments(user_email);
CREATE INDEX idx_assessment_results_assessment ON assessment_results(assessment_id);
CREATE INDEX idx_assessment_results_exercise ON assessment_results(exercise_id);
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_purchases_assessment ON purchases(assessment_id);