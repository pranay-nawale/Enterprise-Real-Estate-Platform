import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('cms_token'));
  const [adminUser, setAdminUser] = useState(null);
  const navigate = useNavigate();

  // Decode token and check expiry
  const isTokenValid = useCallback((t) => {
    if (!t) return false;
    try {
      const decoded = jwtDecode(t);
      // exp is in seconds, Date.now() is in ms
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }, []);

  // On mount: validate existing token
  useEffect(() => {
    if (token && isTokenValid(token)) {
      try {
        const decoded = jwtDecode(token);
        setAdminUser(decoded.username);
      } catch {
        logout();
      }
    } else if (token) {
      // Token exists but expired — auto logout
      logout();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const login = useCallback((newToken) => {
    localStorage.setItem('cms_token', newToken);
    setToken(newToken);
    try {
      const decoded = jwtDecode(newToken);
      setAdminUser(decoded.username);
    } catch {
      setAdminUser(null);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('cms_token');
    setToken(null);
    setAdminUser(null);
    navigate('/admin');
  }, [navigate]);

  const isAuthenticated = isTokenValid(token);

  return (
    <AuthContext.Provider value={{ token, adminUser, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
