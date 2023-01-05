import styled from 'styled-components';
import { Header } from '~/layouts/Header';

const LoadingPageStyled = styled.div`
  width: 100%;
`;

const LoadingPage = () => {
  return (
    <LoadingPageStyled>
      <Header />
    </LoadingPageStyled>
  );
};

export default LoadingPage;
