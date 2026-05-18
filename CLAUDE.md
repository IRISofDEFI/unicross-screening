# UNICROSS Screening Portal — Project Context

## What this is
A university post-UTME screening admin portal for admission officers.
Built for the University of Cross River State (UNICROSS).
Officers use this to search prospective students, review their results, and mark them as Qualified / Deficient / Not Qualified.

## Tech Stack
- **Framework:** React + Vite
- **Styling:** Tailwind CSS (utility-first, no component libraries)
- **HTTP:** Axios (with a base instance in `src/api/axios.js`)
- **Routing:** React Router v6
- **Icons:** Lucide React
- **Language:** JavaScript (no TypeScript)

## Project Structure
```
src/
├── api/
│   └── axios.js          # Axios base instance
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   ├── Breadcrumb.jsx
│   │   └── AppLayout.jsx  # Wraps sidebar + header + outlet
│   ├── ui/
│   │   ├── StatusBadge.jsx
│   │   ├── ActionButton.jsx
│   │   ├── ConfirmModal.jsx
│   │   └── DataTable.jsx
│   └── candidates/
│       ├── FilterBar.jsx
│       ├── CandidateTable.jsx
│       ├── CandidateDetail.jsx
│       ├── tabs/
│       │   ├── PersonalDetailsTab.jsx
│       │   ├── UTMETab.jsx
│       │   ├── SSCETab.jsx
│       │   └── PrevCertTab.jsx
│       └── CredentialViewer.jsx
├── pages/
│   ├── LoginPage.jsx
│   ├── DashboardPage.jsx
│   └── candidates/
│       ├── CandidatesPage.jsx
│       └── CandidateDetailPage.jsx
├── hooks/
│   └── useAuth.js
├── context/
│   └── AuthContext.jsx
├── utils/
│   └── statusColors.js    # Maps status strings to Tailwind color classes
└── main.jsx
```

## Color Reference (match the portal screenshots exactly)
- Sidebar background: `#1a2332` (dark navy)
- Header/top bar: `#1e73be` (blue)
- Primary action (Fetch, nav active): `#1a2332`
- Qualified badge: green (`bg-green-500`)
- Not Qualified badge: red (`bg-red-500`)
- Deficient badge: amber (`bg-amber-500`)
- Not Screened: dark navy (`bg-slate-700`)
- Completed badge: green (`bg-green-500`)
- Unscreen button: orange (`bg-orange-500`)
- Back to Prospects button: teal (`bg-teal-600`)
- Export to Excel button: blue (`bg-blue-500`)
- Active sidebar link: slightly lighter navy with left border accent

## Screening Status Logic
Statuses: `not_screened` | `qualified` | `deficient` | `not_qualified`

- If status is `not_screened` → show all 4 action buttons: Unscreen, Qualified, Deficient, Not Qualified
- If status is anything else (already screened) → show only: Unscreen button
- Unscreen resets status back to `not_screened`

## API Base URL
Stored in `.env` as `VITE_API_BASE_URL`
All requests use `Authorization: Bearer <token>` header.

## Sidebar Navigation Structure
```
[User profile block]
  Avatar | MR. ILOK UKAM | ● Online

MAIN NAVIGATION
- Dashboard
- Students Mgt          (collapsible)
- Admission List Mgt    (collapsible)
- Prospective Students  (collapsible)
    └── Candidates
    └── Matriculation
- Candidates
- Payment Reports       (collapsible)
- Post Utme             (collapsible)
- Admission List Mgt    (collapsible)
- Setup                 (collapsible)
- View Payment Status
- GSS Registration Mgt
- Department Admin
- Reset Password
```

## Key Rules
- No TypeScript. Plain JS only.
- No UI component libraries (no shadcn, no MUI, no Chakra). Tailwind only.
- All components are functional with hooks.
- Never use inline styles — Tailwind classes only.
- Keep components small and single-responsibility.
- Axios calls live in `src/api/` not inside components.
- Use React Router `<Outlet />` for nested layouts.