import styled from 'styled-components';
import { LoadingSkeleton } from '~/components/loading';

const LoadingMatrixItemSmallStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;

  .loadingMatrixItemSmall {
    width: 100%;
    &-title {
      width: 100%;

      &__skeleton {
        width: 100%;
        height: 18px;
        margin: 4.5px 0;
      }
      &__skeleton:last-child {
        width: 60%;
      }
    }
    &-overview {
      width: 100%;

      &__skeleton {
        width: 100%;
        height: 15px;
        margin: 3.75px 0;
      }
      &__skeleton:last-child {
        width: 70%;
      }
    }
    &-info {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;
      font-size: 14px;

      &-createdAt,
      &-author {
        &__skeleton {
          width: 50px;
          height: 14px;
          margin: 3.5px 0;
        }
      }
    }
    &-readNow {
      display: block;
      margin-left: auto;
      font-size: 14px;
      font-weight: 500;
      padding: 4px 12px;
      border-radius: 666px;
      border: solid 1px ${props => props.theme.color.brown};
      color: ${props => props.theme.color.brown};
    }
  }
`;

const LoadingMatrixItemSmall = ({ className }) => {
  return (
    <LoadingMatrixItemSmallStyled className={className}>
      <div className="loadingMatrixItemSmall-title">
        <div className="loadingMatrixItemSmall-title__skeleton">
          <LoadingSkeleton />
        </div>
        <div className="loadingMatrixItemSmall-title__skeleton">
          <LoadingSkeleton />
        </div>
      </div>
      <div className="loadingMatrixItemSmall-overview">
        <div className="loadingMatrixItemSmall-overview__skeleton">
          <LoadingSkeleton />
        </div>
        <div className="loadingMatrixItemSmall-overview__skeleton">
          <LoadingSkeleton />
        </div>
      </div>
      <div className="loadingMatrixItemSmall-info">
        <div className="loadingMatrixItemSmall-info-createdAt">
          <div className="loadingMatrixItemSmall-info-createdAt__skeleton">
            <LoadingSkeleton />
          </div>
        </div>
        <svg
          width="6"
          height="6"
          viewBox="0 0 6 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: '0.3' }}
        >
          <circle cx="3" cy="3" r="3" fill="#585858" />
        </svg>
        <div className="loadingMatrixItemSmall-info-author">
          <div className="loadingMatrixItemSmall-info-author__skeleton">
            <LoadingSkeleton />
          </div>
        </div>
      </div>
      <span className="loadingMatrixItemSmall-readNow">Read Now</span>
    </LoadingMatrixItemSmallStyled>
  );
};

export default LoadingMatrixItemSmall;
