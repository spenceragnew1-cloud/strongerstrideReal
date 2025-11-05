/*
  # Insert 5 Templated 12-Week Strength Programs

  Each program is tailored to address specific deficit patterns identified during assessment.
  Programs are priced at $39 USD (3900 cents).

  Programs:
  1. Ankle Stability & Power - For ankle/foot deficits
  2. Hip Strength & Stability - For hip/glute deficits
  3. Mobility & Flexibility - For mobility restrictions
  4. Core Strength & Control - For core/stability deficits
  5. Full Body Running Strength - Comprehensive program
*/

INSERT INTO programs (name, description, full_description, price, duration_weeks, target_deficits, order_number, week_1_content, week_2_content, week_3_content, week_4_content, week_5_content, week_6_content, week_7_content, week_8_content, week_9_content, week_10_content, week_11_content, week_12_content) VALUES
(
  'Ankle Stability & Power',
  'Build ankle strength and proprioception to reduce injury risk.',
  'This 12-week program focuses on strengthening ankle stabilizers and improving proprioception. Designed for runners with weak ankles, poor balance, or a history of ankle issues. You''ll progress from basic stability work to reactive strength exercises like single-leg hops and plyometrics.',
  3900,
  12,
  ARRAY['ankle_stability', 'ankle_strength', 'proprioception'],
  1,
  'Week 1: Establish baseline stability. Daily ankle alphabet (draw letters with your foot), double-leg calf raises 3x15, seated ankle circles, basic balance work. 2x per week.',
  'Week 2: Add single-leg foundation. Single-leg stance 30 seconds, single-leg calf raises 3x10, tandem walking, proprioceptive balance on unstable surface. 2x per week.',
  'Week 3: Increase intensity. Single-leg stance on foam pad 45 seconds, single-leg calf raises 3x12, single-leg balance with arm movements, reactive balance drills. 3x per week.',
  'Week 4: Test week. Assess progress on single-leg stance, calf strength. Maintain intensity, add perturbation training (having someone gently push you while balancing). 2x per week.',
  'Week 5: Introduce plyometrics. Small single-leg hops 3x10, lateral hops, forward/backward hops, continue strength work. 3x per week.',
  'Week 6: Advance plyometrics. Increase hop volume, add directional changes, box step-downs, single-leg balance with eyes closed. 3x per week.',
  'Week 7: High volume phase. 4x per week training. Combine all previous exercises, add agility ladder drills, lateral bounding. Maintain good form throughout.',
  'Week 8: Deload week. Reduce volume by 40%, maintain intensity on key exercises (single-leg hops, calf raises). Allow recovery. 2x per week.',
  'Week 9: Sport-specific. Add running-specific drills: bounding, high-knee runs, single-leg deadlifts with rotation. Balance work with athletic movements. 3x per week.',
  'Week 10: Max strength. Heavy single-leg calf raises, lateral lunges with weight, single-leg deadlifts with resistance. 3x per week.',
  'Week 11: Power phase. Explosive hops with direction changes, box jumps to single-leg landing, reactive balance games. 3x per week.',
  'Week 12: Consolidation and testing. Perform final assessment tests. Maintain all strength and power work, plan progression for next phase. 2x per week.'
),
(
  'Hip Strength & Stability',
  'Strengthen glutes and hip stabilizers for powerful, injury-free running.',
  'This program targets hip abductors, external rotators, and the glutes—the powerhouse muscles for runners. Most running injuries stem from weak hips. Over 12 weeks, you''ll progress from isolated strength work to integrated, dynamic patterns that improve running performance.',
  3900,
  12,
  ARRAY['hip_stability', 'glute_strength', 'hip_control'],
  2,
  'Week 1: Glute activation. Clamshells 3x15, side-lying leg raises 3x12, glute bridges 3x15, fire hydrants. Focus on mind-muscle connection. 2x per week.',
  'Week 2: Single-leg foundation. Single-leg glute bridges 3x10, lateral step-downs 3x12, lateral walks with band, monster walks. 2x per week.',
  'Week 3: Add resistance. Lateral step-downs with weight, glute bridge pulses, banded lateral walks, side-lying clamshells with resistance. 3x per week.',
  'Week 4: Test and assess. Perform lateral step-down assessment. Maintain intensity, add single-leg deadlifts (light weight). 2x per week.',
  'Week 5: Dynamic stability. Bulgarian split squats 3x12, walking lunges, side lunges with rotation, single-leg balance with perturbation. 3x per week.',
  'Week 6: Heavy strength. Single-leg deadlifts with weight, weighted lateral step-downs, weighted glute bridges, hip thrusts. 3x per week.',
  'Week 7: Volume phase. 4x per week. Combine all exercises, add single-leg squats (assisted if needed), lateral bounds with control. 4x per week.',
  'Week 8: Deload. Reduce volume 40%, maintain technique. Light resistance work, mobility focus. 2x per week.',
  'Week 9: Running integration. Add lateral lunges, curtsy lunges, step-ups with rotation, monster walks with running cadence. 3x per week.',
  'Week 10: Max strength phase. Heavy single-leg deadlifts, pistol squat progressions, weighted Bulgarian split squats, lateral bounds. 3x per week.',
  'Week 11: Power and plyometrics. Single-leg hops with control, bounding for distance, lateral bounds, box step-ups to single-leg balance. 3x per week.',
  'Week 12: Final assessment and consolidation. Retest lateral step-down and single-leg bridge. Program graduation—you''re ready for advanced running training. 2x per week.'
),
(
  'Mobility & Flexibility',
  'Unlock restricted movement patterns that limit running efficiency.',
  'This program addresses the stiffness that accumulates from running. Improved mobility in your ankles, hips, and thoracic spine will enhance your stride length, reduce compensatory movement patterns, and prevent injuries. This is your foundation for everything else.',
  3900,
  12,
  ARRAY['ankle_mobility', 'hip_mobility', 'thoracic_mobility'],
  3,
  'Week 1: Daily mobility foundation. Knee to wall test (ankle dorsiflexion), 90/90 hip test, thoracic rotations, calf stretches, hip flexor stretches. Daily 10 minutes.',
  'Week 2: Add depth. Deep QL stretches, pigeon pose, 90/90 internal rotation work, deep calf stretches, use foam roller on calves and quads. Daily 12 minutes.',
  'Week 3: Mobilization tools. Add lacrosse ball work on feet and hips, dynamic stretching, couch stretch for hip flexors, world''s greatest stretch. Daily 15 minutes.',
  'Week 4: Test mobility progress. Retest knee to wall distance, 90/90 range. Add strength-mobility combo work: lateral lunges with rotation, deep squats. Daily 15 minutes.',
  'Week 5: Deepen range. Increase stretch duration (hold longer), add PNF stretching with partner or strap, deep squat holds, hip mobility sequences. Daily 12 minutes.',
  'Week 6: Yoga integration. Add yoga-based flows (downward dog, runner''s lunge flow), warrior pose transitions, hip openers. 3x per week, 20 minutes each.',
  'Week 7: Active mobility. Combine strength with mobility: walking lunges with torso rotation, lateral band walks into calf stretch, bear crawls, inchworms. 4x per week, 15 minutes.',
  'Week 8: Deload and maintain. Light stretching, foam rolling, easy yoga. Reduce intensity while maintaining gains. 3x per week.',
  'Week 9: Loaded mobility. Goblet squats for depth, loaded calf stretches, weighted lunges with rotation, sled push for mobility. 3x per week.',
  'Week 10: Advanced ranges. Deeper pigeon pose, advanced 90/90 variations, third-world squat holds, deep hamstring stretches. Daily 12 minutes.',
  'Week 11: Maintenance and resilience. Sport-specific mobility: high-knee runs to pigeon stretch, bounding to hamstring stretch, agility with range work. 3x per week.',
  'Week 12: Final assessment and maintenance plan. Retest all mobility markers. You now have a baseline maintenance routine for running. Daily 10 minutes ongoing.'
),
(
  'Core Strength & Control',
  'Build the foundation that supports all running power and prevents injury.',
  'Your core does far more than give you abs—it stabilizes your hips, transfers power, and maintains running form over distance. This 12-week program progressively builds core strength and endurance, addressing the deficits that lead to low back pain, hip pain, and poor running mechanics.',
  3900,
  12,
  ARRAY['core_strength', 'core_stability', 'lumbar_stability'],
  4,
  'Week 1: Core foundations. Dead bugs, bird dogs, planks (hold 30 seconds), side planks (20 seconds each), pallof press. 2x per week.',
  'Week 2: Increase duration and difficulty. Plank 45 seconds, side plank 30 seconds, dead bugs with weight, bird dogs with resistance band, hollow holds. 2x per week.',
  'Week 3: Add dynamic work. Plank with arm reaches, side plank with hip dips, bird dogs with alternating limbs, rotational dead bugs. 3x per week.',
  'Week 4: Test week. Hold times for planks and side planks. Add farmer carries, loaded carries, sled pushes for core activation under load. 2x per week.',
  'Week 5: Heavy anti-rotation. Pallof presses with weight, cable chops, landmine rotations, suitcase carries, offset loaded carries. 3x per week.',
  'Week 6: Add instability. Planks on stability ball, side planks on balance board, Swiss ball dead bugs, TRX fallouts, ab wheel rollouts (advanced). 3x per week.',
  'Week 7: Volume phase. 4x per week training. Combine all movements, add sled pulls and pushes, resisted crunches. High volume, moderate intensity.',
  'Week 8: Deload. Reduce volume 40%, maintain core activation drills, light carries. Recovery week. 2x per week.',
  'Week 9: Running integration. Ab wheel rollouts, Pallof walks, dead bugs with alternating leg lifts, Turkish get-ups, core with lateral movement. 3x per week.',
  'Week 10: Max strength. Heavy Pallof presses, loaded carries for distance/time, ab wheel variations, sled pushes with max load. 3x per week.',
  'Week 11: Endurance and power. Long plank holds (2+ minutes), sustained side planks, high-rep Pallof presses, explosive cable chops. 3x per week.',
  'Week 12: Final assessment and running-specific core. Full plank and side plank testing. Combine core work with dynamic running movements. You''re ready for advanced training. 2x per week.'
),
(
  'Full Body Running Strength',
  'Comprehensive strength building designed specifically for runners.',
  'This is our most complete program. It addresses all the systems runners need: ankle stability, hip strength, core control, and upper body power. Designed for runners who want a well-rounded strength program that prevents injuries while improving speed and endurance.',
  3900,
  12,
  ARRAY['overall_strength', 'balance', 'mobility', 'power'],
  5,
  'Week 1: Movement patterns. Master basic patterns: squats, lunges, deadlifts (light), planks, glute bridges, calf raises, rows, push-ups. 2x per week full body.',
  'Week 2: Add single-leg work. Single-leg squats (assisted), single-leg deadlifts (light), single-leg calf raises, single-leg glute bridges, single-leg balance work. 2x per week.',
  'Week 3: Increase intensity. Load increases across all patterns, add Olympic lift variations (light power cleans), plyometric introduction. 3x per week.',
  'Week 4: Assessment phase. Test 1RM equivalents on key lifts. Refine technique. Continue progressive loading. 2x per week.',
  'Week 5: Heavy strength block. Focus on compound lifts: squats, deadlifts, lunges, single-leg deadlifts—heavier loads, lower reps. 3x per week.',
  'Week 6: Strength + Power. Combine heavy strength with explosive movements: power cleans, box jumps, bounding, fast-rep squats. 3x per week.',
  'Week 7: Volume phase. High volume across all movement patterns. 4x per week training: upper, lower, full body workouts.',
  'Week 8: Deload week. Reduce volume 40%, maintain technique and intensity on key lifts. Active recovery. 2x per week.',
  'Week 9: Running-specific strength. Integrate strength with running mechanics: lunges with rotation, single-leg bounds, explosive step-ups, Turkish get-ups. 3x per week.',
  'Week 10: Max strength phase. Heavy singles and doubles on major lifts (squats, deadlifts, single-leg work). Build absolute strength. 3x per week.',
  'Week 11: Power and speed. Olympic lifts, plyometrics, agility drills combined with strength work. Explosive movements, fast feet. 3x per week.',
  'Week 12: Integration and testing. Final strength assessments. Combine all modalities into one cohesive running-strength program. Ready for race training. 2x per week.'
);
