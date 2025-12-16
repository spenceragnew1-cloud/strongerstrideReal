import { useState } from 'react';
import { Program } from '../lib/supabase';
import { ChevronDown, ShoppingCart, Clock, Zap, ExternalLink } from 'lucide-react';

interface ProgramDetailCardProps {
  program: Program;
}

export default function ProgramDetailCard({ program }: ProgramDetailCardProps) {
  const price = (program.price / 100).toFixed(2);
  const isComingSoon = program.price === 0;
  const stripePaymentLink = 'https://buy.stripe.com/3cIbJ2ds8fFX0U4dvGd7q05';

  const weekContents = [
    program.week_1_content,
    program.week_2_content,
    program.week_3_content,
    program.week_4_content,
    program.week_5_content,
    program.week_6_content,
    program.week_7_content,
    program.week_8_content,
    program.week_9_content,
    program.week_10_content,
    program.week_11_content,
    program.week_12_content,
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
      <div className={`px-8 py-8 sm:px-12 sm:py-12 ${isComingSoon ? 'bg-gradient-to-r from-slate-600 to-slate-700' : 'bg-gradient-to-r from-green-600 to-green-700'}`}>
        <h2 className="text-4xl font-bold text-white mb-3">{program.name}</h2>
        <p className="text-green-100 text-lg mb-6">{program.description}</p>
        <div className="flex items-center gap-6 mb-8">
          <div className="flex items-center gap-2 text-green-100">
            <Clock className="w-5 h-5" />
            <span>{program.duration_weeks} weeks</span>
          </div>
          {!isComingSoon && (
            <div className="flex items-center gap-2 text-green-100">
              <Zap className="w-5 h-5" />
              <span>12-phase progression</span>
            </div>
          )}
        </div>
        <div className="flex items-end justify-between">
          <div>
            {isComingSoon ? (
              <div className="px-4 py-2 bg-white/20 text-white rounded-lg font-bold inline-block">
                Coming Soon
              </div>
            ) : (
              <>
                <div className="text-green-100 text-sm mb-2">Investment</div>
                <div className="text-5xl font-bold text-white">${price}</div>
              </>
            )}
          </div>
          {!isComingSoon && (
            <a
              href={stripePaymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-green-50 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              Purchase Now
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      <div className="p-8 sm:p-12">
        {!isComingSoon && (
          <>
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">What You'll Get</h3>
              <div className="prose prose-slate max-w-none">
                <div className="whitespace-pre-wrap text-slate-700">{program.full_description}</div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Focuses On</h3>
              <div className="flex flex-wrap gap-2">
                {program.target_deficits.map((deficit) => (
                  <span key={deficit} className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium">
                    {deficit.replace(/_/g, ' ')}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {isComingSoon && (
          <div className="text-center py-8">
            <p className="text-lg text-slate-600 mb-6">
              This program is currently in development. Sign up for our email list to be notified when it launches.
            </p>
            <button className="bg-slate-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-slate-700 transition-colors">
              Join Waitlist
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function WeekAccordion({ week, content }: { week: number; content: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between"
      >
        <span className="font-semibold text-slate-900">Week {week}</span>
        <ChevronDown
          className={`w-5 h-5 text-slate-600 transition-transform ${expanded ? 'rotate-180' : ''}`}
        />
      </button>
      {expanded && (
        <div className="px-4 py-3 bg-white text-slate-700 whitespace-pre-wrap">
          {content}
        </div>
      )}
    </div>
  );
}
