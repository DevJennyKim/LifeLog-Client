import './LoginRegisterForm.scss';

type LoginRegisterFormProps = {
  action: 'login' | 'register';
  onSwitch: () => void;
};

function LoginRegisterForm({ action }: LoginRegisterFormProps) {
  return (
    <form className={`${action === 'login' ? 'login' : 'register'}__form`}>
      <div
        className={`${
          action === 'login' ? 'login' : 'register'
        }__input-container`}
      >
        <input
          type="text"
          name="id"
          className={`${action === 'login' ? 'login' : 'register'}__input`}
          placeholder="ID"
        />
        {action === 'register' ? (
          <input
            type="text"
            name="name"
            className="register__input"
            placeholder="Name"
          />
        ) : null}
        <input
          type="text"
          name="id"
          className={`${action === 'login' ? 'login' : 'register'}__input`}
          placeholder="Password"
        />
        {action === 'register' ? (
          <input
            type="text"
            name="name"
            className="register__input"
            placeholder="Confirm password"
          />
        ) : null}
      </div>
    </form>
  );
}

export default LoginRegisterForm;
