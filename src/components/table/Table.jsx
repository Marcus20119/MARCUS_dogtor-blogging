import styled, { css } from 'styled-components';
import { tabletAndMobile } from '~/styles/responsive';

const TableStyled = styled.div`
  overflow-x: auto;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 1px 2px 0px #8d351a30, 0px 2px 6px 2px #8d351a30;
  border: solid 1px #8d351a10;
  max-width: 100%;

  table,
  td,
  th {
    border-collapse: collapse;
    font-family: ${props => props.theme.font.tertiary};
  }
  table {
    width: 100%;
    table-layout: fixed;
    height: 1px;

    ${tabletAndMobile(css`
      max-width: 100%;
      overflow-x: auto;
    `)}
  }
  thead {
    background-color: #f7f7f8;
  }
  th,
  td {
    vertical-align: middle;
    text-align: left;
    border-bottom: solid 1px #e5e5e9;
  }
  th {
    padding: 20px 15px;
    font-weight: 600;
  }
  td {
    padding: 15px 15px;
  }
  tr:last-child {
    td {
      border-bottom: none;
    }
  }
`;

const Table = ({ children }) => {
  return (
    <TableStyled>
      <table>{children}</table>
    </TableStyled>
  );
};

export { Table };
