import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MatrixItemLargeStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;

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
  }
`;

const MatrixItemLarge = ({ className, data, ...rest }) => {
  const navigateTo = useNavigate();
  return (
    <MatrixItemLargeStyled
      className={className}
      onClick={() => navigateTo(data.path)}
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
    </MatrixItemLargeStyled>
  );
};

export default MatrixItemLarge;
