import { CalendarDays } from 'lucide-react';

export default function TodaysMenu() {
  const today = new Date().toLocaleDateString('en-PH', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Today's Menu</h2>
        <p className="text-sm text-gray-500 mt-0.5">{today}</p>
      </div>

      <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
        <div className="bg-amber-50 text-amber-500 rounded-2xl p-5">
          <CalendarDays size={32} strokeWidth={1.5} />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">No menu set for today</h3>
          <p className="text-sm text-gray-500 mt-1 max-w-xs">
            Pick items from your catalogue, preview the menu card, and export it as an image.
          </p>
        </div>
        <span className="text-xs font-mono text-gray-300 bg-gray-50 border border-gray-100 px-3 py-1 rounded-full">
          Coming in next step
        </span>
      </div>
    </div>
  );
}