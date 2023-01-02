import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Header, ScrollOnTop } from '~/components/layout';

const MainLayoutStyled = styled.div`
  width: 100%;
`;
const ContainerStyled = styled.div`
  width: 1280px;
  margin: 0 auto;
  padding: 24px 0;
`;

const MainLayout = () => {
  return (
    <MainLayoutStyled>
      <Header />
      <ContainerStyled>
        <Outlet />
      </ContainerStyled>
      <ScrollOnTop />
    </MainLayoutStyled>
  );
};

export default MainLayout;
