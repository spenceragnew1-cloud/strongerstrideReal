import { useEffect, useState } from 'react';
import { supabase, Exercise, Assessment, AssessmentResult } from '../lib/supabase';
import ExerciseCard from '../components/ExerciseCard';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { trackAssessmentStarted } from '../lib/analytics';
import MetaTags from '../components/MetaTags';

type Page = 'home' | 'assessment' | 'programs' | 'blog' | 'blog-post' | 'results' | 'about';

interface AssessmentPageProps {
  onNavigate: (page: Page, options?: { assessmentId?: string }) => void;
}

export default function AssessmentPage({ onNavigate }: AssessmentPageProps) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [results, setResults] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadAssessment = async () => {
      const email = localStorage.getItem('assessmentEmail') || `visitor-${Date.now()}@strongerstride.local`;
      setUserEmail(email);
      localStorage.setItem('assessmentEmail', email);

      const { data: exercisesData, error: exercisesError } = await supabase
        .from('exercises')
        .select('*')
        .order('order_number', { ascending: true });

      if (exercisesError) {
        console.error('Error loading exercises:', exercisesError);
        setLoading(false);
        return;
      }

      setExercises(exercisesData || []);

      const { data: assessmentData, error: assessmentError } = await supabase
        .from('assessments')
        .insert({
          user_email: email,
          is_complete: false,
        })
        .select()
        .single();

      if (assessmentError) {
        console.error('Error creating assessment:', assessmentError);
        setLoading(false);
        return;
      }

      setAssessment(assessmentData);
      setLoading(false);
    };

    loadAssessment();
  }, []);

  const handleResult = async (result: 1 | 2 | 3) => {
    if (!assessment || !exercises[currentExerciseIndex]) return;

    const exerciseId = exercises[currentExerciseIndex].id;
    setResults({
      ...results,
      [exerciseId]: result,
    });

    const { error } = await supabase.from('assessment_results').insert({
      assessment_id: assessment.id,
      exercise_id: exerciseId,
      result,
    });

    if (error) {
      console.error('Error saving result:', error);
      return;
    }

    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  };

  const handleCompleteExercises = async () => {
    if (!assessment) return;

    setSubmitting(true);

    trackAssessmentStarted(userEmail);

    const { error: updateError } = await supabase
      .from('assessments')
      .update({
        is_complete: true,
        completed_at: new Date().toISOString()
      })
      .eq('id', assessment.id);

    if (updateError) {
      console.error('Error updating assessment:', updateError);
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    onNavigate('results', { assessmentId: assessment.id });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading assessment...</p>
        </div>
      </div>
    );
  }

  if (!assessment || exercises.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-slate-600">Error loading assessment. Please try again.</p>
        </div>
      </div>
    );
  }

  const currentExercise = exercises[currentExerciseIndex];
  const progress = Math.round(((currentExerciseIndex + 1) / exercises.length) * 100);
  const isCompleted = currentExerciseIndex === exercises.length - 1 && results[currentExercise.id];

  return (
    <>
      <MetaTags
        title="Free Runner Strength Assessment | StrongerStride"
        description="Take a 10-minute, research-based strength assessment to identify your specific weaknesses and get personalized recommendations. Created by a Doctor of Physical Therapy."
        canonical="https://strongerstride.com/assessment"
        type="website"
      />
      <div className="h-[calc(100vh-64px)] bg-gradient-to-br from-green-50 to-slate-50 flex flex-col overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col min-h-0">
        <div className="mb-3 flex-shrink-0">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
            className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors text-sm mb-2"
          >
            ← Back to Home
          </a>
        </div>
        <div className="mb-3 flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-semibold text-slate-700">
              Exercise {currentExerciseIndex + 1} of {exercises.length}
            </h2>
            <span className="text-xs font-semibold text-green-600">{progress}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5">
            <div
              className="bg-green-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0 mb-3">
          <ExerciseCard exercise={currentExercise} />

          <div className="lg:w-80 flex-shrink-0 bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex flex-col">
            <h3 className="text-base font-semibold text-slate-900 mb-3">How did you perform?</h3>
            <div className="space-y-2 flex-1">
              <button
                onClick={() => handleResult(1)}
                className={`w-full p-3 text-left rounded-lg border-2 transition-all ${
                  results[currentExercise.id] === 1
                    ? 'border-red-600 bg-red-50'
                    : 'border-slate-200 bg-white hover:border-red-300'
                }`}
              >
                <div className="font-semibold text-slate-900 text-sm">Unable to Perform</div>
                <div className="text-xs text-slate-600">I couldn't complete this exercise</div>
              </button>

              <button
                onClick={() => handleResult(2)}
                className={`w-full p-3 text-left rounded-lg border-2 transition-all ${
                  results[currentExercise.id] === 2
                    ? 'border-amber-600 bg-amber-50'
                    : 'border-slate-200 bg-white hover:border-amber-300'
                }`}
              >
                <div className="font-semibold text-slate-900 text-sm">Can Do, But Room to Improve</div>
                <div className="text-xs text-slate-600">I completed it but it wasn't smooth or strong</div>
              </button>

              <button
                onClick={() => handleResult(3)}
                className={`w-full p-3 text-left rounded-lg border-2 transition-all ${
                  results[currentExercise.id] === 3
                    ? 'border-green-600 bg-green-50'
                    : 'border-slate-200 bg-white hover:border-green-300'
                }`}
              >
                <div className="font-semibold text-slate-900 text-sm">Success</div>
                <div className="text-xs text-slate-600">I completed it with good control and form</div>
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={handlePrevious}
            disabled={currentExerciseIndex === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              currentExerciseIndex === 0
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </button>

          {isCompleted ? (
            <button
              onClick={handleCompleteExercises}
              disabled={submitting}
              className="ml-auto flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle className="w-4 h-4" /> Complete Assessment
            </button>
          ) : (
            <button
              onClick={() => setCurrentExerciseIndex(currentExerciseIndex + 1)}
              disabled={!results[currentExercise.id]}
              className={`ml-auto flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                results[currentExercise.id]
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
