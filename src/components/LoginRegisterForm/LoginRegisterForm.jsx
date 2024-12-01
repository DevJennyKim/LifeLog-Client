import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { validateEmail, validatePassword } from '../../utils/validators';
import Swal from 'sweetalert2';

function LoginRegisterForm({ action }) {
  const navigate = useNavigate();
  const { login, register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    confirmPassword: '',
  });

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
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords do not match',
      });
      return;
    }
    if (!validateEmail(formData.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid email format',
        text: 'Please enter a valid email address.',
      });
      return;
    }
    // if (!validatePassword(formData.password)) {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Weak password',
    //     text: 'Password must be at least 6 characters.',
    //   });
    //   return;
    // }
    try {
      const payload =
        action === 'login'
          ? { email: formData.email, password: formData.password }
          : {
              username: formData.username,
              email: formData.email,
              password: formData.password,
            };
      if (action === 'login') {
        await login(payload);
        navigate('/');
      } else {
        await register(payload);
        Swal.fire({
          icon: 'success',
          title: '🎉Congratulation🎉',
          text: 'You have been registered!!',
          position: 'center-center',
          timerProgressBar: true,
          timer: 1500,
          showConfirmButton: false,
          didClose: () => {
            navigate('/login');
          },
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred, please try again.',
      });
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
            name="confirmPassword"
            className="login-register__input"
            placeholder="Confirm password"
            onChange={handleChange}
          />
        ) : null}
      </div>
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
