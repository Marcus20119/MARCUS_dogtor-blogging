import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import { ListPost } from '~/components/module';
import UserSectionTitle from '~/components/module/user/UserSectionTitle';
import { useScrollOnTop } from '~/hooks';

const FavoritePostsPageStyled = styled.div``;

const FavoritePostsPage = () => {
  const { userDocument } = useOutletContext();
  useScrollOnTop();

  return (
    <FavoritePostsPageStyled>
      <UserSectionTitle>Favorite Posts</UserSectionTitle>
      <ListPost
        isWhereFieldArray={true}
        whereField="usersLiked"
        whereValue={userDocument.id}
      />
    </FavoritePostsPageStyled>
  );
};

export default FavoritePostsPage;
