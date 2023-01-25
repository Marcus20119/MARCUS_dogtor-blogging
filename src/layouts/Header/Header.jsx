import styled, { css } from 'styled-components';
import { tabletAndMobile } from '~/styles/responsive';

import { HeaderMainSection } from './HeaderMainSection';
import HeaderNavSection from './HeaderNavSection';

const HeaderStyled = styled.header`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 12px);

  ${tabletAndMobile(css`
    width: 100vw;
  `)}
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
