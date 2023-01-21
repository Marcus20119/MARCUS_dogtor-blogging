import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { convertDate } from '~/helpers';
import { EyeIcon } from '~/icons';
import { mobile } from '~/styles/responsive';

const ListPostItemStyled = styled.a`
  width: 100%;
  display: flex;
  align-items: stretch;
  gap: 12px;
  padding: 16px 0;
  border-bottom: solid 1px #ddd;

  ${mobile(css`
    align-items: center;
  `)}

  &:first-child {
    padding: 0 0 16px;
  }
  &:last-child {
    padding: 16px 0 0;
    border-bottom: none;
  }

  .listPostItem {
    &-img {
      width: 160px;
      height: 120px;
      border-radius: 4px;
      background-color: #ccc;
      overflow: hidden;
      mask-image: -webkit-radial-gradient(white, black);
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      ${mobile(css`
        width: 105px;
        height: 85px;
      `)}

      img {
        display: block;
        background-color: #ccc;
        height: 100%;
        width: 100%;
        border-radius: 4px;
        object-fit: cover;
        transform: scale(1);
        transition: all ease 1s;
      }
    }
    &-wrap {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    &-title {
      display: block;
      width: 100%;
      font-size: 22px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;

      ${mobile(css`
        font-size: 18px;
      `)}
    }
    &-overview {
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      opacity: 0.8;
    }
    &-info-wrap {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      ${mobile(css`
        align-items: center;
      `)}
    }
    &-info {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;

      &__createdAt,
      &__author {
        ${mobile(css`
          font-size: 14px;
        `)}
      }
    }
    &-view {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4px;

      ${mobile(css`
        margin-top: 2px;
      `)}

      div {
        width: 16px;
        height: 16px;
      }
    }
  }
  &:hover {
    .listPostItem {
      &-title {
        color: #b34321;
      }
      &-img {
        img {
          transform: scale(1.05);
        }
      }
      &-overview,
      &-info,
      &-view {
        opacity: 0.7;
      }
    }
  }
`;

const ListPostItem = ({ post }) => {
  const navigateTo = useNavigate();

  return (
    <ListPostItemStyled
      onClick={e => {
        e.preventDefault();
        navigateTo(`/post/${post.slug}`);
      }}
      href={`/post/${post.slug}`}
    >
      <div className="listPostItem-img">
        <img src={post.img.URL} alt={post.title} />
      </div>
      <div className="listPostItem-wrap">
        <h3 className="listPostItem-title">{post.title}</h3>
        <p className="listPostItem-overview">{post.overview}</p>
        <div className="listPostItem-info-wrap">
          <div className="listPostItem-info">
            <span className="listPostItem-info__createdAt">
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

            <span className="listPostItem-info__author">{post.author}</span>
          </div>
          <div className="listPostItem-view">
            <span>{post?.quantityView ? post.quantityView : '0'}</span>
            <div>
              <EyeIcon />
            </div>
          </div>
        </div>
      </div>
    </ListPostItemStyled>
  );
};

export default ListPostItem;
