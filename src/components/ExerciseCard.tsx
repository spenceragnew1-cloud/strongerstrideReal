import { useState } from 'react';
import { AlertCircle, CheckCircle, Info, ChevronDown } from 'lucide-react';
import { Exercise } from '../lib/supabase';

interface ExerciseCardProps {
  exercise: Exercise;
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  const [openSection, setOpenSection] = useState<'instructions' | 'mistakes' | 'why'>('instructions');

  return (
    <div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 flex flex-col min-h-0">
      <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 py-4 flex-shrink-0">
        <h1 className="text-2xl font-bold text-white mb-1">{exercise.name}</h1>
        <p className="text-green-100 text-sm">{exercise.description}</p>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex border-b border-slate-200 flex-shrink-0">
          <button
            onClick={() => setOpenSection('instructions')}
            className={`flex-1 px-3 py-2 text-xs font-semibold transition-colors border-b-2 ${
              openSection === 'instructions'
                ? 'border-green-600 text-green-600 bg-green-50'
                : 'border-transparent text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Info className="w-3 h-3 inline mr-1" />
            How to Perform
          </button>
          <button
            onClick={() => setOpenSection('mistakes')}
            className={`flex-1 px-3 py-2 text-xs font-semibold transition-colors border-b-2 ${
              openSection === 'mistakes'
                ? 'border-amber-600 text-amber-600 bg-amber-50'
                : 'border-transparent text-slate-600 hover:bg-slate-50'
            }`}
          >
            <AlertCircle className="w-3 h-3 inline mr-1" />
            Common Mistakes
          </button>
          <button
            onClick={() => setOpenSection('why')}
            className={`flex-1 px-3 py-2 text-xs font-semibold transition-colors border-b-2 ${
              openSection === 'why'
                ? 'border-green-600 text-green-600 bg-green-50'
                : 'border-transparent text-slate-600 hover:bg-slate-50'
            }`}
          >
            <CheckCircle className="w-3 h-3 inline mr-1" />
            Why It Matters
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {openSection === 'instructions' && (
            <div>
              <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                {exercise.instructions}
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                <p className="text-xs text-green-900">
                  <strong>Tip:</strong> Focus on proper form over speed. Stop if you feel sharp pain.
                </p>
              </div>
            </div>
          )}

          {openSection === 'mistakes' && (
            <p className="text-slate-700 text-sm leading-relaxed">{exercise.common_mistakes}</p>
          )}

          {openSection === 'why' && (
            <p className="text-slate-700 text-sm leading-relaxed">{exercise.why_matters}</p>
          )}
        </div>
      </div>
    </div>
  );
}
