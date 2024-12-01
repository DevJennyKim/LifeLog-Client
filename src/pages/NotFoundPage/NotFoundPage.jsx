import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

function NotFoundPage() {
  return (
    <div className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__message">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className="not-found__home-link">
        Go Back to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
