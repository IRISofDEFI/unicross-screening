# UNICROSS Screening Portal — Frontend

A React-based admin portal for admission officers to screen prospective students for the University of Cross River State (UNICROSS) 2025/2026 academic session.

---

## Live URL

**Production:** https://unicross-screening.vercel.app

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 18 | UI framework |
| Vite | 5 | Build tool |
| Tailwind CSS | 4 | Styling |
| Axios | latest | HTTP client |
| React Router | 6 | Client-side routing |
| Lucide React | 0.383 | Icons |

---

## Project Structure

```
src/
├── api/
│   └── axios.js              # Axios base instance, Bearer token interceptor
├── components/
│   ├── layout/
│   │   ├── AppLayout.jsx     # Root layout — sidebar + header + outlet
│   │   ├── Sidebar.jsx       # Static navigation sidebar with RBAC visibility
│   │   ├── Header.jsx        # Top bar with user avatar + bell
│   │   └── Breadcrumb.jsx    # Dynamic path breadcrumb
│   ├── candidates/
│   │   ├── CandidateDetail.jsx      # 4-tab shell for candidate profile
│   │   ├── CredentialViewer.jsx     # Document image carousel + screening actions
│   │   ├── tabs/
│   │   │   ├── PersonalDetailsTab.jsx
│   │   │   ├── UTMETab.jsx
│   │   │   ├── SSCETab.jsx
│   │   │   └── PrevCertTab.jsx
│   │   └── normalizeCandidate.js    # Maps snake_case API fields to component props
│   └── PrivateRoute.jsx      # Auth guard — redirects to /login if no token
├── context/
│   └── AuthContext.jsx       # Stores logged-in officer + token
├── hooks/
│   └── useAuth.js            # AuthContext consumer hook
├── pages/
│   ├── LoginPage.jsx
│   ├── DashboardPage.jsx
│   └── candidates/
│       ├── CandidatesPage.jsx
│       └── CandidateDetailPage.jsx
├── utils/
│   └── statusColors.js       # Maps screening status keys to Tailwind classes
└── main.jsx                  # Router + app entry point
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=https://unicross-backend-production.up.railway.app/api
```

For local development:
```env
VITE_API_URL=http://localhost:8000/api
```

> Never commit `.env` to GitHub. It is in `.gitignore`.

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## Deployment

The app is deployed on **Vercel** and connected to the GitHub repo `IRISofDEFI/unicross-screening`.

Every push to the `main` branch triggers an automatic redeploy.

To update the API URL on Vercel:
1. Go to Vercel dashboard → unicross-screening → Settings → Environment Variables
2. Update `VITE_API_URL`
3. Redeploy

---

## Authentication

- Staff login uses **SimpleJWT** tokens (8-hour expiry)
- Token is stored in `localStorage` as `staff_token`
- Every API request automatically attaches `Authorization: Bearer <staff_token>`
- On 401 response, the app clears the token and redirects to `/login`

### Login endpoint
```
POST /api/auth/login/
Body: { "username": "...", "password": "..." }
Response: { "success": true, "data": { "token": "...", "officer": { "id", "name", "role", "faculty_id", "department_id" } } }
```

---

## Role-Based Access Control (RBAC)

Four officer roles are supported:

| Role | Access |
|---|---|
| `admin` | All faculties, all departments, all admin features |
| `admission_officer` | All faculties and departments |
| `faculty_officer` | Only their assigned faculty |
| `department_officer` | Only their assigned department |

The filter bar on the Candidates page automatically locks Faculty and Department dropdowns based on the logged-in officer's role.

---

## API Endpoints Used

All endpoints are prefixed with `VITE_API_URL`.

### Auth
| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/auth/login/` | Staff login |
| POST | `/auth/logout/` | Staff logout |

### Dashboard
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/dashboard/stats/` | Summary counts |

### Candidates
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/candidates/` | List with filters + pagination |
| GET | `/candidates/{id}/` | Full candidate profile |
| PATCH | `/candidates/{id}/screen/` | Update screening status |
| GET | `/candidates/export/` | Download Excel |

### Dropdowns
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/faculties/` | All faculties |
| GET | `/departments/?faculty_id=X` | Departments by faculty |
| GET | `/batches/` | Academic batches |

---

## Screening Status Values

The backend returns these exact strings:

| Backend value | Badge color | Label |
|---|---|---|
| `Qualified` | Green | Qualified |
| `Not Qualified` | Red | Not Qualified |
| `Deficient` | Amber | Deficient |
| `Pending` | Dark navy | Not Screened |

### Screen action endpoint
```
PATCH /api/candidates/{id}/screen/
Headers: Authorization: Bearer <staff_token>
Body: { "status": "Qualified" }
```

---

## Candidate Filter Parameters

```
GET /api/candidates/?faculty_id=1&department_id=10&screening_status=Qualified&entry_mode=UTME&jamb_reg_no=202550889735IF&page=1&per_page=10
```

---

## CORS

The following origins are whitelisted on the backend:
- `https://unicross-screening.vercel.app`
- `https://unicross-registration.vercel.app`

If deploying to a new domain, ask the backend developer to add it to `CORS_ALLOWED_ORIGINS`.

---

## Related Repositories

| Repo | Description |
|---|---|
| `IRISofDEFI/unicross-screening` | This repo — screening portal frontend |
| `IRISofDEFI/unicross-registration` | Candidate registration portal frontend |
| Backend | Django REST API on Railway |

---

## Contact

Frontend Developer: Blessing (Queen)
GitHub: [@IRISofDEFI](https://github.com/IRISofDEFI)