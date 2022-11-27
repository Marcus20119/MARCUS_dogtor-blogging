import styled from 'styled-components';
import { useAuth } from '~/contexts/authContext';

const HomeStyled = styled.div``;

const HomePage = () => {
  const { userInfo } = useAuth();
  return (
    <HomeStyled>
      <div className="container">{userInfo.displayName}</div>
    </HomeStyled>
  );
};

export default HomePage;
