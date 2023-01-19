import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { convertDate } from '~/helpers';

const SwiperPostItemStyled = styled.a`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;

  .swiperPostItem-img {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 60%;
    border-radius: 6px;
    overflow: hidden;

    img {
      position: absolute;
      top: 50%;
      right: 0;
      bottom: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
      transform: translateY(-50%) scale(1);
      transition: all ease 1s;
    }
  }
  .swiperPostItem-title {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    padding: 0 1px;
  }
  .swiperPostItem-overview {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    opacity: 0.8;
    font-size: 14px;
    margin: 2px 0;
    padding: 0 1px;
  }
  .swiperPostItem-info {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    font-size: 14px;
    padding: 0 1px;

    &__createdAt {
    }
    &__author {
    }
  }
  &:hover {
    .swiperPostItem-title {
      color: #b34321;
    }
    .swiperPostItem-img {
      img {
        transform: translateY(-50%) scale(1.05);
      }
    }
    .swiperPostItem-overview,
    .swiperPostItem-info {
      opacity: 0.7;
    }
  }
`;

const SwiperPostItem = ({ post }) => {
  const navigateTo = useNavigate();

  return (
    <SwiperPostItemStyled
      onClick={e => {
        e.preventDefault();
        navigateTo(`/post/${post.slug}`);
      }}
      href={`/post/${post.slug}`}
    >
      <div className="swiperPostItem-img">
        <img src={post.img.URL} alt={post.title} />
      </div>
      <h3 className="swiperPostItem-title">{post.title}</h3>
      <p className="swiperPostItem-overview">{post.overview}</p>
      <div className="swiperPostItem-info">
        <time className="swiperPostItem-info__createdAt">
          {convertDate(post.createdAt.seconds)}
        </time>
        <svg
          width="6"
          height="6"
          viewBox="0 0 6 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="3" cy="3" r="3" fill="#585858" />
        </svg>
        <span className="swiperPostItem-info__author">{post.author}</span>
      </div>
    </SwiperPostItemStyled>
  );
};

export default SwiperPostItem;
