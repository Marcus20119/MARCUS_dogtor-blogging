import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from '~/components/layout';

const MainLayoutStyled = styled.div`
  width: 100%;
`;

const MainLayout = () => {
  return (
    <MainLayoutStyled>
      <Header />
      <Outlet />
    </MainLayoutStyled>
  );
};

export default MainLayout;
