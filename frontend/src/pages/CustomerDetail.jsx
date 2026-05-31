import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Star, User } from 'lucide-react';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-5 max-w-lg">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft size={15} />
        Back to customers
      </button>

      {/* Profile card */}
      <Card>
        <Card.Body className="flex items-center gap-4">
          <span className="w-14 h-14 rounded-2xl bg-brand-100 text-brand-700 font-bold
                           text-xl flex items-center justify-center shrink-0">
            ?
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-bold text-gray-900">Customer #{id?.slice(0, 6)}</h2>
              <Badge variant="green">active</Badge>
            </div>
            <p className="text-sm text-gray-400 mt-0.5">No Messenger username</p>
          </div>
        </Card.Body>
      </Card>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="secondary" size="sm" className="flex-1">
          <MessageCircle size={14} />
          Open Messenger
        </Button>
        <Button variant="secondary" size="sm" className="flex-1">
          <Star size={14} />
          Mark VIP
        </Button>
      </div>

      {/* Notes */}
      <Card>
        <Card.Header>
          <h3 className="text-sm font-semibold text-gray-900">Notes</h3>
        </Card.Header>
        <Card.Body>
          <p className="text-sm text-gray-400 italic">No notes yet.</p>
        </Card.Body>
      </Card>

      {/* Favorite orders */}
      <Card>
        <Card.Header>
          <h3 className="text-sm font-semibold text-gray-900">Favorite orders</h3>
        </Card.Header>
        <Card.Body>
          <p className="text-sm text-gray-400 italic">No favorites recorded.</p>
        </Card.Body>
      </Card>

      <div className="flex items-center justify-center gap-2 py-4 text-gray-300 text-xs">
        <User size={14} />
        Full customer data loads from API in next step
      </div>
    </div>
  );
}