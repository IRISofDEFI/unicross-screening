import { screeningStatusClasses, screeningStatusLabel } from '../../../utils/statusColors';

const STATUS_BTN = {
  qualified: 'bg-green-500',
  not_qualified: 'bg-red-500',
  deficient: 'bg-amber-500',
  not_screened: 'bg-[#1a2332]',
};

function SectionHeader({ title }) {
  return (
    <div className="bg-[#1a2332] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 mb-3">
      {title}
    </div>
  );
}

function InfoField({ label, value }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 truncate">{label}</p>
      <p className="text-xs font-medium text-slate-800 mt-0.5 break-words">{value || '—'}</p>
    </div>
  );
}

export default function PersonalDetailsTab({ candidate, screeningStatus }) {
  const btnCls = STATUS_BTN[screeningStatus] ?? 'bg-slate-700';
  const btnLabel = screeningStatusLabel[screeningStatus] ?? screeningStatus;

  return (
    <div className="space-y-4">
      {/* Label + passport photo */}
      <div className="relative pr-24 pb-1">
        <p className="text-xs text-slate-500 italic">
          Personal Details/Information of Selected Applicant.
        </p>
        <div className="absolute top-0 right-0 w-20 h-24 border border-slate-300 rounded bg-slate-100 flex items-center justify-center overflow-hidden">
          {candidate.passportPhoto ? (
            <img
              src={candidate.passportPhoto}
              alt="Passport"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-[10px] text-slate-400 text-center leading-tight px-1">
              No Photo
            </span>
          )}
        </div>
      </div>

      {/* PERSONAL DETAILS */}
      <div>
        <SectionHeader title="Personal Details" />
        <p className="text-sm font-bold text-center text-slate-800 mb-3">
          {candidate.surname}, {candidate.otherNames}
        </p>
        <div className="grid grid-cols-3 gap-3 mb-3">
          <InfoField label="JAMB No." value={candidate.jambRegNo} />
          <InfoField label="Gender" value={candidate.gender} />
          <InfoField label="Date of Birth" value={candidate.dateOfBirth} />
        </div>
        <div className="grid grid-cols-3 gap-3 mb-3">
          <InfoField label="Blood Group" value={candidate.bloodGroup} />
          <InfoField label="Marital Status" value={candidate.maritalStatus} />
          <InfoField label="Indigene Status" value={candidate.indigeneStatus} />
        </div>
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div className="col-span-2">
            <InfoField label="Address" value={candidate.address} />
          </div>
          <InfoField label="Phone" value={candidate.phone} />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <InfoField label="Nationality" value={candidate.nationality} />
          <InfoField label="State" value={candidate.state} />
          <InfoField label="LGA" value={candidate.lga} />
        </div>
      </div>

      {/* PARENT / GUARDIAN */}
      <div>
        <SectionHeader title="Parent/Guardian Information" />
        <div className="grid grid-cols-2 gap-3 mb-3">
          <InfoField label="Guardian Name" value={candidate.guardianName} />
          <InfoField label="Guardian Phone" value={candidate.guardianPhone} />
        </div>
        <InfoField label="Guardian Address" value={candidate.guardianAddress} />
      </div>

      {/* FACULTY / DEPARTMENT / COURSE */}
      <div>
        <SectionHeader title="Applicants Faculty / Department / Course" />
        <div className="grid grid-cols-3 gap-3">
          <InfoField label="Faculty" value={candidate.faculty} />
          <InfoField label="Department" value={candidate.department} />
          <InfoField label="Programme" value={candidate.programme} />
        </div>
      </div>

      {/* Date & Entry Mode */}
      <div className="grid grid-cols-2 gap-3">
        <InfoField label="Date Registered" value={candidate.dateRegistered} />
        <InfoField label="Entry Mode" value={candidate.entryMode} />
      </div>

      {/* Status display button */}
      <div
        className={`w-full py-3 rounded-md text-center text-sm font-bold uppercase tracking-widest text-white ${btnCls}`}
      >
        {btnLabel}
      </div>
    </div>
  );
}
