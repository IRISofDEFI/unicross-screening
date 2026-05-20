import { GraduationCap } from 'lucide-react';

export default function StudentsPage() {
  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-2">
        <GraduationCap className="w-7 h-7 text-[#1e73be]" />
        <h1 className="text-2xl font-bold text-[#1a2332]">Students Management</h1>
      </div>
      <p className="text-slate-500 mb-6">
        Manage enrolled student records, update personal information, track academic progress, and
        handle student status changes across all faculties and departments.
      </p>
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-300">
        Coming Soon
      </span>
    </div>
  );
}
