import React from 'react';
import type { Registration } from '../../../src/types/admin';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

interface RegistrationsTabProps {
  registrations: Registration[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}

export function RegistrationsTab({ registrations, loading, error, onRefresh }: RegistrationsTabProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        <span className="ml-3 text-slate-400">Loading registrations...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-800 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <h3 className="text-red-400 font-medium">Failed to load registrations</h3>
          </div>
          <button
            onClick={onRefresh}
            className="px-4 py-2 bg-red-900/40 hover:bg-red-900/60 text-red-300 rounded-lg text-sm transition-colors"
          >
            Retry
          </button>
        </div>
        <p className="mt-2 text-sm text-red-300">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-50">
          Registrations ({registrations.length})
        </h2>
        <button
          onClick={onRefresh}
          className="flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition-colors"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </button>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead className="bg-slate-900/80 text-slate-300">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Email</th>
                <th className="px-4 py-3 text-left font-medium">Country (Residence)</th>
                <th className="px-4 py-3 text-left font-medium">Country (Origin)</th>
                <th className="px-4 py-3 text-left font-medium">Group</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {registrations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                    No registrations found
                  </td>
                </tr>
              ) : (
                registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="px-4 py-3 text-slate-200">{reg.name}</td>
                    <td className="px-4 py-3 text-slate-300">{reg.email}</td>
                    <td className="px-4 py-3 text-slate-300">{reg.countryOfResidence}</td>
                    <td className="px-4 py-3 text-slate-300">{reg.countryOfOrigin}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded text-xs">
                        {reg.group}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={reg.status} />
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {new Date(reg.createdAt || reg.created_at || '').toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors = {
    pending: 'bg-yellow-900/30 text-yellow-400 border-yellow-800',
    verified: 'bg-green-900/30 text-green-400 border-green-800',
    active: 'bg-blue-900/30 text-blue-400 border-blue-800',
  };

  return (
    <span className={`px-2 py-1 rounded text-xs border ${colors[status as keyof typeof colors] || 'bg-slate-800 text-slate-400'}`}>
      {status}
    </span>
  );
}

