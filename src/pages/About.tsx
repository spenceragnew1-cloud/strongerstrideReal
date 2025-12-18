import { ArrowRight, Award, BookOpen, Users, MapPin, GraduationCap } from 'lucide-react';
import { trackAssessmentButtonClick } from '../lib/analytics';
import MetaTags from '../components/MetaTags';

type Page = 'home' | 'assessment' | 'programs' | 'blog' | 'blog-post' | 'results' | 'about';

interface AboutProps {
  onNavigate: (page: Page) => void;
}

export default function About({ onNavigate }: AboutProps) {
  const handleAssessmentClick = (source: string) => {
    trackAssessmentButtonClick(source);
    onNavigate('assessment');
  };

  return (
    <>
      <MetaTags
        title="About Dr. Spencer Agnew, DPT | StrongerStride"
        description="Dr. Spencer Agnew is a Doctor of Physical Therapy specializing in running biomechanics and performance. Learn about his evidence-based approach to helping runners build durable strength."
        canonical="https://strongerstride.com/about"
        type="website"
      />
      <div className="bg-white">
        {/* HERO SECTION */}
        <section className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              About Dr. Spencer Agnew, DPT
            </h1>
            <p className="text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Doctor of Physical Therapy • Running Biomechanics Specialist • Endurance Coach
            </p>
          </div>
        </section>

        {/* BIO SECTION */}
        <section className="bg-slate-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 border border-slate-200">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  <div className="w-40 h-40 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center">
                    <Users className="w-20 h-20 text-green-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                    The Story Behind StrongerStride
                  </h2>
                  <div className="space-y-4 text-lg text-slate-700 leading-relaxed">
                    <p>
                      I'm Dr. Spencer Agnew, a Doctor of Physical Therapy based in Wisconsin who has dedicated my career to understanding why runners get injured—and more importantly, how to prevent it.
                    </p>
                    <p>
                      After working with over 500 runners as both a physical therapist and running coach, I noticed a pattern: most runners don't know their specific weaknesses. They follow generic strength routines, do random exercises from Instagram, or skip strength training altogether.
                    </p>
                    <p>
                      The research is clear—targeted strength training can reduce running injuries by up to 66%. But "targeted" is the key word. That's why I created StrongerStride: to give every runner access to a personalized assessment and evidence-based programming that actually addresses <em>their</em> weaknesses.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CREDENTIALS SECTION */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-10 text-center">
              Credentials & Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-green-50 to-slate-50 rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-xl mb-4">
                  <GraduationCap className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Doctor of Physical Therapy</h3>
                <p className="text-slate-600">
                  Clinical doctorate with specialized training in musculoskeletal rehabilitation and movement analysis.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-slate-50 rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-xl mb-4">
                  <Award className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Running Biomechanics Specialist</h3>
                <p className="text-slate-600">
                  Advanced training in gait analysis, running mechanics, and sport-specific rehabilitation.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-slate-50 rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-xl mb-4">
                  <Users className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">500+ Runners Coached</h3>
                <p className="text-slate-600">
                  From recreational joggers to Boston Marathon qualifiers—helping runners of all levels run stronger.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-slate-50 rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-xl mb-4">
                  <BookOpen className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Evidence-Based Approach</h3>
                <p className="text-slate-600">
                  All programs are built on peer-reviewed research, not trends or personal opinions.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-slate-50 rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-xl mb-4">
                  <MapPin className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Based in Wisconsin</h3>
                <p className="text-slate-600">
                  Founder of{' '}
                  <a
                    href="https://ascentendurancegroup.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700 font-semibold underline"
                  >
                    Ascent Endurance Group
                  </a>
                  , providing in-person and remote coaching services.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-slate-50 rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-xl mb-4">
                  <Award className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Competitive Runner</h3>
                <p className="text-slate-600">
                  I practice what I preach—actively training and racing to stay connected to the running community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* AS FEATURED IN / PRESS SECTION */}
        <section className="bg-slate-50 py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 text-center">
              As Featured In
            </h2>
            <p className="text-lg text-slate-600 text-center mb-10 max-w-2xl mx-auto">
              StrongerStride's evidence-based approach has been recognized by leading running publications.
            </p>
            <div className="bg-white rounded-xl shadow-md p-8 border border-slate-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
                {/* Placeholder logos - replace with actual publication logos/links */}
                <div className="text-center">
                  <div className="h-12 flex items-center justify-center">
                    <span className="text-xl font-bold text-slate-400">Runner's World</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">Coming Soon</p>
                </div>
                <div className="text-center">
                  <div className="h-12 flex items-center justify-center">
                    <span className="text-xl font-bold text-slate-400">Trail Runner</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">Coming Soon</p>
                </div>
                <div className="text-center">
                  <div className="h-12 flex items-center justify-center">
                    <span className="text-xl font-bold text-slate-400">Podium Runner</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">Coming Soon</p>
                </div>
                <div className="text-center">
                  <div className="h-12 flex items-center justify-center">
                    <span className="text-xl font-bold text-slate-400">Running Magazine</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PHILOSOPHY SECTION */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 text-center">
              My Approach to Runner Strength
            </h2>
            <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
              <p>
                I believe every runner deserves access to the same quality of assessment and programming that elite athletes receive. That means no guesswork, no generic routines, and no wasted time on exercises that don't address your specific needs.
              </p>
              <p>
                The StrongerStride assessment is designed to identify your unique movement patterns and strength deficits—the exact factors that research shows contribute to running injuries. From there, you receive a personalized 12-week program built on the same principles I use with my in-person clients.
              </p>
              <p>
                Whether you're coming back from injury, trying to stay healthy during marathon training, or simply want to run faster, understanding your weaknesses is the first step. That's what StrongerStride is here to help you do.
              </p>
            </div>
          </div>
        </section>

        {/* INTERNAL LINKS SECTION */}
        <section className="bg-slate-50 py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-10 text-center">
              Explore StrongerStride
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => onNavigate('blog')}
                className="bg-white rounded-xl shadow-md p-6 border border-slate-200 hover:shadow-lg transition-shadow text-left group"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-green-600 transition-colors">
                  Read the Blog →
                </h3>
                <p className="text-slate-600">
                  Evidence-based articles on running strength, injury prevention, and performance.
                </p>
              </button>

              <button
                onClick={() => onNavigate('programs')}
                className="bg-white rounded-xl shadow-md p-6 border border-slate-200 hover:shadow-lg transition-shadow text-left group"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-green-600 transition-colors">
                  View Programs →
                </h3>
                <p className="text-slate-600">
                  12-week strength programs designed for runners, based on your assessment results.
                </p>
              </button>

              <button
                onClick={() => handleAssessmentClick('about-explore')}
                className="bg-white rounded-xl shadow-md p-6 border border-slate-200 hover:shadow-lg transition-shadow text-left group"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-green-600 transition-colors">
                  Take the Assessment →
                </h3>
                <p className="text-slate-600">
                  Discover your specific weaknesses in 10 minutes with our free assessment.
                </p>
              </button>
            </div>
          </div>
        </section>

        {/* ASSESSMENT CTA */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-12 text-center text-white shadow-xl">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Ready to Find Your Weak Links?
              </h2>
              <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto leading-relaxed">
                Take the free, 10-minute assessment and get a personalized report showing exactly what you need to strengthen to run pain-free and perform better.
              </p>
              <button
                onClick={() => handleAssessmentClick('about-cta')}
                className="inline-flex items-center gap-3 bg-white text-green-600 px-12 py-5 rounded-lg font-bold hover:bg-green-50 transition-all hover:scale-105 shadow-lg text-xl"
              >
                Take the Free Assessment <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

