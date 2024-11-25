import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import {
//   AuthContext,
//   AuthContextProvider,
// } from '../../context/AuthContext.jsx';

function LoginRegisterForm({ action }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      action === 'register' &&
      formData.password !== formData.confirmPassword
    ) {
      setError('Passwords do not match');
      return;
    }
    try {
      const url = action === 'login' ? '/api/auth/login' : '/api/auth/register';
      const payload =
        action === 'login'
          ? { email: formData.email, password: formData.password }
          : {
              username: formData.username,
              email: formData.email,
              password: formData.password,
            };
      const response = await axios.post(`${baseUrl}${url}`, payload, {
        withCredentials: true,
      });
      if (action === 'login') {
        document.cookie = `access_token=${response.data.token}; path=/; max-age=7200;`;
        navigate('/');
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred, please try again.');
    }
  };
  return (
    <form className="login-register__form" onSubmit={handleSubmit}>
      <div className="login-register__input-container">
        <input
          type="text"
          name="email"
          className="login-register__input"
          placeholder="ID"
          onChange={handleChange}
        />
        {action === 'register' ? (
          <input
            type="text"
            name="username"
            className="login-register__input"
            placeholder="Name"
            onChange={handleChange}
          />
        ) : null}
        <input
          type="password"
          name="password"
          className="login-register__input"
          placeholder="Password"
          onChange={handleChange}
        />
        {action === 'register' ? (
          <input
            type="password"
            name="password"
            className="login-register__input"
            placeholder="Confirm password"
            onChange={handleChange}
          />
        ) : null}
      </div>
      <p className="login-register__error">enter corrent password</p>
      <div className="login-register__btn-container">
        <button
          type="button"
          className="login-register__btn login-register__btn-cancel"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="login-register__btn login-register__btn-submit"
        >
          {action === 'register' ? 'Register' : 'Login'}
        </button>
      </div>
    </form>
  );
}

export default LoginRegisterForm;
