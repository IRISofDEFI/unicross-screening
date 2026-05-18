import { useState } from 'react';
import PersonalDetailsTab from './tabs/PersonalDetailsTab';
import UTMETab from './tabs/UTMETab';
import SSCETab from './tabs/SSCETab';
import PrevCertTab from './tabs/PrevCertTab';
import CredentialViewer from './CredentialViewer';

const TABS = [
  { id: 'prev_cert', label: 'PREV. CERT.' },
  { id: 'utme', label: 'UTME' },
  { id: 'ssce', label: 'SSCE' },
  { id: 'personal', label: 'PERSONAL DETAILS' },
];

export default function CandidateDetail({ candidate, screeningStatus, onStatusChange }) {
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <div className="flex gap-4 items-start">
      {/* ── Left panel (60%) ── */}
      <div className="w-[60%] bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col min-w-0">
        {/* Tab bar */}
        <div className="flex border-b border-slate-200 px-1 pt-1 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide whitespace-nowrap transition-colors flex-shrink-0 ${
                activeTab === tab.id
                  ? 'text-[#1e73be] border-b-2 border-[#1e73be] -mb-px'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="p-5 flex-1">
          {activeTab === 'personal' && (
            <PersonalDetailsTab candidate={candidate} screeningStatus={screeningStatus} />
          )}
          {activeTab === 'ssce' && <SSCETab ssce={candidate.ssce} />}
          {activeTab === 'utme' && <UTMETab utme={candidate.utme} />}
          {activeTab === 'prev_cert' && <PrevCertTab />}
        </div>
      </div>

      {/* ── Right panel (40%), sticky ── */}
      <div className="w-[40%] sticky top-0 self-start flex-shrink-0">
        <CredentialViewer
          candidate={candidate}
          screeningStatus={screeningStatus}
          onStatusChange={onStatusChange}
        />
      </div>
    </div>
  );
}
