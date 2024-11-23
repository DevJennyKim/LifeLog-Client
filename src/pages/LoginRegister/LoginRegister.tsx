import './LoginRegister.scss';
import LoginRegisterForm from '../../components/LoginRegisterForm/LoginRegisterForm';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Logo from '../../assets/logo/font-white.svg';

function LoginRegister() {
  const location = useLocation();
  const navigate = useNavigate();

  const isLogin = location.pathname === '/login';

  return (
    <main className="login-register__main">
      <section
        className={`login-register ${
          isLogin ? 'login__background' : 'register__background'
        }`}
      >
        <div className="login-register__logo-container">
          <img src={Logo} alt="logo" />
        </div>
        <div className="login-register__form-container">
          <h1 className="login-register__form-title">
            {isLogin ? 'Login' : 'Register'}
          </h1>

          <LoginRegisterForm
            action={isLogin ? 'login' : 'register'}
            onSwitch={() => navigate(isLogin ? '/register' : '/login')}
          />

          {isLogin ? (
            <>
              <p>Do you already have an account?</p>{' '}
              <Link to="/login">Login here</Link>
            </>
          ) : (
            <>
              <p>Don't have an account?</p>
              <Link to="/register">Register here</Link>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default LoginRegister;
