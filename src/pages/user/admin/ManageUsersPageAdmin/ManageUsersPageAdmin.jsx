import { useEffect } from 'react';
import { useState } from 'react';
import {
  useNavigate,
  useOutletContext,
  useSearchParams,
} from 'react-router-dom';
import styled from 'styled-components';

import { SelectNoForm } from '~/components/form/select';
import UserSectionTitle from '~/components/module/user/UserSectionTitle';
import NotFoundPage from '~/pages/NotFoundPage';
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

    &__category {
      width: 30%;
      min-width: 200px;
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
  if (userDocument.role !== 'admin') {
    return <NotFoundPage />;
  }

  return (
    <ManageUsersPageAdminStyled>
      {userDocument?.userName && (
        <UserSectionTitle>{`${
          userDocument.userName.split(' ')[0]
        }'s Posts`}</UserSectionTitle>
      )}
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
