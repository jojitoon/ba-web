'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Admin password - in production, this should be stored securely
  const ADMIN_PASSWORD = 'builtancestry2024';

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const authStatus = localStorage.getItem('admin_authenticated');
      const loginTime = localStorage.getItem('admin_login_time');

      if (authStatus === 'true' && loginTime) {
        const loginTimestamp = parseInt(loginTime);
        const now = Date.now();
        const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

        // Check if login is still valid (within 24 hours)
        if (now - loginTimestamp < twentyFourHours) {
          setIsAuthenticated(true);
        } else {
          // Session expired
          localStorage.removeItem('admin_authenticated');
          localStorage.removeItem('admin_login_time');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    // Redirect to login if not authenticated and trying to access admin routes
    if (
      !isLoading &&
      !isAuthenticated &&
      pathname?.startsWith('/admin') &&
      pathname !== '/admin/login'
    ) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  const login = async (password: string): Promise<boolean> => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('admin_authenticated', 'true');
      localStorage.setItem('admin_login_time', Date.now().toString());
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_login_time');
    setIsAuthenticated(false);
    router.push('/admin/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
