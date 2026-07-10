import { useState, useRef, useEffect } from 'react';
import { MapPin, Search, ChevronDown, User, ShoppingBag, LocateFixed } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CITIES } from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { reverseGeocode } from '../../lib/location';

export function TopBar() {
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Lucknow');
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState('');
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const searchRef = useRef(null);
  const cityRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchExpanded(false);
      }
      if (cityRef.current && !cityRef.current.contains(e.target)) {
        setCityDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    navigate(query ? `/?q=${encodeURIComponent(query)}` : '/');
    setSearchExpanded(false);
  };

  const handleSearchChange = (e) => {
    const nextQuery = e.target.value;
    setSearchQuery(nextQuery);
    navigate(nextQuery.trim() ? `/?q=${encodeURIComponent(nextQuery.trim())}` : '/');
  };

  const handleUseCurrentLocation = () => {
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationError('Location unavailable');
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const location = await reverseGeocode(coords.latitude, coords.longitude);
          setSelectedCity(location.area || location.city || 'Current location');
        } catch {
          setSelectedCity(`Current (${coords.latitude.toFixed(3)}, ${coords.longitude.toFixed(3)})`);
        }
        setLocating(false);
        setCityDropdownOpen(false);
      },
      () => {
        setLocationError('Permission denied');
        setLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo + Location */}
          <div className="flex items-center gap-4 shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-brand-500 flex items-center justify-center">
                <span className="text-white font-extrabold text-lg">K</span>
              </div>
              <span className="hidden sm:block text-xl font-extrabold text-gray-900 tracking-tight">
                Chutney&amp;Tadka
              </span>
            </Link>

            {/* Location selector */}
            <div className="relative" ref={cityRef}>
              <button
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-brand-500 transition-colors py-1"
              >
                <MapPin size={16} className="text-brand-500" />
                <span className="hidden sm:inline">{selectedCity}</span>
                <ChevronDown size={14} className={`transition-transform ${cityDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {cityDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-slide-down z-50">
                  <button
                    onClick={handleUseCurrentLocation}
                    disabled={locating}
                    className="w-full text-left px-4 py-2 text-sm text-brand-500 font-bold hover:bg-brand-50 transition-colors flex items-center gap-2"
                  >
                    <LocateFixed size={14} />
                    <span>{locating ? 'Locating...' : 'Current location'}</span>
                  </button>
                  {locationError && (
                    <p className="px-4 pb-2 text-xs font-semibold text-red-500">{locationError}</p>
                  )}
                  {CITIES.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                        city === selectedCity ? 'text-brand-500 font-bold' : 'text-gray-700'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search bar */}
          <div ref={searchRef} className="flex-1 max-w-md">
            <form onSubmit={handleSearch} className="relative">
              <div className={`flex items-center bg-gray-100 rounded-lg transition-all duration-300 ${searchExpanded ? 'ring-2 ring-brand-400' : ''}`}>
                <button
                  type="submit"
                  className="ml-3 text-gray-400 hover:text-brand-500 transition-colors shrink-0"
                  aria-label="Search"
                >
                  <Search size={18} />
                </button>
                <input
                  type="text"
                  placeholder="Search for restaurants, dishes..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setSearchExpanded(true)}
                  className="w-full bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-gray-400"
                />
              </div>
            </form>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <Link
              to="/checkout"
              className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={22} className="text-gray-700" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brand-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <Link to="/profile" className="hidden sm:inline text-brand-600 hover:text-brand-700">
                  {user?.name || 'Account'}
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="ml-1 rounded-full px-2 py-1 text-xs font-bold text-brand-500 hover:bg-brand-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition hover:border-brand-400 hover:text-brand-500"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
