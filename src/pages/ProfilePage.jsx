import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut, Mail, UserRound, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center gap-3">
        <Link to="/" className="rounded-full p-2 text-gray-700 transition hover:bg-gray-100">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-500">Account</p>
          <h1 className="text-2xl font-extrabold text-gray-900">My profile</h1>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-brand-500 to-orange-500 p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <UserRound size={28} />
            </div>
            <div>
              <h2 className="text-xl font-extrabold">{user?.name || 'Guest User'}</h2>
              <p className="text-sm text-white/90">Welcome back to Chutney&amp;Tadka</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-6">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-brand-500" />
              <div>
                <p className="text-sm font-semibold text-gray-700">Email</p>
                <p className="text-sm text-gray-600">{user?.email || 'No email found'}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center gap-3">
              <ShoppingBag size={18} className="text-brand-500" />
              <div>
                <p className="text-sm font-semibold text-gray-700">Orders</p>
                <p className="text-sm text-gray-600">Track your current and past deliveries here.</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
