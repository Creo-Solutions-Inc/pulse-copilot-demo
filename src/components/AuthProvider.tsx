'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from './Sidebar';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is authenticated on mount
    const authStatus = localStorage.getItem('pulse-copilot-auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Redirect to login if not authenticated and not on login page
    if (!isLoading && !isAuthenticated && pathname !== '/') {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  const login = async (_username: string, _password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, validate credentials here
    localStorage.setItem('pulse-copilot-auth', 'true');
    setIsAuthenticated(true);
    router.push('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('pulse-copilot-auth');
    setIsAuthenticated(false);
    router.push('/');
  };

  const contextValue: AuthContextType = {
    isAuthenticated,
    login,
    logout
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-[#e1a730] rounded-full flex items-center justify-center mb-4">
            <span className="text-black font-bold text-2xl">PC</span>
          </div>
          <div className="text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {/* Show login page if not authenticated */}
      {!isAuthenticated ? (
        <>
          {children}
        </>
      ) : (
        /* Show authenticated layout with sidebar */
        <div className="flex">
          <Sidebar onLogout={logout} />
          <main className="flex-1 ml-64 min-h-screen bg-[#f8f9fa]">
            {children}
          </main>
        </div>
      )}
    </AuthContext.Provider>
  );
} 