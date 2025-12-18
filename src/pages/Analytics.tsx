import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { BarChart3, Users, MousePointerClick, ArrowLeft } from 'lucide-react';

type Page = 'home' | 'assessment' | 'programs' | 'blog' | 'blog-post' | 'results' | 'about';

interface AnalyticsProps {
  onNavigate: (page: Page) => void;
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

interface RecentEvent {
  id: string;
  event_type: string;
  event_data: any;
  session_id: string;
  page_url: string;
  created_at: string;
}

export default function Analytics({ onNavigate }: AnalyticsProps) {
  const [eventSummary, setEventSummary] = useState<EventSummary[]>([]);
  const [conversionFunnel, setConversionFunnel] = useState<ConversionStep[]>([]);
  const [recentEvents, setRecentEvents] = useState<RecentEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('7');

  useEffect(() => {
    loadAnalytics();
  }, [dateRange]);

  const loadAnalytics = async () => {
    setLoading(true);

    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(dateRange));

    const [summaryResult, recentResult] = await Promise.all([
      supabase.rpc('get_event_summary'),
      supabase
        .from('events')
        .select('id, event_type, event_data, session_id, page_url, created_at')
        .gte('created_at', daysAgo.toISOString())
        .order('created_at', { ascending: false })
        .limit(50),
    ]);

    if (summaryResult.data) {
      setEventSummary(summaryResult.data);
    }

    if (recentResult.data) {
      setRecentEvents(recentResult.data);
    }

    const funnelResult = await supabase.rpc('get_conversion_funnel');
    if (funnelResult.data) {
      setConversionFunnel(funnelResult.data);
    }

    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const getEventLabel = (eventType: string) => {
    const labels: Record<string, string> = {
      assessment_button_click: 'Assessment Button Clicks',
      program_click: 'Program Clicks',
      assessment_started: 'Assessment Started',
      page_view: 'Page Views',
    };
    return labels[eventType] || eventType;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const totalEvents = eventSummary.reduce((sum, item) => sum + item.event_count, 0);
  const totalSessions = Math.max(...eventSummary.map((item) => item.unique_sessions), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Analytics Dashboard</h1>
              <p className="text-slate-600">Track user interactions and conversion metrics</p>
            </div>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 font-medium"
            >
              <option value="1">Last 24 hours</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <MousePointerClick className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-slate-600 font-medium">Total Events</h3>
            </div>
            <p className="text-3xl font-bold text-slate-900">{totalEvents.toLocaleString()}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-slate-600 font-medium">Unique Sessions</h3>
            </div>
            <p className="text-3xl font-bold text-slate-900">{totalSessions.toLocaleString()}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-slate-600 font-medium">Avg Events/Session</h3>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {totalSessions > 0 ? (totalEvents / totalSessions).toFixed(1) : '0'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Event Breakdown</h2>
            <div className="space-y-4">
              {eventSummary.map((item) => (
                <div key={item.event_type} className="border-b border-slate-100 pb-3 last:border-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-slate-900">{getEventLabel(item.event_type)}</span>
                    <span className="text-slate-600 font-semibold">{item.event_count}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>{item.unique_sessions} unique sessions</span>
                    <span>{((item.event_count / totalEvents) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="mt-2 w-full bg-slate-100 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${(item.event_count / totalEvents) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              {eventSummary.length === 0 && (
                <p className="text-slate-500 text-center py-8">No events yet</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Conversion Funnel</h2>
            <div className="space-y-4">
              {conversionFunnel.map((step, index) => (
                <div key={step.step} className="relative">
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
              {conversionFunnel.length === 0 && (
                <p className="text-slate-500 text-center py-8">No conversion data yet</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Events</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b-2 border-slate-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Event Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Details</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Page</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentEvents.map((event) => (
                  <tr key={event.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        {getEventLabel(event.event_type)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 text-sm">
                      {event.event_data?.source && <span>Source: {event.event_data.source}</span>}
                      {event.event_data?.program_name && (
                        <span>Program: {event.event_data.program_name}</span>
                      )}
                      {!event.event_data?.source && !event.event_data?.program_name && (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-600 text-sm max-w-xs truncate">
                      {event.page_url.replace(/^https?:\/\/[^/]+/, '')}
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-sm whitespace-nowrap">
                      {formatDate(event.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {recentEvents.length === 0 && (
              <p className="text-slate-500 text-center py-8">No recent events</p>
            )}
          </div>
        </div>

        <div className="mt-6 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="font-bold text-slate-900 mb-2">How to Query Data Directly</h3>
          <p className="text-slate-700 mb-3">
            You can also query the events data directly in the Supabase SQL Editor:
          </p>
          <div className="bg-white rounded-lg p-4 font-mono text-sm text-slate-800 border border-slate-200">
            <div className="mb-3">
              <code>SELECT * FROM get_event_summary();</code>
            </div>
            <div className="mb-3">
              <code>SELECT * FROM get_conversion_funnel();</code>
            </div>
            <div>
              <code>SELECT * FROM events ORDER BY created_at DESC LIMIT 100;</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
