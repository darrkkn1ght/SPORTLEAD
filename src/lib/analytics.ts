'use client';

export type AnalyticsEventName =
  | 'Discuss a Project'
  | 'Explore Our Services'
  | 'Explore Service'
  | 'Discuss This Service'
  | 'Apply to Join Expert Network'
  | 'Discuss Facility Funding'
  | 'Discuss Institutional Partnership'
  | 'Project Enquiry Submitted'
  | 'Expert Application Submitted'
  | 'Contact Submitted'
  | 'Facility Funding Submitted'
  | 'Institutional Partnership Submitted';

export function trackEvent(name: AnalyticsEventName, properties?: Record<string, any>) {
  if (typeof window === 'undefined') return;

  // Custom DOM event for listener inspection & integration
  try {
    const customEvent = new CustomEvent('sportlead_analytics', {
      detail: { name, properties, timestamp: new Date().toISOString() },
    });
    window.dispatchEvent(customEvent);
  } catch {
    // Non-browser fallback
  }

  // Google Analytics / gtag support
  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', name, properties);
  }

  // Plausible Analytics support
  if (typeof (window as any).plausible === 'function') {
    (window as any).plausible(name, { props: properties });
  }

  // Development logger
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics Event] "${name}":`, properties || {});
  }
}
