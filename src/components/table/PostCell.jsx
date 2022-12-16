import styled from 'styled-components';
import { convertDate } from '~/helpers';

const PostCellStyled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;

  .postCell-img {
    width: 80px;
    aspect-ratio: 4/3;
    border-radius: 4px;
    object-fit: cover;
  }
  .postCell-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-self: stretch;
    padding: 4px 0;

    h4 {
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
  }
`;

const PostCell = ({ postData }) => {
  return (
    <PostCellStyled>
      <img
        className="postCell-img"
        src={postData.img.URL}
        alt={postData.title}
      />
      <div className="postCell-info">
        <h4>{postData.title}</h4>
        <time>{convertDate(postData.createdAt.seconds)}</time>
      </div>
    </PostCellStyled>
  );
};

export { PostCell };
