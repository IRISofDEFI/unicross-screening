import {
  screeningStatusClasses,
  screeningStatusLabel,
  regStatusClasses,
  regStatusLabel,
} from '../../utils/statusColors';

export default function StatusBadge({ status }) {
  const classes =
    screeningStatusClasses[status] ?? regStatusClasses[status] ?? 'bg-slate-200 text-slate-700';
  const label =
    screeningStatusLabel[status] ?? regStatusLabel[status] ?? String(status ?? '').toUpperCase();

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${classes}`}>
      {label}
    </span>
  );
}
