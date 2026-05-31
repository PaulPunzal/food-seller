import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  UtensilsCrossed,
  CalendarDays,
  Users,
  MessageCircle,
  BarChart2,
  ChefHat,
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/',              icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/menu',          icon: UtensilsCrossed, label: 'Menu Maker' },
  { to: '/todays-menu',   icon: CalendarDays,    label: "Today's Menu" },
  { to: '/customers',     icon: Users,           label: 'Customers' },
  { to: '/messaging',     icon: MessageCircle,   label: 'Messaging' },
  { to: '/analytics',     icon: BarChart2,       label: 'Analytics' },
];

export default function Sidebar() {
  return (
    <aside
      className="hidden md:flex flex-col w-56 shrink-0 bg-white border-r border-gray-100
                 min-h-screen sticky top-0"
      aria-label="Sidebar navigation"
    >
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-gray-100">
        <span className="bg-brand-500 text-white rounded-xl p-1.5">
          <ChefHat size={18} />
        </span>
        <span className="font-semibold text-sm text-gray-900 leading-tight">
          Food Seller<br />
          <span className="text-gray-400 font-normal">Assistant</span>
        </span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 px-3 space-y-0.5">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
               transition-colors duration-150
               ${isActive
                 ? 'bg-brand-50 text-brand-700'
                 : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
               }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={17} strokeWidth={isActive ? 2.5 : 1.75} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Version footer */}
      <div className="px-5 py-4 border-t border-gray-100">
        <p className="text-xs text-gray-300 font-mono">v1.0.0</p>
      </div>
    </aside>
  );
}