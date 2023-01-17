import { Fragment, useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useFirebase } from '~/contexts/firebaseContext';
import { useClickOutSide } from '~/hooks';
import TabGroup from './TabGroup';

const tabs = [
  {
    name: 'Latest',
    path: '/latest',
  },
  {
    name: 'Popular',
    path: '/popular',
  },
  {
    name: 'Favorite',
    path: '/favorite',
  },
];

const HeaderNavSectionStyled = styled.div`
  position: relative;
  width: 100%;
  background-color: #693626;
  padding: 10px 0;
  z-index: 665;
  ${props =>
    props.isFixed &&
    css`
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      background-color: #693626;
    `};

  .headerNavSection {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1280px;
    margin: 0 auto;
  }
  .headerNavSection__tabs-wrap {
    display: flex;
    align-items: center;
  }
  .headerNavSection__tab {
    padding: 0 16px;
    font-weight: 600;
    opacity: 0.8;
    color: ${props => props.theme.color.white};
    font-family: ${props => props.theme.font.tertiary};
    text-shadow: 0 0 1px ${props => props.theme.color.brown};
    border-right: solid 1px ${props => props.theme.color.white};

    &:first-child {
      padding: 0 16px 0 8px;
    }
    &:last-child {
      border-right: unset;
    }
    &:hover {
      opacity: 1;
    }
    &--active {
      opacity: 1;
    }
  }
  .headerNavSection-between {
    flex: 1;
  }
  .headerNavSection__menu-icon {
    width: 30px;
    height: 30px;
    color: ${props => props.theme.color.white};
    text-shadow: 0 0 1px ${props => props.theme.color.brown};
    cursor: pointer;
  }
  @keyframes increaseHeight {
    to {
      max-height: 300px;
    }
  }
  .headerNavSection-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    max-height: 0;
    background-color: #ecdfd4;
    border-bottom: solid 1px #8d351a10;
    box-shadow: 0px 1px 2px 0px #8d351a30, 0px 2px 6px 2px #8d351a30;
    animation: increaseHeight 0.7s ease forwards;
    overflow: hidden;
  }

  .headerNavSection-dropdown-wrap {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    width: 1280px;
    margin: 0 auto;
    padding: 20px 8px;
  }
`;
const BehindFixed = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${props => props.theme.color.white};
`;

const HeaderNavSection = () => {
  // Sau khi scroll được 86 thì HeaderMainSection bị mất, phải tạo 1 lớp lót phía sau nav để giao diện không bị tụt lên
  const [isFixed, setIsFixed] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 86) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { categories } = useFirebase();
  const { nodeRef, setShow, show } = useClickOutSide();

  return (
    <Fragment>
      <HeaderNavSectionStyled ref={nodeRef} isFixed={isFixed}>
        <div className="headerNavSection">
          <div
            className="headerNavSection__tabs-wrap"
            onClick={() => {
              setShow(false);
            }}
          >
            {tabs.map((tab, index) => (
              <NavLink
                to={tab.path}
                key={`HeaderNavSectionTab-${index}`}
                className={({ isActive }) =>
                  isActive
                    ? 'headerNavSection__tab headerNavSection__tab--active'
                    : 'headerNavSection__tab'
                }
              >
                {tab.name}
              </NavLink>
            ))}
          </div>
          <div
            className="headerNavSection-between"
            onClick={() => {
              setShow(false);
            }}
          >
            &nbsp;
          </div>
          <div
            className="headerNavSection__menu-icon"
            onClick={() => setShow(!show)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
        </div>
        {show && (
          <div className="headerNavSection-dropdown">
            {categories && categories.length > 0 && (
              <div className="headerNavSection-dropdown-wrap">
                <TabGroup
                  categories={categories}
                  title={`GOOD & HEALTH`}
                  groupIndex={1}
                />
                <TabGroup
                  categories={categories}
                  title={`PET LIFE`}
                  groupIndex={2}
                />
                <TabGroup
                  categories={categories}
                  title={`EXPLORE`}
                  groupIndex={3}
                />
              </div>
            )}
          </div>
        )}
      </HeaderNavSectionStyled>
      {isFixed && <BehindFixed />}
    </Fragment>
  );
};

export default HeaderNavSection;
