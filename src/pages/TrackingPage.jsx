import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Phone, MessageSquare, Star, ChevronDown, MapPin, Navigation, Check, Bike, Clock, Home } from 'lucide-react';
import { DELIVERY_PARTNER } from '../data/mockData';
import { api } from '../lib/api';
import { handleImageError } from '../lib/images';

const TRACKING_STEPS = [
  { id: 0, title: 'Order Accepted', description: 'Your order has been confirmed', icon: Check },
  { id: 1, title: 'Food is being prepared', description: 'The restaurant is preparing your food', icon: Clock },
  { id: 2, title: 'On the way', description: 'Your delivery partner is on the way', icon: Bike },
  { id: 3, title: 'Delivered', description: 'Enjoy your meal!', icon: Home },
];

// Mock order items for the summary
const MOCK_ORDER_ITEMS = [
  { name: 'Chicken Biryani', quantity: 2, price: 320, isVeg: false },
  { name: 'Garlic Naan', quantity: 3, price: 60, isVeg: true },
  { name: 'Choco Lava Cake', quantity: 1, price: 120, isVeg: true },
];

export function TrackingPage() {
  const { orderId } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [eta, setEta] = useState(28);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [order, setOrder] = useState(null);
  const orderItems = order?.items || MOCK_ORDER_ITEMS;
  const deliveryPartner = order?.deliveryPartner || DELIVERY_PARTNER;
  const totalPaid = order?.totals?.grandTotal || '1,020';

  useEffect(() => {
    if (!orderId) return;
    let ignore = false;

    const loadOrder = () => {
      api.getOrder(orderId)
        .then(({ order: nextOrder }) => {
          if (!ignore) {
            setOrder(nextOrder);
            setCurrentStep(nextOrder.status.currentStep);
            setEta(nextOrder.status.eta);
          }
        })
        .catch(() => {});
    };

    loadOrder();
    const interval = setInterval(loadOrder, 5000);
    return () => {
      ignore = true;
      clearInterval(interval);
    };
  }, [orderId]);

  // Simulate order progression
  useEffect(() => {
    if (orderId || currentStep >= 3) return;
    const timer = setTimeout(() => {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
      setEta((prev) => Math.max(prev - 8, 2));
    }, 6000);
    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <div className="max-w-2xl mx-auto px-0 sm:px-6">
      {/* Map Area — top 40% of screen */}
      <div className="relative w-full h-[40vh] sm:h-[40vh] bg-gradient-to-br from-green-50 via-blue-50 to-green-100 overflow-hidden">
        {/* Mock map grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Mock roads */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <path d="M 0 60 Q 100 80 200 120 T 400 200" stroke="#d1d5db" strokeWidth="8" fill="none" opacity="0.5" />
          <path d="M 50 0 L 50 400" stroke="#d1d5db" strokeWidth="6" fill="none" opacity="0.4" />
          <path d="M 0 250 L 400 250" stroke="#d1d5db" strokeWidth="6" fill="none" opacity="0.4" />
        </svg>

        {/* Route line */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <path
            d="M 50 350 Q 150 300 200 200 T 350 80"
            stroke="#16a34a"
            strokeWidth="3"
            fill="none"
            strokeDasharray="8 4"
            className="animate-pulse"
          />
        </svg>

        {/* Restaurant pin (start) */}
        <div className="absolute" style={{ left: '12%', top: '82%' }}>
          <div className="relative">
            <div className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-brand-500">
              <MapPin size={18} className="text-brand-500" />
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-brand-500 rotate-45" />
          </div>
        </div>

        {/* Destination pin (end) */}
        <div className="absolute" style={{ right: '12%', top: '15%' }}>
          <div className="relative">
            <div className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-green-600">
              <Home size={18} className="text-green-600" />
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-green-600 rotate-45" />
          </div>
        </div>

        {/* Delivery partner moving along route */}
        {currentStep >= 2 && currentStep < 3 && (
          <div
            className="absolute transition-all duration-[6000ms] ease-linear"
            style={{
              left: currentStep === 2 ? '45%' : '12%',
              top: currentStep === 2 ? '45%' : '82%',
            }}
          >
            <div className="w-9 h-9 bg-green-600 rounded-full shadow-xl flex items-center justify-center animate-bounce-soft">
              <Bike size={18} className="text-white" />
            </div>
          </div>
        )}

        {/* ETA overlay */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg px-4 py-2.5">
          <p className="text-xs text-gray-500 font-medium">Estimated arrival</p>
          <p className="text-lg font-extrabold text-gray-900">
            {currentStep === 3 ? 'Delivered!' : `${eta} min`}
          </p>
        </div>

        {/* Live badge */}
        {currentStep < 3 && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full shadow-lg px-3 py-1.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-bold text-gray-700">LIVE</span>
          </div>
        )}
      </div>

      {/* Content below map */}
      <div className="px-4 sm:px-6 py-6">
        {/* Status Tracker */}
        <div className="mb-6">
          <h2 className="text-xl font-extrabold text-gray-900 mb-4">
            {currentStep === 3 ? 'Order Delivered!' : 'Order Status'}
          </h2>
          <div className="space-y-1">
            {TRACKING_STEPS.map((step, index) => {
              const isCompleted = index < currentStep;
              const isActive = index === currentStep;
              const isPending = index > currentStep;
              const Icon = step.icon;

              return (
                <div key={step.id} className="flex items-start gap-4">
                  {/* Vertical line + dot */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-green-600 text-white'
                          : isActive
                          ? 'bg-brand-500 text-white animate-pulse ring-4 ring-brand-100'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    {index < TRACKING_STEPS.length - 1 && (
                      <div
                        className={`w-0.5 h-12 transition-colors ${
                          isCompleted ? 'bg-green-600' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>

                  {/* Text */}
                  <div className="pt-1.5 pb-2">
                    <h3
                      className={`font-bold text-sm transition-colors ${
                        isPending ? 'text-gray-400' : 'text-gray-900'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className={`text-xs mt-0.5 ${isPending ? 'text-gray-400' : 'text-gray-500'}`}>
                      {step.description}
                    </p>
                    {isActive && currentStep < 3 && (
                      <span className="inline-block mt-1 text-xs font-semibold text-brand-500">
                        In progress...
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Delivery Partner Info */}
        {currentStep >= 2 && currentStep < 3 && (
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={deliveryPartner.photo}
                  alt={deliveryPartner.name}
                  onError={handleImageError}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-green-200"
                />
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{deliveryPartner.name}</h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star size={12} className="text-green-600 fill-green-600" />
                    <span className="text-xs font-semibold text-gray-700">{deliveryPartner.rating}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{deliveryPartner.vehicleNumber}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="w-11 h-11 rounded-full bg-green-600 hover:bg-green-700 flex items-center justify-center transition-colors" aria-label="Call">
                  <Phone size={18} className="text-white" />
                </button>
                <button className="w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors" aria-label="Message">
                  <MessageSquare size={18} className="text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Order Summary — Collapsible */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <button
            onClick={() => setSummaryOpen(!summaryOpen)}
            className="w-full flex items-center justify-between p-4"
          >
            <h3 className="font-bold text-gray-900 text-sm">Order Summary</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{orderItems.length} items</span>
              <ChevronDown
                size={18}
                className={`text-gray-400 transition-transform ${summaryOpen ? 'rotate-180' : ''}`}
              />
            </div>
          </button>
          {summaryOpen && (
            <div className="px-4 pb-4 space-y-3 animate-fade-in">
              {orderItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span
                    className={`w-3 h-3 rounded-sm border-2 flex items-center justify-center shrink-0`}
                    style={{ borderColor: item.isVeg ? '#16a34a' : '#dc2626' }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: item.isVeg ? '#16a34a' : '#dc2626' }}
                    />
                  </span>
                  <span className="flex-1 text-sm text-gray-700">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-sm font-semibold text-gray-700">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
              <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                <span className="font-bold text-gray-900 text-sm">Total Paid</span>
                <span className="font-extrabold text-gray-900 text-sm">₹{totalPaid}</span>
              </div>
            </div>
          )}
        </div>

        {/* Back to home */}
        <Link
          to="/"
          className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-gray-200 font-bold text-gray-700 hover:bg-gray-50 transition-colors text-sm"
        >
          <Navigation size={16} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
