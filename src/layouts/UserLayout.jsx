import { upperFirst } from 'lodash';
import { Fragment, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { UserSideBar } from '~/components/module';
import { useFirebase } from '~/contexts/firebaseContext';
import { useImg } from '~/contexts/imgContext';
import { mobile, tablet, tabletAndMobile } from '~/styles/responsive';
import ButtonMenu from './ButtonMenu';
import { ButtonScrollOnTop } from './ButtonScrollOnTop';
import Footer from './Footer';
import { Header } from './Header';

const UserLayoutStyled = styled.div`
  width: 100%;
`;
const ContainerStyled = styled.div`
  width: 1280px;
  max-width: 85vw;
  min-height: 100vh;
  margin: 0 auto;
  padding: 24px 0;
  display: flex;
  gap: 40px;
  align-items: flex-start;

  ${mobile(css`
    max-width: 95vw !important;
  `)}

  .userLayout-left {
    width: 17%;

    ${tabletAndMobile(css`
      display: none;
    `)}
  }
  .userLayout-right {
    flex: 1;
    max-width: 100%;
    ${tabletAndMobile(css`
      max-width: 100%;
    `)}
  }
`;

const UserLayout = () => {
  const { userDocument, categories, categoriesName, imgURLs } = useFirebase();
  const { imgReady } = useImg();

  useEffect(() => {
    if (userDocument?.role) {
      document.title = `${upperFirst(userDocument.role)}'s Site`;
    }
  }, [userDocument.role]);
  return (
    <Fragment>
      {imgReady && (
        <UserLayoutStyled>
          <Header />
          <ContainerStyled>
            <div className="userLayout-left">
              <UserSideBar />
            </div>
            <div className="userLayout-right">
              {userDocument?.id && (
                <Outlet
                  context={{
                    userDocument,
                    categories,
                    categoriesName,
                    imgURLs,
                  }}
                />
              )}
            </div>
          </ContainerStyled>
          <ButtonMenu />
          <ButtonScrollOnTop />
          <Footer />
        </UserLayoutStyled>
      )}
    </Fragment>
  );
};

export default UserLayout;
