import './Header.scss';
import logo from '../../assets/logo/brown.svg';

function Header() {
  return (
    <nav className="nav">
      <div className="nav__logo-container">
        <img src={logo} alt="Logo" cn />
      </div>
      <div className="nav__navbar"></div>
    </nav>
  );
}

export default Header;
