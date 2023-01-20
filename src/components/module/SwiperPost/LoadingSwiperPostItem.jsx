import styled from 'styled-components';
import { LoadingSkeleton } from '~/components/loading';

const LoadingSwiperPostItemStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;

  .loadingSwiperPostItem-img {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 60%;
    border-radius: 6px;
    overflow: hidden;

    &__skeleton {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  .loadingSwiperPostItem-title {
    padding: 0 1px;
    width: 100%;

    &__skeleton {
      width: 100%;
      height: 19px;
      margin: 4.75px 0;
      border-radius: 4px;
      overflow: hidden;
    }
    &__skeleton:last-child {
      width: 70%;
    }
  }
  .loadingSwiperPostItem-overview {
    opacity: 0.8;
    margin: 2px 0;
    padding: 0 1px;

    &__skeleton {
      width: 100%;
      height: 14px;
      margin: 3.5px 0;
      border-radius: 4px;
      overflow: hidden;
    }
    &__skeleton:last-child {
      width: 80%;
    }
  }
  .loadingSwiperPostItem-info {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 0 1px;
    width: 100%;

    &-createdAt,
    &-author {
      &__skeleton {
        width: 50px;
        height: 14px;
        margin-top: 3.5px;
        border-radius: 4px;
        overflow: hidden;
      }
    }
  }
`;

const LoadingSwiperPostItem = () => {
  return (
    <LoadingSwiperPostItemStyled>
      <div className="loadingSwiperPostItem-img">
        <div className="loadingSwiperPostItem-img__skeleton">
          <LoadingSkeleton />
        </div>
      </div>
      <div className="loadingSwiperPostItem-title">
        <div className="loadingSwiperPostItem-title__skeleton">
          <LoadingSkeleton />
        </div>
        <div className="loadingSwiperPostItem-title__skeleton">
          <LoadingSkeleton />
        </div>
      </div>
      <div className="loadingSwiperPostItem-overview">
        <div className="loadingSwiperPostItem-overview__skeleton">
          <LoadingSkeleton />
        </div>
        <div className="loadingSwiperPostItem-overview__skeleton">
          <LoadingSkeleton />
        </div>
      </div>
      <div className="loadingSwiperPostItem-info">
        <div className="loadingSwiperPostItem-info-createdAt">
          <div className="loadingSwiperPostItem-info-createdAt__skeleton">
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
        <div className="loadingSwiperPostItem-info-author">
          <div className="loadingSwiperPostItem-info-author__skeleton">
            <LoadingSkeleton />
          </div>
        </div>
      </div>
    </LoadingSwiperPostItemStyled>
  );
};

export default LoadingSwiperPostItem;
