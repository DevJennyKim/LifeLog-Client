// import Swal from 'sweetalert2';
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

  // const extendSession = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${baseUrl}/api/auth/extend-session`,
  //       {},
  //       { withCredentials: true }
  //     );
  //     const newExpiryTime = new Date().getTime() + 2 * 60 * 60 * 1000; // 2 hours
  //     localStorage.setItem(
  //       'user',
  //       JSON.stringify({ user: currentUser, expiryTime: newExpiryTime })
  //     );
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Session Extended!',
  //       text: 'Your session has been extended for another 2 hours.',
  //     });
  //   } catch (error) {
  //     console.error('Error extending session:', error);
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Session Extension Failed',
  //       text: 'Could not extend the session. Please log in again.',
  //     });
  //     logout();
  //   }
  // };

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
    setIsAuthenticated(!!token && !!currentUser);
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

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider, useAuth };
