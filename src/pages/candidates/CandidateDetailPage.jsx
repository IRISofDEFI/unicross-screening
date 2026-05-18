import { useState } from 'react';
import CandidateDetail from '../../components/candidates/CandidateDetail';

const CANDIDATE = {
  id: 42,
  surname: 'IKONGYE',
  otherNames: 'ENDURANCE UKONGIKWEN',
  fullname: 'IKONGYE ENDURANCE UKONGIKWEN',
  jambRegNo: '202550889735IF',
  gender: 'Female',
  dateOfBirth: '15/03/2005',
  bloodGroup: 'O+',
  maritalStatus: 'Single',
  indigeneStatus: 'Indigene',
  address: 'No. 12, Calabar, Cross River State',
  phone: '09138965898',
  nationality: 'Nigerian',
  state: 'Cross River',
  lga: 'Calabar Municipal',
  guardianName: 'MR. UKONGIKWEN BASSEY',
  guardianPhone: '08012345678',
  guardianAddress: 'No. 12, Calabar, Cross River State',
  faculty: 'BIOLOGICAL SCIENCES',
  department: 'MICROBIOLOGY',
  programme: 'B.Sc',
  dateRegistered: '15/01/2025',
  entryMode: 'UTME',
  passportPhoto: null,
  ssce: {
    subjects: [
      { subject: 'Mathematics', grade: 'B2' },
      { subject: 'English Language', grade: 'C5' },
      { subject: 'Biology', grade: 'B2' },
      { subject: 'Chemistry', grade: 'B3' },
      { subject: 'Health Science', grade: 'B2' },
      { subject: 'Physics', grade: 'B2' },
      { subject: 'Geography', grade: 'A1' },
      { subject: 'Civic Education', grade: 'B2' },
      { subject: 'Tourism', grade: 'C4' },
    ],
    year: '2025',
    session: 'May/June',
    regNo: '4100842035',
    type: 'WAEC',
    sittings: 1,
  },
  utme: {
    subjects: [
      { name: 'ENGLISH', score: 46 },
      { name: 'PHYSICS', score: 39 },
      { name: 'BIOLOGY', score: 42 },
      { name: 'CHEMISTRY', score: 36 },
    ],
    total: 163,
  },
  credentials: [
    { label: 'SSCE RESULT 1', image: null },
    { label: 'SSCE RESULT 2', image: null },
    { label: 'BIRTH CERTIFICATE', image: null },
  ],
};

export default function CandidateDetailPage() {
  const [screeningStatus, setScreeningStatus] = useState('not_screened');
  return (
    <CandidateDetail
      candidate={CANDIDATE}
      screeningStatus={screeningStatus}
      onStatusChange={setScreeningStatus}
    />
  );
}
