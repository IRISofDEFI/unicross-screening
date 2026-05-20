import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  GraduationCap,
  ClipboardList,
  UserPlus,
  Users,
  Receipt,
  FileText,
  Settings,
  Eye,
  BookOpen,
  Building2,
  KeyRound,
  Circle,
} from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const ROLE_LABELS = {
  admin: 'Admin',
  admission_officer: 'Admission Officer',
  faculty_officer: 'Faculty Officer',
  department_officer: 'Dept. Officer',
};

const navConfig = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'students',
    label: 'Students Mgt',
    icon: GraduationCap,
    children: [
      { label: 'Students', path: '/students' },
    ],
  },
  {
    id: 'admission1',
    label: 'Admission List Mgt',
    icon: ClipboardList,
    children: [
      { label: 'Admission List', path: '/admission-list' },
    ],
  },
  {
    id: 'prospective',
    label: 'Prospective Students',
    icon: UserPlus,
    children: [
      { label: 'Candidates', path: '/screening/candidates' },
      { label: 'Matriculation', path: '/matriculation' },
    ],
  },
  {
    id: 'candidates',
    label: 'Candidates',
    path: '/screening/candidates',
    icon: Users,
  },
  {
    id: 'payment-reports',
    label: 'Payment Reports',
    icon: Receipt,
    children: [
      { label: 'Reports', path: '/payment-reports' },
    ],
  },
  {
    id: 'post-utme',
    label: 'Post Utme',
    icon: FileText,
    children: [
      { label: 'Post UTME', path: '/post-utme' },
    ],
  },
  {
    id: 'admission2',
    label: 'Admission List Mgt',
    icon: ClipboardList,
    children: [
      { label: 'Admission List', path: '/admission-list' },
    ],
  },
  {
    id: 'setup',
    label: 'Setup',
    icon: Settings,
    children: [
      { label: 'System Setup', path: '/setup' },
    ],
  },
  {
    id: 'payment-status',
    label: 'View Payment Status',
    path: '/payment-status',
    icon: Eye,
  },
  {
    id: 'gss',
    label: 'GSS Registration Mgt',
    path: '/gss-registration',
    icon: BookOpen,
  },
  {
    id: 'dept-admin',
    label: 'Department Admin',
    path: '/department-admin',
    icon: Building2,
    roles: ['admin', 'department_officer'],
  },
  {
    id: 'reset-password',
    label: 'Reset Password',
    path: '/reset-password',
    icon: KeyRound,
  },
];

const linkBase = 'flex items-center gap-3 px-4 py-2.5 text-sm transition-colors border-l-[3px]';
const linkActive = 'bg-[#243447] border-[#1e73be] text-white pl-[13px]';
const linkInactive = 'border-transparent text-slate-300 hover:bg-[#243447] hover:text-white';

function getInitials(name) {
  if (!name) return 'U';
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function Sidebar() {
  const { user, role } = useAuth();

  const visibleNav = navConfig.filter((item) => {
    if (item.roles) return item.roles.includes(role);
    return true;
  });

  const displayName = user?.name ?? 'User';
  const roleLabel = ROLE_LABELS[role] ?? null;

  return (
    <aside className="w-[260px] h-screen bg-[#1a2332] text-white flex flex-col flex-shrink-0">
      {/* Profile block */}
      <div className="px-4 py-4 border-b border-[#2a3a52]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#1e73be] flex items-center justify-center text-sm font-bold flex-shrink-0">
            {getInitials(displayName)}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold truncate leading-tight uppercase">
              {displayName}
            </p>
            {roleLabel && (
              <p className="text-[10px] text-slate-400 truncate mt-0.5">{roleLabel}</p>
            )}
            <div className="flex items-center gap-1.5 mt-1">
              <Circle className="w-2 h-2 fill-green-400 text-green-400" />
              <span className="text-xs text-green-400">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2">
        <p className="px-4 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          Main Navigation
        </p>
        <ul>
          {visibleNav.map((item) => {
            const Icon = item.icon;

            if ('children' in item) {
              return (
                <li key={item.id}>
                  <div className={`${linkBase} border-transparent text-slate-300 cursor-default`}>
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="flex-1">{item.label}</span>
                  </div>
                  {item.children.length > 0 && (
                    <ul className="bg-[#151d2a]">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <NavLink
                            to={child.path}
                            className={({ isActive }) =>
                              `flex items-center gap-2.5 pl-10 pr-4 py-2 text-sm transition-colors border-l-[3px] ${
                                isActive && child.path !== '#'
                                  ? 'border-[#1e73be] bg-[#243447] text-white'
                                  : 'border-transparent text-slate-400 hover:bg-[#243447] hover:text-white'
                              }`
                            }
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            }

            return (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  end={item.path !== '#'}
                  className={({ isActive }) =>
                    `${linkBase} ${isActive && item.path !== '#' ? linkActive : linkInactive}`
                  }
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
