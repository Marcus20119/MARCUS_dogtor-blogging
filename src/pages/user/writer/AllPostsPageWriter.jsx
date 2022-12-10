import { collection, query, orderBy } from 'firebase/firestore';
import styled from 'styled-components';

import UserSectionTitle from '~/components/module/user/UserSectionTitle';
import { Table } from '~/components/table';
import IconButton from '~/components/table/IconButton';
import PostCell from '~/components/table/PostCell';
import { useFirebase } from '~/contexts/firebaseContext';
import { db } from '~/firebase/firebase-config';
import { useMultiDocsRealtime } from '~/hooks';
import { EyeIcon, TrashIcon, WriteIcon } from '~/icons';

const AllPostsPageWriterStyled = styled.div`
  width: 100%;
  .allPage-firstRow {
    th:nth-child(1) {
      width: 70px;
      text-align: center !important;
    }
    th:nth-child(2) {
      width: 400px;
    }
  }
  .allPage-postId {
    text-align: center !important;
  }
  .allPage-postAction {
    display: flex;
    align-items: center;
    gap: 12px;
    height: 100%;
  }
`;

const AllPostsPageWriter = () => {
  const { userDocument } = useFirebase();
  const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
  const posts = useMultiDocsRealtime({ query: q });

  return (
    <AllPostsPageWriterStyled>
      {userDocument?.fullname && (
        <UserSectionTitle>{`${
          userDocument.fullname.split(' ')[0]
        }'s Posts`}</UserSectionTitle>
      )}
      {posts && posts.length > 0 && (
        <Table>
          <thead>
            <tr className="allPage-firstRow">
              <th>No.</th>
              <th>Post</th>
              <th>Category</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post.id}>
                <td className="allPage-postId">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </td>
                <td>
                  <PostCell postData={post} />
                </td>
                <td>{post.category}</td>
                <td>{post.author}</td>
                <td className="allPage-postAction">
                  <IconButton>
                    <EyeIcon />
                  </IconButton>
                  <IconButton>
                    <WriteIcon />
                  </IconButton>
                  <IconButton>
                    <TrashIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </AllPostsPageWriterStyled>
  );
};

export default AllPostsPageWriter;
