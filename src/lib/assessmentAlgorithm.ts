import { AssessmentResult, Exercise } from './supabase';

type DeficitLevel = 'critical' | 'moderate' | 'minor';

interface DeficitScore {
  category: string;
  name: string;
  deficitLevel: DeficitLevel;
  score: number;
  affectedExercises: string[];
}

interface RecommendedProgram {
  programId: string;
  programName: string;
  matchScore: number;
  primaryDeficits: DeficitScore[];
}

const EXERCISE_DEFICIT_MAPPING: Record<string, string[]> = {
  'Single Leg Stance (Eyes Closed)': ['balance', 'proprioception'],
  'Lateral Step Down': ['hip_stability', 'glute_strength', 'hip_control'],
  'Single Leg Hop': ['ankle_stability', 'proprioception', 'power'],
  'Single Leg Bridge': ['hip_stability', 'glute_strength'],
  'Calf Raise (Single Leg)': ['ankle_strength', 'calf_strength'],
  'Side Plank': ['core_strength', 'core_stability', 'hip_stability'],
  'Knee to Wall Test': ['ankle_mobility'],
  '90/90 Hip Mobility Test': ['hip_mobility'],
  'Y-Balance Test': ['balance', 'stability', 'proprioception'],
  'Prone Hip Internal Rotation': ['hip_mobility', 'hip_rotation'],
};

const PROGRAM_DEFICIT_PRIORITIES: Record<string, string[]> = {
  'Ankle Stability & Power': ['ankle_stability', 'proprioception', 'ankle_strength', 'balance'],
  'Hip Strength & Stability': ['hip_stability', 'glute_strength', 'hip_control', 'hip_mobility'],
  'Mobility & Flexibility': ['ankle_mobility', 'hip_mobility', 'hip_rotation'],
  'Core Strength & Control': ['core_strength', 'core_stability'],
  'Full Body Running Strength': ['overall_strength', 'balance', 'mobility', 'power', 'hip_stability', 'core_strength', 'ankle_stability'],
};

export function analyzeAssessment(
  results: Array<AssessmentResult & { exercise: Exercise }>,
): { deficits: DeficitScore[]; recommendedPrograms: RecommendedProgram[]; topProgram: RecommendedProgram } {
  const deficitScores: Record<string, DeficitScore> = {};

  results.forEach(({ result, exercise }) => {
    const deficits = EXERCISE_DEFICIT_MAPPING[exercise.name] || [];

    let score = 0;
    let level: DeficitLevel = 'minor';

    if (result === 1) {
      score = 100;
      level = 'critical';
    } else if (result === 2) {
      score = 50;
      level = 'moderate';
    } else {
      score = 0;
      level = 'minor';
    }

    deficits.forEach((deficit) => {
      if (!deficitScores[deficit]) {
        deficitScores[deficit] = {
          category: getCategoryForDeficit(deficit),
          name: getDisplayNameForDeficit(deficit),
          deficitLevel: level,
          score: score,
          affectedExercises: [exercise.name],
        };
      } else {
        deficitScores[deficit].affectedExercises.push(exercise.name);
        deficitScores[deficit].score = Math.max(deficitScores[deficit].score, score);
        if (level === 'critical' || (level === 'moderate' && deficitScores[deficit].deficitLevel === 'minor')) {
          deficitScores[deficit].deficitLevel = level;
        }
      }
    });
  });

  const sortedDeficits = Object.values(deficitScores)
    .sort((a, b) => b.score - a.score);

  const recommendedPrograms = generateProgramRecommendations(sortedDeficits);

  return {
    deficits: sortedDeficits,
    recommendedPrograms,
    topProgram: recommendedPrograms[0],
  };
}

function getCategoryForDeficit(deficit: string): string {
  if (deficit.includes('ankle') || deficit.includes('calf')) return 'Ankle & Foot';
  if (deficit.includes('hip') || deficit.includes('glute')) return 'Hip & Glutes';
  if (deficit.includes('core')) return 'Core';
  if (deficit.includes('mobility')) return 'Mobility';
  if (deficit.includes('proprioception') || deficit.includes('balance')) return 'Balance & Stability';
  if (deficit.includes('power')) return 'Power';
  return 'General';
}

function getDisplayNameForDeficit(deficit: string): string {
  const names: Record<string, string> = {
    'ankle_stability': 'Ankle Stability',
    'ankle_strength': 'Ankle Strength',
    'ankle_mobility': 'Ankle Mobility',
    'proprioception': 'Proprioception',
    'balance': 'Balance',
    'hip_stability': 'Hip Stability',
    'hip_control': 'Hip Control',
    'hip_mobility': 'Hip Mobility',
    'hip_rotation': 'Hip Rotation',
    'glute_strength': 'Glute Strength',
    'core_strength': 'Core Strength',
    'core_stability': 'Core Stability',
    'calf_strength': 'Calf Strength',
    'stability': 'Stability',
    'power': 'Power',
    'overall_strength': 'Overall Strength',
    'mobility': 'Mobility',
  };
  return names[deficit] || deficit.replace(/_/g, ' ').charAt(0).toUpperCase() + deficit.slice(1).replace(/_/g, ' ');
}

function generateProgramRecommendations(deficits: DeficitScore[]): RecommendedProgram[] {
  const recommendations: RecommendedProgram[] = [];

  Object.entries(PROGRAM_DEFICIT_PRIORITIES).forEach(([programName, targetDeficits]) => {
    let rawScore = 0;
    let maxPossibleScore = 0;
    const matchedDeficits: DeficitScore[] = [];

    deficits.forEach((deficit) => {
      const isTargeted = targetDeficits.some(
        (target) => target === deficit.name.toLowerCase().replace(/ /g, '_') ||
                     target === deficit.category.toLowerCase().replace(/ /g, '_') ||
                     target.includes(deficit.name.toLowerCase().replace(/ /g, '_'))
      );

      if (isTargeted) {
        const weight = deficit.deficitLevel === 'critical' ? 3 : deficit.deficitLevel === 'moderate' ? 2 : 1;
        rawScore += deficit.score * weight;
        maxPossibleScore += 100 * 3;
        matchedDeficits.push(deficit);
      }
    });

    if (matchedDeficits.length > 0) {
      const normalizedScore = maxPossibleScore > 0 ? (rawScore / maxPossibleScore) * 100 : 0;

      recommendations.push({
        programId: programName,
        programName,
        matchScore: normalizedScore,
        primaryDeficits: matchedDeficits,
      });
    }
  });

  return recommendations.sort((a, b) => b.matchScore - a.matchScore);
}

export function getTopThreePrograms(recommendations: RecommendedProgram[]): RecommendedProgram[] {
  return recommendations.slice(0, 3);
}
