import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LogOut } from 'lucide-react';

const PAGE_TITLES = {
  '/':            'Dashboard',
  '/menu':        'Menu Maker',
  '/todays-menu': "Today's Menu",
  '/customers':   'Customers',
  '/messaging':   'Messaging',
  '/analytics':   'Analytics',
};

export default function TopBar() {
  const { pathname } = useLocation();
  const { seller, logout } = useAuth();

  // Match exact or prefix (e.g. /customers/123 → Customers)
  const title =
    PAGE_TITLES[pathname] ??
    Object.entries(PAGE_TITLES).find(([p]) => pathname.startsWith(p) && p !== '/')?.[1] ??
    'Food Seller Assistant';

  const initials = seller?.email?.[0]?.toUpperCase() ?? '?';

  return (
    <header
      className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 md:px-6
                 flex items-center justify-between h-14 shrink-0"
    >
      <h1 className="text-base font-semibold text-gray-900 truncate">{title}</h1>

      <div className="flex items-center gap-2">
        {/* Avatar / logout button */}
        <button
          onClick={logout}
          className="flex items-center gap-2 rounded-xl px-2.5 py-1.5 text-sm
                     text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-colors"
          title="Log out"
          aria-label="Log out"
        >
          <span
            className="w-7 h-7 rounded-lg bg-brand-100 text-brand-700 font-semibold
                       text-xs flex items-center justify-center"
          >
            {initials}
          </span>
          <LogOut size={14} className="hidden md:block" />
        </button>
      </div>
    </header>
  );
}