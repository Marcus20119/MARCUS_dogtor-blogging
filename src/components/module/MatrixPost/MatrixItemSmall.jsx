import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { convertDate } from '~/helpers';

const MatrixItemSmallStyled = styled.a`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;

  .matrixItemSmall {
    &-title {
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
      font-size: 15px;
      opacity: 0.8;
    }
    &-info {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;
      font-size: 14px;

      &__createdAt {
      }
      &__author {
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

  &:hover {
    .matrixItemSmall {
      &-title {
        color: #b34321;
      }
      &-overview,
      &-info,
      &-readNow {
        opacity: 0.7;
      }
    }
    .matrixItemSmall-readNow {
      background-color: ${props => props.theme.color.brown};
      color: ${props => props.theme.color.white};
    }
  }
`;

const MatrixItemSmall = ({ className, post, ...rest }) => {
  const navigateTo = useNavigate();
  return (
    <MatrixItemSmallStyled
      className={className}
      onClick={e => {
        e.preventDefault();
        navigateTo(`/post/${post.slug}`);
      }}
      href={`/post/${post.slug}`}
      {...rest}
    >
      <h3 className="matrixItemSmall-title">{post.title}</h3>
      <p className="matrixItemSmall-overview">{post.overview}</p>
      <div className="matrixItemSmall-info">
        <span className="matrixItemSmall-info__createdAt">
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
        <span className="matrixItemSmall-info__author">{post.author}</span>
      </div>
      <span className="matrixItemSmall-readNow">Read Now</span>
    </MatrixItemSmallStyled>
  );
};

export default MatrixItemSmall;
