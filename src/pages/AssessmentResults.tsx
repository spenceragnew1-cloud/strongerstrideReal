import { useEffect, useState } from 'react';
import { supabase, Program, AssessmentResult, Exercise } from '../lib/supabase';
import { analyzeAssessment } from '../lib/assessmentAlgorithm';
import ProgramCard from '../components/ProgramCard';
import DeficitsSummary from '../components/DeficitsSummary';
import { ArrowRight, AlertCircle } from 'lucide-react';

type Page = 'home' | 'assessment' | 'programs' | 'blog' | 'blog-post' | 'results';

interface AssessmentResultsProps {
  assessmentId: string;
  onNavigate: (page: Page, options?: { assessmentId?: string }) => void;
}

export default function AssessmentResults({ assessmentId, onNavigate }: AssessmentResultsProps) {
  const [loading, setLoading] = useState(true);
  const [deficits, setDeficits] = useState<any[]>([]);
  const [topProgram, setTopProgram] = useState<any>(null);
  const [allPrograms, setAllPrograms] = useState<Program[]>([]);
  const [recommendedPrograms, setRecommendedPrograms] = useState<any[]>([]);

  useEffect(() => {
    const loadResults = async () => {
      const { data: results, error: resultsError } = await supabase
        .from('assessment_results')
        .select(`
          *,
          exercise:exercises(*)
        `)
        .eq('assessment_id', assessmentId);

      if (resultsError) {
        console.error('Error loading results:', resultsError);
        setLoading(false);
        return;
      }

      const resultsWithExercises = results?.map(r => ({
        ...r,
        exercise: r.exercise as Exercise,
      })) || [];

      const analysis = analyzeAssessment(resultsWithExercises);
      setDeficits(analysis.deficits);
      setTopProgram(analysis.topProgram);
      setRecommendedPrograms(analysis.recommendedPrograms);

      const { data: programs } = await supabase
        .from('programs')
        .select('*')
        .order('order_number', { ascending: true });

      setAllPrograms(programs || []);
      setLoading(false);
    };

    loadResults();
  }, [assessmentId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Analyzing your assessment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-12 mb-12 border border-green-200">
          <div className="flex items-start gap-4 mb-6">
            <AlertCircle className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-3">Your Assessment Results</h1>
              <p className="text-lg text-slate-700">
                Based on your performance, we've identified your key strength, mobility, and stability gaps. Here's your personalized action plan.
              </p>
            </div>
          </div>
        </div>

        <DeficitsSummary deficits={deficits} />

        {topProgram && (
          <div className="bg-white rounded-2xl shadow-lg p-12 mb-12 border-2 border-green-500">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-sm font-semibold text-green-600 mb-2">RECOMMENDED FOR YOU</div>
                <h2 className="text-3xl font-bold text-slate-900">
                  {topProgram.programName}
                </h2>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-green-600">{Math.round(topProgram.matchScore)}%</div>
                <div className="text-sm text-slate-600">Match Score</div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-semibold text-slate-900 mb-3">Addresses Your Top Deficits:</h3>
              <div className="flex flex-wrap gap-2">
                {topProgram.primaryDeficits.slice(0, 4).map((deficit: any) => (
                  <span
                    key={deficit.name}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                  >
                    {deficit.name}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => onNavigate('programs')}
              className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              View Program Details <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Other Programs for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedPrograms.slice(1, 4).map((prog) => {
              const fullProgram = allPrograms.find(p => p.name === prog.programName);
              return fullProgram ? (
                <ProgramCard
                  key={prog.programName}
                  program={fullProgram}
                  matchScore={prog.matchScore}
                  onNavigate={onNavigate}
                />
              ) : null;
            })}
          </div>
        </div>

        <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Next Steps</h3>
          <ol className="space-y-3 text-slate-700">
            <li className="flex gap-3">
              <span className="flex items-center justify-center w-6 h-6 bg-green-600 text-white rounded-full text-sm font-semibold flex-shrink-0">1</span>
              <span>Choose your personalized program—it includes all 12 weeks of exercises with progressions.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex items-center justify-center w-6 h-6 bg-green-600 text-white rounded-full text-sm font-semibold flex-shrink-0">2</span>
              <span>Complete 2-3 workouts per week alongside your regular running.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex items-center justify-center w-6 h-6 bg-green-600 text-white rounded-full text-sm font-semibold flex-shrink-0">3</span>
              <span>Build strength progressively and watch your running improve immediately.</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
