import { MessageCircle, Copy, ExternalLink } from 'lucide-react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const SAMPLE_CUSTOMERS = [
  { id: '1', name: 'Maria Santos',  messenger_username: 'mariasantos.ph', status: 'vip',    sent: false },
  { id: '2', name: 'Jose Reyes',    messenger_username: 'josereyes123',   status: 'active',  sent: true  },
  { id: '3', name: 'Ana Cruz',      messenger_username: 'anacruz.mnl',    status: 'active',  sent: false },
];

const statusVariant = { vip: 'brand', active: 'green', inactive: 'default' };

export default function Messaging() {
  return (
    <div className="space-y-5 max-w-lg">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Messaging</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Copy today's caption and open Messenger for each customer.
        </p>
      </div>

      {/* Caption preview */}
      <Card>
        <Card.Header>
          <h3 className="text-sm font-semibold text-gray-900">Today's caption</h3>
        </Card.Header>
        <Card.Body>
          <p className="text-sm text-gray-500 italic mb-3">
            Caption generates after you set today's menu.
          </p>
          <Button variant="secondary" size="sm" disabled>
            <Copy size={13} />
            Copy caption
          </Button>
        </Card.Body>
      </Card>

      {/* Customer list */}
      <Card>
        <Card.Header>
          <h3 className="text-sm font-semibold text-gray-900">Customers to message</h3>
        </Card.Header>
        <div className="divide-y divide-gray-50">
          {SAMPLE_CUSTOMERS.map((c) => (
            <div key={c.id} className="flex items-center gap-3 px-5 py-3.5">
              <span className="w-8 h-8 rounded-lg bg-brand-100 text-brand-700 font-semibold
                               text-sm flex items-center justify-center shrink-0">
                {c.name[0]}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900 truncate">{c.name}</p>
                  <Badge variant={statusVariant[c.status]}>{c.status}</Badge>
                </div>
                <p className="text-xs text-gray-400">@{c.messenger_username}</p>
              </div>
              {c.sent ? (
                <Badge variant="green">Sent</Badge>
              ) : (
                <a
                  href={`https://m.me/${c.messenger_username}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-600
                             hover:text-brand-700 transition-colors"
                >
                  <ExternalLink size={12} />
                  Open
                </a>
              )}
            </div>
          ))}
        </div>
      </Card>

      <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1.5">
        <MessageCircle size={13} />
        Live data + mark-as-sent coming in next step
      </p>
    </div>
  );
}