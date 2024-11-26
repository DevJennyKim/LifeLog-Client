import './Header.scss';
import logo from '../../assets/logo/orange.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
            <Link to="/category1" className="nav__dropdown-item">
              Category 1
            </Link>
            <Link to="/category2" className="nav__dropdown-item">
              Category 2
            </Link>
            <Link to="/category3" className="nav__dropdown-item">
              Category 3
            </Link>
          </div>
        </div>
        <Link to="/guestbook" className="nav__links">
          Guest Book
        </Link>
        <dev className="nav__users">
          <Link to="/" className="nav__link-username">
            name
          </Link>
          <button type="button" className="nav__links nav__logout">
            Logout
          </button>
          <Link to="/write" className="nav__writing">
            Posting
          </Link>
        </dev>
      </div>
    </nav>
  );
}

export default Header;
