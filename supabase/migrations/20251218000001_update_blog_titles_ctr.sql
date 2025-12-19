/*
  # Update Blog Post Titles for CTR Optimization
  
  Updates meta_title for 4 blog posts to improve click-through rates
  with CTR boosters like "(Science-Backed)" and "(Research Explained)"
*/

-- Hip Strength: Add "(Science-Backed)"
UPDATE blog_posts 
SET meta_title = 'Hip Strength for Runners: Why It Matters (Science-Backed)'
WHERE slug = 'hip-strength-running-performance';

-- Calf Strength: Add "(Research Explained)"
UPDATE blog_posts 
SET meta_title = 'Calf Strength for Distance Runners (Research Explained)'
WHERE slug = 'calf-strength-distance-runners';

-- Heavy Weights: Shorten and add "(Backed by Research)"
UPDATE blog_posts 
SET meta_title = 'Heavy Weights vs High Reps for Runners (Backed by Research)'
WHERE slug = 'heavy-weights-vs-high-reps-for-runners';

-- Stride Length: Shorten to fit within 60 chars
UPDATE blog_posts 
SET meta_title = 'Stride Length vs Frequency: What Runners Need to Know'
WHERE slug = 'stride-length-vs-stride-frequency-distance-runners';

-- IT Band: No changes (already has strong hook)



