import { UtensilsCrossed, Plus } from 'lucide-react';
import Button from '../components/ui/Button';

export default function MenuMaker() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Menu Maker</h2>
          <p className="text-sm text-gray-500 mt-0.5">Add and manage your food catalogue.</p>
        </div>
        <Button size="sm">
          <Plus size={14} />
          Add item
        </Button>
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
        <div className="bg-brand-50 text-brand-500 rounded-2xl p-5">
          <UtensilsCrossed size={32} strokeWidth={1.5} />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">No menu items yet</h3>
          <p className="text-sm text-gray-500 mt-1 max-w-xs">
            Add your first food item — photo, price, labels, and description.
          </p>
        </div>
        <Button>
          <Plus size={14} />
          Add your first item
        </Button>
        <span className="text-xs font-mono text-gray-300 bg-gray-50 border border-gray-100 px-3 py-1 rounded-full">
          Full form coming in next step
        </span>
      </div>
    </div>
  );
}