import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import api from '../api/axios';

const STAT_CONFIG = [
  { key: 'total', label: 'Total Candidates', borderCls: 'border-l-[#1e73be]', valueCls: 'text-[#1e73be]' },
  { key: 'qualified', label: 'Qualified', borderCls: 'border-l-green-500', valueCls: 'text-green-600' },
  { key: 'deficient', label: 'Deficient', borderCls: 'border-l-amber-500', valueCls: 'text-amber-600' },
  { key: 'not_qualified', label: 'Not Qualified', borderCls: 'border-l-red-500', valueCls: 'text-red-600' },
  { key: 'pending', label: 'Pending', borderCls: 'border-l-slate-400', valueCls: 'text-slate-600' },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const officerName = user?.name ?? 'Officer';
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard/stats/')
      .then(({ data }) => setStats(data.data ?? data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-bold text-slate-800">Welcome, {officerName}</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Here is an overview of the 2025/2026 screening exercise.
        </p>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {STAT_CONFIG.map((s) => (
          <div
            key={s.key}
            className={`bg-white rounded-lg shadow-sm border border-slate-200 border-l-4 ${s.borderCls} p-5`}
          >
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              {s.label}
            </p>
            <p className={`text-3xl font-bold mt-2 ${s.valueCls}`}>
              {loading ? '—' : (stats?.[s.key] ?? 0).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
