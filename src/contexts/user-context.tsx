"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";

interface User {
  email: string;
  name?: string;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name?: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const loginMutation = useMutation(api.auth.login);
  const signupMutation = useMutation(api.auth.signup);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const userEmail = localStorage.getItem("user_email");
      const userName = localStorage.getItem("user_name");
      const loginTime = localStorage.getItem("user_login_time");

      if (userEmail && loginTime) {
        const loginTimestamp = parseInt(loginTime);
        const now = Date.now();
        const sevenDays = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

        // Check if login is still valid (within 7 days)
        if (now - loginTimestamp < sevenDays) {
          setUser({
            email: userEmail,
            name: userName || undefined,
          });
        } else {
          // Session expired
          localStorage.removeItem("user_email");
          localStorage.removeItem("user_name");
          localStorage.removeItem("user_login_time");
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await loginMutation({ email, password });
      if (result.success) {
        localStorage.setItem("user_email", result.user.email);
        if (result.user.name) {
          localStorage.setItem("user_name", result.user.name);
        }
        localStorage.setItem("user_login_time", Date.now().toString());
        setUser(result.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const signup = async (
    email: string,
    password: string,
    name?: string
  ): Promise<boolean> => {
    try {
      const result = await signupMutation({ email, password, name });
      if (result.success) {
        // Auto-login after signup
        return await login(email, password);
      }
      return false;
    } catch (error: any) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_login_time");
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        isAuthenticated: user !== null,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

