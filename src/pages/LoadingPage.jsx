import styled from 'styled-components';
import LoadingBounce from '~/components/loading/Bounce';
import { Header } from '~/layouts/Header';

const LoadingPageStyled = styled.div`
  width: 100%;

  .loadingPage-loadingSection {
    width: 100%;
    margin-top: 36px;
  }
`;

const LoadingPage = () => {
  return (
    <LoadingPageStyled>
      <Header />
      <div className="loadingPage-loadingSection">
        <LoadingBounce />
      </div>
    </LoadingPageStyled>
  );
};

export default LoadingPage;
