import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Mail, UserRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
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
      await signup({
        email: formData.email,
        name: formData.fullName,
        password: formData.password,
      });
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Could not create account');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
        <div className="grid lg:grid-cols-2">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-brand-600 p-8 sm:p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-semibold backdrop-blur">
                <UserRound size={14} />
                Join today
              </div>
              <h1 className="mt-6 text-3xl font-extrabold sm:text-4xl">
                Create your Chutney&amp;Tadka account
              </h1>
              <p className="mt-4 max-w-md text-sm text-white/90 sm:text-base">
                Sign up for a faster checkout experience, exclusive deals, and live order updates.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-sm font-semibold">What you get</p>
              <ul className="mt-3 space-y-2 text-sm text-white/85">
                <li>• Saved delivery addresses</li>
                <li>• Easy reordering from past meals</li>
                <li>• Priority access to promotions</li>
              </ul>
            </div>
          </div>

          <div className="p-8 sm:p-10">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-500">Signup</p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900">Create a new account</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700" htmlFor="fullName">
                  Full name
                </label>
                <div className="relative">
                  <UserRound size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-brand-400 focus:bg-white"
                    required
                  />
                </div>
              </div>

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
                    placeholder="Create a password"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-brand-400 focus:bg-white"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
              >
                {submitting ? 'Creating account...' : 'Create account'}
                <ArrowRight size={16} />
              </button>
              {error && <p className="text-sm font-semibold text-red-500">{error}</p>}
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-brand-500 hover:text-brand-600">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
