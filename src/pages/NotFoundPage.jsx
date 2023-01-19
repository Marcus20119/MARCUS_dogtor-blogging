import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '~/components/button';

const NotFoundPageStyled = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: #f6eede;
  z-index: 10000;

  .nfp {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &-header {
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        color: ${props => props.theme.color.brown};
        font-family: ${props => props.theme.font.secondary};
        font-size: 200px;
        line-height: 1;
        transform: translateY(-10%);
        text-shadow: 0 0 5px #dd7e49;
      }
      img {
        display: block;
        width: 225px;
        height: 250px;
        object-fit: cover;
        object-position: center;
      }
    }
    &-text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 24px;
      width: 58%;
      font-family: ${props => props.theme.font.tertiary};
      margin-bottom: 28px;

      &__top {
        font-weight: 700;
        font-size: 20px;
        color: ${props => props.theme.color.brown};
      }
      &__bottom {
        text-align: center;
        color: ${props => props.theme.color.black};
      }
    }
  }
`;

const NotFoundPage = () => {
  const navigateTo = useNavigate();
  return (
    <NotFoundPageStyled>
      <div className="nfp">
        <div className="nfp-header">
          <span>4</span>
          <img src="/imgs/dog-paw-logo.png" alt="dog-paw-logo" />
          <span>4</span>
        </div>
        <div className="nfp-text">
          <span className="nfp-text__top">Oops! Something Went Wrong!</span>
          <span className="nfp-text__bottom">
            The page you are looking for might have been removed had its name
            changed or is temporarily unavailable.
          </span>
        </div>
        <Button
          width="fit-content"
          style={{ borderRadius: '666px' }}
          onClick={() => navigateTo('/latest')}
        >
          Go to Homepage
        </Button>
      </div>
    </NotFoundPageStyled>
  );
};

export default NotFoundPage;
