import styled from 'styled-components';
import { convertDate } from '~/helpers';

const ListPostItemStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;

  .listPostItem-img {
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
      object-fit: contain;
      object-position: center center;
      transform: translateY(-50%) scale(1);
      transition: all ease 1s;
    }
  }
  .listPostItem-title {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .listPostItem-overview {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    opacity: 0.8;
    font-size: 14px;
    margin: 2px 0;
  }
  .listPostItem-info {
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
  &:hover {
    .listPostItem-title {
      color: #b34321;
    }
    .listPostItem-img {
      img {
        transform: translateY(-50%) scale(1.05);
      }
    }
    .listPostItem-overview,
    .listPostItem-info {
      opacity: 0.7;
    }
  }
`;

const ListPostItem = ({ post }) => {
  return (
    <ListPostItemStyled>
      <div className="listPostItem-img">
        <img src={post.downloadURL} alt={post.title} />
      </div>
      <h3 className="listPostItem-title">{post.title}</h3>
      {/* <p className="listPostItem-overview">{post.overview}</p> */}
      <p className="listPostItem-overview">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta,
        laudantium cum magni non excepturi ad ullam ratione recusandae
        accusamus, aperiam corrupti explicabo impedit sit, nam distinctio sint
        iure nemo perferendis!
      </p>
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
    </ListPostItemStyled>
  );
};

export default ListPostItem;
