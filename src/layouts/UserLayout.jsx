import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from '~/components/layout';
import { UserSideBar } from '~/components/module';

const UserLayoutStyled = styled.div`
  width: 100%;
`;
const ContainerStyled = styled.div`
  width: 1280px;
  margin: 0 auto;
  padding: 24px 0;

  display: flex;
  gap: 40px;
  align-items: flex-start;

  .userLayout-left {
    width: 17%;
  }
  .userLayout-right {
    flex: 1;
  }
`;

const UserLayout = () => {
  return (
    <UserLayoutStyled>
      <Header />
      <ContainerStyled>
        <div className="userLayout-left">
          <UserSideBar />
        </div>
        <div className="userLayout-right">
          <Outlet />
        </div>
      </ContainerStyled>
    </UserLayoutStyled>
  );
};

export default UserLayout;
