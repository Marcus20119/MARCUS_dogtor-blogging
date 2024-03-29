import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

import Button from '~/components/button';
import { SearchBar } from '~/components/search';
import { UserAvatar } from '~/components/module/user';
import { useClickOutSide } from '~/hooks';
import UserDropDown from './UserDropDown';
import { useFirebase } from '~/contexts/firebaseContext';
import { Fragment, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { useEffect } from 'react';
import { mobile, tablet } from '~/styles/responsive';
import { useImg } from '~/contexts/imgContext';
import { useAuth } from '~/contexts/authContext';

const HeaderMainSectionStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1280px;
  max-width: 85vw;
  margin: 0 auto;
  height: 86px;
  padding: 18px 0;

  ${mobile(css`
    max-width: 90vw !important;
  `)}

  .headerMainSection-left {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    height: 100%;
    cursor: pointer;

    &__logo {
      display: block;
      height: 100%;
      object-fit: contain;
      object-position: center center;
      border-radius: 50%;
    }
    &__title {
      align-items: center;
      font-weight: 500;
      font-size: 20px;
      padding-top: 12px;
      font-family: ${props => props.theme.font.secondary};
      color: ${props => props.theme.color.brown};
    }
  }
  .headerMainSection-right {
    display: flex;
    align-items: center;
    gap: 12px;
    height: 90%;

    &__search {
      width: 400px;
      ${tablet(css`
        width: 300px;
      `)};
      ${mobile(css`
        display: none;
      `)};
    }

    &__user-wrapper {
      position: relative;
    }
  }
`;

const HeaderMainSection = () => {
  const navigateTo = useNavigate();
  const { imgReady } = useImg();
  const { userDocument, imgURLs } = useFirebase();
  const { userInfo } = useAuth();
  const { show, setShow, nodeRef } = useClickOutSide();
  const { pathname } = useLocation();
  const [query] = useSearchParams();
  const [historyNum, setHistoryNum] = useState(
    query.get('layoutSearch') ? 1 : 0
  );

  const handleSetLayoutSearchValue = debounce(e => {
    if (e.target.value) {
      navigateTo(`/search?layoutSearch=${e.target.value}`);
      setHistoryNum(prev => prev + 1);
    } else {
      window.history.go(-historyNum);
      setHistoryNum(0);
    }
  }, 500);

  // Reset value khi đổi route
  const forceResetValue = pathname !== '/search';
  const searchRef = useRef();
  useEffect(() => {
    if (searchRef.current && forceResetValue) {
      searchRef.current.value = '';
      setHistoryNum(0);
    }
  }, [forceResetValue]);

  // Auto focus
  useEffect(() => {
    if (searchRef?.current?.value) {
      searchRef.current.focus();
    }
  }, []);

  return (
    <Fragment>
      {imgReady && (
        <HeaderMainSectionStyled>
          <a
            href="/latest"
            className="headerMainSection-left"
            onClick={e => {
              e.preventDefault();
              navigateTo('/latest');
            }}
          >
            <img
              className="headerMainSection-left__logo"
              src="/imgs/dog-paw-logo.png"
              alt="dogtor-logo"
            />
            <div className="headerMainSection-left__title">Dogtor Blogging</div>
          </a>
          <div className="headerMainSection-right">
            <div className="headerMainSection-right__search">
              <SearchBar
                ref={searchRef}
                name="layoutSearchQuery"
                placeholder="Search posts..."
                defaultValue={query.get('layoutSearch')}
                width="100%"
                onChange={handleSetLayoutSearchValue}
              />
            </div>
            {userInfo.email ? (
              <div
                ref={nodeRef}
                className="headerMainSection-right__user-wrapper"
              >
                <UserAvatar
                  src={
                    (userDocument?.avatar?.URL && userDocument.avatar.URL) ||
                    imgURLs.userAvatar
                  }
                  alt="user-avatar"
                  onClick={() => setShow(!show)}
                />
                {show && <UserDropDown setShow={setShow} />}
              </div>
            ) : (
              <Button
                btnStyle="small"
                width="fit-content"
                height="100%"
                onClick={() => navigateTo('/sign-in')}
                style={{ borderRadius: '666px' }}
              >
                Sign In
              </Button>
            )}
          </div>
        </HeaderMainSectionStyled>
      )}
    </Fragment>
  );
};

export { HeaderMainSection };
