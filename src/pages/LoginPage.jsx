import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(formData);
      const redirectTo = location.state?.from?.pathname || '/';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || 'Could not sign in');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
        <div className="grid lg:grid-cols-2">
          <div className="bg-gradient-to-br from-brand-500 via-brand-600 to-orange-500 p-8 sm:p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-semibold backdrop-blur">
                <Lock size={14} />
                Secure sign-in
              </div>
              <h1 className="mt-6 text-3xl font-extrabold sm:text-4xl">
                Welcome back to Chutney&amp;Tadka
              </h1>
              <p className="mt-4 max-w-md text-sm text-white/90 sm:text-base">
                Sign in to place orders, track deliveries, and save your favorite restaurants.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-sm font-semibold">Why users love Chutney&amp;Tadka</p>
              <ul className="mt-3 space-y-2 text-sm text-white/85">
                <li>• Fast checkout and order tracking</li>
                <li>• Personalized food recommendations</li>
                <li>• Exclusive offers for members</li>
              </ul>
            </div>
          </div>

          <div className="p-8 sm:p-10">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-500">Login</p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900">Sign in to your account</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700" htmlFor="email">
                  Email address
                </label>
                <div className="relative">
                  <Mail size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-brand-400 focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <Lock size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-brand-400 focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500" />
                  Remember me
                </label>
                <a href="#" className="font-semibold text-brand-500 hover:text-brand-600">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
              >
                {submitting ? 'Signing in...' : 'Continue'}
                <ArrowRight size={16} />
              </button>
              {error && <p className="text-sm font-semibold text-red-500">{error}</p>}
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              New to Chutney&amp;Tadka?{' '}
              <Link to="/signup" className="font-semibold text-brand-500 hover:text-brand-600">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
