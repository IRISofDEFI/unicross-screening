import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';

const ACTION_BTNS = [
  { status: 'not_screened', label: 'Unscreen', cls: 'bg-orange-500 hover:bg-orange-600' },
  { status: 'qualified', label: 'Qualified', cls: 'bg-green-500 hover:bg-green-600' },
  { status: 'deficient', label: 'Deficient', cls: 'bg-amber-500 hover:bg-amber-600' },
  { status: 'not_qualified', label: 'Not Qualified', cls: 'bg-red-500 hover:bg-red-600' },
];

export default function CredentialViewer({ candidate, screeningStatus, onStatusChange }) {
  const navigate = useNavigate();
  const [credIndex, setCredIndex] = useState(0);

  const credentials = candidate.credentials;
  const current = credentials[credIndex];
  const total = credentials.length;

  const prev = () => setCredIndex((i) => (i === 0 ? total - 1 : i - 1));
  const next = () => setCredIndex((i) => (i === total - 1 ? 0 : i + 1));

  const visibleActions =
    screeningStatus === 'not_screened'
      ? ACTION_BTNS
      : ACTION_BTNS.filter((b) => b.status === 'not_screened');

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col">
      {/* Header + action buttons */}
      <div className="px-4 py-3 border-b border-slate-200">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest flex-shrink-0">
            Credentials
          </h3>
          <div className="flex items-center gap-1 flex-wrap justify-end">
            {visibleActions.map((btn) => (
              <button
                key={btn.status}
                onClick={() => onStatusChange(btn.status)}
                className={`px-2.5 py-1 rounded text-xs font-semibold text-white transition-colors whitespace-nowrap ${btn.cls}`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Image display */}
      <div className="p-4">
        <div className="w-full h-72 bg-slate-100 border border-slate-200 rounded-md flex items-center justify-center overflow-hidden">
          {current.image ? (
            <img
              src={current.image}
              alt={current.label}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-slate-400">
              <ImageOff className="w-10 h-10" />
              <span className="text-xs">No image available</span>
            </div>
          )}
        </div>

        {/* Label bar */}
        <div className="mt-2 bg-slate-700 text-white text-xs font-semibold text-center py-1.5 rounded-md uppercase tracking-wide">
          {current.label}
        </div>

        {/* Navigation arrows */}
        <div className="flex items-center justify-center gap-4 mt-3">
          <button
            onClick={prev}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
            aria-label="Previous credential"
          >
            <ChevronLeft className="w-4 h-4 text-slate-600" />
          </button>
          <span className="text-xs text-slate-500 tabular-nums">
            {credIndex + 1} / {total}
          </span>
          <button
            onClick={next}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
            aria-label="Next credential"
          >
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Back to Prospects */}
      <div className="px-4 py-3 border-t border-slate-200">
        <button
          onClick={() => navigate('/screening/candidates')}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold py-2.5 rounded-md transition-colors"
        >
          ← Back to Prospects
        </button>
      </div>
    </div>
  );
}
