import styled from 'styled-components';

const UserCellStyled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;

  .userCell-img {
    width: 60px;
    height: 60px;
    border-radius: 4px;

    img {
      display: block;
      background-color: #ccc;
      width: 100%;
      height: 100%;
      border-radius: 4px;
      object-fit: cover;
      border-radius: 50%;
    }
  }
  .userCell-info {
    flex: 1;
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

const UserCell = ({ userData }) => {
  return (
    <UserCellStyled>
      <div className="userCell-img">
        <img src={userData.avatar.URL} alt={userData.userName} />
      </div>
      <div className="userCell-info">
        <h4>{userData.fullName || '...'}</h4>
        <time>{userData.userName}</time>
      </div>
    </UserCellStyled>
  );
};

export { UserCell };
