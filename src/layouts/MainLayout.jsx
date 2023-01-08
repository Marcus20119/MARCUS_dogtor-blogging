import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonScrollOnTop } from './ButtonScrollOnTop';
import Footer from './Footer';
import { Header } from './Header';

const MainLayoutStyled = styled.div`
  width: 100%;
`;
const ContainerStyled = styled.div`
  width: 1280px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 24px 0;
`;

const MainLayout = () => {
  useEffect(() => {
    document.title = 'Dogtor Blogging';
  }, []);
  return (
    <MainLayoutStyled>
      <Header />
      <ContainerStyled>
        <Outlet />
      </ContainerStyled>
      <ButtonScrollOnTop />
      <Footer />
    </MainLayoutStyled>
  );
};

export default MainLayout;
