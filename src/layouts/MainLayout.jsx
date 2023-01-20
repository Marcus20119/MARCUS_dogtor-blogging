import { Fragment, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { useFirebase } from '~/contexts/firebaseContext';
import { useImg } from '~/contexts/imgContext';
import { ButtonScrollOnTop } from './ButtonScrollOnTop';
import Footer from './Footer';
import { Header } from './Header';

const MainLayoutStyled = styled.div`
  width: 100%;
`;
const ContainerStyled = styled.div`
  width: 1280px;
  max-width: 85vw;
  min-height: 100vh;
  margin: 0 auto;
  padding: 24px 0;
`;

const MainLayout = ({ isFull = false }) => {
  const { categories, categoriesName, imgURLs } = useFirebase();
  const { imgReady } = useImg();
  useEffect(() => {
    document.title = 'Dogtor Blogging';
  }, []);
  return (
    <Fragment>
      {imgReady && (
        <MainLayoutStyled>
          <Header />
          <ContainerStyled isFull={isFull}>
            {!!categories?.length && categories.length > 0 && (
              <Outlet context={{ categories, categoriesName, imgURLs }} />
            )}
          </ContainerStyled>
          <ButtonScrollOnTop />
          <Footer />
        </MainLayoutStyled>
      )}
    </Fragment>
  );
};

export default MainLayout;
