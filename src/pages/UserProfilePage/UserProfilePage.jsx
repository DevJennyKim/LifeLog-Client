import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { userInfoUpdate } from '../../api/api';
import Swal from 'sweetalert2';
import './UserProfilePage.scss';
import { useState } from 'react';

function UserProfilePage() {
  const { currentUser } = useAuth();
  const [username, setUsername] = useState(currentUser?.name || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords and confirm password do not match',
      });
      return;
    }
    const updateData = {
      userId: currentUser.id,
      username,
      password: password || undefined,
    };
    try {
      const response = await userInfoUpdate(currentUser.id, updateData);
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Your information has been updated!',
        position: 'center-center',
        timerProgressBar: true,
        timer: 1500,
        showConfirmButton: false,
        didClose: () => {
          navigate('/');
        },
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      if (error.response && error.response.status === 409) {
        Swal.fire({
          icon: 'error',
          title: 'Username already exists!',
          text: 'The username you entered is already taken. Please choose another one.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to update profile',
        });
      }
    }
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
              onChange={(e) => setUsername(e.target.value)}
              defaultValue={username}
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
              onChange={(e) => setPassword(e.target.value)}
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
              onChange={(e) => setConfirmPassword(e.target.value)}
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
