import { Tag, ChevronRight } from 'lucide-react';

export function OffersCarousel({ offers }) {
  if (!offers || offers.length === 0) return null;

  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
      {offers.map((offer, index) => (
        <div
          key={index}
          className="shrink-0 w-64 bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
              <Tag size={18} className="text-brand-500" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-900 text-sm leading-tight">
                {offer.title}
              </h4>
              <p className="text-xs text-gray-500 mt-0.5">{offer.subtitle}</p>
              <p className="text-xs text-brand-500 font-semibold mt-1.5 flex items-center gap-0.5">
                {offer.code}
                <ChevronRight size={12} />
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
