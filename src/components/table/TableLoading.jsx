import styled, { css } from 'styled-components';
import { mobile, tablet, tabletAndMobile } from '~/styles/responsive';
import LoadingBounce from '../loading/Bounce';

const TableLoadingStyled = styled.div`
  ${tabletAndMobile(css`
    position: relative;
    padding: 15px 0;
  `)}
  .table-loading--tablet {
    ${tablet(css`
      position: sticky;
      top: 0;
      left: 0;
      width: calc(40.5em);
      margin-left: 0 !important;
    `)}
    ${mobile(css`
      position: sticky;
      top: 0;
      left: 0;
      width: calc(23.5em);
      margin-left: 0 !important;
    `)}
  }
`;

const TableLoading = () => {
  return (
    <TableLoadingStyled>
      <div className="table-loading--tablet">
        <LoadingBounce />
      </div>
    </TableLoadingStyled>
  );
};

export { TableLoading };
