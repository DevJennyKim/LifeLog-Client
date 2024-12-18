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
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const { user, expiryTime } = JSON.parse(storedUser);
      const now = new Date().getTime();
      if (now > expiryTime) {
        localStorage.removeItem('user');
        return null;
      }
      return user;
    }
    return null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const login = async (inputs) => {
    const url = '/api/auth/login';
    const response = await axios.post(`${baseUrl}${url}`, inputs, {
      withCredentials: true,
    });
    const user = response.data.user;
    setCurrentUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    document.cookie = `access_token=${response.data.token}; path=/; max-age=7200;`;
  };

  const logout = async () => {
    try {
      await axios.post(
        `${baseUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setCurrentUser(null);
      localStorage.removeItem('user');
      document.cookie = 'access_token=; path=/; max-age=0;';
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      const expiryTime = new Date().getTime() + 2 * 60 * 60 * 1000;
      localStorage.setItem(
        'user',
        JSON.stringify({ user: currentUser, expiryTime })
      );
    } else {
      localStorage.removeItem('user');
    }
  }, [currentUser]);

  useEffect(() => {
    const token = getCookie('access_token');
    const isTokenValid = !!token && !!currentUser;
    setIsAuthenticated(isTokenValid);
  }, [currentUser]);

  const register = async (inputs) => {
    const url = '/api/auth/register';
    try {
      const { data } = await axios.post(`${baseUrl}${url}`, inputs, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const refreshUser = async (userId) => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/auth/user/${userId}`, {
        withCredentials: true,
      });

      setCurrentUser(data);
      localStorage.setItem(
        'user',
        JSON.stringify({
          user: data,
          expiryTime: new Date().getTime() + 2 * 60 * 60 * 1000,
        })
      );
    } catch (error) {
      console.error('Error during refresh user data:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        register,
        refreshUser,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider, useAuth };
