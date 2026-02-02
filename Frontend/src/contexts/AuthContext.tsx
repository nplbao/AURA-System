import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type User, type AuthState, type UserRole } from '../types';
import { api } from '../api/client';

interface AuthResponse {
  user: User;
  token: string;
}

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

  // Load user from localStorage on mount; optionally validate with /auth/me
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as User;
        setAuthState({ user, token, isAuthenticated: true });
        // Validate token and refresh user from API
        api<User>('/auth/me')
          .then((fresh) => {
            setAuthState({ user: fresh, token, isAuthenticated: true });
            localStorage.setItem('user', JSON.stringify(fresh));
          })
          .catch(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setAuthState({ user: null, token: null, isAuthenticated: false });
          });
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { user, token } = await api<AuthResponse>('/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    setAuthState({ user, token, isAuthenticated: true });
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const register = async (email: string, password: string, name: string, role: UserRole) => {
    const { user, token } = await api<AuthResponse>('/auth/register', {
      method: 'POST',
      body: { email, password, name, role },
    });
    setAuthState({ user, token, isAuthenticated: true });
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const loginWithGoogle = async () => {
    // TODO: Implement Google OAuth with backend
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
