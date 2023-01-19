import styled from 'styled-components';

import { HeaderMainSection } from './HeaderMainSection';
import HeaderNavSection from './HeaderNavSection';

const HeaderStyled = styled.header`
  display: flex;
  flex-direction: column;
  width: 100vw;
`;

const Header = () => {
  return (
    <HeaderStyled>
      <HeaderMainSection />
      <HeaderNavSection />
    </HeaderStyled>
  );
};

export { Header };
