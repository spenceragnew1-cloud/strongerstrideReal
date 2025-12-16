/*
  # Create Analytics Functions
  
  1. Functions
    - `get_assessment_overview()` - Returns overall assessment statistics
    - `get_daily_activity()` - Returns daily assessment activity for last 30 days
    - `get_exercise_scores()` - Returns average scores per exercise
  
  2. Purpose
    - Enable analytics dashboard to query assessment data
    - Provide aggregated statistics for admin view
*/

-- Function: Get Assessment Overview
CREATE OR REPLACE FUNCTION get_assessment_overview()
RETURNS TABLE (
  total_assessments_started bigint,
  total_assessments_completed bigint,
  unique_users bigint,
  completion_rate_percent numeric
) 
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    COUNT(DISTINCT a.id) as total_assessments_started,
    COUNT(DISTINCT CASE WHEN a.is_complete = true THEN a.id END) as total_assessments_completed,
    COUNT(DISTINCT a.user_email) as unique_users,
    ROUND(
      COUNT(DISTINCT CASE WHEN a.is_complete = true THEN a.id END) * 100.0 / 
      NULLIF(COUNT(DISTINCT a.id), 0), 
      1
    ) as completion_rate_percent
  FROM assessments a
  WHERE a.user_email NOT LIKE '%@strongerstride.local'
    AND a.user_email NOT LIKE '%@test.com';
$$;

-- Function: Get Daily Activity
CREATE OR REPLACE FUNCTION get_daily_activity()
RETURNS TABLE (
  date date,
  assessments bigint,
  unique_users bigint
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    DATE(created_at) as date,
    COUNT(*) as assessments,
    COUNT(DISTINCT user_email) as unique_users
  FROM assessments
  WHERE user_email NOT LIKE '%@strongerstride.local'
    AND user_email NOT LIKE '%@test.com'
    AND created_at >= CURRENT_DATE - INTERVAL '30 days'
  GROUP BY DATE(created_at)
  ORDER BY date DESC;
$$;

-- Function: Get Exercise Scores
CREATE OR REPLACE FUNCTION get_exercise_scores()
RETURNS TABLE (
  name text,
  avg_score numeric,
  times_taken bigint
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    e.name,
    ROUND(AVG(ar.result), 2) as avg_score,
    COUNT(*) as times_taken
  FROM assessment_results ar
  JOIN exercises e ON e.id = ar.exercise_id
  JOIN assessments a ON a.id = ar.assessment_id
  WHERE a.user_email NOT LIKE '%@strongerstride.local'
    AND a.user_email NOT LIKE '%@test.com'
  GROUP BY e.name
  ORDER BY avg_score ASC;
$$;
