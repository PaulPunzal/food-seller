import { LayoutDashboard, UtensilsCrossed, Users, MessageCircle, TrendingUp } from 'lucide-react';
import Card from '../components/ui/Card';

const quickStats = [
  { label: "Today's Items", value: '—', icon: UtensilsCrossed, color: 'text-orange-500 bg-orange-50' },
  { label: 'Customers',     value: '—', icon: Users,           color: 'text-blue-500 bg-blue-50' },
  { label: 'Msgs Sent',     value: '—', icon: MessageCircle,   color: 'text-emerald-500 bg-emerald-50' },
  { label: 'This Week',     value: '—', icon: TrendingUp,      color: 'text-purple-500 bg-purple-50' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">Good day! 👋</h2>
        <p className="text-sm text-gray-500 mt-0.5">Here's what's happening with your business.</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {quickStats.map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="p-4">
            <div className={`inline-flex p-2 rounded-xl mb-3 ${color}`}>
              <Icon size={18} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </Card>
        ))}
      </div>

      {/* Quick actions */}
      <Card>
        <Card.Header>
          <h3 className="text-sm font-semibold text-gray-900">Quick actions</h3>
        </Card.Header>
        <Card.Body className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            { label: "Set today's menu", href: '/todays-menu', icon: UtensilsCrossed },
            { label: 'Message customers', href: '/messaging',   icon: MessageCircle },
            { label: 'View analytics',   href: '/analytics',   icon: TrendingUp },
          ].map(({ label, href, icon: Icon }) => (
            <a
              key={href}
              href={href}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100
                         hover:border-brand-200 hover:bg-brand-50 transition-colors text-center"
            >
              <Icon size={20} className="text-brand-500" />
              <span className="text-xs font-medium text-gray-700">{label}</span>
            </a>
          ))}
        </Card.Body>
      </Card>

      {/* Coming soon notice */}
      <div className="text-center py-8 text-sm text-gray-400">
        <LayoutDashboard size={28} className="mx-auto mb-2 opacity-30" />
        Live stats will appear here once you start logging orders.
      </div>
    </div>
  );
}