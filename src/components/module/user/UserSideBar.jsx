import { signOut } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { useFirebase } from '~/contexts/firebaseContext';
import { auth } from '~/firebase/firebase-config';
import { UserAvatar } from '.';

const adminTabs = [
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
    name: 'Favorite Posts',
    iconClass: 'bx bx-heart',
    path: '/user/admin/favorite-posts',
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
  },
];

const writerTabs = [
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
    name: 'Favorite Posts',
    iconClass: 'bx bx-heart',
    path: '/user/admin/favorite-posts',
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
  },
];

const readerTabs = [
  {
    name: 'Read List',
    iconClass: 'bx bx-bookmark',
    path: '/user/reader/read-list',
  },
  {
    name: 'Favorite Posts',
    iconClass: 'bx bx-heart',
    path: '/user/reader/favorite-posts',
  },
  {
    name: 'User Info',
    iconClass: 'bx bx-user',
    path: '/user/reader/user-info',
  },
  {
    name: 'Log Out',
    iconClass: 'bx bx-log-out-circle',
    path: '/latest',
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

  const navigateTo = useNavigate();

  const handleLogOut = navigatePath => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You will immediately sign out!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8d351a',
      cancelButtonColor: '#8d351a50',
      confirmButtonText: 'Sign out',
      scrollbarPadding: false,
    }).then(async result => {
      if (result.isConfirmed) {
        signOut(auth);
        navigateTo(navigatePath);
      }
    });
  };

  const tabs =
    userDocument.role === 'admin'
      ? adminTabs
      : userDocument.role === 'writer'
      ? writerTabs
      : readerTabs;

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
            onClick={e => {
              if (tab.name === 'Log Out') {
                e.preventDefault();
                handleLogOut(tab.path);
              }
            }}
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
