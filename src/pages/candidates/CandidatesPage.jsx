import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Eye, Pencil, RefreshCw, Calendar, Search, Download,
} from 'lucide-react';
import {
  screeningStatusClasses,
  screeningStatusLabel,
  regStatusClasses,
  regStatusLabel,
} from '../../utils/statusColors';
import useAuth from '../../hooks/useAuth';
import api from '../../api/axios';
import { normalizeCandidateList } from '../../utils/normalizeCandidate';

const EMPTY_FILTERS = {
  faculty: '',
  department: '',
  programme: '',
  screeningStatus: '',
  entryMode: '',
  dateRange: '',
  batch: '',
  regNumber: '',
};

const inputCls =
  'w-full border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#1e73be] focus:border-[#1e73be]';
const disabledCls =
  'bg-slate-100 text-slate-500 cursor-not-allowed opacity-80';

function extractList(envelopeData) {
  const payload = envelopeData.data ?? envelopeData;
  return Array.isArray(payload) ? payload : (payload.results ?? []);
}

function FilterField({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-slate-600">{label}</label>
      {children}
    </div>
  );
}

function StatusPill({ status, classMap, labelMap }) {
  const cls = classMap[status] ?? 'bg-slate-200 text-slate-700';
  const text = labelMap[status] ?? status;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${cls}`}>
      {text}
    </span>
  );
}

export default function CandidatesPage() {
  const navigate = useNavigate();
  const { user, role } = useAuth();

  const facultyLocked = role === 'faculty_officer' || role === 'department_officer';
  const deptLocked = role === 'department_officer';

  const roleFilters = {
    ...EMPTY_FILTERS,
    faculty: facultyLocked ? (user?.faculty_id ?? '') : '',
    department: deptLocked ? (user?.department_id ?? '') : '',
  };

  const [filters, setFilters] = useState(roleFilters);
  const [appliedFilters, setAppliedFilters] = useState(roleFilters);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [candidates, setCandidates] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fetchCount, setFetchCount] = useState(0);

  // Dropdown data
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [batches, setBatches] = useState([]);

  // Fetch faculties and batches once on mount
  useEffect(() => {
    api.get('/faculties/')
      .then(({ data }) => setFaculties(extractList(data)))
      .catch(() => {});
    api.get('/batches/')
      .then(({ data }) => setBatches(extractList(data)))
      .catch(() => {});
  }, []);

  // Fetch departments whenever the selected faculty changes
  useEffect(() => {
    if (!filters.faculty) {
      setDepartments([]);
      return;
    }
    api.get('/departments/', { params: { faculty_id: filters.faculty } })
      .then(({ data }) => setDepartments(extractList(data)))
      .catch(() => setDepartments([]));
  }, [filters.faculty]);

  const setFilter = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const handleFacultyChange = (value) => {
    setFilters((prev) => ({ ...prev, faculty: value, department: '' }));
  };

  const handleFetch = () => {
    setAppliedFilters({ ...filters });
    setCurrentPage(1);
    setFetchCount((c) => c + 1);
  };

  useEffect(() => {
    if (fetchCount === 0) return;

    const params = { page: currentPage, per_page: pageSize };
    if (appliedFilters.faculty) params.faculty_id = appliedFilters.faculty;
    if (appliedFilters.department) params.department_id = appliedFilters.department;
    if (appliedFilters.screeningStatus) params.screening_status = appliedFilters.screeningStatus;
    if (appliedFilters.entryMode) params.entry_mode = appliedFilters.entryMode;
    if (appliedFilters.batch) params.batch = appliedFilters.batch;
    if (appliedFilters.regNumber) params.jamb_reg_no = appliedFilters.regNumber;

    setLoading(true);
    setError('');
    api.get('/candidates/', { params })
      .then(({ data }) => {
        const payload = data.data ?? data;
        const raw = Array.isArray(payload) ? payload : (payload.results ?? []);
        const count = !Array.isArray(payload) ? (payload.count ?? raw.length) : raw.length;
        setCandidates(raw.map(normalizeCandidateList));
        setTotal(count);
      })
      .catch(() => {
        setError('Failed to load candidates. Please try again.');
        setCandidates([]);
        setTotal(0);
      })
      .finally(() => setLoading(false));
  }, [appliedFilters, currentPage, pageSize, fetchCount]);

  const filtered = searchQuery
    ? candidates.filter((c) => {
        const q = searchQuery.toLowerCase();
        return (
          c.fullname?.toLowerCase().includes(q) ||
          c.jambRegNo?.toLowerCase().includes(q) ||
          c.department?.toLowerCase().includes(q) ||
          c.faculty?.toLowerCase().includes(q)
        );
      })
    : candidates;

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, total);

  return (
    <div className="space-y-4">
      {/* Page heading */}
      <div>
        <h1 className="text-lg font-bold text-slate-800">2025/2026 Prospective Students</h1>
        <p className="text-sm text-slate-500 mt-0.5">Screening</p>
      </div>

      {/* ── Filter card ── */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
        <div className="grid grid-cols-4 gap-4">
          {/* Row 1 */}
          <FilterField label="Faculty">
            <select
              value={filters.faculty}
              onChange={(e) => handleFacultyChange(e.target.value)}
              disabled={facultyLocked}
              className={`${inputCls} ${facultyLocked ? disabledCls : ''}`}
            >
              <option value="">All</option>
              {faculties.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </FilterField>

          <FilterField label="Department">
            <select
              value={filters.department}
              onChange={(e) => setFilter('department', e.target.value)}
              disabled={deptLocked || !filters.faculty}
              className={`${inputCls} ${(deptLocked || !filters.faculty) ? disabledCls : ''}`}
            >
              <option value="">All</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </FilterField>

          <FilterField label="Programme">
            <select
              value={filters.programme}
              onChange={(e) => setFilter('programme', e.target.value)}
              className={inputCls}
            >
              <option value="">All</option>
              <option value="bsc">B.Sc</option>
              <option value="btech">B.Tech</option>
              <option value="ba">B.A</option>
            </select>
          </FilterField>

          <FilterField label="Screening Status">
            <select
              value={filters.screeningStatus}
              onChange={(e) => setFilter('screeningStatus', e.target.value)}
              className={inputCls}
            >
              <option value="">All</option>
              <option value="Qualified">Qualified</option>
              <option value="Deficient">Deficient</option>
              <option value="Not Qualified">Not Qualified</option>
              <option value="Pending">Not Screened</option>
            </select>
          </FilterField>

          {/* Row 2 */}
          <FilterField label="Entry Mode">
            <select
              value={filters.entryMode}
              onChange={(e) => setFilter('entryMode', e.target.value)}
              className={inputCls}
            >
              <option value="">All</option>
              <option value="UTME">UTME</option>
              <option value="DE">Direct Entry</option>
            </select>
          </FilterField>

          <FilterField label="Date Range">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="date"
                value={filters.dateRange}
                onChange={(e) => setFilter('dateRange', e.target.value)}
                className="w-full border border-slate-300 rounded-md pl-9 pr-3 py-2 text-sm text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#1e73be] focus:border-[#1e73be]"
              />
            </div>
          </FilterField>

          <FilterField label="Batch">
            <select
              value={filters.batch}
              onChange={(e) => setFilter('batch', e.target.value)}
              className={inputCls}
            >
              <option value="">All</option>
              {batches.map((b) => (
                <option key={b.id ?? b} value={b.id ?? b}>
                  {b.name ?? b}
                </option>
              ))}
            </select>
          </FilterField>

          <FilterField label="Candidate Reg. No.">
            <input
              type="text"
              value={filters.regNumber}
              onChange={(e) => setFilter('regNumber', e.target.value)}
              placeholder="Enter reg. number"
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#1e73be] focus:border-[#1e73be]"
            />
          </FilterField>
        </div>

        <button
          onClick={handleFetch}
          disabled={loading}
          className="w-full mt-4 bg-[#1a2332] hover:bg-[#243447] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm py-2.5 rounded-md transition-colors"
        >
          {loading ? 'Fetching…' : 'Fetch'}
        </button>
      </div>

      {/* ── Results card ── */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              Show
              <select
                value={pageSize}
                onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                className="border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#1e73be]"
              >
                {[10, 25, 50, 100].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              entries
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-slate-300 rounded-md pl-8 pr-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#1e73be] w-48"
              />
            </div>
          </div>
          <button className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors whitespace-nowrap">
            <Download className="w-3.5 h-3.5" />
            Export to Excel
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#1a2332] text-white">
                {[
                  'S/N', 'Fullnames', 'JAMB Reg. No', 'Gender', 'Phone',
                  'Faculty', 'Department', 'Reg. Status', 'Screening Status', 'Action(s)',
                ].map((col) => (
                  <th
                    key={col}
                    className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={10} className="px-3 py-12 text-center">
                    <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Loading candidates…
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={10} className="px-3 py-12 text-center text-red-500 text-sm">
                    {error}
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-3 py-12 text-center text-slate-400 text-sm">
                    {fetchCount === 0
                      ? 'Adjust filters and click Fetch.'
                      : 'No records found.'}
                  </td>
                </tr>
              ) : (
                filtered.map((c, idx) => (
                  <tr
                    key={c.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-3 py-3 text-slate-500">
                      {(currentPage - 1) * pageSize + idx + 1}
                    </td>
                    <td className="px-3 py-3 font-medium text-slate-800 whitespace-nowrap">
                      {c.fullname}
                    </td>
                    <td className="px-3 py-3 text-slate-700 whitespace-nowrap">{c.jambRegNo}</td>
                    <td className="px-3 py-3 text-slate-700">{c.gender}</td>
                    <td className="px-3 py-3 text-slate-700 whitespace-nowrap">{c.phone}</td>
                    <td className="px-3 py-3 text-slate-700 whitespace-nowrap">{c.faculty}</td>
                    <td className="px-3 py-3 text-slate-700 whitespace-nowrap">{c.department}</td>
                    <td className="px-3 py-3">
                      <StatusPill
                        status={c.regStatus}
                        classMap={regStatusClasses}
                        labelMap={regStatusLabel}
                      />
                    </td>
                    <td className="px-3 py-3">
                      <StatusPill
                        status={c.screeningStatus}
                        classMap={screeningStatusClasses}
                        labelMap={screeningStatusLabel}
                      />
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => navigate(`/screening/candidates/${c.id}`)}
                          className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors"
                        >
                          <Eye className="w-3 h-3" />
                          View
                        </button>
                        <button className="flex items-center gap-1 border border-blue-500 text-blue-500 hover:bg-blue-50 px-2 py-1 rounded text-xs font-medium transition-colors">
                          <Pencil className="w-3 h-3" />
                          Edit
                        </button>
                        <button className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors">
                          <RefreshCw className="w-3 h-3" />
                          Reset
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 text-sm text-slate-600">
          <span>
            {total === 0
              ? 'No entries to show'
              : `Showing ${from} to ${to} of ${total} ${total === 1 ? 'entry' : 'entries'}`}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1 || loading}
              className="px-3 py-1.5 border border-slate-300 rounded-md text-sm disabled:opacity-40 hover:bg-slate-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <span className="px-3 py-1.5 bg-[#1a2332] text-white rounded-md text-sm min-w-[2rem] text-center select-none">
              {currentPage}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages || loading}
              className="px-3 py-1.5 border border-slate-300 rounded-md text-sm disabled:opacity-40 hover:bg-slate-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
