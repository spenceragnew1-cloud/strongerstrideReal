import { ArrowRight, Target, Award, User, BookOpen, TrendingUp } from 'lucide-react';
import { trackAssessmentButtonClick } from '../lib/analytics';
import MetaTags from '../components/MetaTags';

type Page = 'home' | 'assessment' | 'programs' | 'blog' | 'blog-post' | 'results' | 'about';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const handleAssessmentClick = (source: string) => {
    trackAssessmentButtonClick(source);
    onNavigate('assessment');
  };

  return (
    <>
      <MetaTags
        title="StrongerStride - Strength Training for Runners | Free Assessment"
        description="Take a 10-minute, research-based assessment to discover which weaknesses are affecting your running—and get a personalized 12-week program to fix them. Created by a Doctor of Physical Therapy."
        canonical="https://strongerstride.com/"
        type="website"
      />
      <div className="bg-white">
      {/* SECTION 1 - HERO */}
      <section className="max-w-5xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Run Stronger. Stay Healthy. Start With a Strength Assessment.
          </h1>
          <p className="text-xl sm:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Take a 10-minute, research-based assessment to discover which weaknesses are affecting your running—and get a personalized 12-week program to fix them.
          </p>
          <button
            onClick={() => handleAssessmentClick('hero')}
            className="inline-flex items-center gap-3 bg-green-500 text-white px-12 py-5 rounded-lg font-bold hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30 text-xl"
          >
            Take the Free Assessment <ArrowRight className="w-6 h-6" />
          </button>
          <p className="text-sm text-slate-500 mt-6">
            ✓ Based on research • ✓ Created by a Doctor of Physical Therapy • ✓ Takes 10 minutes
          </p>
        </div>
      </section>

      {/* SECTION 2 - VALUE PROPS */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-xl mb-6 mx-auto">
                <Target className="w-9 h-9 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Evidence-Based</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Research shows strength training reduces running injury risk by 66%.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-xl mb-6 mx-auto">
                <User className="w-9 h-9 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Expert-Created</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Developed by Dr. Spencer Agnew, DPT, with 500+ runners coached.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-xl mb-6 mx-auto">
                <Award className="w-9 h-9 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Personalized to You</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Not generic exercises—your plan targets YOUR specific weaknesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 - STOP GUESSING */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Stop Guessing. Start Training Smart.
          </h2>
          <p className="text-xl text-slate-600 mb-6 max-w-2xl mx-auto leading-relaxed">
            Most runners follow generic strength routines that don't match their weaknesses. Research shows targeted, supervised strength programs reduce injuries—random exercises don't.
          </p>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Find YOUR weak links, then follow a program designed by a DPT who specializes in running mechanics.
          </p>
          <button
            onClick={() => handleAssessmentClick('stop-guessing')}
            className="inline-flex items-center gap-3 bg-green-500 text-white px-12 py-5 rounded-lg font-bold hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30 text-xl"
          >
            Take the Free Assessment <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* SECTION 4 - PROGRAMS OVERVIEW */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Evidence-Based Strength Programs for Runners
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Each 12-week plan is designed using sports science principles to improve durability, running economy, and overall performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-white rounded-xl shadow-md p-8 border border-slate-200 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Hip & Glute Strength Program</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Fix hip drop, improve stability, and strengthen your stride.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 border border-slate-200 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Knee Resilience Program</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Build strong quads and tendons to absorb impact and reduce pain.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 border border-slate-200 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Lower Leg Strength Program</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Strengthen calves, Achilles, and feet for improved speed and endurance.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 border border-slate-200 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Full-Body Running Strength Program</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Improve running economy, power, and total-body control.
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate('programs')}
              className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-4 rounded-lg font-bold hover:bg-slate-800 transition-colors text-lg"
            >
              Explore All Programs <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5 - TESTIMONIALS */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-12 text-center">
            Trusted by Everyday Runners and Athletes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-gradient-to-br from-green-50 to-slate-50 rounded-xl p-8 border border-slate-200">
              <blockquote className="text-lg text-slate-700 leading-relaxed mb-4">
                "For the first time in over a year, I'm running consistently and confidently again. Fixing my weaknesses made me stronger and more balanced. StrongerStride changed my running."
              </blockquote>
              <p className="font-bold text-slate-900">— Morgan</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-slate-50 rounded-xl p-8 border border-slate-200">
              <blockquote className="text-lg text-slate-700 leading-relaxed mb-4">
                "My next Boston Marathon felt completely different—stronger on the climbs, smoother on the downhills. StrongerStride showed me exactly what I'd been missing."
              </blockquote>
              <p className="font-bold text-slate-900">— Scott</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 - RESEARCH SECTION */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Running Science, Made Simple
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We break down the latest research on strength training, injury prevention, and running performance—so you know exactly why these programs work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Why Strength Training Improves Running Economy</h3>
              <p className="text-slate-600">Coming soon...</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">3 Most Common Weaknesses in Distance Runners</h3>
              <p className="text-slate-600">Coming soon...</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">How Hip Stability Impacts Your Stride</h3>
              <p className="text-slate-600">Coming soon...</p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate('blog')}
              className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-4 rounded-lg font-bold hover:bg-slate-800 transition-colors text-lg"
            >
              Read the Research <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 7 - FREE ASSESSMENT CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-12 text-center text-white shadow-xl">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Not Sure Where Your Weaknesses Are?
            </h2>
            <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto leading-relaxed">
              Take the free, 10-minute assessment to get a personalized report showing exactly what you need to strengthen to run pain-free and perform better.
            </p>
            <button
              onClick={() => handleAssessmentClick('final-cta')}
              className="inline-flex items-center gap-3 bg-white text-green-600 px-12 py-5 rounded-lg font-bold hover:bg-green-50 transition-all hover:scale-105 shadow-lg text-xl"
            >
              Take the Free Assessment <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 8 - SEO SUPPORTING PARAGRAPH */}
      <section className="bg-slate-50 py-16 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-base text-slate-600 leading-relaxed text-center">
            Strength training is one of the most powerful tools runners have for reducing injury risk, improving running economy, and building long-term durability. StrongerStride delivers research-based assessments and science-backed programming to help runners strengthen the muscles that matter most—hips, glutes, quads, calves, and core. Whether you're preparing for your first 5K or training for a marathon PR, our programs help you run stronger, more efficiently, and with fewer injuries.
          </p>
        </div>
      </section>
    </div>
    </>
  );
}
