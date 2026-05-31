import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  UtensilsCrossed,
  Users,
  MessageCircle,
  BarChart2,
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/',          icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/menu',      icon: UtensilsCrossed, label: 'Menu' },
  { to: '/customers', icon: Users,           label: 'Customers' },
  { to: '/messaging', icon: MessageCircle,   label: 'Messages' },
  { to: '/analytics', icon: BarChart2,       label: 'Analytics' },
];

export default function MobileNav() {
  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-100 shadow-nav
                 flex items-stretch md:hidden pb-safe"
      aria-label="Main navigation"
    >
      {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center flex-1 py-2 gap-0.5 text-[10px] font-medium
             transition-colors duration-150
             ${isActive
               ? 'text-brand-600'
               : 'text-gray-400 hover:text-gray-600'
             }`
          }
          aria-label={label}
        >
          {({ isActive }) => (
            <>
              <span
                className={`p-1.5 rounded-xl transition-colors duration-150
                  ${isActive ? 'bg-brand-50' : ''}`}
              >
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 1.75}
                />
              </span>
              <span>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}