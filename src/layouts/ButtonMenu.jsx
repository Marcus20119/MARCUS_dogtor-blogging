import { Fragment, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { UserSideBar } from '~/components/module';
import { useClickOutSide } from '~/hooks';
import { mobile, tabletAndMobile } from '~/styles/responsive';

const ButtonMenuStyled = styled.div`
  position: fixed;
  bottom: 100px;
  right: 35px;
  display: none;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.theme.color.brown};
  color: ${props => props.theme.color.skin} !important;
  font-size: 26px;
  cursor: pointer;
  opacity: 0.95;
  z-index: 777;

  ${tabletAndMobile(css`
    display: flex;
  `)}

  ${mobile(css`
    right: 20px;
  `)}

  ${props =>
    props.show &&
    css`
      width: unset;
      height: unset;
      background-color: unset;
      opacity: 1 !important;
      .userSideBar-icon {
        display: none;
      }
    `};

  :hover {
    opacity: 0.8;
  }
  @keyframes pop {
    to {
      transform: scale(1);
    }
  }
  .userSideBar-wrap {
    position: absolute;
    bottom: 0;
    right: 0;
    transform: scale(0);
    transform-origin: bottom right;
    animation: pop ease 0.3s forwards;
    width: 230px;
  }
`;

const ButtonMenuOverlayStyled = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 700;
`;

const ButtonMenu = ({ navigatePath }) => {
  const { nodeRef, setShow, show } = useClickOutSide();
  const { pathname } = useLocation();
  useEffect(() => {
    setShow(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return (
    <Fragment>
      <ButtonMenuStyled
        ref={nodeRef}
        href={navigatePath}
        title="Open menu"
        onClick={() => setShow(true)}
        show={show}
        style={{ backgroundColor: !show ? '#8d351a' : 'transparent' }}
      >
        <i className="bx bx-dots-horizontal-rounded userSideBar-icon"></i>
        {show && (
          <div className="userSideBar-wrap">
            <UserSideBar />
          </div>
        )}
      </ButtonMenuStyled>
      {show && <ButtonMenuOverlayStyled>&nbsp;</ButtonMenuOverlayStyled>}
    </Fragment>
  );
};

export default ButtonMenu;
