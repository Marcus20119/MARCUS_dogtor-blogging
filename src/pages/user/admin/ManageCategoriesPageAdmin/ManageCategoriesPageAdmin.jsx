import { debounce } from 'lodash';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  useNavigate,
  useOutletContext,
  useSearchParams,
} from 'react-router-dom';
import styled from 'styled-components';
import Button from '~/components/button';

import { SelectNoForm } from '~/components/form/select';
import UserSectionTitle from '~/components/module/user/UserSectionTitle';
import { SearchBar } from '~/components/search';
import NotFoundPage from '~/pages/NotFoundPage';
import TableSectionAdmin from './TableSectionAdmin';

const ManageCategoriesPageAdminStyled = styled.div`
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

const ManageCategoriesPageAdmin = () => {
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

  // useEffect(() => {
  //   navigateTo({
  //     pathname: '/user/admin/all-posts',
  //     search: `?category=${categoryValue}&search=${searchValue}`,
  //   });
  // }, [categoryValue, navigateTo, searchValue]);

  // Nếu không phải là admin thì trả ra trang NotFound
  if (userDocument.role !== 'admin') {
    return <NotFoundPage />;
  }

  return (
    <ManageCategoriesPageAdminStyled>
      {userDocument?.userName && (
        <UserSectionTitle>All Categories</UserSectionTitle>
      )}
      <div className="allPage-input">
        <div className="allPage-input__category">
          <Button
          // onClick={handleLoadMore}
          >
            Create New Category
          </Button>
        </div>
      </div>

      <TableSectionAdmin />
    </ManageCategoriesPageAdminStyled>
  );
};

export default ManageCategoriesPageAdmin;
