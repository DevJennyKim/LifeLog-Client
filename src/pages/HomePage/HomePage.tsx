import Logo from '../../assets/logo/white.svg';
import MainImg1 from '../../assets/images/1.png';
import MainImg2 from '../../assets/images/2.png';
import MainImg3 from '../../assets/images/3.png';
import './HomePage.scss';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

function HomePage() {
  return (
    <>
      <header className="home-header">
        <div className="home-header__logo">
          <Link to="/">
            <img src={Logo} alt="logo" className="home-header__logo-img" />
          </Link>
        </div>
        <div className="home-header__login">
          <Link to="/" className="home-header__login-link">
            Login
          </Link>
        </div>
      </header>
      <main className="main">
        <section className="hero">
          <div className="hero__img-container">
            <img
              src={MainImg1}
              alt="MainImg1"
              className="hero__img hero__img1"
            />
            <img
              src={MainImg2}
              alt="MainImg2"
              className="hero__img hero__img2"
            />
            <img
              src={MainImg3}
              alt="MainImg3"
              className="hero__img hero__img3"
            />
          </div>
          <div className="hero__welcome">
            <div className="hero__welcome-wrapper">
              <div className="hero__title-wrapper">
                <div className="hero__logo-circle hero__logo-circle-left"></div>
                <h1 className="hero__welcome-title">Welcome to LIFELog</h1>

                <div className="hero__logo-circle hero__logo-circle-right"></div>
              </div>
              <div className="hero__copy">
                <p className="hero__copy-1">
                  A place to share ideas and find inspiration
                </p>
                <p className="hero__copy-2">
                  Are you ready to share your thoughts and stories?
                  <br /> Start your journey with LifeLog today.
                </p>
                <p className="hero__copy-3">
                  Click the button below to begin your blogging adventure right
                  now
                </p>
              </div>
              <div className="hero__links">
                <Link to="/login" className="hero__login-btn">
                  Login
                </Link>
                <p className="hero__q-register">Don't have an account?</p>
                <Link to="/register" className="hero__register">
                  Register here
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default HomePage;
