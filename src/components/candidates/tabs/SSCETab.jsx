export default function SSCETab({ ssce }) {
  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-500 italic">
        Applicant's Senior Secondary Certificate Examination (SSCE) Result
      </p>

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
            {ssce.subjects.map((row, i) => (
              <tr
                key={row.subject}
                className={`border-b border-slate-100 last:border-b-0 ${
                  i % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                }`}
              >
                <td className="px-4 py-2 text-slate-700">{row.subject}</td>
                <td className="px-4 py-2 text-slate-800 font-semibold">{row.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Meta row */}
      <div className="border border-slate-200 rounded-md overflow-hidden">
        <div className="grid grid-cols-4 divide-x divide-slate-200">
          {[
            { label: 'Year', value: ssce.year },
            { label: 'Session', value: ssce.session },
            { label: 'Reg No.', value: ssce.regNo },
            { label: 'Type', value: ssce.type },
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

      {/* Sittings badge */}
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-500 text-white uppercase tracking-wide">
        No. of Sittings: {ssce.sittings}
      </span>
    </div>
  );
}
