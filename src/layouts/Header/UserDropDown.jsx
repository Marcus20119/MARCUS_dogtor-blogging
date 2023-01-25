import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import { UserAvatar } from '~/components/module/user';
import { useFirebase } from '~/contexts/firebaseContext';
import { auth } from '~/firebase/firebase-config';

const UserDropDownStyled = styled.div`
  @keyframes zoomOut {
    to {
      transform: scale(1);
    }
  }

  position: absolute;
  top: 125%;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  min-width: 333px;
  padding: 12px 24px;
  background-color: ${props => props.theme.color.white};
  box-shadow: 0px 1px 2px 0px rgb(60 64 67 / 30%),
    0px 2px 6px 2px rgb(60 64 67 / 15%);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  transform: scale(0);
  transform-origin: 90% 0;
  animation: zoomOut 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  perspective: 1000;
  -webkit-perspective: 1000;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  z-index: 666;

  .userDropDown-header {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;

    &__name {
      font-weight: 500;
    }
    &__email {
      font-size: 14px;
      opacity: 0.8;
    }
  }
  .userDropDown-tabs {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    padding: 12px 0 8px;
    width: 100%;
    border-top: solid 1px #ccc;

    &__item {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 2px 0;
      cursor: pointer;

      i {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30px;
        width: 30px;
        font-size: 18px;
      }
      span {
      }
    }
    &__item:hover {
      background-color: #eee;
      border-radius: 8px;
    }
  }
  /* Arrow */
  &::after {
    content: '';
    position: absolute;
    top: -7px;
    right: 15px;
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 4px;
    transform: rotate(45deg);
    background-color: ${props => props.theme.color.white};
    box-shadow: 0px 1px 2px 0px rgb(60 64 67 / 30%),
      0px 2px 6px 2px rgb(60 64 67 / 15%);
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 10px;
    display: block;
    width: 50px;
    height: 30px;
    background-color: ${props => props.theme.color.white};
    z-index: 1;
  }
`;

const UserDropDown = ({ setShow }) => {
  const { userDocument } = useFirebase();
  const navigateTo = useNavigate();
  const [userItems, setUserItems] = useState([]);
  useEffect(() => {
    if (userDocument?.role) {
      let configItems = [];
      switch (userDocument.role) {
        case 'admin': {
          configItems = [
            {
              name: 'Manage Posts',
              iconClass: 'bx bxs-book-content',
              navigatePath: '/user/admin/all-posts',
            },
            {
              name: 'Manage Users',
              iconClass: 'bx bxs-group',
              navigatePath: '/user/admin/all-users',
            },
            {
              name: 'Log Out',
              iconClass: 'bx bx-log-out',
              navigatePath: '/latest',
            },
          ];
          break;
        }
        case 'writer': {
          configItems = [
            {
              name: 'Write New Post',
              iconClass: 'bx bx-edit',
              navigatePath: '/user/writer/add-post',
            },
            {
              name: 'My Posts',
              iconClass: 'bx bx-book-open',
              navigatePath: '/user/writer/all-posts?category=All%20categories',
            },
            {
              name: 'Log Out',
              iconClass: 'bx bx-log-out',
              navigatePath: '/latest',
            },
          ];
          break;
        }
        case 'reader': {
          configItems = [
            {
              name: 'Read List',
              iconClass: 'bx bx-book-reader',
              navigatePath: '/user/reader/read-list',
            },
            {
              name: 'Favorite Posts',
              iconClass: 'bx bx-heart',
              navigatePath: '/user/reader/favorite-posts',
            },
            {
              name: 'Log Out',
              iconClass: 'bx bx-log-out',
              navigatePath: '/latest',
            },
          ];
          break;
        }
        default:
          break;
      }
      setUserItems(configItems);
    }
  }, [navigateTo, userDocument]);

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

  return (
    <UserDropDownStyled>
      <div className="userDropDown-header">
        <a
          href="/user/user-info"
          onClick={e => {
            e.preventDefault();
            navigateTo('/user/user-info');
            setShow(false);
          }}
        >
          <UserAvatar
            src={userDocument.avatar.URL}
            alt="user-avatar"
            size="70px"
          />
        </a>
        <span className="userDropDown-header__name">
          {userDocument.userName || userDocument.displayName}
        </span>
        <span className="userDropDown-header__email">{userDocument.email}</span>
      </div>
      <div className="userDropDown-tabs">
        {userItems.map((item, index) => (
          <a
            key={`UserDropDown-${index}`}
            href={item.navigatePath}
            className="userDropDown-tabs__item"
            onClick={e => {
              e.preventDefault();
              setShow(false);
              if (item.name === 'Log Out') {
                handleLogOut(item.navigatePath);
              } else {
                navigateTo(item.navigatePath);
              }
            }}
          >
            <i className={`${item.iconClass}`}></i>
            <span>{item.name}</span>
          </a>
        ))}
      </div>
    </UserDropDownStyled>
  );
};

export default UserDropDown;
