export default function UTMETab({ utme }) {
  const subjects = utme?.subjects ?? [];
  const total = utme?.total_score ?? utme?.total ?? 0;

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-slate-500 italic mb-1">
          Applicant's Universal Tertiary Matriculation Education (UTME) Result
        </p>
        <p className="text-xs font-semibold text-slate-700">
          Universal Tertiary Matriculation Examination (JAMB) Result
        </p>
      </div>

      <div className="border border-slate-200 rounded-md overflow-hidden">
        {subjects.length === 0 ? (
          <div className="px-4 py-8 text-center text-slate-400 text-xs">No UTME subjects recorded.</div>
        ) : (
          subjects.map((s, i) => (
            <div
              key={i}
              className={`flex items-center px-4 py-3 border-b border-slate-100 ${
                i % 2 === 0 ? 'bg-white' : 'bg-slate-50'
              }`}
            >
              <span className="w-7 text-xs text-slate-400 font-medium flex-shrink-0">
                [{i + 1}]
              </span>
              <span className="flex-1 text-sm font-medium text-slate-700 uppercase tracking-wide">
                {s.name ?? s.subject_name ?? s.subject ?? ''}
              </span>
              <span className="text-sm font-bold text-slate-800">
                {s.score ?? s.marks ?? 0}
              </span>
            </div>
          ))
        )}

        {/* Total score row */}
        <div className="flex items-center px-4 py-3 bg-[#1a2332] text-white">
          <span className="w-7 flex-shrink-0" />
          <span className="flex-1 text-sm font-semibold uppercase tracking-wide">
            Total Score
          </span>
          <span className="text-sm font-bold">{total}</span>
        </div>
      </div>
    </div>
  );
}
