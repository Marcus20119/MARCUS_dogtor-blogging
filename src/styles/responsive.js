import { css } from 'styled-components';

export const mobile = inner => css`
  @media only screen and (max-width: 46.1875em) {
    ${inner};
  }
`;
export const tablet = inner => css`
  @media only screen and (max-width: 63.9375em) and (min-width: 46.25em) {
    ${inner};
  }
`;
export const tabletAndMobile = inner => css`
  @media only screen and (max-width: 63.9375em) {
    ${inner};
  }
`;
export const laptop = inner => css`
  @media only screen and (min-width: 64em) {
    ${inner};
  }
`;
