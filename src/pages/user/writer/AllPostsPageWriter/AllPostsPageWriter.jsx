import { useEffect, useState } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { SelectNoForm } from '~/components/form/select';
import UserSectionTitle from '~/components/module/user/UserSectionTitle';
import { useFirebase } from '~/contexts/firebaseContext';
import TableSection from './TableSection';

const AllPostsPageWriterStyled = styled.div`
  width: 100%;
  margin-bottom: 32px;

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
`;

const AllPostsPageWriter = () => {
  const userDocument = useOutletContext();
  const { categoriesName } = useFirebase();
  const [query] = useSearchParams();
  const categoryQuery = query.get('category');
  const [categoryValue, setCategoryValue] = useState(
    !categoryQuery
      ? 'All categories'
      : categoryQuery === 'Food'
      ? 'Food & Drink'
      : categoryQuery
  );
  console.log('categoryValue', categoryValue);
  return (
    <AllPostsPageWriterStyled>
      {userDocument?.userName && (
        <UserSectionTitle>{`${
          userDocument.userName.split(' ')[0]
        }'s Posts`}</UserSectionTitle>
      )}
      <div className="allPage-input">
        <div className="allPage-input__category">
          <SelectNoForm
            name="category"
            defaultOption={categoryValue}
            options={['All categories', ...categoriesName]}
            setValue={setCategoryValue}
            navigateBasePath="/user/writer/all-posts?category="
          />
        </div>
      </div>
      <TableSection categoryValue={categoryValue} />
    </AllPostsPageWriterStyled>
  );
};

export default AllPostsPageWriter;
