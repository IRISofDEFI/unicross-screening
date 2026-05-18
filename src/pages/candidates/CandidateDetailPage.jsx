import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import CandidateDetail from '../../components/candidates/CandidateDetail';
import api from '../../api/axios';

const API_TO_STATUS = {
  Qualified: 'qualified',
  'Not Qualified': 'not_qualified',
  Deficient: 'deficient',
  Pending: 'not_screened',
};

export default function CandidateDetailPage() {
  const { id } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [screeningStatus, setScreeningStatus] = useState('not_screened');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/candidates/${id}/`)
      .then(({ data }) => {
        const c = data.data ?? data;
        setCandidate(c);
        setScreeningStatus(API_TO_STATUS[c.screening_status] ?? 'not_screened');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-slate-500 text-sm gap-2">
        <RefreshCw className="w-4 h-4 animate-spin" />
        Loading candidate…
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="flex items-center justify-center py-24 text-red-500 text-sm">
        Failed to load candidate. Please go back and try again.
      </div>
    );
  }

  return (
    <CandidateDetail
      candidate={candidate}
      screeningStatus={screeningStatus}
      onStatusChange={setScreeningStatus}
    />
  );
}
