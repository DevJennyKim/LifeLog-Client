import './LoginRegister.scss';
import LoginRegisterForm from '../../components/LoginRegisterForm/LoginRegisterForm';
import { useLocation, useNavigate } from 'react-router-dom';

function LoginRegister() {
  const location = useLocation();
  const navigate = useNavigate();

  const isLogin = location.pathname === '/login';

  return (
    <main>
      <section className={isLogin ? 'login' : 'register'}>
        <div
          className={`${isLogin ? 'login' : 'register'}__logo-container`}
        ></div>
        <div
          className={isLogin ? ' login__background' : 'register__background'}
        >
          <h1>{isLogin ? 'Login' : 'Register'}</h1>
          <div>
            <LoginRegisterForm
              action={isLogin ? 'login' : 'register'}
              onSwitch={() => navigate(isLogin ? '/register' : '/login')}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default LoginRegister;
