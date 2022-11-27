import { Fragment } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from '~/components/button';
import { SearchBar } from '~/components/search';
import { useAuth } from '~/contexts/authContext';
import { useClickOutSide } from '~/hooks';
import UserDropDown from './UserDropDown';

const tabs = [
  {
    name: 'Home',
    path: '/home',
  },
  {
    name: 'Blog',
    path: '/blog',
  },
  {
    name: 'Contact',
    path: '/contact',
  },
];
const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 86px;
  padding: 18px 0;

  .header-left {
    display: inline-flex;
    align-items: center;
    gap: 16px;
    height: 100%;

    &__logo {
      display: block;
      height: 100%;
      object-fit: contain;
      object-position: center center;
      border-radius: 50%;
    }
    &__tabs {
      display: inline-flex;
      align-items: center;
      font-weight: 500;
      gap: 24px;
    }
    &__tab {
      color: ${props => props.theme.color.black};
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    gap: 12px;
    height: 90%;

    &__user-wrapper {
      position: relative;
    }

    &__user {
      display: block;
      height: 45px;
      width: 45px;
      border-radius: 50%;
      border: solid 1px ${props => props.theme.color.brown};
      overflow: hidden;
      cursor: pointer;

      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
      }
    }
  }
`;

const Header = () => {
  const navigateTo = useNavigate();
  const { userInfo } = useAuth();
  const { show, setShow, nodeRef } = useClickOutSide();
  console.log('show', show);

  return (
    <HeaderStyled>
      <div className="header-left">
        <img
          className="header-left__logo"
          src="/imgs/dog-paw-logo.png"
          alt="dogtor-logo"
        />
        <div className="header-left__tabs">
          {tabs.map((tab, index) => (
            <NavLink
              key={`header-${index}-${tab.name}`}
              to={tab.path}
              className="header-left__tab"
            >
              {tab.name}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="header-right">
        <SearchBar placeholder="Search posts..." />
        {userInfo.email ? (
          <div ref={nodeRef} className="header-right__user-wrapper">
            <div className="header-right__user" onClick={() => setShow(!show)}>
              <img src="/imgs/user.jpg" alt="user" />
            </div>
            {show && <UserDropDown />}
          </div>
        ) : (
          <Button
            type="small"
            width="fit-content"
            height="100%"
            backgroundColor="#c1642f"
            onClick={() => navigateTo('/sign-in')}
          >
            Sign In
          </Button>
        )}
      </div>
    </HeaderStyled>
  );
};

export { Header };
