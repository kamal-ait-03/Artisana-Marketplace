import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('artisana_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [role, setRole] = useState(() => {
    const savedRole = localStorage.getItem('artisana_role');
    return savedRole ? savedRole : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('artisana_user', JSON.stringify(user));
      localStorage.setItem('artisana_role', role);
    } else {
      localStorage.removeItem('artisana_user');
      localStorage.removeItem('artisana_role');
    }
  }, [user, role]);

  const login = async (credentials) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock authentication
        if (credentials.email.includes('artisan')) {
          const artisanUser = { id: 'au1', name: 'Hassan Safi', email: credentials.email };
          setUser(artisanUser);
          setRole('artisan');
          resolve(artisanUser);
        } else if (credentials.email.includes('admin')) {
          const adminUser = { id: 'ad1', name: 'Admin', email: credentials.email };
          setUser(adminUser);
          setRole('admin');
          resolve(adminUser);
        } else {
          const clientUser = { id: 'cu1', name: 'Client Cherif', email: credentials.email };
          setUser(clientUser);
          setRole('client');
          resolve(clientUser);
        }
      }, 500); // simulate network delay
    });
  };

  const logout = () => {
    setUser(null);
    setRole(null);
  };

  const register = async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { id: 'u' + Date.now(), name: data.name, email: data.email };
        setUser(newUser);
        setRole(data.role || 'client');
        resolve(newUser);
      }, 500);
    });
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
