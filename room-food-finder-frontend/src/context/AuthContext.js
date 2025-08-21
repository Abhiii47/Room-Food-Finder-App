import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // You'll need to install this: npm install jwt-decode

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for a token in local storage when the app loads
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        // Check if the token is expired
        const currentTime = Date.now() / 1000;
        if (decodedUser.exp > currentTime) {
          setUser(decodedUser.user);
        } else {
          // Token is expired, remove it
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decodedUser = jwtDecode(token);
    setUser(decodedUser.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
