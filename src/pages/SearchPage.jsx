import { useEffect } from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { ListPost } from '~/components/module';

const SearchPageStyled = styled.div``;
const SearchPage = () => {
  const [query] = useSearchParams();

  const [layoutSearchValue, setLayoutSearchValue] = useState('');
  useEffect(() => {
    setLayoutSearchValue(query.get('layoutSearch'));
  }, [query]);

  return (
    <SearchPageStyled>
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
