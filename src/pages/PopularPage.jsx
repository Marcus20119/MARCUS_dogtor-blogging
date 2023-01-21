import { collection, limit, query, where, orderBy } from 'firebase/firestore';
import { useEffect } from 'react';
import styled, { css } from 'styled-components';

import { ListPost, MatrixPost, SwiperPost } from '~/components/module';
import { SidePost } from '~/components/module/SidePost';
import { db } from '~/firebase/firebase-config';
import { useMultiDocs } from '~/firebase/funcs';
import { useScrollOnTop } from '~/hooks';
import { tabletAndMobile } from '~/styles/responsive';

const PopularStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 60px;
  width: 100%;

  .popularPage-listSection {
    display: flex;
    align-items: flex-start;
    gap: 36px;
    width: 100%;

    &__main {
      width: 68%;
      ${tabletAndMobile(css`
        width: 100%;
      `)}
    }
    &__sub {
      flex: 1;
      ${tabletAndMobile(css`
        display: none !important;
      `)}
    }
  }
`;
const newestQueryPopular = query(
  collection(db, 'posts'),
  where('status', '==', 1),
  orderBy('quantityView', 'desc'),
  limit(5)
);
const mentalHealthQueryPopular = query(
  collection(db, 'posts'),
  where('status', '==', 1),
  where('category', '==', 'Mental Health'),
  orderBy('quantityView', 'desc'),
  limit(10)
);
const foodNDrinkQueryPopular = query(
  collection(db, 'posts'),
  where('status', '==', 1),
  where('category', '==', 'Food n Drink'),
  orderBy('quantityView', 'desc'),
  limit(5)
);
const dogHealthQueryPopular = query(
  collection(db, 'posts'),
  where('status', '==', 1),
  where('category', '==', 'Dog Health'),
  orderBy('quantityView', 'desc'),
  limit(3)
);

const PopularPage = () => {
  useScrollOnTop();
  useEffect(() => {
    document.title = 'Dogtor Blogging';
  }, []);

  const newestPosts = useMultiDocs({ query: newestQueryPopular });
  const mentalHealthPosts = useMultiDocs({
    query: mentalHealthQueryPopular,
  });
  const foodNDrinkPosts = useMultiDocs({
    query: foodNDrinkQueryPopular,
  });
  const dogHealthPosts = useMultiDocs({ query: dogHealthQueryPopular });

  return (
    <PopularStyled>
      {/* MatrixPost và SwiperPost đã có skeleton làm loading nên không cần check điều kiện */}
      <MatrixPost posts={newestPosts} />

      <SwiperPost posts={mentalHealthPosts} title="MENTAL HEALTH" />

      <MatrixPost posts={foodNDrinkPosts} type={2} />

      {foodNDrinkPosts && foodNDrinkPosts.length > 0 && (
        <div className="popularPage-listSection">
          <div className="popularPage-listSection__main">
            <ListPost
              orderByField="quantityView"
              orderByType="desc"
              postPerLoad={10}
            />
          </div>
          <div className="popularPage-listSection__sub">
            {dogHealthPosts && dogHealthPosts.length > 0 && (
              <SidePost posts={dogHealthPosts} title="Dog Health" />
            )}
          </div>
        </div>
      )}
    </PopularStyled>
  );
};

export default PopularPage;
