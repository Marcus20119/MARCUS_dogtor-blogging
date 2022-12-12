import { collection, query, orderBy, where, limit } from 'firebase/firestore';
import { useState } from 'react';
import styled from 'styled-components';

import { SelectNoForm } from '~/components/form/select';
import UserSectionTitle from '~/components/module/user/UserSectionTitle';
import { useFirebase } from '~/contexts/firebaseContext';
import { db } from '~/firebase/firebase-config';
import AllPostPageWriterTableSection from './AllPostPageWriterTableSection';

const AllPostsPageWriterStyled = styled.div`
  width: 100%;
  .allPage-input {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 24px;
    width: 100%;
    margin-bottom: 24px;

    &__category {
      width: 30%;
      min-width: 200px;
    }
  }
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
  const { userDocument, categoriesName } = useFirebase();
  const [categoryValue, setCategoryValue] = useState('');
  let q = [];
  if (categoryValue && categoryValue !== 'All categories') {
    q = query(
      collection(db, 'posts'),
      where('userId', '==', userDocument.id),
      where('category', '==', categoryValue),
      orderBy('createdAt', 'desc'),
      limit(20)
    );
  } else {
    q = query(
      collection(db, 'posts'),
      where('userId', '==', userDocument.id),
      orderBy('createdAt', 'desc'),
      limit(20)
    );
  }
  console.log('categoryValue', categoryValue);

  return (
    <AllPostsPageWriterStyled>
      {userDocument?.fullname && (
        <UserSectionTitle>{`${
          userDocument.fullname.split(' ')[0]
        }'s Posts`}</UserSectionTitle>
      )}
      <div className="allPage-input">
        <div className="allPage-input__category">
          <SelectNoForm
            name="category"
            defaultOption="All categories"
            options={['All categories', ...categoriesName]}
            setValue={setCategoryValue}
          />
        </div>
      </div>
      <AllPostPageWriterTableSection query={q} />
    </AllPostsPageWriterStyled>
  );
};

export default AllPostsPageWriter;
