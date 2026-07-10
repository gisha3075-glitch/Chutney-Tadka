import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, ChevronRight, Plus, Minus, Utensils, Heart, Tag, X, Check, CreditCard, Wallet, Banknote, LocateFixed } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ADDRESSES, PROMO_CODES } from '../data/mockData';
import { api } from '../lib/api';
import { reverseGeocode } from '../lib/location';
import { VegIcon } from '../components/common/VegIcon';
import { Modal } from '../components/common/Modal';

const TIP_OPTIONS = [20, 30, 50];

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', description: 'Pay with any UPI app', Icon: Wallet },
  { id: 'card', label: 'Credit / Debit Card', description: 'Visa, Mastercard and RuPay', Icon: CreditCard },
  { id: 'wallet', label: 'Wallet', description: 'Pay using your wallet balance', Icon: Wallet },
  { id: 'cod', label: 'Cash on Delivery', description: 'Pay when your order arrives', Icon: Banknote },
];

export function CheckoutPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { items, subtotal, itemCount, incrementItem, decrementItem, currentRestaurant, clearCart } = useCart();

  const [selectedAddress, setSelectedAddress] = useState(ADDRESSES[0]);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [cookingInstructions, setCookingInstructions] = useState('');
  const [noCutlery, setNoCutlery] = useState(true);
  const [selectedTip, setSelectedTip] = useState(0);
  const [customTip, setCustomTip] = useState('');
  const [donate, setDonate] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [orderError, setOrderError] = useState('');
  const [placingOrder, setPlacingOrder] = useState(false);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState('');

  // Bill calculations
  const packagingCharges = 15;
  const deliveryFee = 40;
  const taxes = Math.round(subtotal * 0.05);
  const tipAmount = selectedTip > 0 ? selectedTip : (customTip ? parseInt(customTip) || 0 : 0);
  const donationAmount = donate ? 3 : 0;
  const promoDiscount = appliedPromo?.discount || 0;

  const grandTotal = useMemo(
    () => subtotal + packagingCharges + deliveryFee + taxes + tipAmount + donationAmount - promoDiscount,
    [subtotal, packagingCharges, deliveryFee, taxes, tipAmount, donationAmount, promoDiscount]
  );

  const handleApplyPromo = async () => {
    const code = promoCode.trim().toUpperCase();
    try {
      const { promo } = await api.validatePromo(code);
      setAppliedPromo(promo);
      setPromoError('');
    } catch {
      setAppliedPromo(null);
      if (PROMO_CODES[code]) {
        setAppliedPromo({ code, ...PROMO_CODES[code] });
        setPromoError('');
      } else {
        setPromoError('Invalid promo code');
      }
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
    setPromoError('');
  };

  const handleUseCurrentLocation = () => {
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationError('Current location is not supported in this browser');
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const lat = coords.latitude.toFixed(6);
        const lng = coords.longitude.toFixed(6);
        let location = null;

        try {
          location = await reverseGeocode(coords.latitude, coords.longitude);
        } catch {
          location = null;
        }

        setSelectedAddress({
          id: 'current-location',
          type: location?.area || 'Current Location',
          name: user?.name || 'Selected location',
          address: location?.displayName || `GPS: ${lat}, ${lng}`,
          city: location?.city || '',
          state: location?.state || '',
          pincode: location?.pincode || '',
          phone: '+91 98765 43210',
          coordinates: {
            latitude: coords.latitude,
            longitude: coords.longitude,
            accuracy: coords.accuracy,
          },
        });
        setLocating(false);
        setAddressModalOpen(false);
      },
      (error) => {
        setLocationError(error.message || 'Could not get current location');
        setLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/checkout' } }, replace: false });
      return;
    }

    setOrderError('');
    setPlacingOrder(true);

    try {
      const { order } = await api.createOrder({
        user,
        restaurant: currentRestaurant,
        items: Object.values(items).map(({ dish, quantity }) => ({ ...dish, quantity })),
        address: selectedAddress,
        cookingInstructions,
        noCutlery,
        paymentMethod,
        totals: {
          subtotal,
          packagingCharges,
          deliveryFee,
          taxes,
          tipAmount,
          donationAmount,
          promoDiscount,
          grandTotal,
        },
      });
      clearCart();
      navigate(`/tracking/${order.id}`);
    } catch (err) {
      setOrderError(err.message || 'Could not place order');
    } finally {
      setPlacingOrder(false);
    }
  };

  if (itemCount === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <Utensils size={36} className="text-gray-400" />
        </div>
        <h2 className="text-xl font-extrabold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 text-sm mb-6">Add some delicious food to get started!</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-brand-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-brand-600 transition-colors"
        >
          Browse Restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 pb-32">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Checkout</h1>

      {/* Delivery Address */}
      <section className="mb-6">
        <h2 className="text-lg font-extrabold text-gray-900 mb-3">Delivery Address</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <MapPin size={20} className="text-brand-500 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900 text-sm">{selectedAddress.type}</span>
                  <span className="text-xs text-gray-500">{selectedAddress.name}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedAddress.address}
                  {selectedAddress.city && `, ${selectedAddress.city}`}
                  {selectedAddress.state && `, ${selectedAddress.state}`}
                  {selectedAddress.pincode && ` - ${selectedAddress.pincode}`}
                </p>
                <p className="text-xs text-gray-500 mt-1">{selectedAddress.phone}</p>
              </div>
            </div>
            <button
              onClick={() => setAddressModalOpen(true)}
              className="text-brand-500 font-bold text-sm hover:text-brand-600 transition-colors shrink-0"
            >
              Change
            </button>
          </div>
        </div>
      </section>

      {/* Cart Review */}
      <section className="mb-6">
        <h2 className="text-lg font-extrabold text-gray-900 mb-1">Cart Review</h2>
        {currentRestaurant && (
          <p className="text-sm text-gray-500 mb-3">From {currentRestaurant.name}</p>
        )}
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {Object.values(items).map(({ dish, quantity }) => (
            <div key={dish.id} className="flex items-center gap-3 p-4">
              <VegIcon isVeg={dish.isVeg} size={16} />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 text-sm truncate">{dish.name}</h4>
                <p className="text-sm text-gray-500">₹{dish.price}</p>
              </div>
              {/* Quantity controls */}
              <div className="flex items-center border-2 border-brand-500 rounded-lg overflow-hidden">
                <button
                  onClick={() => decrementItem(dish.id)}
                  className="px-2 py-1.5 text-brand-500 hover:bg-brand-50 transition-colors"
                  aria-label="Decrease"
                >
                  <Minus size={14} />
                </button>
                <span className="font-bold text-brand-500 text-sm min-w-[28px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => incrementItem(dish.id)}
                  className="px-2 py-1.5 text-brand-500 hover:bg-brand-50 transition-colors"
                  aria-label="Increase"
                >
                  <Plus size={14} />
                </button>
              </div>
              <span className="font-bold text-gray-900 text-sm w-16 text-right">
                ₹{dish.price * quantity}
              </span>
            </div>
          ))}
        </div>

        {/* Cooking Instructions */}
        <div className="mt-3">
          <textarea
            placeholder="Add cooking instructions (e.g., less spicy, no onions)..."
            value={cookingInstructions}
            onChange={(e) => setCookingInstructions(e.target.value)}
            rows={2}
            className="w-full bg-white rounded-xl border border-gray-200 p-3 text-sm outline-none focus:ring-2 focus:ring-brand-400 resize-none"
          />
        </div>

        {/* Don't send cutlery */}
        <label className="flex items-center gap-3 mt-3 cursor-pointer select-none bg-white rounded-xl border border-gray-200 p-3">
          <input
            type="checkbox"
            checked={noCutlery}
            onChange={(e) => setNoCutlery(e.target.checked)}
            className="w-5 h-5 rounded accent-brand-500"
          />
          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-sm">Don't send cutlery</p>
            <p className="text-xs text-gray-500">Help us reduce waste. Say no to disposable cutlery.</p>
          </div>
          <Utensils size={18} className="text-gray-400" />
        </label>
      </section>

      {/* Tip Section */}
      <section className="mb-6">
        <h2 className="text-lg font-extrabold text-gray-900 mb-1">Tip your delivery partner</h2>
        <p className="text-sm text-gray-500 mb-3">100% of your tip goes to your delivery partner</p>
        <div className="flex gap-2 flex-wrap">
          {TIP_OPTIONS.map((amount) => (
            <button
              key={amount}
              onClick={() => {
                setSelectedTip(amount);
                setCustomTip('');
              }}
              className={`px-5 py-2.5 rounded-lg font-bold text-sm border-2 transition-all ${
                selectedTip === amount
                  ? 'border-brand-500 bg-brand-50 text-brand-500'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              ₹{amount}
            </button>
          ))}
          <div className="relative">
            <input
              type="number"
              placeholder="Custom"
              value={customTip}
              onChange={(e) => {
                setCustomTip(e.target.value);
                setSelectedTip(0);
              }}
              className="w-24 px-3 py-2.5 rounded-lg font-bold text-sm border-2 border-gray-200 outline-none focus:border-brand-500 text-gray-700"
            />
          </div>
        </div>
      </section>

      {/* Donation */}
      <section className="mb-6">
        <label className="flex items-center gap-3 cursor-pointer select-none bg-amber-50 rounded-xl border border-amber-200 p-4">
          <input
            type="checkbox"
            checked={donate}
            onChange={(e) => setDonate(e.target.checked)}
            className="w-5 h-5 rounded accent-amber-500"
          />
          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-sm flex items-center gap-1.5">
              <Heart size={14} className="text-amber-500" />
              Donate ₹3 to Feeding India
            </p>
            <p className="text-xs text-gray-500 mt-0.5">Help provide meals to those in need</p>
          </div>
        </label>
      </section>

      {/* Bill Details */}
      <section className="mb-6">
        <h2 className="text-lg font-extrabold text-gray-900 mb-3">Payment Method</h2>
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {PAYMENT_METHODS.map(({ id, label, description, Icon }) => (
            <label key={id} className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="payment-method"
                value={id}
                checked={paymentMethod === id}
                onChange={() => setPaymentMethod(id)}
                className="w-4 h-4 accent-brand-500"
              />
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                <Icon size={18} className="text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm text-gray-900">{label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{description}</p>
              </div>
              {paymentMethod === id && <Check size={18} className="text-brand-500" />}
            </label>
          ))}
        </div>
      </section>

      {/* Bill Details */}
      <section className="mb-6">
        <h2 className="text-lg font-extrabold text-gray-900 mb-3">Bill Details</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-2.5">
          <BillRow label="Item Total" value={`₹${subtotal}`} />
          <BillRow label="Restaurant Packaging Charges" value={`₹${packagingCharges}`} />
          <BillRow label="Delivery Partner Fee" value={`₹${deliveryFee}`} />
          <BillRow label="Taxes (5%)" value={`₹${taxes}`} />
          {tipAmount > 0 && <BillRow label="Delivery Partner Tip" value={`₹${tipAmount}`} />}
          {donationAmount > 0 && <BillRow label="Donation to Feeding India" value={`₹${donationAmount}`} />}
          {promoDiscount > 0 && (
            <BillRow label={`Promo (${appliedPromo.code})`} value={`-₹${promoDiscount}`} highlight />
          )}
          <div className="border-t border-gray-200 pt-2.5 mt-2.5">
            <BillRow label="Grand Total" value={`₹${grandTotal}`} bold />
          </div>
        </div>

        {/* Promo Code */}
        <div className="mt-3">
          {appliedPromo ? (
            <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl p-3">
              <div className="flex items-center gap-2">
                <Check size={18} className="text-green-600" />
                <div>
                  <p className="font-bold text-green-700 text-sm">{appliedPromo.code} applied</p>
                  <p className="text-xs text-green-600">{appliedPromo.label}</p>
                </div>
              </div>
              <button onClick={handleRemovePromo} className="p-1.5 hover:bg-green-100 rounded-full transition-colors">
                <X size={16} className="text-green-600" />
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Apply Promo Code"
                  value={promoCode}
                  onChange={(e) => {
                    setPromoCode(e.target.value);
                    setPromoError('');
                  }}
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-white rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-brand-400 uppercase"
                />
              </div>
              <button
                onClick={handleApplyPromo}
                className="px-5 py-2.5 bg-gray-900 text-white font-bold text-sm rounded-lg hover:bg-gray-800 transition-colors"
              >
                Apply
              </button>
            </div>
          )}
          {promoError && <p className="text-xs text-red-500 mt-1.5">{promoError}</p>}
          <p className="text-xs text-gray-400 mt-1.5">Try: KHAO50, FREEDEL, ICICI150</p>
        </div>
      </section>

      {/* Payment Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-3">
            <span className="hidden sm:block text-sm font-semibold text-gray-600">
              {PAYMENT_METHODS.find((method) => method.id === paymentMethod)?.label}
            </span>

            {/* Pay button */}
            <button
              onClick={handlePlaceOrder}
              disabled={placingOrder}
              className="flex-1 max-w-xs flex items-center justify-between bg-brand-500 text-white font-bold px-5 py-3 rounded-xl hover:bg-brand-600 transition-colors"
            >
              <span>{placingOrder ? 'Placing order...' : `Pay ₹${grandTotal}`}</span>
              <ChevronRight size={18} />
            </button>
          </div>
          {orderError && <p className="mt-2 text-xs font-semibold text-red-500">{orderError}</p>}
        </div>
      </div>

      {/* Address Change Modal */}
      <Modal open={addressModalOpen} onClose={() => setAddressModalOpen(false)} title="Select Address">
        <div className="space-y-3">
          <button
            onClick={handleUseCurrentLocation}
            disabled={locating}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
              selectedAddress.id === 'current-location'
                ? 'border-brand-500 bg-brand-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <LocateFixed size={16} className="text-brand-500" />
              <span className="font-bold text-gray-900 text-sm">
                {locating ? 'Getting location...' : 'Use current location'}
              </span>
              {selectedAddress.id === 'current-location' && <Check size={16} className="text-brand-500" />}
            </div>
            <p className="text-sm text-gray-600">Use this device location</p>
            {locationError && <p className="text-xs font-semibold text-red-500 mt-1">{locationError}</p>}
          </button>
          {ADDRESSES.map((addr) => (
            <button
              key={addr.id}
              onClick={() => {
                setSelectedAddress(addr);
                setAddressModalOpen(false);
              }}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                selectedAddress.id === addr.id
                  ? 'border-brand-500 bg-brand-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-gray-900 text-sm">{addr.type}</span>
                {selectedAddress.id === addr.id && <Check size={16} className="text-brand-500" />}
              </div>
              <p className="text-sm text-gray-600">{addr.address}</p>
              <p className="text-xs text-gray-500 mt-0.5">{addr.city}, {addr.state} - {addr.pincode}</p>
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}

function BillRow({ label, value, bold, highlight }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm ${bold ? 'font-extrabold text-gray-900' : 'text-gray-600'}`}>
        {label}
      </span>
      <span className={`text-sm ${bold ? 'font-extrabold text-gray-900' : highlight ? 'font-bold text-green-600' : 'font-semibold text-gray-700'}`}>
        {value}
      </span>
    </div>
  );
}
