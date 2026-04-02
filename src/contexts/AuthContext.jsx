import { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const storedUser = localStorage.getItem('stockvel_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  const login = (email, password, role) => {
    const userData = { email, role, id: Date.now() };
    setUser(userData);
    localStorage.setItem('stockvel_user', JSON.stringify(userData));
    return userData;
  };
  const register = (name, email, password, role = 'user') => {
    const userData = { name, email, role, id: Date.now() };
    setUser(userData);
    localStorage.setItem('stockvel_user', JSON.stringify(userData));
    return userData;
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('stockvel_user');
  };
  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
