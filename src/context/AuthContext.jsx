import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);
const useAuth = () => useContext(AuthContext);

const getCookie = (name) => {
  const cookieArr = document.cookie.split('; ');
  for (const cookie of cookieArr) {
    const [key, value] = cookie.split('=');
    if (key === name) {
      return value;
    }
  }
  return null;
};

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const login = async (inputs) => {
    const url = '/api/auth/login';
    const response = await axios.post(`${baseUrl}${url}`, inputs, {
      withCredentials: true,
    });

    const user = response.data.user;
    console.log(response.data);
    setCurrentUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    document.cookie = `access_token=${response.data.token}; path=/; max-age=7200;`;
  };
  const logout = async () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    document.cookie = 'access_token=; path=/; max-age=0;';
    setIsAuthenticated(false);
  };
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('user');
    }
  }, [currentUser]);

  useEffect(() => {
    const token = getCookie('access_token');
    setIsAuthenticated(!!token);
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider, useAuth };
