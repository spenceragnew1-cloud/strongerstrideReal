import { ArrowRight, Target, Award, User } from 'lucide-react';

type Page = 'home' | 'assessment' | 'programs' | 'blog' | 'blog-post' | 'results';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="bg-white">
      <section className="max-w-5xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            1 in 5 Runners Get Injured Every Year. Find Out Why.
          </h1>
          <p className="text-xl sm:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Take the free 10-minute strength assessment. Discover your exact weaknesses. Get a personalized program to fix them.
          </p>
          <button
            onClick={() => onNavigate('assessment')}
            className="inline-flex items-center gap-3 bg-green-500 text-white px-12 py-5 rounded-lg font-bold hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30 text-xl"
          >
            Take the Free Assessment <ArrowRight className="w-6 h-6" />
          </button>
          <p className="text-sm text-slate-500 mt-6">
            ✓ Based on research  •  ✓ Created by a DPT  •  ✓ Takes 10 minutes
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-xl mb-6 mx-auto">
                <Target className="w-9 h-9 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Evidence-Based</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Research shows strength training reduces injury risk by 66%<sup className="text-green-600">1</sup>
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-xl mb-6 mx-auto">
                <User className="w-9 h-9 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Expert-Created</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Developed by Dr. Spencer Agnew, DPT, with 500+ runners coached
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-xl mb-6 mx-auto">
                <Award className="w-9 h-9 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Personalized to You</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Not generic exercises—specific to YOUR weaknesses
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Stop Guessing. Start Training Smart.
          </h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Research shows supervised strength programs prevent injuries, random exercises don't. Find YOUR specific weaknesses, then get a 12-week program that targets them.
          </p>
          <button
            onClick={() => onNavigate('assessment')}
            className="inline-flex items-center gap-3 bg-green-500 text-white px-12 py-5 rounded-lg font-bold hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30 text-xl"
          >
            Take the Free Assessment <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      <section className="bg-slate-50 py-12 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-slate-500 text-center max-w-4xl mx-auto">
            <sup>1</sup>Lauersen, J.B., Andersen, T.E., & Andersen, L.B. (2018). Strength training as superior, dose-dependent and safe prevention of acute and overuse sports injuries. <em>British Journal of Sports Medicine, 52</em>(24), 1557-1563.
          </p>
        </div>
      </section>
    </div>
  );
}
