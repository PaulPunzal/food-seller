import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import TopBar from './TopBar';

/**
 * AppShell — persistent layout for authenticated pages.
 * - Desktop: left sidebar + main content
 * - Mobile: TopBar + main content + bottom nav
 */
export default function AppShell() {
  return (
    <div className="flex min-h-screen bg-surface-raised">
      {/* Desktop sidebar — hidden on mobile */}
      <Sidebar />

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0">
        <TopBar />

        <main className="flex-1 overflow-y-auto p-4 pb-24 md:pb-6 md:p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom nav — hidden on desktop */}
      <MobileNav />
    </div>
  );
}