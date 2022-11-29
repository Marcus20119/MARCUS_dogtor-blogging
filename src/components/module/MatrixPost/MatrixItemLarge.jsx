import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MatrixItemLargeStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  cursor: pointer;

  .matrixItemLarge {
    &-img {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 80%;
      border-radius: 8px;
      overflow: hidden;
      img {
        position: absolute;
        top: 50%;
        right: 0;
        bottom: 0;
        left: 0;
        display: block;
        object-fit: cover;
        object-position: center;
        transform: translateY(-50%);
        z-index: 1;
      }
    }
    &-title {
      display: block;
      width: 100%;
      font-size: 28px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    &-overview {
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    &-info {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;

      &__createdAt {
      }
      &__author {
      }
    }
    &-readNow {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.3);
      z-index: 10;
      opacity: 0;
      visibility: hidden;

      svg {
        width: 70px;
        height: 70px;
        margin-bottom: 36%;
      }
    }
  }
  &:hover {
    .matrixItemLarge-readNow {
      visibility: visible;
      opacity: 0.8;
    }
  }
`;

const MatrixItemLarge = ({ className, data, ...rest }) => {
  const navigateTo = useNavigate();
  return (
    <MatrixItemLargeStyled
      className={className}
      onClick={() => navigateTo(data.path)}
      {...rest}
    >
      <div className="matrixItemLarge-img">
        <img src={data.img} alt={data.title} />
      </div>
      <h3 className="matrixItemLarge-title">{data.title}</h3>
      <p className="matrixItemLarge-overview">{data.overview}</p>
      <div className="matrixItemLarge-info">
        <span className="matrixItemLarge-info__createdAt">
          {data.createdAt}
        </span>
        <svg
          width="6"
          height="6"
          viewBox="0 0 6 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="3" cy="3" r="3" fill="#585858" />
        </svg>

        <span className="matrixItemLarge-info__author">{data.author}</span>
      </div>
      <div className="matrixItemLarge-readNow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.25}
          stroke="#732b16"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            fill="#732b1630"
          />
        </svg>
      </div>
    </MatrixItemLargeStyled>
  );
};

export default MatrixItemLarge;
