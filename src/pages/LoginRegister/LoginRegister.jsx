import './LoginRegister.scss';
import LoginRegisterForm from '../../components/LoginRegisterForm/LoginRegisterForm';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../../assets/logo/font-white.svg';

function LoginRegister({ isLogin }) {
  const navigate = useNavigate();

  return (
    <main className="login-register__main">
      <section
        className={`login-register ${
          isLogin ? 'login__background' : 'register__background'
        }`}
      >
        <div className="login-register__logo-container">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="login-register__form-container">
          <h1 className="login-register__form-title">
            {isLogin ? 'Login' : 'Register'}
          </h1>

          <LoginRegisterForm
            key={isLogin ? 'login' : 'register'}
            action={isLogin ? 'login' : 'register'}
            onSwitch={() => navigate(isLogin ? '/register' : '/login')}
          />

          {!isLogin ? (
            <div className="login-register__question-container">
              <p className="login-register__question">
                Do you already have an account?
              </p>
              <Link to="/login" className="login-register__link">
                Login here
              </Link>
            </div>
          ) : (
            <div className="login-register__question-container">
              <p className="login-register__question">Don't have an account?</p>
              <Link to="/register" className="login-register__link">
                Register here
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default LoginRegister;
