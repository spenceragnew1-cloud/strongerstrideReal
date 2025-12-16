import { useEffect, useState } from 'react';
import { supabase, Program } from '../lib/supabase';
import ProgramDetailCard from '../components/ProgramDetailCard';
import { AlertCircle } from 'lucide-react';
import { trackProgramClick, trackAssessmentButtonClick } from '../lib/analytics';

type Page = 'home' | 'assessment' | 'programs' | 'blog' | 'blog-post' | 'results';

interface ProgramsProps {
  onNavigate: (page: Page) => void;
}

export default function Programs({ onNavigate }: ProgramsProps) {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);

  const handleProgramClick = (program: Program) => {
    trackProgramClick(program.id, program.name);
    setSelectedProgram(program);
  };

  const handleAssessmentClick = () => {
    trackAssessmentButtonClick('programs-page');
    onNavigate('assessment');
  };

  useEffect(() => {
    const loadPrograms = async () => {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('order_number', { ascending: true });

      if (error) {
        console.error('Error loading programs:', error);
      } else {
        setPrograms(data || []);
        setSelectedProgram(data?.[0] || null);
      }
      setLoading(false);
    };

    loadPrograms();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading programs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Strength Programs Built for Runners
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Each program is a complete 12-week journey designed to target specific deficits and improve your running performance and injury resilience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {programs.map((program) => (
            <button
              key={program.id}
              onClick={() => handleProgramClick(program)}
              className={`text-left p-4 rounded-lg border-2 transition-all ${
                selectedProgram?.id === program.id
                  ? 'border-green-600 bg-green-50'
                  : 'border-slate-200 bg-white hover:border-green-300'
              }`}
            >
              <div className="font-semibold text-slate-900">{program.name}</div>
              <div className="text-sm text-slate-600 mt-1">{program.duration_weeks} weeks</div>
              {program.price > 0 ? (
                <div className="text-sm font-bold text-green-600 mt-2">${(program.price / 100).toFixed(2)}</div>
              ) : (
                <div className="text-sm font-bold text-slate-500 mt-2">Coming Soon</div>
              )}
            </button>
          ))}
        </div>

        {selectedProgram && (
          <ProgramDetailCard program={selectedProgram} />
        )}

        <div className="mt-16 bg-green-50 rounded-2xl p-8 border border-green-200">
          <div className="flex gap-4">
            <AlertCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Not Sure Which Program?</h3>
              <p className="text-slate-700 mb-4">
                Take the free movement assessment to get personalized recommendations based on your specific deficits.
              </p>
              <button
                onClick={handleAssessmentClick}
                className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Start Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
