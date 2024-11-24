import { useNavigate } from 'react-router-dom';

type LoginRegisterFormProps = {
  action: 'login' | 'register';
  onSwitch: () => void;
};

function LoginRegisterForm({ action }: LoginRegisterFormProps) {
  const navigate = useNavigate();
  return (
    <form className="login-register__form">
      <div className="login-register__input-container">
        <input
          type="text"
          name="id"
          className="login-register__input"
          placeholder="ID"
        />
        {action === 'register' ? (
          <input
            type="text"
            name="name"
            className="login-register__input"
            placeholder="Name"
          />
        ) : null}
        <input
          type="text"
          name="id"
          className="login-register__input"
          placeholder="Password"
        />
        {action === 'register' ? (
          <input
            type="text"
            name="name"
            className="login-register__input"
            placeholder="Confirm password"
          />
        ) : null}
      </div>
      <p className="login-register__error"></p>
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
