import './Header.scss';
import logo from '../../assets/logo/brown.svg';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="nav">
      <div className="nav__logo-container">
        <Link to="/">
          <img src={logo} alt="Logo" cn />
        </Link>
      </div>
      <div className="nav__menu">
        <Link to="/" className="nav__links">
          Main
        </Link>
        <div className="nav__links nav__category">
          Category
          <div className="nav__dropdown">
            <Link to="/category1">Category 1</Link>
            <Link to="/category2">Category 2</Link>
            <Link to="/category3">Category 3</Link>
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
