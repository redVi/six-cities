import React from 'react';
import PropTypes from 'prop-types';
import {BASE_URL} from '@/api';

const MainHeader = (props) => {
  const {isAuthorizationRequired, user, handleSignInClick} = props;
  const userNameClass = isAuthorizationRequired ? `login` : `user-name user__name`;

  const onSignInClickHandler = (e) => {
    e.preventDefault();

    if (!Object.keys(user).length) {
      handleSignInClick();
    }
  };

  const userBgImage = isAuthorizationRequired ? {} : {backgroundImage: `url(${BASE_URL}${user.avatarUrl})`};

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link header__logo-link--active">
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81" height="41" />
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <a
                  className="header__nav-link header__nav-link--profile"
                  href="#"
                  onClick={onSignInClickHandler}>
                  <div
                    style={user.avatarUrl ? userBgImage : {}}
                    className="header__avatar-wrapper user__avatar-wrapper" />
                  <span className={`header__${userNameClass}`}>
                    {user.email ? user.email : `Sign in`}
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

MainHeader.propTypes = {
  isAuthorizationRequired: PropTypes.bool.isRequired,
  handleSignInClick: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    name: PropTypes.name,
    avatarUrl: PropTypes.string,
    isPro: PropTypes.bool
  })
};

export default MainHeader;
