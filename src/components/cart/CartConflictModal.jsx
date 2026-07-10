import { useCart } from '../../context/CartContext';
import { Modal } from '../common/Modal';

export function CartConflictModal() {
  const { conflict, resolveConflict } = useCart();

  return (
    <Modal
      open={!!conflict}
      onClose={() => resolveConflict(false)}
      title="Replace cart item?"
    >
      {conflict && (
        <div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Your cart contains dishes from{' '}
            <span className="font-bold text-gray-900">{conflict.currentRestaurantName}</span>.
            Do you want to discard the selection and add dishes from{' '}
            <span className="font-bold text-gray-900">{conflict.newRestaurantName}</span>?
          </p>
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => resolveConflict(false)}
              className="flex-1 py-3 rounded-lg border-2 border-gray-200 font-bold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              No
            </button>
            <button
              onClick={() => resolveConflict(true)}
              className="flex-1 py-3 rounded-lg bg-brand-500 font-bold text-white hover:bg-brand-600 transition-colors"
            >
              Yes, replace
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
