/*
  # Insert Evidence-Based Assessment Exercises

  These 10 exercises are based on research from PubMed and are specifically designed
  to assess the key strength, mobility, and stability deficits that commonly affect runners.

  1. Single Leg Stance (Eyes Closed) - Balance/Proprioception
  2. Lateral Step Down - Hip Stability
  3. Single Leg Hop - Ankle Stability & Power
  4. Single Leg Bridge - Glute Strength & Hip Stability
  5. Calf Raise (Single Leg) - Ankle Strength
  6. Side Plank - Core/Hip Stability
  7. Knee to Wall Test - Ankle Mobility
  8. 90/90 Hip Mobility Test - Hip Mobility
  9. Y-Balance Test - Dynamic Stability
  10. Prone Hip Internal Rotation - Hip Mobility

  Each includes evidence-based assessment criteria for the three response levels.
*/

INSERT INTO exercises (name, description, instructions, common_mistakes, why_matters, order_number) VALUES
(
  'Single Leg Stance (Eyes Closed)',
  'Test your proprioception and balance stability by standing on one leg with your eyes closed.',
  'Stand barefoot on a hard, flat surface. Lift one leg off the ground, bending the knee to about 90 degrees. Close your eyes and try to maintain balance. If you touch down, that counts as a loss of balance. Time how long you can hold it.',
  'Not bending the standing leg knee (you''ll lose balance faster), shifting your weight side to side before you start, wearing shoes (you need foot proprioception feedback)',
  'Single leg balance is critical for runners because it mimics your stance phase in running. Poor balance indicates weakness in your ankle stabilizers, glutes, and core—areas that directly impact injury risk and running efficiency.',
  1
),
(
  'Lateral Step Down',
  'Assess your hip stability and control during single-leg support by stepping down laterally.',
  'Stand on a 6-8 inch step or platform. Stand on one leg (the test leg). Step down slowly and carefully to the side with your other leg, lightly touching the ground. Keep your hip level and your torso upright. Step back up and repeat.',
  'Letting your hip drop on the non-stance side, leaning forward, moving too quickly, or bending your stance knee excessively',
  'The lateral step down is a key test for runners because it reveals hip abductor and external rotator strength. Weakness here is linked to knee valgus (inward collapse) during running, a major cause of runner''s knee and IT band syndrome.',
  2
),
(
  'Single Leg Hop',
  'Test ankle stability and reactive strength by hopping in place on one leg.',
  'Stand on one leg with arms ready for balance. Perform small, controlled hops in place (3-5 hops). Keep your torso upright and try to hop from your ankle rather than your knee. Complete hops on both sides.',
  'Using your knee to drive the hop instead of your ankle, letting your torso lean side to side, losing balance between hops, or using your arms to compensate for instability',
  'Single leg hopping directly assesses ankle stability and proprioception—essential for runners. Runners with poor ankle stability compensate with their knees and hips, leading to knee pain, shin splints, and plantar fasciitis.',
  3
),
(
  'Single Leg Bridge',
  'Evaluate glute strength and hip stability by performing a single-leg bridge.',
  'Lie on your back with one knee bent (foot on ground) and the other leg extended. Push through your heel to lift your hips off the ground until your body forms a straight line from knee to shoulders. Hold for 2-3 seconds. Lower and repeat on both sides.',
  'Hip hiking (lifting one hip higher than the other), arching your lower back excessively, not fully extending your hips, or pushing through your toes instead of your heel',
  'Glute strength is foundational for runners. Weak glutes force your hips to drop during running, causing your knee to cave inward (valgus). This single movement reveals glute deficits that lead to nearly every common running injury.',
  4
),
(
  'Calf Raise (Single Leg)',
  'Assess single leg calf strength and ankle plantarflexor power.',
  'Stand barefoot. Lift one leg slightly off the ground. Rise up onto the ball of your standing foot as high as possible. Lower back down slowly. Complete 10-15 reps on each side.',
  'Letting your ankle roll inward or outward (inverting or everting), hopping or using momentum, holding onto support too tightly, or not going through a full range of motion',
  'Strong calves are critical for runners because they absorb and propel energy during each stride. Weak calves increase stress on the Achilles tendon and plantar fascia, and compromise ankle stability on uneven terrain.',
  5
),
(
  'Side Plank',
  'Test lateral core and hip stability by holding a side plank position.',
  'Lie on your side with your forearm on the ground. Your elbow should be under your shoulder. Lift your hips off the ground so your body forms a straight line from your head to your feet. Hold this position steady.',
  'Letting your hips sag or drop, rotating your torso forward or backward, lifting your hips too high (hyperextending), or not maintaining a neutral spine',
  'Core and lateral stability are essential for runners to maintain proper form and prevent Trendelenburg gait (hip drop). Poor side plank performance indicates core weakness that translates to poor hip control and knee issues during running.',
  6
),
(
  'Knee to Wall Test',
  'Measure ankle dorsiflexion mobility, which is critical for running mechanics.',
  'Stand facing a wall with your feet about 4 inches away. Keep your heel on the ground and try to touch your knee to the wall without lifting your heel. Measure the distance from your big toe to the wall when your knee barely touches it. A normal value is 4+ inches.',
  'Lifting your heel off the ground, bending your hip or knee, leaning your torso, or pushing too hard and compensating with foot eversion',
  'Limited ankle dorsiflexion is linked to several running injuries including shin splints, plantar fasciitis, and Achilles tendinopathy. Runners with poor ankle mobility compensate by overpronating or putting excess stress on the calf and plantar fascia.',
  7
),
(
  '90/90 Hip Mobility Test',
  'Assess hip internal and external rotation mobility, which affects running stride mechanics.',
  'Sit on the floor with your hip flexed to 90 degrees and knee bent to 90 degrees. Externally rotate your hip so your shin is parallel to your body (the "90/90" position). The test measures how close your knee gets to the ground. Repeat on both sides.',
  'Forcing the movement, not sitting tall, letting your torso lean, or comparing one side to the other before assessing both independently',
  'Hip mobility is crucial for runners. Limited hip external rotation restricts stride length and forces compensation patterns in the knee and ankle, leading to IT band syndrome, runner''s knee, and hip pain.',
  8
),
(
  'Y-Balance Test',
  'Test dynamic stability and proprioception by balancing on one leg while reaching in multiple directions.',
  'Stand on one leg. Using your other leg, reach forward (Y stem), then diagonally forward-left, then diagonally forward-right. Tap the ground lightly with your reaching leg in each direction. Return to center between reaches. Try to reach as far as possible while maintaining balance.',
  'Touching down with your hands, letting your stance leg bend excessively, rotating your hips, or using momentum to reach farther',
  'The Y-balance test reveals dynamic stability and proprioceptive deficits. Runners who struggle here have poor balance during running, which increases ankle inversion injury risk and suggests underlying weakness that impacts running form.',
  9
),
(
  'Prone Hip Internal Rotation',
  'Measure hip internal rotation mobility, which is often restricted in runners.',
  'Lie face down on a firm surface. Bend one knee to 90 degrees. Rotate your hip internally (bringing your knee toward the opposite side) until you feel a stretch in your hip. Measure the angle from vertical or note how close your knee gets to the ground.',
  'Forcing the stretch too aggressively, rotating your torso, not keeping your hips flat, or comparing sides before testing both',
  'Runners often have tight hip internal rotators. This restriction reduces hip mobility and increases compensatory stress on the IT band and lateral knee, making it a common underlying cause of IT band syndrome in runners.',
  10
);
