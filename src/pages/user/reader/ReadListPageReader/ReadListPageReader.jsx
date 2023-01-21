import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import {
  useNavigate,
  useOutletContext,
  useSearchParams,
} from 'react-router-dom';
import styled, { css } from 'styled-components';

import { SelectNoForm } from '~/components/form/select';
import UserSectionTitle from '~/components/module/user/UserSectionTitle';
import { SearchBar } from '~/components/search';
import NotFoundPage from '~/pages/NotFoundPage';
import { mobile } from '~/styles/responsive';
import TableSectionReader from './TableSectionReader';

const ReadListPageReaderStyled = styled.div`
  width: 100%;
  margin-bottom: 32px;

  .readListPage-input {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 24px;
    width: 100%;
    margin-bottom: 24px;
    ${mobile(css`
      flex-direction: column;
      gap: 16px;

      div:first-child {
        width: 100% !important;
      }
    `)}

    &__category {
      width: 30%;
      min-width: 200px;

      ${mobile(css`
        width: 100%;
      `)}
    }
  }
`;

const ReadListPageReader = () => {
  const navigateTo = useNavigate();
  const { categoriesName, userDocument } = useOutletContext();
  const [query] = useSearchParams();
  const [categoryValue, setCategoryValue] = useState(
    !query.get('category') ? 'All categories' : query.get('category')
  );

  const [searchValue, setSearchValue] = useState(query.get('search') || '');
  const handleSetSearchValue = debounce(e => {
    setSearchValue(e.target.value);
  }, 500);

  useEffect(() => {
    navigateTo({
      pathname: '/user/reader/read-list',
      search: `?category=${categoryValue}&search=${searchValue}`,
    });
  }, [categoryValue, navigateTo, searchValue]);

  // Nếu không phải là writer thì trả ra trang NotFound
  if (userDocument.role !== 'reader') {
    return <NotFoundPage />;
  }

  return (
    <ReadListPageReaderStyled>
      {userDocument?.userName && <UserSectionTitle>Read List</UserSectionTitle>}
      <div className="readListPage-input">
        <SearchBar
          name="searchQuery"
          placeholder="Search your post..."
          onChange={handleSetSearchValue}
          defaultValue={searchValue}
          width="unset"
          height="unset"
          style={{ flex: 1 }}
        />
        <div className="readListPage-input__category">
          <SelectNoForm
            name="category"
            defaultOption={categoryValue}
            options={['All categories', ...categoriesName]}
            setValue={setCategoryValue}
          />
        </div>
      </div>
      <TableSectionReader
        categoryValue={categoryValue}
        searchValue={searchValue}
      />
    </ReadListPageReaderStyled>
  );
};

export default ReadListPageReader;
