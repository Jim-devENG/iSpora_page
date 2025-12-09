import React from 'react';
import type { DashboardStats, Registration } from '../../../src/types/admin';
import { Users, TrendingUp, Calendar, Globe, Loader2, AlertCircle } from 'lucide-react';

interface OverviewTabProps {
  stats: DashboardStats | null;
  statsLoading: boolean;
  statsError: string | null;
  registrations: Registration[];
}

export function OverviewTab({ stats, statsLoading, statsError, registrations }: OverviewTabProps) {
  if (statsLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        <span className="ml-3 text-slate-400">Loading dashboard statistics...</span>
      </div>
    );
  }

  if (statsError) {
    return (
      <div className="bg-red-900/20 border border-red-800 rounded-xl p-6">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
          <h3 className="text-red-400 font-medium">Failed to load statistics</h3>
        </div>
        <p className="mt-2 text-sm text-red-300">{statsError}</p>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const recentRegistrations = registrations.slice(0, 8);

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Registrations"
          value={stats.totalRegistrations}
          icon={Users}
          color="indigo"
        />
        <StatCard
          label="Today"
          value={stats.todayRegistrations}
          icon={TrendingUp}
          color="green"
        />
        <StatCard
          label="This Week"
          value={stats.thisWeekRegistrations}
          icon={Calendar}
          color="blue"
        />
        <StatCard
          label="This Month"
          value={stats.thisMonthRegistrations}
          icon={TrendingUp}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Countries */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
            <Globe className="h-5 w-5 mr-2 text-indigo-400" />
            Top Countries
          </h2>
          {stats.topCountries && stats.topCountries.length > 0 ? (
            <div className="space-y-3">
              {stats.topCountries.map((item, index) => (
                <div key={item.country} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-slate-400 text-sm w-6">{index + 1}.</span>
                    <span className="text-slate-200">{item.country}</span>
                  </div>
                  <span className="text-slate-400 text-sm">{item.count} registrations</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-sm">No country data available</p>
          )}
        </div>

        {/* Recent Registrations */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2 text-indigo-400" />
            Recent Registrations
          </h2>
          {recentRegistrations.length > 0 ? (
            <div className="space-y-3">
              {recentRegistrations.map((reg) => (
                <div key={reg.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-slate-200 font-medium">{reg.name}</p>
                    <p className="text-slate-400">{reg.countryOfResidence}</p>
                  </div>
                  <span className="text-slate-400">
                    {new Date(reg.createdAt || reg.created_at || '').toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-sm">No recent registrations</p>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  color: 'indigo' | 'green' | 'blue' | 'purple';
}) {
  const colorClasses = {
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    green: 'bg-green-500/10 text-green-400 border-green-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  };

  return (
    <div className={`bg-slate-900/60 border border-slate-800 rounded-xl p-6 ${colorClasses[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400 mb-1">{label}</p>
          <p className="text-3xl font-bold">{value.toLocaleString()}</p>
        </div>
        <Icon className="h-8 w-8 opacity-50" />
      </div>
    </div>
  );
}

