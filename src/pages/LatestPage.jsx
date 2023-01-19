import { collection, limit, query, where, orderBy } from 'firebase/firestore';
import { useEffect } from 'react';
import styled from 'styled-components';

import { ListPost, MatrixPost, SwiperPost } from '~/components/module';
import { SidePost } from '~/components/module/SidePost';
import { db } from '~/firebase/firebase-config';
import { useMultiDocs } from '~/firebase/funcs';
import { useScrollOnTop } from '~/hooks';

const LatestStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 60px;
  width: 100%;

  .latestPage-listSection {
    display: flex;
    align-items: flex-start;
    gap: 36px;
    width: 100%;

    &__main {
      width: 68%;
    }
    &__sub {
      flex: 1;
    }
  }
`;
const newestQueryLatest = query(
  collection(db, 'posts'),
  where('status', '==', 1),
  orderBy('createdAt', 'desc'),
  limit(5)
);
const sharingQueryLatest = query(
  collection(db, 'posts'),
  where('status', '==', 1),
  where('category', '==', 'Sharing'),
  orderBy('createdAt', 'desc'),
  limit(10)
);
const foodNDrinkQueryLatest = query(
  collection(db, 'posts'),
  where('status', '==', 1),
  where('category', '==', 'Food n Drink'),
  orderBy('createdAt', 'desc'),
  limit(5)
);
const catHealthQueryLatest = query(
  collection(db, 'posts'),
  where('status', '==', 1),
  where('category', '==', 'Cat Health'),
  orderBy('createdAt', 'desc'),
  limit(3)
);

const LatestPage = () => {
  useScrollOnTop();
  useEffect(() => {
    document.title = 'Dogtor Blogging';
  }, []);

  const newestPosts = useMultiDocs({ query: newestQueryLatest });
  const sharingPosts = useMultiDocs({ query: sharingQueryLatest });
  const foodNDrinkPosts = useMultiDocs({
    query: foodNDrinkQueryLatest,
  });
  const catHealthPosts = useMultiDocs({ query: catHealthQueryLatest });

  return (
    <LatestStyled>
      {newestPosts && newestPosts.length > 0 && (
        <MatrixPost posts={newestPosts} />
      )}
      {sharingPosts && sharingPosts.length > 0 && (
        <SwiperPost posts={sharingPosts} title="SHARING" />
      )}
      {foodNDrinkPosts && foodNDrinkPosts.length > 0 && (
        <MatrixPost posts={foodNDrinkPosts} type={2} />
      )}
      {foodNDrinkPosts && foodNDrinkPosts.length > 0 && (
        <div className="latestPage-listSection">
          <div className="latestPage-listSection__main">
            <ListPost
              orderByField="createdAt"
              orderByType="desc"
              postPerLoad={10}
            />
          </div>
          <div className="latestPage-listSection__sub">
            {catHealthPosts && catHealthPosts.length > 0 && (
              <SidePost posts={catHealthPosts} title="Cat Health" />
            )}
          </div>
        </div>
      )}
    </LatestStyled>
  );
};

export default LatestPage;
