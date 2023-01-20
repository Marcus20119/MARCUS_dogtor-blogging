import { collection, limit, query, where, orderBy } from 'firebase/firestore';
import { useEffect } from 'react';
import styled, { css } from 'styled-components';

import { ListPost, MatrixPost, SwiperPost } from '~/components/module';
import { SidePost } from '~/components/module/SidePost';
import { db } from '~/firebase/firebase-config';
import { useMultiDocs } from '~/firebase/funcs';
import { useScrollOnTop } from '~/hooks';
import { tablet } from '~/styles/responsive';

const FavoriteStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 60px;
  width: 100%;

  .favoritePage-listSection {
    display: flex;
    align-items: flex-start;
    gap: 36px;
    width: 100%;

    &__main {
      width: 68%;
      ${tablet(css`
        width: 100%;
      `)}
    }
    &__sub {
      flex: 1;
      ${tablet(css`
        display: none !important;
      `)}
    }
  }
`;
const newestQueryFavorite = query(
  collection(db, 'posts'),
  where('status', '==', 1),
  orderBy('usersLiked', 'desc'),
  limit(5)
);
const sharingQueryFavorite = query(
  collection(db, 'posts'),
  where('status', '==', 1),
  where('category', '==', 'Sharing'),
  orderBy('usersLiked', 'desc'),
  limit(5)
);
const foodNDrinkQueryFavorite = query(
  collection(db, 'posts'),
  where('status', '==', 1),
  where('category', '==', 'Food n Drink'),
  orderBy('usersLiked', 'desc'),
  limit(10)
);
const lifeStyleQueryFavorite = query(
  collection(db, 'posts'),
  where('status', '==', 1),
  where('category', '==', 'Life style'),
  orderBy('usersLiked', 'desc'),
  limit(3)
);

const FavoritePage = () => {
  useScrollOnTop();
  useEffect(() => {
    document.title = 'Dogtor Blogging';
  }, []);

  const newestPosts = useMultiDocs({ query: newestQueryFavorite });
  const sharingPosts = useMultiDocs({ query: sharingQueryFavorite });
  const foodNDrinkPosts = useMultiDocs({
    query: foodNDrinkQueryFavorite,
  });
  const lifeStylePosts = useMultiDocs({ query: lifeStyleQueryFavorite });

  return (
    <FavoriteStyled>
      {/* MatrixPost và SwiperPost đã có skeleton làm loading nên không cần check điều kiện */}
      <MatrixPost posts={newestPosts} />

      <SwiperPost posts={foodNDrinkPosts} title="FOOD & DRINK" />

      <MatrixPost posts={sharingPosts} type={2} />

      {foodNDrinkPosts && foodNDrinkPosts.length > 0 && (
        <div className="favoritePage-listSection">
          <div className="favoritePage-listSection__main">
            <ListPost
              orderByField="usersLiked"
              orderByType="desc"
              postPerLoad={10}
            />
          </div>
          <div className="favoritePage-listSection__sub">
            {lifeStylePosts && lifeStylePosts.length > 0 && (
              <SidePost posts={lifeStylePosts} title="Life Style" />
            )}
          </div>
        </div>
      )}
    </FavoriteStyled>
  );
};

export default FavoritePage;
