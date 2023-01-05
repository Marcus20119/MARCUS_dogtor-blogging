import { debounce } from 'lodash';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  useNavigate,
  useOutletContext,
  useSearchParams,
} from 'react-router-dom';
import styled from 'styled-components';

import { SelectNoForm } from '~/components/form/select';
import UserSectionTitle from '~/components/module/user/UserSectionTitle';
import { SearchBar } from '~/components/search';
import NotFoundPage from '~/pages/NotFoundPage';
import TableSectionAdmin from './TableSectionAdmin';

const ManagePostsPageAdminStyled = styled.div`
  width: 100%;
  margin-bottom: 32px;

  .allPage-input {
    display: flex;
    justify-content: flex-end;
    align-items: stretch;
    gap: 24px;
    width: 100%;
    margin-bottom: 24px;

    &__category {
      width: 30%;
      min-width: 200px;
    }
  }
`;

const ManagePostsPageAdmin = () => {
  const navigateTo = useNavigate();
  const { categoriesName, userDocument } = useOutletContext();
  const [query] = useSearchParams();
  const [categoryValue, setCategoryValue] = useState(
    query.get('category') || 'All categories'
  );

  const [searchValue, setSearchValue] = useState(query.get('search') || '');
  const handleSetSearchValue = debounce(e => {
    setSearchValue(e.target.value);
  }, 500);

  useEffect(() => {
    navigateTo({
      pathname: '/user/admin/all-posts',
      search: `?category=${categoryValue}&search=${searchValue}`,
    });
  }, [categoryValue, navigateTo, searchValue]);

  // Nếu không phải là admin thì trả ra trang NotFound
  if (userDocument.role !== 'admin') {
    return <NotFoundPage />;
  }

  return (
    <ManagePostsPageAdminStyled>
      {userDocument?.userName && (
        <UserSectionTitle>{`${
          userDocument.userName.split(' ')[0]
        }'s Posts`}</UserSectionTitle>
      )}
      <div className="allPage-input">
        <SearchBar
          name="searchQuery"
          placeholder="Search your post..."
          onChange={handleSetSearchValue}
          defaultValue={searchValue}
          width="unset"
          height="unset"
          style={{ flex: 1 }}
        />
        <div className="allPage-input__category">
          <SelectNoForm
            name="category"
            defaultOption={categoryValue}
            options={['All categories', ...categoriesName]}
            setValue={setCategoryValue}
          />
        </div>
      </div>

      <TableSectionAdmin
        categoryValue={categoryValue}
        searchValue={searchValue}
      />
    </ManagePostsPageAdminStyled>
  );
};

export default ManagePostsPageAdmin;
