import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { convertDate } from '~/helpers';

const MatrixItemLargeStyled = styled.a`
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
        height: 100%;
        top: 50%;
        left: 0;
        display: block;
        object-fit: cover;
        object-position: center;
        transform: translateY(-50%) scale(1);
        transition: all ease 1s;
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
      padding: 0 1px;
    }
    &-overview {
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      opacity: 0.8;
      padding: 0 1px;
    }
    &-info {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;
      padding: 0 1px;

      &__createdAt {
      }
      &__author {
      }
    }
  }
  &:hover {
    .matrixItemLarge {
      &-title {
        color: #b34321;
      }
      &-img {
        img {
          transform: translateY(-50%) scale(1.05);
        }
      }
      &-overview,
      &-info {
        opacity: 0.7;
      }
    }
  }
`;

const MatrixItemLarge = ({ className, post, ...rest }) => {
  const navigateTo = useNavigate();

  return (
    <MatrixItemLargeStyled
      className={className}
      onClick={e => {
        e.preventDefault();
        navigateTo(`/post/${post.slug}`);
      }}
      href={`/post/${post.slug}`}
      {...rest}
    >
      <div className="matrixItemLarge-img">
        <img src={post.img.URL} alt={post.title} />
      </div>
      <h3 className="matrixItemLarge-title">{post.title}</h3>
      <p className="matrixItemLarge-overview">{post.overview}</p>
      <div className="matrixItemLarge-info">
        <span className="matrixItemLarge-info__createdAt">
          {convertDate(post.createdAt.seconds)}
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

        <span className="matrixItemLarge-info__author">{post.author}</span>
      </div>
    </MatrixItemLargeStyled>
  );
};

export default MatrixItemLarge;
