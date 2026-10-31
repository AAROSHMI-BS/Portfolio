export interface VisitorRecord {
  id: string;
  timestamp: string;
  country: string;
  countryCode: string;
  city: string;
  region: string;
  device: 'Desktop' | 'Mobile' | 'Tablet';
  browser: string;
  displayName?: string;
  source?: string;
  pagePath?: string;
  isCurrentSession?: boolean;
}

export interface VisitorAnalyticsData {
  totalVisits: number;
  uniqueVisitors: number;
  records: VisitorRecord[];
  lastUpdated: string;
}

const STORAGE_KEY = 'aaroshmi_portfolio_telemetry_v1';
const SESSION_KEY = 'aaroshmi_telemetry_session_id';
const VISITOR_KEY = 'aaroshmi_telemetry_visitor_id';
const TRACKING_ENDPOINT = import.meta.env.VITE_VISITOR_TRACKER_ENDPOINT?.trim();

export function getCountryFlag(code?: string): string {
  if (!code || code.length !== 2) return '🌐';
  const upper = code.toUpperCase();
  const codePoints = [...upper].map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function inferLocationFromTimezone(): Pick<VisitorRecord, 'city' | 'country' | 'countryCode' | 'region'> {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  const knownLocations: Record<string, Pick<VisitorRecord, 'city' | 'country' | 'countryCode' | 'region'>> = {
    'America/New_York': { city: 'New York', country: 'United States', countryCode: 'US', region: 'New York' },
    'America/Los_Angeles': { city: 'Los Angeles', country: 'United States', countryCode: 'US', region: 'California' },
    'Europe/London': { city: 'London', country: 'United Kingdom', countryCode: 'GB', region: 'Greater London' },
    'Asia/Singapore': { city: 'Singapore', country: 'Singapore', countryCode: 'SG', region: 'Singapore' },
    'Europe/Berlin': { city: 'Berlin', country: 'Germany', countryCode: 'DE', region: 'Berlin' },
    'Asia/Tokyo': { city: 'Tokyo', country: 'Japan', countryCode: 'JP', region: 'Kanto' },
    'Australia/Sydney': { city: 'Sydney', country: 'Australia', countryCode: 'AU', region: 'New South Wales' },
    'America/Toronto': { city: 'Toronto', country: 'Canada', countryCode: 'CA', region: 'Ontario' },
    'Asia/Calcutta': { city: 'Chennai', country: 'India', countryCode: 'IN', region: 'Tamil Nadu' },
    'Asia/Kolkata': { city: 'Chennai', country: 'India', countryCode: 'IN', region: 'Tamil Nadu' },
  };
  const key = Object.keys(knownLocations).find(item => timezone === item || timezone.endsWith(item));
  return key ? knownLocations[key] : { city: 'Unknown', country: 'Unknown', countryCode: '', region: '' };
}

function detectDevice(): VisitorRecord['device'] {
  if (typeof navigator === 'undefined') return 'Desktop';
  const userAgent = navigator.userAgent;
  if (/iPad|Tablet/i.test(userAgent) || (navigator.maxTouchPoints > 1 && window.innerWidth >= 768 && window.innerWidth <= 1024)) {
    return 'Tablet';
  }
  if (/Mobile|Android|iPhone|iPod/i.test(userAgent) || window.innerWidth < 768) return 'Mobile';
  return 'Desktop';
}

function detectBrowser(): string {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Edg/')) return 'Edge';
  if (userAgent.includes('Chrome/')) return 'Chrome';
  if (userAgent.includes('Safari/') && !userAgent.includes('Chrome')) return 'Safari';
  if (userAgent.includes('Firefox/')) return 'Firefox';
  if (userAgent.includes('Opera') || userAgent.includes('OPR/')) return 'Opera';
  return 'Browser';
}

function getDisplayName(): string | undefined {
  const params = new URLSearchParams(window.location.search);
  const value = params.get('visitor') || params.get('visitor_name') || params.get('name');
  const cleaned = value?.trim().replace(/\s+/g, ' ').slice(0, 80);
  return cleaned || undefined;
}

function getSource(): string {
  const params = new URLSearchParams(window.location.search);
  const campaignSource = params.get('utm_source')?.trim().slice(0, 80);
  if (campaignSource) return campaignSource;
  if (document.referrer) {
    try {
      return new URL(document.referrer).hostname.replace(/^www\./, '').slice(0, 80);
    } catch {
      return 'Direct / unknown';
    }
  }
  return 'Direct / unknown';
}

function getOrCreateVisitorId(): string {
  const existing = localStorage.getItem(VISITOR_KEY);
  if (existing) return existing;
  const id = 'vis_' + createId();
  localStorage.setItem(VISITOR_KEY, id);
  return id;
}

function createId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function getStoredAnalytics(): VisitorAnalyticsData {
  if (typeof window === 'undefined') {
    return { totalVisits: 0, uniqueVisitors: 0, records: [], lastUpdated: new Date().toISOString() };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = { totalVisits: 0, uniqueVisitors: 0, records: [], lastUpdated: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw) as VisitorAnalyticsData;
    // Remove the former built-in demo records if this site was already opened
    // with an older version of the tracker.
    if (parsed.records?.some(record => record.id.startsWith('rec_'))) {
      const clean = { totalVisits: 0, uniqueVisitors: 0, records: [], lastUpdated: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
      return clean;
    }
    return parsed;
  } catch {
    return { totalVisits: 0, uniqueVisitors: 0, records: [], lastUpdated: new Date().toISOString() };
  }
}

export function saveStoredAnalytics(data: VisitorAnalyticsData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save visitor analytics', error);
  }
}

async function fetchAnalyticsFromEndpoint(): Promise<VisitorAnalyticsData | undefined> {
  if (!TRACKING_ENDPOINT) return undefined;
  try {
    const response = await fetch(TRACKING_ENDPOINT, { headers: { Accept: 'application/json' } });
    if (!response.ok) return undefined;
    return await response.json() as VisitorAnalyticsData;
  } catch {
    return undefined;
  }
}

export async function trackCurrentVisit(): Promise<VisitorAnalyticsData> {
  const localData = getStoredAnalytics();
  if (typeof window === 'undefined') return localData;

  const endpointData = await fetchAnalyticsFromEndpoint();
  const currentData = endpointData || localData;
  const existingSessionId = sessionStorage.getItem(SESSION_KEY);
  const visitorId = getOrCreateVisitorId();

  if (existingSessionId) {
    const records = currentData.records.map(record =>
      record.id === existingSessionId ? { ...record, isCurrentSession: true } : record,
    );
    return { ...currentData, records };
  }

  const sessionId = visitorId + '_' + createId();
  sessionStorage.setItem(SESSION_KEY, sessionId);

  let location = inferLocationFromTimezone();
  try {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 2500);
    const response = await fetch('https://ipapi.co/json/', { signal: controller.signal });
    window.clearTimeout(timeout);
    if (response.ok) {
      const geo = await response.json();
      location = {
        city: geo.city || location.city,
        country: geo.country_name || location.country,
        countryCode: geo.country_code || location.countryCode,
        region: geo.region || location.region,
      };
    }
  } catch {
    // Keep the timezone fallback.
  }

  const record: VisitorRecord = {
    id: sessionId,
    timestamp: new Date().toISOString(),
    ...location,
    device: detectDevice(),
    browser: detectBrowser(),
    displayName: getDisplayName(),
    source: getSource(),
    pagePath: window.location.pathname + window.location.search,
    isCurrentSession: true,
  };

  const isKnownVisitor = currentData.records.some(item => item.id.startsWith(visitorId + '_'));
  const updatedData: VisitorAnalyticsData = {
    totalVisits: currentData.totalVisits + 1,
    uniqueVisitors: currentData.uniqueVisitors + (isKnownVisitor ? 0 : 1),
    records: [record, ...currentData.records.slice(0, 49)],
    lastUpdated: new Date().toISOString(),
  };

  if (TRACKING_ENDPOINT) {
    try {
      await fetch(TRACKING_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
    } catch {
      console.warn('Visitor analytics endpoint is unavailable; saving locally.');
    }
  }

  saveStoredAnalytics(updatedData);
  return updatedData;
}
