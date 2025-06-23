import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, isAdmin?: boolean) => Promise<boolean>;
  signup: (username: string, email: string, password: string, isAdmin?: boolean) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string, isAdmin: boolean = false): Promise<boolean> => {
    const storageKey = isAdmin ? 'admins' : 'users';
    const users = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const userObj = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        isAdmin
      };
      setUser(userObj);
      localStorage.setItem('currentUser', JSON.stringify(userObj));
      return true;
    }
    return false;
  };

  const signup = async (username: string, email: string, password: string, isAdmin: boolean = false): Promise<boolean> => {
    const storageKey = isAdmin ? 'admins' : 'users';
    const users = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    // Check if user already exists
    const existingUser = users.find((u: any) => u.email === email);
    if (existingUser) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password,
      isAdmin
    };

    users.push(newUser);
    localStorage.setItem(storageKey, JSON.stringify(users));

    const userObj = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      isAdmin
    };
    setUser(userObj);
    localStorage.setItem('currentUser', JSON.stringify(userObj));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};