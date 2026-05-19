export const API_TO_STATUS = {
  Qualified: 'qualified',
  'Not Qualified': 'not_qualified',
  Deficient: 'deficient',
  Pending: 'not_screened',
};

function extractName(field, nameField) {
  if (typeof field === 'object' && field !== null) return field.name ?? field[nameField] ?? '';
  return field ?? '';
}

export function normalizeCandidateList(item) {
  return {
    id: item.id,
    fullname:
      item.fullname ??
      item.full_name ??
      item.name ??
      [item.surname, item.other_names ?? item.otherNames].filter(Boolean).join(' ') ??
      '',
    jambRegNo: item.jamb_reg_no ?? item.jambRegNo ?? '',
    gender: item.gender ?? '',
    phone: item.phone ?? '',
    faculty: extractName(item.faculty, 'faculty_name') || (item.faculty_name ?? ''),
    department: extractName(item.department, 'department_name') || (item.department_name ?? ''),
    regStatus: (item.reg_status ?? item.regStatus ?? '').toLowerCase(),
    screeningStatus:
      API_TO_STATUS[item.screening_status ?? item.screeningStatus] ?? 'not_screened',
  };
}

export function normalizeCandidateDetail(data) {
  return {
    id: data.id,
    fullname:
      data.fullname ??
      data.full_name ??
      data.name ??
      [data.surname, data.other_names ?? data.otherNames].filter(Boolean).join(' ') ??
      '',
    surname: data.surname ?? '',
    otherNames: data.other_names ?? data.otherNames ?? '',
    jambRegNo: data.jamb_reg_no ?? data.jambRegNo ?? '',
    gender: data.gender ?? '',
    dateOfBirth: data.dob ?? data.date_of_birth ?? data.dateOfBirth ?? '',
    bloodGroup: data.blood_group ?? data.bloodGroup ?? '',
    maritalStatus: data.marital_status ?? data.maritalStatus ?? '',
    indigeneStatus: data.indigene_status ?? data.indigeneStatus ?? '',
    address: data.address ?? '',
    phone: data.phone ?? '',
    nationality: data.nationality ?? '',
    state: data.state ?? '',
    lga: data.lga ?? '',
    guardianName: data.parent_name ?? data.guardian_name ?? data.guardianName ?? '',
    guardianPhone: data.parent_phone ?? data.guardian_phone ?? data.guardianPhone ?? '',
    guardianAddress: data.parent_address ?? data.guardian_address ?? data.guardianAddress ?? '',
    faculty: extractName(data.faculty, 'faculty_name') || (data.faculty_name ?? ''),
    department: extractName(data.department, 'department_name') || (data.department_name ?? ''),
    programme: data.programme ?? '',
    dateRegistered: data.registered_at ?? data.date_registered ?? data.dateRegistered ?? '',
    entryMode: data.mode_of_entry ?? data.entry_mode ?? data.entryMode ?? '',
    passportPhoto: data.passport ?? data.passport_photo ?? data.passportPhoto ?? null,
    credentials: data.credentials ?? [],
    screening_status: data.screening_status ?? data.screeningStatus ?? '',
    // Pass ssce and utme raw — tab components handle shape variations
    ssce: data.ssce ?? null,
    utme: data.utme ?? null,
  };
}
