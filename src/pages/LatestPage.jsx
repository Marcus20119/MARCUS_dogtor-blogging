import { collection, limit, query, where, orderBy } from 'firebase/firestore';
import { useEffect } from 'react';
import styled from 'styled-components';

import { MatrixPost, SwiperPost } from '~/components/module';
import { db } from '~/firebase/firebase-config';
import { useMultiDocsRealtime } from '~/firebase/funcs';

const LatestStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 60px;
  width: 100%;

  .latestPage-wrap {
    position: relative;
    width: 100%;
    height: 650px;

    &__full {
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: calc(100vw - 12px);
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: radial-gradient(
        circle,
        rgba(209, 171, 123, 0.6) 0%,
        #baa27750 70%
      );
      box-shadow: 0px 1px 2px 0px rgb(60 64 67 / 30%),
        0px 2px 6px 2px rgb(60 64 67 / 15%);
      border: 1px solid rgba(0, 0, 0, 0.2);
      &-container {
        width: 1280px;
      }
    }
  }

  .latestPage-listSection {
    display: flex;
    align-items: flex-start;
    gap: 24px;
    width: 100%;

    &__main {
      width: 70%;
    }
    &__sub {
      flex: 1;
    }
  }
`;
const newestQuery = query(
  collection(db, 'posts'),
  where('status', '==', 1),
  orderBy('createdAt', 'desc'),
  limit(5)
);
const sharingQuery = query(
  collection(db, 'posts'),
  where('status', '==', 1),
  where('category', '==', 'Sharing'),
  orderBy('createdAt', 'desc'),
  limit(10)
);
const catHealthQuery = query(
  collection(db, 'posts'),
  where('status', '==', 1),
  where('category', '==', 'Food n Drink'),
  orderBy('createdAt', 'desc'),
  limit(5)
);
const listQuery = query(
  collection(db, 'posts'),
  where('status', '==', 1),
  where('category', '==', 'Life Style'),
  orderBy('createdAt', 'desc'),
  limit(5)
);

const LatestPage = () => {
  useEffect(() => {
    document.title = 'Dogtor Blogging';
  }, []);

  const newestPosts = useMultiDocsRealtime({ query: newestQuery });
  const sharingPosts = useMultiDocsRealtime({ query: sharingQuery });
  const catHealthPosts = useMultiDocsRealtime({ query: catHealthQuery });
  const listPosts = useMultiDocsRealtime({ query: listQuery });

  return (
    <LatestStyled>
      {newestPosts && newestPosts.length > 0 && (
        <MatrixPost posts={newestPosts} />
      )}
      {sharingPosts && sharingPosts.length > 0 && (
        <SwiperPost posts={sharingPosts} title="SHARING" />
      )}
      <div className="latestPage-wrap">
        <div className="latestPage-wrap__full">
          <div className="latestPage-wrap__full-container">
            {catHealthPosts && catHealthPosts.length > 0 && (
              <MatrixPost posts={catHealthPosts} />
            )}
          </div>
        </div>
      </div>
      <div className="latestPage-listSection">
        <div className="latestPage-listSection__main">
          {/* {listPosts && listPosts.length > 0 && <ListPost posts={listPosts} />} */}
        </div>
        <div className="latestPage-listSection__sub"></div>
      </div>
    </LatestStyled>
  );
};

export default LatestPage;
