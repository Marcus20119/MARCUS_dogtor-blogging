import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { useFirebase } from '~/contexts/firebaseContext';
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
  useEffect(() => {
    document.title = 'Dogtor Blogging';
  }, []);
  return (
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
  );
};

export default MainLayout;
