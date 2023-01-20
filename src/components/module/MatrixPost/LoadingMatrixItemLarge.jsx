import styled from 'styled-components';
import { LoadingSkeleton } from '~/components/loading';

const LoadingMatrixItemLargeStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  cursor: pointer;

  .loadingMatrixItemLarge {
    &-img {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 80%;
      border-radius: 8px;
      overflow: hidden;

      &__skeleton {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
    &-title {
      display: block;
      width: 100%;
      font-size: 28px;
      padding: 0 1px;

      &__skeleton {
        width: 100%;
        height: 28px;
        margin: 7px 0;
        border-radius: 4px;
        overflow: hidden;
      }
      &__skeleton:last-child {
        width: 70%;
      }
    }
    &-overview {
      opacity: 0.8;
      padding: 0 1px;
      width: 100%;

      &__skeleton {
        width: 100%;
        height: 16px;
        margin: 4px 0;
        border-radius: 4px;
        overflow: hidden;
      }
      &__skeleton:last-child {
        width: 80%;
      }
    }
    &-info {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;
      padding: 0 1px;

      &-createdAt {
        width: 50px;

        &__skeleton {
          width: 100%;
          height: 16px;
          margin: 4px 0;
          border-radius: 4px;
          overflow: hidden;
        }
      }
      &-author {
        width: 50px;

        &__skeleton {
          width: 100%;
          height: 16px;
          margin: 4px 0;
          border-radius: 4px;
          overflow: hidden;
        }
      }
    }
  }
`;

const LoadingMatrixItemLarge = ({ className }) => {
  return (
    <LoadingMatrixItemLargeStyled className={className}>
      <div className="loadingMatrixItemLarge-img">
        <div className="loadingMatrixItemLarge-img__skeleton">
          <LoadingSkeleton />
        </div>
      </div>
      <div className="loadingMatrixItemLarge-title">
        <div className="loadingMatrixItemLarge-title__skeleton">
          <LoadingSkeleton />
        </div>
        <div className="loadingMatrixItemLarge-title__skeleton">
          <LoadingSkeleton />
        </div>
      </div>
      <div className="loadingMatrixItemLarge-overview">
        <div className="loadingMatrixItemLarge-overview__skeleton">
          <LoadingSkeleton />
        </div>
        <div className="loadingMatrixItemLarge-overview__skeleton">
          <LoadingSkeleton />
        </div>
      </div>
      <div className="loadingMatrixItemLarge-info">
        <div className="loadingMatrixItemLarge-info-createdAt">
          <div className="loadingMatrixItemLarge-info-createdAt__skeleton">
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

        <div className="loadingMatrixItemLarge-info-author">
          <div className="loadingMatrixItemLarge-info-author__skeleton">
            <LoadingSkeleton />
          </div>
        </div>
      </div>
    </LoadingMatrixItemLargeStyled>
  );
};

export default LoadingMatrixItemLarge;
