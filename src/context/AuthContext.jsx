import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const u = localStorage.getItem('user');
    if (u) setUser(JSON.parse(u));
    setLoading(false);
  }, []);

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
