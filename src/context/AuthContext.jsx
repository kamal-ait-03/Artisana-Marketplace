/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading] = useState(false);

  const login = async (credentials) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let loggedInUser;
        if (credentials.email.includes('artisan')) {
          loggedInUser = { name: 'Hassan Safi', email: credentials.email, role: 'artisan', shopName: 'Artisan Store' };
        } else {
          loggedInUser = { name: 'Client', email: credentials.email, role: 'client' };
        }
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        setUser(loggedInUser);
        resolve(loggedInUser);
      }, 500);
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  const register = async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { id: 'u' + Date.now(), ...data };
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
        resolve(newUser);
      }, 500);
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
