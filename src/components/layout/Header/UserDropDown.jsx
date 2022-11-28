import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '~/contexts/authContext';
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
  padding: 12px 24px;
  background-color: ${props => props.theme.color.white};
  box-shadow: 0px 1px 2px 0px rgb(60 64 67 / 30%),
    0px 2px 6px 2px rgb(60 64 67 / 15%);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  transform: scale(0);
  transform-origin: 90% 0;
  animation: zoomOut 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;

  .userDropDown-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__avatar {
      display: block;
      height: 70px;
      width: 70px;
      border-radius: 50%;
      border: solid 1px ${props => props.theme.color.brown};
      overflow: hidden;

      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
      }
    }
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
`;

const UserDropDown = ({ handleHide }) => {
  const { userInfo } = useAuth();
  const navigateTo = useNavigate();
  const userItems = [
    {
      name: 'Settings & privacy',
      iconClass: 'bx bxs-cog',
      onClick() {
        navigateTo('/');
      },
    },
    {
      name: 'Log Out',
      iconClass: 'bx bx-log-out',
      onClick() {
        signOut(auth);
      },
    },
  ];

  return (
    <UserDropDownStyled>
      <div className="userDropDown-header">
        <div className="userDropDown-header__avatar">
          <img src="/imgs/user.jpg" alt="user" />
        </div>
        <span className="userDropDown-header__name">
          {userInfo.displayName}
        </span>
        <span className="userDropDown-header__email">{userInfo.email}</span>
      </div>
      <div className="userDropDown-tabs">
        {userItems.map((item, index) => (
          <div
            key={`UserDropDown-${index}`}
            className="userDropDown-tabs__item"
            onClick={item.onClick}
          >
            <i className={`${item.iconClass}`}></i>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </UserDropDownStyled>
  );
};

export default UserDropDown;