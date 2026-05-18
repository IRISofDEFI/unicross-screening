import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const LABELS = {
  dashboard: 'Dashboard',
  screening: 'Screening',
  candidates: 'Candidates',
};

export default function Breadcrumb() {
  const { pathname } = useLocation();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <nav className="flex items-center gap-1 text-sm text-slate-500 px-6 py-2.5 bg-white border-b border-slate-200">
      <Link to="/dashboard" className="text-slate-400 hover:text-slate-600 transition-colors">
        <Home className="w-4 h-4" />
      </Link>
      {segments.map((seg, i) => {
        const path = '/' + segments.slice(0, i + 1).join('/');
        const isLast = i === segments.length - 1;
        const label = LABELS[seg] ?? seg.charAt(0).toUpperCase() + seg.slice(1);
        return (
          <span key={path} className="flex items-center gap-1">
            <ChevronRight className="w-3 h-3 text-slate-400" />
            {isLast ? (
              <span className="text-slate-700 font-medium">{label}</span>
            ) : (
              <Link to={path} className="text-[#1e73be] hover:underline">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
