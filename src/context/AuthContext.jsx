import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api';

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = 'khao-pio-auth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') return null;
    try {
      const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const login = async (credentials) => {
    const { user: authenticatedUser } = await api.login(credentials);
    setUser(authenticatedUser);
    return authenticatedUser;
  };

  const signup = async (profile) => {
    const { user: newUser } = await api.signup(profile);
    setUser(newUser);
    return newUser;
  };
  const logout = () => setUser(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.id) {
          setUser(parsedUser);
        }
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      signup,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
