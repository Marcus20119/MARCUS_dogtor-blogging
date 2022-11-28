import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const tabs = [
  {
    name: 'Latest',
    path: '/latest',
  },
  {
    name: 'Popular',
    path: '/popular',
  },
];

const HeaderNavSectionStyled = styled.div`
  width: 100%;
  background-color: rgba(90, 33, 16, 0.9);
  padding: 10px 0;

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
  }
  .headerNavSection__tab:first-child {
    padding: 0 16px 0 8px;
  }
  .headerNavSection__tab:last-child {
    border-right: unset;
  }
  .headerNavSection__tab:hover {
    opacity: 1;
  }
  .headerNavSection__tab--active {
    opacity: 1;
  }
  .headerNavSection__menu-icon {
    width: 30px;
    height: 30px;
    color: ${props => props.theme.color.white};
    text-shadow: 0 0 1px ${props => props.theme.color.brown};
  }
`;

const HeaderNavSection = () => {
  return (
    <HeaderNavSectionStyled>
      <div className="headerNavSection">
        <div className="headerNavSection__tabs-wrap">
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
        <div className="headerNavSection__menu-icon">
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
    </HeaderNavSectionStyled>
  );
};

export default HeaderNavSection;
