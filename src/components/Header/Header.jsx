import './Header.scss';
import logo from '../../assets/logo/brown.svg';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getCategory } from '../../api/api';

function Header() {
  const { logout, currentUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const location = useLocation();
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
    location('/');
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
        <Link to="/guestbook" className="nav__links">
          Guest Book
        </Link>
        <div className="nav__users">
          <Link to="/" className="nav__link-username">
            {currentUser.name}
          </Link>
          <button
            type="button"
            className="nav__links nav__logout"
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
