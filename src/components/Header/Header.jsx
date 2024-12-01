import './Header.scss';
import logo from '../../assets/logo/brown.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getCategory, validatePassword } from '../../api/api';
import Swal from 'sweetalert2';

function Header() {
  const { logout, currentUser, refreshUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategory();
        setCategories(data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleLogout = async () => {
    logout();
    navigate('/');
  };

  const handleProfileClick = async () => {
    try {
      const { value: password } = await Swal.fire({
        title: 'Enter your password',
        input: 'password',
        inputAttributes: {
          autocapitalize: 'off',
          placeholder: 'Password',
        },
        showCancelButton: true,
        confirmButtonText: 'Submit',
        showLoaderOnConfirm: true,
        customClass: {
          popup: 'nav__alert',
        },
        preConfirm: async (inputPassword) => {
          try {
            const response = await validatePassword(
              currentUser.id,
              inputPassword
            );
            if (!response || response.error) {
              return Swal.showValidationMessage(
                'Invalid password, please try again.'
              );
            }
            return true;
          } catch (error) {
            return Swal.showValidationMessage(`Request failed: ${error}`);
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });

      if (password) {
        navigate('/user-profile');
      }
    } catch (error) {
      console.error('Error handling profile click:', error);
    }
  };
  return (
    <nav className="nav">
      <div className="nav__logo">
        <Link to="/">
          <img src={logo} alt="Logo" className="nav__logo-img" />
        </Link>
      </div>
      <button
        className={`nav__toggle ${isMenuOpen ? 'nav__toggle--active' : ''}`}
        onClick={toggleMenu}
      >
        <span />
        <span />
        <span />
      </button>
      <div className={`nav__menu ${isMenuOpen ? 'nav__menu--open' : ''}`}>
        <Link to="/" className="nav__links">
          Main
        </Link>
        <div className="nav__links nav__category">
          Category
          <div className="nav__dropdown">
            {categories &&
              categories.map((item) => (
                <Link
                  to={`/posts/category/${item.id}`}
                  key={item.id}
                  className="nav__dropdown-item"
                >
                  {item.category_name}
                </Link>
              ))}
          </div>
        </div>
        <div className="nav__users">
          <button className="nav__links nav__btn" onClick={handleProfileClick}>
            {currentUser.name}
          </button>
          <button
            type="button"
            className="nav__links nav__btn"
            onClick={handleLogout}
          >
            Logout
          </button>
          <Link to="/add-post" className="nav__writing">
            Posting
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
