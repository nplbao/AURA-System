import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type User, type AuthState, type UserRole } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });

  // Load user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        setAuthState({
          user,
          token,
          isAuthenticated: true,
        });
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email: string, _password: string) => {
    // TODO: Replace with actual API call
    const mockUser: User = {
      id: '1',
      email,
      name: 'Test User',
      role: 'user',
    };
    
    setAuthState({
      user: mockUser,
      token: 'mock-token',
      isAuthenticated: true,
    });
    
    localStorage.setItem('token', 'mock-token');
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const register = async (email: string, _password: string, name: string, role: UserRole) => {
    // password parameter kept for API compatibility
    // TODO: Replace with actual API call
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role,
    };
    
    setAuthState({
      user: mockUser,
      token: 'mock-token',
      isAuthenticated: true,
    });
    
    localStorage.setItem('token', 'mock-token');
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const loginWithGoogle = async () => {
    // TODO: Implement Google OAuth
    const mockUser: User = {
      id: '1',
      email: 'user@gmail.com',
      name: 'Google User',
      role: 'user',
    };
    
    setAuthState({
      user: mockUser,
      token: 'mock-token',
      isAuthenticated: true,
    });
    
    localStorage.setItem('token', 'mock-token');
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
