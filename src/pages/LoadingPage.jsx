import { Fragment } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import LoadingBounce from '~/components/loading/Bounce';
import { useImg } from '~/contexts/imgContext';
import { useScrollOnTop } from '~/hooks';
import { Header } from '~/layouts/Header';

const LoadingPageStyled = styled.div`
  width: 100%;
  height: 110vh;

  .loadingPage-loadingSection {
    width: 100%;
    margin-top: 36px;
  }
`;

const LoadingPage = () => {
  useScrollOnTop();
  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.scrollTop = 0;
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const { imgReady } = useImg();

  return (
    <Fragment>
      {imgReady && (
        <LoadingPageStyled>
          <Header />
          <div className="loadingPage-loadingSection">
            <LoadingBounce />
          </div>
        </LoadingPageStyled>
      )}
    </Fragment>
  );
};

export default LoadingPage;
