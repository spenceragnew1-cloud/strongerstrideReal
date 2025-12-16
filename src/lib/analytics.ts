import { supabase } from './supabase';

let sessionId: string | null = null;

function getSessionId(): string {
  if (sessionId) return sessionId;

  sessionId = sessionStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    sessionStorage.setItem('session_id', sessionId);
  }

  return sessionId;
}

interface TrackEventParams {
  eventType: string;
  eventData?: Record<string, any>;
  userEmail?: string;
}

export async function trackEvent({ eventType, eventData = {}, userEmail }: TrackEventParams) {
  try {
    await supabase.from('events').insert({
      event_type: eventType,
      event_data: eventData,
      session_id: getSessionId(),
      page_url: window.location.href,
      referrer: document.referrer || null,
      user_email: userEmail || null,
      user_agent: navigator.userAgent,
    });
  } catch (error) {
    console.error('Failed to track event:', error);
  }
}

export function trackAssessmentButtonClick(source: string) {
  trackEvent({
    eventType: 'assessment_button_click',
    eventData: { source },
  });
}

export function trackProgramClick(programId: string, programName: string) {
  trackEvent({
    eventType: 'program_click',
    eventData: { program_id: programId, program_name: programName },
  });
}

export function trackAssessmentStarted(userEmail: string) {
  trackEvent({
    eventType: 'assessment_started',
    eventData: {},
    userEmail,
  });
}

export function trackPageView(pageName: string) {
  trackEvent({
    eventType: 'page_view',
    eventData: { page_name: pageName },
  });
}
