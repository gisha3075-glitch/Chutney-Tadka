import { useEffect } from 'react';
import { X } from 'lucide-react';

// Responsive modal: bottom sheet on mobile, centered modal on desktop
export function Modal({ open, onClose, children, title }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 animate-fade-in"
        onClick={onClose}
      />
      <div className="relative w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl animate-slide-up sm:animate-fade-in max-h-[85vh] overflow-y-auto no-scrollbar">
        <div className="sticky top-0 bg-white flex items-center justify-between px-5 py-4 border-b border-gray-100 rounded-t-2xl">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  );
}
