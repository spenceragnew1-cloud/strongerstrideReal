/*
  # Create Events Tracking Table

  1. New Tables
    - `events`
      - `id` (uuid, primary key) - Unique identifier for each event
      - `event_type` (text) - Type of event (e.g., 'assessment_button_click', 'program_click')
      - `event_data` (jsonb) - Flexible JSON data for event-specific information
      - `session_id` (text, nullable) - Browser session identifier for tracking user journeys
      - `page_url` (text, nullable) - The page where the event occurred
      - `referrer` (text, nullable) - The page the user came from
      - `user_email` (text, nullable) - User email if known at time of event
      - `user_agent` (text, nullable) - Browser/device information
      - `created_at` (timestamptz) - When the event occurred

  2. Security
    - Enable RLS on `events` table
    - Add policy for anonymous users to insert events (write-only for tracking)
    - Add policy for authenticated admin users to read events

  3. Indexes
    - Index on event_type for filtering by event type
    - Index on created_at for time-based queries
    - Index on session_id for tracking user sessions

  4. Purpose
    - Track user interactions before they enter email (homepage clicks, page views, etc.)
    - Understand conversion funnel and drop-off points
    - Measure effectiveness of CTAs and page engagement
*/

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  event_data jsonb DEFAULT '{}'::jsonb,
  session_id text,
  page_url text,
  referrer text,
  user_email text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert events (for tracking)
CREATE POLICY "Anyone can insert events"
  ON events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only allow reading events through database functions (for admin analytics)
CREATE POLICY "Service role can read events"
  ON events
  FOR SELECT
  TO authenticated
  USING (false);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_events_event_type ON events(event_type);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_session_id ON events(session_id) WHERE session_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_events_user_email ON events(user_email) WHERE user_email IS NOT NULL;

-- Create analytics function to get event counts
CREATE OR REPLACE FUNCTION get_event_summary()
RETURNS TABLE (
  event_type text,
  event_count bigint,
  unique_sessions bigint
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    event_type,
    COUNT(*) as event_count,
    COUNT(DISTINCT session_id) as unique_sessions
  FROM events
  WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
  GROUP BY event_type
  ORDER BY event_count DESC;
$$;

-- Create function to get conversion funnel
CREATE OR REPLACE FUNCTION get_conversion_funnel()
RETURNS TABLE (
  step text,
  count bigint,
  conversion_rate numeric
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  WITH funnel_data AS (
    SELECT 
      COUNT(DISTINCT CASE WHEN event_type = 'assessment_button_click' THEN session_id END) as clicked_assessment,
      COUNT(DISTINCT CASE WHEN event_type = 'assessment_started' THEN session_id END) as started_assessment,
      COUNT(DISTINCT a.id) as completed_assessment
    FROM events e
    LEFT JOIN assessments a ON a.user_email = e.user_email AND a.is_complete = true
    WHERE e.created_at >= CURRENT_DATE - INTERVAL '30 days'
  )
  SELECT 'Clicked Assessment Button'::text as step, clicked_assessment as count, 100.0 as conversion_rate FROM funnel_data
  UNION ALL
  SELECT 'Started Assessment'::text, started_assessment, ROUND(started_assessment * 100.0 / NULLIF(clicked_assessment, 0), 1) FROM funnel_data
  UNION ALL
  SELECT 'Completed Assessment'::text, completed_assessment, ROUND(completed_assessment * 100.0 / NULLIF(started_assessment, 0), 1) FROM funnel_data;
$$;