import { AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';

interface Deficit {
  category: string;
  name: string;
  deficitLevel: 'critical' | 'moderate' | 'minor';
  score: number;
  affectedExercises: string[];
}

interface DeficitsSummaryProps {
  deficits: Deficit[];
}

export default function DeficitsSummary({ deficits }: DeficitsSummaryProps) {
  const critical = deficits.filter(d => d.deficitLevel === 'critical');
  const moderate = deficits.filter(d => d.deficitLevel === 'moderate');
  const minor = deficits.filter(d => d.deficitLevel === 'minor');

  return (
    <div className="space-y-6 mb-12">
      {critical.length > 0 && (
        <div className="bg-white rounded-xl p-8 border-l-4 border-red-600 shadow-lg">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            Critical Gaps - High Priority
          </h3>
          <div className="space-y-3">
            {critical.map(deficit => (
              <div key={deficit.name} className="bg-red-50 p-4 rounded-lg">
                <div className="font-semibold text-slate-900 mb-1">{deficit.name}</div>
                <div className="text-sm text-slate-600">
                  Affects: {deficit.affectedExercises.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {moderate.length > 0 && (
        <div className="bg-white rounded-xl p-8 border-l-4 border-amber-600 shadow-lg">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-amber-600" />
            Moderate Gaps - Address Soon
          </h3>
          <div className="space-y-3">
            {moderate.map(deficit => (
              <div key={deficit.name} className="bg-amber-50 p-4 rounded-lg">
                <div className="font-semibold text-slate-900 mb-1">{deficit.name}</div>
                <div className="text-sm text-slate-600">
                  Affects: {deficit.affectedExercises.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {minor.length > 0 && (
        <div className="bg-white rounded-xl p-8 border-l-4 border-green-600 shadow-lg">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            Good Performance
          </h3>
          <div className="space-y-3">
            {minor.map(deficit => (
              <div key={deficit.name} className="bg-green-50 p-4 rounded-lg">
                <div className="font-semibold text-slate-900 mb-1">{deficit.name}</div>
                <div className="text-sm text-slate-600">
                  Affects: {deficit.affectedExercises.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
