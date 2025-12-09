import React from 'react';
import type { JoinRequest } from '../../../src/types/admin';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

interface JoinTabProps {
  joinRequests: JoinRequest[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}

export function JoinTab({ joinRequests, loading, error, onRefresh }: JoinTabProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        <span className="ml-3 text-slate-400">Loading join requests...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-800 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <h3 className="text-red-400 font-medium">Failed to load join requests</h3>
          </div>
          <button
            onClick={onRefresh}
            className="px-4 py-2 bg-red-900/40 hover:bg-red-900/60 text-red-300 rounded-lg text-sm transition-colors"
          >
            Retry
          </button>
        </div>
        <p className="mt-2 text-sm text-red-300">{error}</p>
        {error.includes('not yet implemented') && (
          <p className="mt-3 text-xs text-slate-400">
            The /api/join-requests endpoint needs to be created in the backend.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-50">
          Join Requests ({joinRequests.length})
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
                <th className="px-4 py-3 text-left font-medium">Role</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {joinRequests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                    No join requests found
                  </td>
                </tr>
              ) : (
                joinRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="px-4 py-3 text-slate-200">{request.name}</td>
                    <td className="px-4 py-3 text-slate-300">{request.email}</td>
                    <td className="px-4 py-3 text-slate-400">{request.role || '—'}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={request.status} />
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {new Date(request.created_at).toLocaleDateString()}
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
    approved: 'bg-green-900/30 text-green-400 border-green-800',
    rejected: 'bg-red-900/30 text-red-400 border-red-800',
  };

  return (
    <span className={`px-2 py-1 rounded text-xs border ${colors[status as keyof typeof colors] || 'bg-slate-800 text-slate-400'}`}>
      {status}
    </span>
  );
}

