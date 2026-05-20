import { BookOpen } from 'lucide-react';

export default function GSSRegistrationPage() {
  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-2">
        <BookOpen className="w-7 h-7 text-[#1e73be]" />
        <h1 className="text-2xl font-bold text-[#1a2332]">GSS Registration Management</h1>
      </div>
      <p className="text-slate-500 mb-6">
        Oversee General Studies (GSS) course registration for new students. Track registration
        completion, resolve conflicts, and generate GSS class lists per session.
      </p>
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-300">
        Coming Soon
      </span>
    </div>
  );
}
