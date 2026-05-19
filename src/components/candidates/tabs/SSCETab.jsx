export default function SSCETab({ ssce }) {
  // ssce may arrive as an array of sitting objects or as a single sitting object
  const sittings = Array.isArray(ssce) ? ssce : (ssce ? [ssce] : []);

  if (sittings.length === 0) {
    return (
      <div className="py-12 text-center text-slate-400 text-sm">No SSCE records found.</div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-xs text-slate-500 italic">
        Applicant's Senior Secondary Certificate Examination (SSCE) Result
      </p>

      {sittings.map((sitting, sIdx) => {
        const subjects = sitting.subjects ?? [];
        const regNo = sitting.reg_no ?? sitting.regNo ?? '';
        const examType = sitting.type ?? sitting.exam_type ?? '';

        return (
          <div key={sIdx} className="space-y-3">
            {sittings.length > 1 && (
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Sitting {sIdx + 1}
              </p>
            )}

            {/* Subjects table */}
            <div className="border border-slate-200 rounded-md overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#1a2332] text-white">
                    <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide">
                      Subject
                    </th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide">
                      Grade
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.length === 0 ? (
                    <tr>
                      <td colSpan={2} className="px-4 py-4 text-center text-slate-400 text-xs">
                        No subjects recorded.
                      </td>
                    </tr>
                  ) : (
                    subjects.map((row, i) => (
                      <tr
                        key={i}
                        className={`border-b border-slate-100 last:border-b-0 ${
                          i % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                        }`}
                      >
                        <td className="px-4 py-2 text-slate-700">
                          {row.subject ?? row.subject_name ?? row.name ?? ''}
                        </td>
                        <td className="px-4 py-2 text-slate-800 font-semibold">
                          {row.grade ?? ''}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Meta row */}
            <div className="border border-slate-200 rounded-md overflow-hidden">
              <div className="grid grid-cols-4 divide-x divide-slate-200">
                {[
                  { label: 'Year', value: sitting.year ?? '' },
                  { label: 'Session', value: sitting.session ?? '' },
                  { label: 'Reg No.', value: regNo },
                  { label: 'Type', value: examType },
                ].map(({ label, value }) => (
                  <div key={label} className="px-3 py-2.5 text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      {label}
                    </p>
                    <p className="text-xs font-medium text-slate-800 mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      {/* Sittings badge */}
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-500 text-white uppercase tracking-wide">
        No. of Sittings: {sittings.length}
      </span>
    </div>
  );
}
