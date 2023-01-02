import styled from 'styled-components';
import { Header } from '~/components/layout';

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
