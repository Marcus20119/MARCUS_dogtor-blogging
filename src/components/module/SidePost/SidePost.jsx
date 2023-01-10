import styled from 'styled-components';
import SidePostItem from './SidePostItem';

const SidePostStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;

  .sidePost-title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 12px;
    width: 100%;
    padding: 10px 1px;
  }

  .sidePost-title {
    font-size: 40px;
    line-height: 40px;
    font-weight: 500;
    color: ${props => props.theme.color.brown};
    font-family: ${props => props.theme.font.tertiary};
    letter-spacing: 2px;
    text-shadow: 0 0 1px ${props => props.theme.color.darkBrown};
  }
  .sidePost-title-line {
    flex: 1;
    height: 5px;
    background-color: ${props => props.theme.color.brown};
    box-shadow: 0 0 1px ${props => props.theme.color.darkBrown};
    margin-bottom: 6px;
    border-radius: 666px;
    opacity: 0.9;
  }

  .sidePost-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 24px;
    border-radius: 8px;
    background-color: #a27c6f70;
    box-shadow: 0px 1px 2px 0px rgb(60 64 67 / 30%),
      0px 2px 6px 2px rgb(60 64 67 / 15%);
    border: 1px solid #a27c6f30;
  }
`;
const SidePost = ({ posts, title }) => {
  return (
    <SidePostStyled>
      <div className="sidePost-title-wrap">
        <h2 className="sidePost-title">{title}</h2>
        <div className="sidePost-title-line">&nbsp;</div>
      </div>
      <div className="sidePost-wrap">
        {posts.map(post => (
          <SidePostItem key={`listPost-${post.id}`} post={post} />
        ))}
      </div>
    </SidePostStyled>
  );
};

export { SidePost };
