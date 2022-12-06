import { collection, query, orderBy } from 'firebase/firestore';
import styled from 'styled-components';

import UserSectionTitle from '~/components/module/user/UserSectionTitle';
import { Table } from '~/components/table';
import { useFirebase } from '~/contexts/firebaseContext';
import { db } from '~/firebase/firebase-config';
import { useMultiDocsRealtime } from '~/hooks';

const AllPostsPageWriterStyled = styled.div`
  width: 100%;
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
          <tr>
            <th>No.</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </Table>
      )}
    </AllPostsPageWriterStyled>
  );
};

export default AllPostsPageWriter;
