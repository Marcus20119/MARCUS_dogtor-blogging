import styled from 'styled-components';
import { useAuth } from '~/contexts/authContext';

const HomeStyled = styled.div``;

const HomePage = () => {
  const { userInfo } = useAuth();
  return <HomeStyled>{userInfo.displayName}</HomeStyled>;
};

export default HomePage;
