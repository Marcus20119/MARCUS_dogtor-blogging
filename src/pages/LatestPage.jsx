import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MatrixPost } from '~/components/module';
import { ListPost } from '~/components/module/ListPost';
import { useAuth } from '~/contexts/authContext';
import { db } from '~/firebase/firebase-config';

const LatestStyled = styled.div`
  width: 100%;
  .latestPage-lists {
    margin: 48px 0;
  }
`;

const LatestPage = () => {
  const { userInfo } = useAuth();
  const [posts, setPosts] = useState();

  useEffect(() => {
    const getPost = async () => {
      const queries = query(
        collection(db, 'posts'),
        where('status', '==', 1),
        limit(10)
      );
      return new Promise(function (resolve, reject) {
        onSnapshot(queries, snapshot => {
          let posts = [];
          snapshot.docs.forEach(doc => {
            posts.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          resolve(posts);
        });
      });
    };
    const handleGetPost = async () => {
      try {
        const postData = await getPost();
        setPosts(postData);
      } catch (err) {
        console.log(err);
      }
    };
    handleGetPost();
  }, []);
  return (
    <LatestStyled>
      <MatrixPost />
      <div className="latestPage-lists">
        {posts && posts.length > 0 && (
          <ListPost posts={posts} title="Sharing" />
        )}
      </div>
    </LatestStyled>
  );
};

export default LatestPage;
