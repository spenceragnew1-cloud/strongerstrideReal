import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ArrowLeft, TrendingUp, Users, CheckCircle, Activity, MousePointerClick, BarChart3 } from 'lucide-react';

type Page = 'home' | 'assessment' | 'programs' | 'blog' | 'blog-post' | 'results' | 'admin' | 'about';

interface AdminProps {
  onNavigate: (page: Page) => void;
}

interface OverviewStats {
  total_assessments_started: number;
  total_assessments_completed: number;
  unique_users: number;
  completion_rate_percent: string;
}

interface DailyActivity {
  date: string;
  assessments: number;
  unique_users: number;
}

interface ExerciseScore {
  name: string;
  avg_score: string;
  times_taken: number;
}

interface RecentAssessment {
  user_email: string;
  created_at: string;
  is_complete: boolean;
}

interface EventSummary {
  event_type: string;
  event_count: number;
  unique_sessions: number;
}

interface ConversionStep {
  step: string;
  count: number;
  conversion_rate: number;
}

export default function Admin({ onNavigate }: AdminProps) {
  const [overviewStats, setOverviewStats] = useState<OverviewStats | null>(null);
  const [dailyActivity, setDailyActivity] = useState<DailyActivity[]>([]);
  const [exerciseScores, setExerciseScores] = useState<ExerciseScore[]>([]);
  const [recentAssessments, setRecentAssessments] = useState<RecentAssessment[]>([]);
  const [eventSummary, setEventSummary] = useState<EventSummary[]>([]);
  const [conversionFunnel, setConversionFunnel] = useState<ConversionStep[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const getEventLabel = (eventType: string) => {
    const labels: Record<string, string> = {
      assessment_button_click: 'Assessment Button Clicks',
      program_click: 'Program Clicks',
      assessment_started: 'Assessment Started',
      page_view: 'Page Views',
    };
    return labels[eventType] || eventType;
  };

  const loadAnalytics = async () => {
    setLoading(true);

    // Overview stats
    const { data: overview } = await supabase.rpc('get_assessment_overview');
    if (overview && overview.length > 0) {
      setOverviewStats(overview[0]);
    }

    // Daily activity (last 30 days)
    const { data: daily } = await supabase.rpc('get_daily_activity');
    if (daily) {
      setDailyActivity(daily);
    }

    // Exercise scores
    const { data: exercises } = await supabase.rpc('get_exercise_scores');
    if (exercises) {
      setExerciseScores(exercises);
    }

    // Recent assessments
    const { data: recent } = await supabase
      .from('assessments')
      .select('user_email, created_at, is_complete')
      .order('created_at', { ascending: false })
      .limit(10);

    if (recent) {
      setRecentAssessments(recent);
    }

    // Event summary
    const { data: eventData } = await supabase.rpc('get_event_summary');
    if (eventData) {
      setEventSummary(eventData);
    }

    // Conversion funnel
    const { data: funnelData } = await supabase.rpc('get_conversion_funnel');
    if (funnelData) {
      setConversionFunnel(funnelData);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </button>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Analytics Dashboard</h1>
          <p className="text-slate-600">Track assessment completions and user engagement</p>
        </div>

        {/* Overview Stats */}
        {overviewStats && (
          <div className="grid gap-6 md:grid-cols-4 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 border-2 border-green-100">
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-900">{overviewStats.total_assessments_started}</p>
              <p className="text-sm text-slate-600">Assessments Started</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-2 border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-900">{overviewStats.total_assessments_completed}</p>
              <p className="text-sm text-slate-600">Completed</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-2 border-purple-100">
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-900">{overviewStats.unique_users}</p>
              <p className="text-sm text-slate-600">Unique Users</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-2 border-orange-100">
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-900">{overviewStats.completion_rate_percent}%</p>
              <p className="text-sm text-slate-600">Completion Rate</p>
            </div>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          {/* Daily Activity */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Daily Activity (Last 30 Days)</h2>
            {dailyActivity.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2 px-4 text-sm font-semibold text-slate-700">Date</th>
                      <th className="text-right py-2 px-4 text-sm font-semibold text-slate-700">Assessments</th>
                      <th className="text-right py-2 px-4 text-sm font-semibold text-slate-700">Unique Users</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dailyActivity.slice(0, 10).map((day, idx) => (
                      <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-4 text-sm text-slate-900">
                          {new Date(day.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-900 text-right font-semibold">
                          {day.assessments}
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-900 text-right">
                          {day.unique_users}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-slate-500 text-center py-8">No activity yet</p>
            )}
          </div>

          {/* Recent Assessments */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Assessments</h2>
            {recentAssessments.length > 0 ? (
              <div className="space-y-3">
                {recentAssessments.map((assessment, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900">{assessment.user_email}</p>
                      <p className="text-xs text-slate-500">
                        {new Date(assessment.created_at).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <div>
                      {assessment.is_complete ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                          <CheckCircle className="w-3 h-3" /> Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                          Started
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-center py-8">No assessments yet</p>
            )}
          </div>
        </div>

        {/* Exercise Performance */}
        {exerciseScores.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Exercise Performance</h2>
            <p className="text-sm text-slate-600 mb-4">Average scores by exercise (1 = Poor, 2 = Fair, 3 = Good)</p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {exerciseScores.map((exercise, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-slate-900 text-sm">{exercise.name}</h3>
                    <span className="text-xs text-slate-500">{exercise.times_taken} tests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          parseFloat(exercise.avg_score) >= 2.5
                            ? 'bg-green-500'
                            : parseFloat(exercise.avg_score) >= 2
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${(parseFloat(exercise.avg_score) / 3) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-slate-900">{exercise.avg_score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Event Tracking Section */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          {/* Event Breakdown */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <MousePointerClick className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-bold text-slate-900">User Interactions</h2>
            </div>
            {eventSummary.length > 0 ? (
              <div className="space-y-4">
                {eventSummary.map((item) => {
                  const totalEvents = eventSummary.reduce((sum, e) => sum + e.event_count, 0);
                  return (
                    <div key={item.event_type} className="border-b border-slate-100 pb-3 last:border-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-slate-900">{getEventLabel(item.event_type)}</span>
                        <span className="text-slate-600 font-semibold">{item.event_count}</span>
                      </div>
                      <div className="flex justify-between text-sm text-slate-500 mb-2">
                        <span>{item.unique_sessions} sessions</span>
                        <span>{((item.event_count / totalEvents) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all"
                          style={{ width: `${(item.event_count / totalEvents) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-slate-500 text-center py-8">No interaction data yet</p>
            )}
          </div>

          {/* Conversion Funnel */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-900">Conversion Funnel</h2>
            </div>
            {conversionFunnel.length > 0 ? (
              <div className="space-y-4">
                {conversionFunnel.map((step, index) => (
                  <div key={step.step}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-slate-900">
                        {index + 1}. {step.step}
                      </span>
                      <span className="text-green-600 font-bold">{step.conversion_rate.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-500 mb-2">
                      <span>{step.count} users</span>
                      {index > 0 && (
                        <span className="text-slate-400">
                          {conversionFunnel[index - 1].count - step.count} dropped off
                        </span>
                      )}
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all"
                        style={{ width: `${step.conversion_rate}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-center py-8">No conversion data yet</p>
            )}
          </div>
        </div>

        {/* Refresh Button */}
        <div className="mt-8 text-center">
          <button
            onClick={loadAnalytics}
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md"
          >
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
}
