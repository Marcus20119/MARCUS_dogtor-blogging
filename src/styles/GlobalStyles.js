import { createGlobalStyle } from 'styled-components';
import { GlobalClasses } from './GlobalClasses';
import { ResetClasses } from './ResetClasses';

export const GlobalStyles = createGlobalStyle`
  ${ResetClasses}
  ${GlobalClasses}
`;
