import { debounce } from 'lodash';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { ListPost } from '~/components/module';
import { SearchBar } from '~/components/search';
import { useScrollOnTop } from '~/hooks';
import { mobile } from '~/styles/responsive';

const SearchPageStyled = styled.div`
  .searchPage-mobile {
    display: none;

    ${mobile(css`
      display: block;
      margin-bottom: 24px;
    `)}
  }
`;
const SearchPage = () => {
  useScrollOnTop();
  const [query] = useSearchParams();

  const [layoutSearchValue, setLayoutSearchValue] = useState('');
  useEffect(() => {
    setLayoutSearchValue(query.get('layoutSearch'));
  }, [query]);

  const navigateTo = useNavigate();
  const { pathname } = useLocation();
  const [historyNum, setHistoryNum] = useState(
    query.get('layoutSearch') ? 1 : 0
  );

  const handleSetLayoutSearchValue = debounce(e => {
    if (e.target.value) {
      navigateTo(`/search?layoutSearch=${e.target.value}`);
      setHistoryNum(prev => prev + 1);
    } else {
      window.history.go(-historyNum);
      setHistoryNum(0);
    }
  }, 500);

  // Reset value khi đổi route
  const forceResetValue = pathname !== '/search';
  const searchRef = useRef();
  useEffect(() => {
    if (searchRef.current && forceResetValue) {
      searchRef.current.value = '';
      setHistoryNum(0);
    }
  }, [forceResetValue]);

  // Auto focus
  useEffect(() => {
    if (searchRef?.current?.value) {
      searchRef.current.focus();
    }
  }, []);

  return (
    <SearchPageStyled>
      <div className="searchPage-mobile">
        <SearchBar
          ref={searchRef}
          name="layoutSearchQuery"
          placeholder="Search posts..."
          defaultValue={query.get('layoutSearch')}
          width="100%"
          onChange={handleSetLayoutSearchValue}
        />
      </div>
      {layoutSearchValue && (
        <ListPost
          searchQuery={layoutSearchValue}
          reRenderCondition={layoutSearchValue}
        />
      )}
    </SearchPageStyled>
  );
};

export default SearchPage;
