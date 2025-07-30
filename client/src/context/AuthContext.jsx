// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';

// ✅ Exporting AuthContext as named export
export const AuthContext = createContext({
  currentUser: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) setCurrentUser(user);
  }, []);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
