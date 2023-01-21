import { useEffect } from 'react';
import { useState } from 'react';
import {
  useNavigate,
  useOutletContext,
  useSearchParams,
} from 'react-router-dom';
import styled, { css } from 'styled-components';

import { SelectNoForm } from '~/components/form/select';
import UserSectionTitle from '~/components/module/user/UserSectionTitle';
import { mobile } from '~/styles/responsive';
// import NotFoundPage from '~/pages/NotFoundPage';
import TableSectionAdmin from './TableSectionAdmin';

const ManageUsersPageAdminStyled = styled.div`
  width: 100%;
  margin-bottom: 32px;

  .allPage-input {
    display: flex;
    justify-content: flex-end;
    align-items: stretch;
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

const ManageUsersPageAdmin = () => {
  const navigateTo = useNavigate();
  const { userDocument } = useOutletContext();
  const [query] = useSearchParams();
  const [roleValue, setRoleValue] = useState(query.get('role') || 'All roles');

  useEffect(() => {
    navigateTo({
      pathname: '/user/admin/all-users',
      search: `?category=${roleValue}`,
    });
  }, [roleValue, navigateTo]);

  // Nếu không phải là admin thì trả ra trang NotFound
  // if (userDocument.role !== 'admin') {
  //   return <NotFoundPage />;
  // }

  return (
    <ManageUsersPageAdminStyled>
      {userDocument?.userName && <UserSectionTitle>All Users</UserSectionTitle>}
      <div className="allPage-input">
        <div className="allPage-input__category">
          <SelectNoForm
            name="category"
            defaultOption={roleValue}
            options={['All roles', 'admin', 'writer', 'reader']}
            setValue={setRoleValue}
            isScroll={false}
          />
        </div>
      </div>

      <TableSectionAdmin roleValue={roleValue} />
    </ManageUsersPageAdminStyled>
  );
};

export default ManageUsersPageAdmin;
