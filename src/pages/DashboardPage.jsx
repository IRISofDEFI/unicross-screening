import useAuth from '../hooks/useAuth';

const STATS = [
  {
    label: 'Total Candidates',
    value: 1500,
    borderCls: 'border-l-[#1e73be]',
    valueCls: 'text-[#1e73be]',
  },
  {
    label: 'Qualified',
    value: 750,
    borderCls: 'border-l-green-500',
    valueCls: 'text-green-600',
  },
  {
    label: 'Deficient',
    value: 80,
    borderCls: 'border-l-amber-500',
    valueCls: 'text-amber-600',
  },
  {
    label: 'Not Qualified',
    value: 70,
    borderCls: 'border-l-red-500',
    valueCls: 'text-red-600',
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const officerName = user?.name ?? 'Officer';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-bold text-slate-800">Welcome, {officerName}</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Here is an overview of the 2025/2026 screening exercise.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className={`bg-white rounded-lg shadow-sm border border-slate-200 border-l-4 ${stat.borderCls} p-5`}
          >
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              {stat.label}
            </p>
            <p className={`text-3xl font-bold mt-2 ${stat.valueCls}`}>
              {stat.value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
