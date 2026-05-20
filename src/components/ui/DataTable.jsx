import { useState } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

function SortIcon({ direction }) {
  if (direction === 'asc')  return <ChevronUp className="w-3.5 h-3.5" />;
  if (direction === 'desc') return <ChevronDown className="w-3.5 h-3.5" />;
  return <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400" />;
}

export default function DataTable({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = 'No records found.',
}) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc');

  const handleSort = (col) => {
    if (!col.sortable) return;
    if (sortKey === col.key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(col.key);
      setSortDir('asc');
    }
  };

  const sorted = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const av = a[sortKey] ?? '';
    const bv = b[sortKey] ?? '';
    const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
    return sortDir === 'asc' ? cmp : -cmp;
  });

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-slate-200">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-[#1a2332] text-white">
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col)}
                className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap select-none ${
                  col.sortable ? 'cursor-pointer hover:bg-[#243447]' : ''
                }`}
              >
                <span className="flex items-center gap-1">
                  {col.label}
                  {col.sortable && (
                    <SortIcon direction={sortKey === col.key ? sortDir : null} />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center text-slate-400">
                <span className="inline-block w-5 h-5 border-2 border-slate-300 border-t-[#1e73be] rounded-full animate-spin" />
              </td>
            </tr>
          )}

          {!loading && sorted.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center text-slate-400 text-sm">
                {emptyMessage}
              </td>
            </tr>
          )}

          {!loading && sorted.map((row, i) => (
            <tr
              key={row.id ?? i}
              className={`border-t border-slate-100 transition-colors ${
                i % 2 === 0 ? 'bg-white' : 'bg-slate-50'
              } hover:bg-blue-50`}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-slate-700 whitespace-nowrap">
                  {col.render ? col.render(row[col.key], row) : row[col.key] ?? '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
