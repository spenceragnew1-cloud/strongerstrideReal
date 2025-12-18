import { ArrowRight, Award, BookOpen, Users, MapPin, GraduationCap, Heart, Timer } from 'lucide-react';
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
        title="About Dr. Spencer Agnew | StrongerStride"
        description="Doctor of Physical Therapy specializing in running biomechanics and performance. Evidence-based training, injury resilience, and runner movement assessments."
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
              Doctor of Physical Therapy • Running Coach Since 2014 • Creator of StrongerStride
            </p>
          </div>
        </section>

        {/* ORIGIN STORY */}
        <section className="bg-slate-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 border border-slate-200">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                How Running Changed Everything
              </h2>
              <div className="space-y-4 text-lg text-slate-700 leading-relaxed">
                <p>
                  I began running in middle school as an outlet—a way to make social connections and get better at basketball. I immediately found success and enjoyment in the sport. Like most middle school kids, I was at a crossroads when entering high school, unsure whether I would continue with this newfound sport of running or follow my friend group into football.
                </p>
                <p>
                  That changed after one meeting with two of the most impactful people in my life. Following a home middle school track meet, head cross country coach Chick Westby and Fort Atkinson standout runner Ryan Gasper (who went on to win multiple Big Ten championships for the Badgers!) came to encourage me to run cross country the following year.
                </p>
                <p>
                  What seemed like a small task turned out to change my life. Running has changed my life forever, and I was pushed to this decision from one short conversation. To this day, I'll tell you the importance of the small conversations. <strong>You can change a person's life through kind words, inclusion, and the importance of community.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COACHING PHILOSOPHY */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 text-center">
              My Coaching Philosophy
            </h2>
            <div className="bg-gradient-to-br from-green-50 to-slate-50 rounded-2xl p-8 sm:p-10 border border-slate-200">
              <blockquote className="text-xl text-slate-700 leading-relaxed italic">
                "I believe success is purely the practice of being the best version of yourself on that day. This is the only thing I require from my athletes. I believe in developing self-awareness within my athletes and using that mindfulness to help them through the journey that is your customized training adventure. Improvement in sport is through consistency, self-discovery, persistence, and enjoyment in what you do."
              </blockquote>
            </div>
            <div className="mt-8 space-y-4 text-lg text-slate-700 leading-relaxed">
              <p>
                Since 2014, I've worked across disciplines, ages, and ability levels to help athletes maximize their performance. Coaching on the high school, collegiate, and post-collegiate level, I bring extensive knowledge—including an undergraduate degree in exercise physiology, a doctorate in physical therapy, and over a decade of guiding athletes—to each client.
              </p>
              <p>
                I've helped guide athletes from 400m through ultra marathons, as well as multisport and trail athletes. My passion for coaching stems from my relentless pursuit to build connections with people and use relationships to help inspire athletes to be the best version of themselves.
              </p>
            </div>
          </div>
        </section>

        {/* CREDENTIALS SECTION */}
        <section className="bg-slate-50 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-10 text-center">
              Credentials & Experience
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-xl mb-4">
                  <GraduationCap className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Doctor of Physical Therapy</h3>
                <p className="text-slate-600">
                  Clinical doctorate with specialized training in musculoskeletal rehabilitation, movement analysis, and running biomechanics.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-xl mb-4">
                  <BookOpen className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Exercise Physiology Background</h3>
                <p className="text-slate-600">
                  Undergraduate degree in exercise physiology, providing a deep understanding of how the body adapts to training.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-xl mb-4">
                  <Users className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Coaching Since 2014</h3>
                <p className="text-slate-600">
                  Over a decade of coaching experience at high school, collegiate, and post-collegiate levels—from 400m to ultra marathons.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-xl mb-4">
                  <Award className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">State Championship Coach</h3>
                <p className="text-slate-600">
                  Currently coaching at Fort Atkinson High School, guiding the girls 4x800m relay to a state title in 2022.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
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

              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-xl mb-4">
                  <Heart className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Father of Three</h3>
                <p className="text-slate-600">
                  Balancing coaching, physical therapy, and family life while pursuing a passion for trail running and longer distances.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ATHLETIC BACKGROUND */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 text-center">
              As an Athlete
            </h2>
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center">
                    <Timer className="w-16 h-16 text-green-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-lg text-slate-700 leading-relaxed mb-4">
                    I was an all-state performer at Fort Atkinson High School and ran collegiately for Marquette University. I practice what I preach—actively training and racing to stay connected to the running community.
                  </p>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">3:46</p>
                      <p className="text-sm text-slate-600">1500m PR</p>
                    </div>
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">4:05</p>
                      <p className="text-sm text-slate-600">Mile PR</p>
                    </div>
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">14:29</p>
                      <p className="text-sm text-slate-600">5,000m PR</p>
                    </div>
                  </div>
                  <p className="text-slate-600 mt-4 text-sm">
                    Currently passionate about trail running and looking to move into longer distance racing—marathon and beyond.
                  </p>
                </div>
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
              Dr. Agnew has been quoted as an expert source in leading running publications.
            </p>
            <div className="bg-white rounded-xl shadow-md p-8 border border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start justify-items-center max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="h-12 flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-red-600">Runner's World</span>
                  </div>
                  <ul className="space-y-2 text-left">
                    <li>
                      <a
                        href="https://www.runnersworld.com/health-injuries/a60745708/tight-quads/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-green-600 text-sm underline"
                      >
                        How to Treat Tight Quads from Running
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.runnersworld.com/health-injuries/a68132145/exercises-for-weak-hips/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-green-600 text-sm underline"
                      >
                        Exercises for Weak Hips
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.runnersworld.com/health-injuries/a64783552/best-ql-stretches-for-runners/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-green-600 text-sm underline"
                      >
                        Best QL Stretches for Runners
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="h-12 flex items-center justify-center">
                    <span className="text-2xl font-bold text-slate-400">Outside Magazine</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-4">Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STRONGERSTRIDE SECTION */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 text-center">
              Why I Created StrongerStride
            </h2>
            <div className="space-y-4 text-lg text-slate-700 leading-relaxed">
              <p>
                After years of working with runners as both a physical therapist and coach, I noticed a pattern: most runners don't know their specific weaknesses. They follow generic strength routines, do random exercises from Instagram, or skip strength training altogether.
              </p>
              <p>
                The research is clear—targeted strength training can reduce running injuries by up to 66%. But "targeted" is the key word. StrongerStride is an evidence-based strength training platform designed specifically for runners. It helps athletes identify individual strength limitations through a simple assessment and follow a targeted training plan that complements their running—not replaces it.
              </p>
              <p>
                My goal is to give every runner access to the same quality of assessment and programming that elite athletes receive. No guesswork, no generic routines—just personalized strength training that addresses <em>your</em> specific needs.
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
