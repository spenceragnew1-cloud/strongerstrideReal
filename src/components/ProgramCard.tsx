import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, Zap } from 'lucide-react';
import { Program } from '../lib/supabase';

interface ProgramCardProps {
  program: Program;
  matchScore?: number;
}

export default function ProgramCard({ program, matchScore }: ProgramCardProps) {
  const navigate = useNavigate();
  const price = (program.price / 100).toFixed(2);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="bg-gradient-to-br from-green-50 to-slate-50 p-6 border-b border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-2">{program.name}</h3>
        <p className="text-slate-600 text-sm line-clamp-2">{program.description}</p>
      </div>

      <div className="flex-1 p-6 space-y-4">
        <div className="flex items-center gap-2 text-slate-700">
          <Clock className="w-4 h-4 text-green-600" />
          <span className="text-sm">{program.duration_weeks} weeks</span>
        </div>

        <div className="flex items-center gap-2 text-slate-700">
          <Zap className="w-4 h-4 text-green-600" />
          <span className="text-sm">{Math.ceil(program.duration_weeks / 4)} phases of progressive training</span>
        </div>

        {matchScore !== undefined && (
          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
            <div className="text-2xl font-bold text-green-600">{Math.round(matchScore)}%</div>
            <div className="text-xs text-slate-600">match for your needs</div>
          </div>
        )}

        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-600 uppercase">Focuses on:</div>
          <div className="flex flex-wrap gap-1">
            {program.target_deficits.slice(0, 3).map((deficit) => (
              <span key={deficit} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium">
                {deficit.replace(/_/g, ' ')}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-50 p-6 border-t border-slate-200 flex items-center justify-between">
        <div className="text-2xl font-bold text-slate-900">${price}</div>
        <button
          onClick={() => navigate('/programs')}
          className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Learn More <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
