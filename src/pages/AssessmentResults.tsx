import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase, Program, AssessmentResult, Exercise } from '../lib/supabase';
import { analyzeAssessment } from '../lib/assessmentAlgorithm';
import ProgramCard from '../components/ProgramCard';
import DeficitsSummary from '../components/DeficitsSummary';
import { ArrowRight, AlertCircle, CheckCircle, Mail } from 'lucide-react';

export default function AssessmentResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const assessmentId = searchParams.get('assessment_id') || '';

const DEFICIT_RUNNER_IMPACT: Record<string, string> = {
  'Hip Stability': 'Controls knee alignment and prevents IT band issues, reducing injury risk by up to 70%.',
  'Glute Strength': 'Powers your stride and protects against runner\'s knee, hamstring strains, and lower back pain.',
  'Ankle Stability': 'Improves ground contact efficiency and reduces risk of ankle sprains and achilles issues.',
  'Core Strength': 'Maintains posture during fatigue, improving breathing efficiency and preventing lower back pain.',
  'Hip Mobility': 'Enables optimal stride length and reduces compensatory stress on knees and lower back.',
  'Ankle Mobility': 'Allows proper dorsiflexion for efficient push-off and reduces calf and achilles strain.',
  'Balance': 'Improves single-leg stability during gait, reducing energy waste and injury risk.',
  'Proprioception': 'Enhances body awareness on uneven terrain, preventing missteps and improving efficiency.',
};

function getDeficitImpact(deficitName: string): string {
  return DEFICIT_RUNNER_IMPACT[deficitName] || 'Critical for maintaining efficient, injury-free running mechanics.';
}

function getProgramRationale(programName: string, primaryDeficits: any[]): string {
  const topDeficitNames = primaryDeficits.slice(0, 2).map(d => d.name.toLowerCase());

  const rationales: Record<string, string> = {
    'Ankle Stability & Power': `Addressing ${topDeficitNames.join(' and ')} early improves ground contact efficiency and running economy before progressing to higher-load strength work.`,
    'Hip Strength & Stability': `Building ${topDeficitNames.join(' and ')} first creates a stable foundation that protects your knees and prevents compensation patterns during higher-intensity training.`,
    'Mobility & Flexibility': `Improving ${topDeficitNames.join(' and ')} early allows proper movement patterns and optimal stride mechanics, maximizing the effectiveness of subsequent strength work.`,
    'Core Strength & Control': `Developing ${topDeficitNames.join(' and ')} first stabilizes your running posture and reduces injury risk before adding load to other areas.`,
    'Full Body Running Strength': `A comprehensive approach addressing ${topDeficitNames.join(', ')} and other areas ensures balanced development and reduces overall injury risk.`,
  };

  return rationales[programName] || `Addressing ${topDeficitNames.join(' and ')} first creates a foundation for injury-free running before progressing to more advanced training.`;
}
  const [loading, setLoading] = useState(true);
  const [deficits, setDeficits] = useState<any[]>([]);
  const [topProgram, setTopProgram] = useState<any>(null);
  const [allPrograms, setAllPrograms] = useState<Program[]>([]);
  const [recommendedPrograms, setRecommendedPrograms] = useState<any[]>([]);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);

  useEffect(() => {
    if (!assessmentId) return;

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

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSendEmail = async () => {
    if (!email.trim()) {
      setEmailError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setSendingEmail(true);
    setEmailError('');

    try {
      const { error: updateError } = await supabase
        .from('assessments')
        .update({ user_email: email })
        .eq('id', assessmentId);

      if (updateError) {
        console.error('Error updating email:', updateError);
      }

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-assessment-results`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assessmentId: assessmentId,
          email: email,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setEmailSent(true);
      localStorage.setItem('assessmentEmail', email);
    } catch (error) {
      console.error('Error sending email:', error);
      setEmailError('Failed to send email. Please try again.');
    } finally {
      setSendingEmail(false);
    }
  };

  if (!assessmentId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-slate-600">No assessment ID provided.</p>
        </div>
      </div>
    );
  }

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

  const primaryDeficit = deficits.find(d => d.deficitLevel === 'critical') || deficits[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 mb-8">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Your Assessment Results</h1>
            <p className="text-lg text-slate-600">
              Based on your performance, we've identified areas to address for improved running efficiency and injury prevention.
            </p>
          </div>

          {primaryDeficit && (
            <div className="bg-gradient-to-br from-green-50 to-slate-50 border-2 border-green-300 rounded-xl p-6 sm:p-8">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="w-7 h-7 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                    Primary Limiting Area: {primaryDeficit.name}
                  </h2>
                  <p className="text-base text-slate-700 leading-relaxed">
                    {getDeficitImpact(primaryDeficit.name)}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-green-200">
                <p className="text-sm text-slate-600">
                  <span className="font-semibold">Affected exercises:</span> {primaryDeficit.affectedExercises.join(', ')}
                </p>
              </div>
            </div>
          )}
        </div>

        {topProgram && (
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 mb-8 border-2 border-green-500">
            <div className="mb-6">
              <div className="text-xs font-bold text-green-600 tracking-wide mb-2">RECOMMENDED PROGRAM</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                {topProgram.programName}
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                A 12-week evidence-based training program specifically designed to address your identified deficits and build the strength foundations for injury-free running.
              </p>
            </div>

            <div className="mb-6 p-6 bg-slate-50 rounded-lg">
              <h3 className="font-semibold text-slate-900 mb-3">Directly Addresses:</h3>
              <div className="flex flex-wrap gap-2">
                {topProgram.primaryDeficits.slice(0, 4).map((deficit: any) => (
                  <span
                    key={deficit.name}
                    className="px-3 py-1.5 bg-white border border-green-300 text-green-700 rounded-md text-sm font-medium"
                  >
                    {deficit.name}
                  </span>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="text-sm text-slate-600 space-y-1">
                  <p>✓ Structured progressions over 12 weeks</p>
                  <p>✓ 2-3 workouts per week alongside your running</p>
                  <p>✓ Video demonstrations and form cues</p>
                </div>
              </div>
            </div>

            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-sm font-bold text-slate-900 mb-1">Why this program first:</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {getProgramRationale(topProgram.programName, topProgram.primaryDeficits)}
              </p>
            </div>

            <button
              onClick={() => navigate('/programs')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg"
            >
              View Program & Get Started <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        <DeficitsSummary deficits={deficits} />

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
                />
              ) : null;
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 border border-slate-200">
          <div className="flex items-start gap-3 mb-4">
            <Mail className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Save Your Results</h3>
              <p className="text-slate-600 mb-4">
                Optionally, enter your email to receive a copy of your assessment results and recommended exercises for future reference.
              </p>

              {!emailSent ? (
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError('');
                      }}
                      placeholder="your@email.com"
                      className={`flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        emailError
                          ? 'border-red-300 focus:ring-red-500'
                          : 'border-slate-300 focus:ring-green-500'
                      }`}
                      disabled={sendingEmail}
                    />
                    <button
                      onClick={handleSendEmail}
                      disabled={sendingEmail}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      {sendingEmail ? 'Sending...' : 'Send Results'}
                    </button>
                  </div>
                  {emailError && (
                    <p className="text-sm text-red-600">{emailError}</p>
                  )}
                  <p className="text-xs text-slate-500">
                    No spam. Just your results and relevant training information.
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-lg">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">Results sent to {email}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
