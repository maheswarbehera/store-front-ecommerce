import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('accessToken'));

  const login = async (email, password) => {
    try {
      const res = await fetch('https://your-api.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const result = await res.json();

      if (result.status && result.data.accessToken) {
        const userInfo = result.data.user[0];
        setUser(userInfo);
        setToken(result.data.accessToken);

        // Persist login
        localStorage.setItem('user', JSON.stringify(userInfo));
        localStorage.setItem('accessToken', result.data.accessToken);

        return true;
      } else {
        throw new Error(result.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
