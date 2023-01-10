import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { convertDate } from '~/helpers';
import { EyeIcon } from '~/icons';

const SidePostItemStyled = styled.a`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px 0;
  border-bottom: solid 1px #999;
  overflow: hidden;

  &:first-child {
    padding: 0 0 24px;
  }
  &:last-child {
    padding: 24px 0 0;
    border-bottom: none;
  }

  .sidePostItem {
    &-img {
      width: 100%;
      height: 200px;
      border-radius: 8px;
      overflow: hidden;
      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        transform: scale(1);
        transition: all ease 1s;
      }
    }
    &-title {
      display: block;
      width: 100%;
      font-size: 22px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      margin: 12px 1px 12px;
      line-height: 28px;
      max-height: 80px;
    }
    &-info-wrap {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding: 0 1px;
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
    &-view {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4px;

      div {
        width: 16px;
        height: 16px;
      }
    }
  }
  &:hover {
    .sidePostItem {
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

const SidePostItem = ({ post }) => {
  const navigateTo = useNavigate();

  return (
    <SidePostItemStyled
      onClick={e => {
        e.preventDefault();
        navigateTo(`/post/${post.slug}`);
      }}
      href={`/post/${post.slug}`}
    >
      <div className="sidePostItem-img">
        <img src={post.img.URL} alt={post.title} />
      </div>
      <h3 className="sidePostItem-title">{post.title}</h3>
      <div className="sidePostItem-info-wrap">
        <div className="sidePostItem-info">
          <span className="sidePostItem-info__createdAt">
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

          <span className="sidePostItem-info__author">{post.author}</span>
        </div>
        <div className="sidePostItem-view">
          <span>{post?.quantityView ? post.quantityView : '0'}</span>
          <div>
            <EyeIcon />
          </div>
        </div>
      </div>
    </SidePostItemStyled>
  );
};

export default SidePostItem;
