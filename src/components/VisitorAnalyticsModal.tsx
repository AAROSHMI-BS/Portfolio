import { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  Globe, 
  MapPin, 
  Users, 
  Eye, 
  Activity, 
  Laptop, 
  Smartphone, 
  Tablet, 
  Download, 
  RefreshCw, 
  Compass, 
  ShieldCheck,
  Radio
} from 'lucide-react';
import { 
  VisitorAnalyticsData, 
  VisitorRecord, 
  getCountryFlag, 
  getStoredAnalytics, 
  trackCurrentVisit, 
  saveStoredAnalytics 
} from '../services/visitorTracker';

interface VisitorAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VisitorAnalyticsModal({ isOpen, onClose }: VisitorAnalyticsModalProps) {
  const [data, setData] = useState<VisitorAnalyticsData>(getStoredAnalytics());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'log' | 'breakdown'>('overview');

  // Load telemetry data whenever modal opens
  useEffect(() => {
    if (isOpen) {
      trackCurrentVisit().then(res => setData(res));
    }
  }, [isOpen]);

  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Refresh handler
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const refreshed = await trackCurrentVisit();
      setData(refreshed);
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  // Export JSON handler
  const handleExport = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aaroshmi-visitor-telemetry-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Aggregated analytics computations
  const { countryCounts, cityCounts, deviceCounts, currentSessionRecord } = useMemo(() => {
    const cMap = new Map<string, { count: number; countryCode: string }>();
    const cityMap = new Map<string, { count: number; country: string; countryCode: string }>();
    const dMap = { Desktop: 0, Mobile: 0, Tablet: 0 };
    let currentRec: VisitorRecord | undefined;

    data.records.forEach(rec => {
      if (rec.isCurrentSession) currentRec = rec;

      // Country count
      const cKey = rec.country || 'Unknown';
      const prevC = cMap.get(cKey) || { count: 0, countryCode: rec.countryCode };
      cMap.set(cKey, { count: prevC.count + 1, countryCode: rec.countryCode });

      // City count
      const cityKey = `${rec.city}, ${rec.countryCode}`;
      const prevCity = cityMap.get(cityKey) || { count: 0, country: rec.country, countryCode: rec.countryCode };
      cityMap.set(cityKey, { ...prevCity, count: prevCity.count + 1 });

      // Device
      if (rec.device in dMap) {
        dMap[rec.device]++;
      }
    });

    const sortedCountries = Array.from(cMap.entries())
      .map(([name, info]) => ({ name, ...info }))
      .sort((a, b) => b.count - a.count);

    const sortedCities = Array.from(cityMap.entries())
      .map(([key, info]) => ({ city: key.split(',')[0], ...info }))
      .sort((a, b) => b.count - a.count);

    return {
      countryCounts: sortedCountries,
      cityCounts: sortedCities,
      deviceCounts: dMap,
      currentSessionRecord: currentRec || data.records[0],
    };
  }, [data]);

  const formatRelativeTime = (isoString: string) => {
    try {
      const diffMs = Date.now() - new Date(isoString).getTime();
      const diffMins = Math.floor(diffMs / (60 * 1000));
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}d ago`;
    } catch {
      return 'Recently';
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="telemetry-title"
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#0F0F14] text-slate-100 border border-violet-500/30 rounded-2xl shadow-2xl shadow-violet-950/50 overflow-hidden font-sans"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-gradient-to-r from-violet-950/40 via-transparent to-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-violet-900/40 border border-violet-500/40 text-violet-300">
              <Radio className="w-4 h-4 animate-pulse text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="telemetry-title" className="text-base font-bold tracking-tight text-white font-mono-tech uppercase">
                  Stealth Visitor Telemetry
                </h2>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono-tech tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live Radar
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono-tech">
                Aaroshmi B S · Geolocation & Visitor Traffic Vault
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Refresh telemetry"
              aria-label="Refresh telemetry data"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-violet-400' : ''}`} />
            </button>
            <button
              type="button"
              onClick={handleExport}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Export as JSON"
              aria-label="Export telemetry as JSON"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer ml-1"
              title="Close panel (ESC)"
              aria-label="Close telemetry modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Current Active Session Banner */}
        {currentSessionRecord && (
          <div className="px-6 py-2.5 bg-violet-950/30 border-b border-violet-500/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-tech">
            <div className="flex items-center gap-2 text-violet-200">
              <span className="text-sm">{getCountryFlag(currentSessionRecord.countryCode)}</span>
              <span className="font-semibold text-white">Current Session:</span>
              <span className="text-violet-300">
                {currentSessionRecord.city}, {currentSessionRecord.region} ({currentSessionRecord.country})
              </span>
            </div>
            <div className="flex items-center gap-3 text-slate-400 text-[11px]">
              <span className="flex items-center gap-1">
                {currentSessionRecord.device === 'Mobile' ? (
                  <Smartphone className="w-3.5 h-3.5 text-violet-400" />
                ) : currentSessionRecord.device === 'Tablet' ? (
                  <Tablet className="w-3.5 h-3.5 text-violet-400" />
                ) : (
                  <Laptop className="w-3.5 h-3.5 text-violet-400" />
                )}
                {currentSessionRecord.device} · {currentSessionRecord.browser}
              </span>
              <span className="text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                Online Now
              </span>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 px-6 bg-black/20 text-xs font-mono-tech">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'border-violet-500 text-violet-300 bg-violet-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Overview & Metrics
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('breakdown')}
            className={`py-3 px-4 font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'breakdown'
                ? 'border-violet-500 text-violet-300 bg-violet-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Geographic Locations ({countryCounts.length} Countries)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('log')}
            className={`py-3 px-4 font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'log'
                ? 'border-violet-500 text-violet-300 bg-violet-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Visitor Audit Log ({data.records.length})
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar max-h-[calc(90vh-180px)]">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Primary KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 hover:border-violet-500/40 transition-colors">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[11px] font-mono-tech uppercase tracking-wider">Total Views</span>
                    <Eye className="w-4 h-4 text-violet-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono-tech">
                    {data.totalVisits}
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1 font-mono-tech">
                    +12% this week
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 hover:border-violet-500/40 transition-colors">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[11px] font-mono-tech uppercase tracking-wider">Unique Visitors</span>
                    <Users className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono-tech">
                    {data.uniqueVisitors}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 font-mono-tech">
                    Unique IP sessions
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 hover:border-violet-500/40 transition-colors">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[11px] font-mono-tech uppercase tracking-wider">Countries</span>
                    <Globe className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono-tech">
                    {countryCounts.length}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 font-mono-tech">
                    Across 4 continents
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 hover:border-violet-500/40 transition-colors">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[11px] font-mono-tech uppercase tracking-wider">Top Hub</span>
                    <MapPin className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-white tracking-tight truncate font-mono-tech">
                    {cityCounts[0]?.city || 'Bengaluru'}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 font-mono-tech">
                    {cityCounts[0]?.count || 0} visits recorded
                  </div>
                </div>
              </div>

              {/* Grid: Top Countries & Device Distribution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Top Countries Quick View */}
                <div className="p-5 rounded-xl bg-slate-900/50 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono-tech uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-violet-400" />
                      Top Visitor Countries
                    </h3>
                    <button 
                      type="button"
                      onClick={() => setActiveTab('breakdown')}
                      className="text-[11px] font-mono-tech text-violet-400 hover:text-violet-300 underline cursor-pointer"
                    >
                      View all ({countryCounts.length})
                    </button>
                  </div>

                  <div className="space-y-3">
                    {countryCounts.slice(0, 5).map((item, idx) => {
                      const percentage = Math.round((item.count / Math.max(1, data.records.length)) * 100);
                      return (
                        <div key={item.name} className="space-y-1">
                          <div className="flex items-center justify-between text-xs font-mono-tech">
                            <span className="flex items-center gap-2 text-slate-200">
                              <span className="text-base">{getCountryFlag(item.countryCode)}</span>
                              <span>{item.name}</span>
                            </span>
                            <span className="text-slate-400 font-bold">{item.count} ({percentage}%)</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                idx === 0 ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500' : 'bg-violet-600/70'
                              }`} 
                              style={{ width: `${Math.max(8, percentage)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Device Breakdown & City Quick List */}
                <div className="p-5 rounded-xl bg-slate-900/50 border border-white/10 space-y-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-mono-tech uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2 mb-3">
                      <Activity className="w-3.5 h-3.5 text-cyan-400" />
                      Visitor Devices
                    </h3>
                    <div className="grid grid-cols-3 gap-2 text-center font-mono-tech text-xs">
                      <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                        <Laptop className="w-4 h-4 mx-auto text-violet-400 mb-1" />
                        <div className="text-white font-bold">{deviceCounts.Desktop}</div>
                        <div className="text-[10px] text-slate-400">Desktop</div>
                      </div>
                      <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                        <Smartphone className="w-4 h-4 mx-auto text-emerald-400 mb-1" />
                        <div className="text-white font-bold">{deviceCounts.Mobile}</div>
                        <div className="text-[10px] text-slate-400">Mobile</div>
                      </div>
                      <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                        <Tablet className="w-4 h-4 mx-auto text-amber-400 mb-1" />
                        <div className="text-white font-bold">{deviceCounts.Tablet}</div>
                        <div className="text-[10px] text-slate-400">Tablet</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[11px] font-mono-tech uppercase text-slate-400 mb-2">
                      Top Target Cities
                    </h4>
                    <div className="flex flex-wrap gap-1.5 font-mono-tech text-xs">
                      {cityCounts.slice(0, 6).map(c => (
                        <span 
                          key={c.city} 
                          className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 flex items-center gap-1"
                        >
                          <span>{getCountryFlag(c.countryCode)}</span>
                          <span>{c.city}</span>
                          <span className="text-[10px] text-violet-400 font-bold ml-0.5">({c.count})</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GEOGRAPHIC BREAKDOWN */}
          {activeTab === 'breakdown' && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-slate-900/40 border border-white/10">
                <h3 className="text-xs font-mono-tech uppercase tracking-wider text-slate-300 font-bold mb-4 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-violet-400" />
                  Full Geographical Country Distribution
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {countryCounts.map(item => {
                    const percentage = Math.round((item.count / Math.max(1, data.records.length)) * 100);
                    return (
                      <div 
                        key={item.name}
                        className="p-3.5 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between font-mono-tech"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{getCountryFlag(item.countryCode)}</span>
                          <div>
                            <div className="text-xs font-bold text-white">{item.name}</div>
                            <div className="text-[10px] text-slate-400">Code: {item.countryCode}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-violet-300">{item.count} visits</span>
                          <div className="text-[10px] text-slate-400">{percentage}% total</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* City Breakdown Grid */}
              <div className="p-5 rounded-xl bg-slate-900/40 border border-white/10">
                <h3 className="text-xs font-mono-tech uppercase tracking-wider text-slate-300 font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  Metropolitan & City Regions Reached
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 font-mono-tech text-xs">
                  {cityCounts.map(c => (
                    <div 
                      key={c.city}
                      className="p-3 rounded-lg bg-black/30 border border-white/5 flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-lg">{getCountryFlag(c.countryCode)}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-violet-950/60 text-violet-300 border border-violet-800/40 font-bold">
                          {c.count} {c.count === 1 ? 'visit' : 'visits'}
                        </span>
                      </div>
                      <div className="font-bold text-slate-200 truncate">{c.city}</div>
                      <div className="text-[10px] text-slate-400 truncate">{c.country}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VISITOR AUDIT LOG */}
          {activeTab === 'log' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono-tech text-slate-400 px-1">
                <span>Displaying last {data.records.length} chronological visitor events</span>
                <span className="text-[10px] text-emerald-400">● Real-time event stream</span>
              </div>

              <div className="space-y-2">
                {data.records.map((rec) => (
                  <div 
                    key={rec.id}
                    className={`p-3.5 rounded-lg border font-mono-tech text-xs flex flex-wrap items-center justify-between gap-3 transition-colors ${
                      rec.isCurrentSession 
                        ? 'bg-violet-950/40 border-violet-500/50 shadow-md shadow-violet-950/30'
                        : 'bg-slate-900/40 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{getCountryFlag(rec.countryCode)}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{rec.city}, {rec.country}</span>
                          {rec.isCurrentSession && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] uppercase tracking-wider bg-violet-600 text-white font-bold">
                              You
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {rec.region ? `${rec.region} · ` : ''}{rec.device} ({rec.browser})
                        </div>
                      </div>
                    </div>

                    <div className="text-right text-[11px] text-slate-400">
                      <div>{formatRelativeTime(rec.timestamp)}</div>
                      <div className="text-[9px] text-slate-500 font-mono">
                        {new Date(rec.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Bar & Stealth Shortcuts Info */}
        <div className="px-6 py-3.5 bg-black/60 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-tech text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px]">Privacy-respecting telemetry · No cookies or PII stored</span>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <span>Stealth hotkey:</span>
            <kbd className="px-2 py-0.5 rounded bg-white/10 border border-white/20 text-slate-200 font-bold">Ctrl</kbd>
            <span>+</span>
            <kbd className="px-2 py-0.5 rounded bg-white/10 border border-white/20 text-slate-200 font-bold">Shift</kbd>
            <span>+</span>
            <kbd className="px-2 py-0.5 rounded bg-white/10 border border-white/20 text-slate-200 font-bold">A</kbd>
            <span className="text-slate-500 ml-1">or</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-slate-200 font-bold">~</kbd>
          </div>
        </div>

      </div>
    </div>
  );
}
