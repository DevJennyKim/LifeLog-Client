import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import './UserProfilePage.scss';

function UserProfilePage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <section className="profile">
      <div className="profile__container">
        <div className="profile__title-container">
          <h1 className="profile__title">User Profile</h1>
        </div>
        <form className="profile__form" onSubmit={handleSubmit}>
          <div className="profile__form-group">
            <label htmlFor="email" className="profile__label">
              ID (Email)
            </label>
            <p id="email" className="profile__text">
              {currentUser?.email || 'No email available'}
            </p>
          </div>
          <div className="profile__form-group">
            <label htmlFor="username" className="profile__label">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="profile__input"
              defaultValue={currentUser?.name || ''}
            />
          </div>
          <div className="profile__form-group">
            <label htmlFor="password" className="profile__label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="profile__input"
              placeholder="Enter new password"
            />
          </div>
          <div className="profile__form-group">
            <label htmlFor="confirm-password" className="profile__label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="profile__input"
              placeholder="Confirm new password"
            />
          </div>
          <div className="profile__button-container">
            <button
              type="submit"
              className="profile__button profile__button--save"
            >
              Save
            </button>
            <button
              type="button"
              className="profile__button profile__button--cancel"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default UserProfilePage;
