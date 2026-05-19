import { Bell } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

function getInitials(name) {
  if (!name) return 'U';
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
}

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="h-14 bg-[#1e73be] flex items-center px-4 gap-4 flex-shrink-0 shadow-md">
      <span className="text-sm tracking-wide">
        <span className="font-bold text-white">UNICROSS</span>
        <span className="font-light text-white"> PORTAL</span>
      </span>
      <div className="ml-auto flex items-center gap-3">
        <button className="text-white hover:text-blue-100 transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center text-xs font-bold text-white">
          {getInitials(user?.name)}
        </div>
      </div>
    </header>
  );
}
