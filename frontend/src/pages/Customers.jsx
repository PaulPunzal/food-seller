import { Users, Plus, Search } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

// Sample display data so the page looks real
const SAMPLE = [
  { id: '1', name: 'Maria Santos',    status: 'vip',      messenger_username: 'mariasantos.ph' },
  { id: '2', name: 'Jose Reyes',      status: 'active',   messenger_username: 'josereyes123' },
  { id: '3', name: 'Ana Cruz',        status: 'active',   messenger_username: 'anacruz.mnl' },
  { id: '4', name: 'Pedro Dela Cruz', status: 'inactive', messenger_username: null },
];

const statusVariant = { vip: 'brand', active: 'green', inactive: 'default' };

export default function Customers() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Customers</h2>
          <p className="text-sm text-gray-500 mt-0.5">{SAMPLE.length} contacts</p>
        </div>
        <Button size="sm">
          <Plus size={14} />
          Add
        </Button>
      </div>

      {/* Search bar (non-functional stub) */}
      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          placeholder="Search customers…"
          className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200
                     bg-white focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
        />
      </div>

      {/* Customer list */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card divide-y divide-gray-50">
        {SAMPLE.map((c) => (
          <a
            key={c.id}
            href={`/customers/${c.id}`}
            className="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors"
          >
            <span className="w-9 h-9 rounded-xl bg-brand-100 text-brand-700 font-semibold
                             text-sm flex items-center justify-center shrink-0">
              {c.name[0]}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{c.name}</p>
              <p className="text-xs text-gray-400 truncate">
                {c.messenger_username ? `@${c.messenger_username}` : 'No Messenger username'}
              </p>
            </div>
            <Badge variant={statusVariant[c.status]}>{c.status}</Badge>
          </a>
        ))}
      </div>

      <p className="text-center text-xs text-gray-400">
        Showing sample data — live API coming in next step
      </p>
    </div>
  );
}