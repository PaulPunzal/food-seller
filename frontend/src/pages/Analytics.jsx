import { BarChart2, TrendingUp, Users, UtensilsCrossed } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const TOP_FOODS = [
  { name: 'Sinigang na Baboy', orders: 24, badge: 'bestseller' },
  { name: 'Adobong Manok',     orders: 18, badge: 'chicken' },
  { name: 'Kare-Kare',         orders: 12, badge: 'special' },
  { name: 'Pancit Canton',     orders: 10, badge: 'noodles' },
];

export default function Analytics() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Analytics</h2>
        <p className="text-sm text-gray-500 mt-0.5">Top foods, customers, and activity.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Total orders',    value: '—', icon: TrendingUp,      color: 'text-brand-500 bg-brand-50' },
          { label: 'Messages sent',   value: '—', icon: BarChart2,       color: 'text-purple-500 bg-purple-50' },
          { label: 'Active customers',value: '—', icon: Users,           color: 'text-blue-500 bg-blue-50' },
          { label: 'Menu items',      value: '—', icon: UtensilsCrossed, color: 'text-emerald-500 bg-emerald-50' },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="p-4">
            <div className={`inline-flex p-2 rounded-xl mb-2 ${color}`}>
              <Icon size={16} />
            </div>
            <p className="text-xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </Card>
        ))}
      </div>

      {/* Top foods */}
      <Card>
        <Card.Header>
          <h3 className="text-sm font-semibold text-gray-900">Top foods</h3>
        </Card.Header>
        <div className="divide-y divide-gray-50">
          {TOP_FOODS.map((item, i) => (
            <div key={item.name} className="flex items-center gap-3 px-5 py-3">
              <span className="w-6 text-sm font-mono text-gray-300 text-center shrink-0">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                  <Badge>{item.badge}</Badge>
                </div>
                {/* Order bar */}
                <div className="mt-1.5 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-400 rounded-full"
                    style={{ width: `${(item.orders / TOP_FOODS[0].orders) * 100}%` }}
                  />
                </div>
              </div>
              <span className="text-sm font-semibold text-gray-700 shrink-0">{item.orders}</span>
            </div>
          ))}
        </div>
        <div className="px-5 py-3 border-t border-gray-50">
          <p className="text-xs text-gray-400 text-center">
            Sample data — live events from backend in next step
          </p>
        </div>
      </Card>
    </div>
  );
}