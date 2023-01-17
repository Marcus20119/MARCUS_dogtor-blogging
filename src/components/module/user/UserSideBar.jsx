import { signOut } from 'firebase/auth';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useFirebase } from '~/contexts/firebaseContext';
import { auth } from '~/firebase/firebase-config';
import { UserAvatar } from '.';

const adminTabs = [
  {
    name: 'Dashboard',
    iconClass: 'bx bx-cube',
    path: '/user/admin/dashboard',
  },
  {
    name: 'Manage Posts',
    iconClass: 'bx bx-book-open',
    path: '/user/admin/all-posts?category=All%20categories&search=',
  },
  {
    name: 'Manage Users',
    iconClass: 'bx bx-group',
    path: '/user/admin/all-users',
  },
  {
    name: 'Manage Category',
    iconClass: 'bx bx-box',
    path: '/user/admin/all-categories',
  },
  {
    name: 'Add New Post',
    iconClass: 'bx bx-edit',
    path: '/user/admin/add-post',
  },
  {
    name: 'Add New User',
    iconClass: 'bx bx-user-plus',
    path: '/user/admin/add-user',
  },
  {
    name: 'User Info',
    iconClass: 'bx bx-user',
    path: '/user/admin/user-info',
  },
  {
    name: 'Log Out',
    iconClass: 'bx bx-log-out-circle',
    path: '/latest',
    onClick() {
      signOut(auth);
    },
  },
];

const writerTabs = [
  {
    name: 'Dashboard',
    iconClass: 'bx bx-cube',
    path: '/user/writer/dashboard',
  },
  {
    name: 'My Posts',
    iconClass: 'bx bx-book-open',
    path: '/user/writer/all-posts?category=All%20categories&search=',
  },
  {
    name: 'New Post',
    iconClass: 'bx bx-edit',
    path: '/user/writer/add-post',
  },
  {
    name: 'Category',
    iconClass: 'bx bx-box',
    path: '/user/writer/category',
  },
  {
    name: 'User Info',
    iconClass: 'bx bx-user',
    path: '/user/writer/user-info',
  },
  {
    name: 'Log Out',
    iconClass: 'bx bx-log-out-circle',
    path: '/latest',
    onClick() {
      signOut(auth);
    },
  },
];

const UserSideBarStyled = styled.div`
  width: 100%;

  .userSidebar {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    width: 100%;
    padding: 16px 8px;
    border-radius: 8px;
    box-shadow: 0px 1px 2px 0px #8d351a30, 0px 2px 6px 2px #8d351a30;
    border-radius: 8px;
    border: solid 1px #8d351a10;
    background-color: ${props => props.theme.color.skin};
    font-family: ${props => props.theme.font.tertiary};

    &__header {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      font-size: 20px;
      font-weight: 700;
      padding: 0 18px 8px;
      color: ${props => props.theme.color.brown};

      span {
        flex: 1;
        border-bottom: solid 2px #8d351a50;
      }
    }

    &__tab {
      display: flex;
      width: 100%;
      align-items: center;
      gap: 8px;
      padding: 10px 18px;
      border-radius: 8px;
      background-color: transparent;
      cursor: pointer;
      opacity: 0.8;
      font-weight: 500;
      color: ${props => props.theme.color.black};
      text-shadow: 0 0 1px #8d351a90;

      i {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        margin-bottom: 2px;
      }
      span {
      }
    }
    &__tab:hover,
    &__tab--active {
      background-color: #8d351a30;
      opacity: 1;
    }
  }
`;

const UserSideBar = () => {
  const { userDocument, imgURLs } = useFirebase();

  const tabs =
    userDocument.role === 'admin'
      ? adminTabs
      : userDocument.role === 'writer'
      ? writerTabs
      : writerTabs;

  return (
    <UserSideBarStyled>
      <div className="userSidebar">
        <div className="userSidebar__header">
          <UserAvatar
            src={userDocument?.avatar?.URL || imgURLs.transparent}
            alt="user-avatar"
            size="40px"
          />
          {userDocument?.userName && (
            <span>{userDocument.userName.split(' ')[0]}</span>
          )}
        </div>
        {tabs.map((tab, index) => (
          <NavLink
            key={`userSidebar-${index}`}
            to={tab.path}
            className={({ isActive }) =>
              isActive
                ? 'userSidebar__tab userSidebar__tab--active'
                : 'userSidebar__tab'
            }
            onClick={tab.onClick ? tab.onClick : () => {}}
          >
            <i className={tab.iconClass}></i>
            <span>{tab.name}</span>
          </NavLink>
        ))}
      </div>
    </UserSideBarStyled>
  );
};

export { UserSideBar };
