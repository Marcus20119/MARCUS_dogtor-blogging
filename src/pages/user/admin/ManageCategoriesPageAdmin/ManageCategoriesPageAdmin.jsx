import { useNavigate, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import Button from '~/components/button';

import UserSectionTitle from '~/components/module/user/UserSectionTitle';
import NotFoundPage from '~/pages/NotFoundPage';
import TableSectionAdmin from './TableSectionAdmin';

const ManageCategoriesPageAdminStyled = styled.div`
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

const ManageCategoriesPageAdmin = () => {
  const { userDocument } = useOutletContext();
  const navigateTo = useNavigate();

  // Nếu không phải là admin thì trả ra trang NotFound
  if (userDocument.role !== 'admin') {
    return <NotFoundPage />;
  }

  return (
    <ManageCategoriesPageAdminStyled>
      {userDocument?.userName && (
        <UserSectionTitle>All Categories</UserSectionTitle>
      )}
      <div className="allPage-input">
        <div className="allPage-input__category">
          <Button
            onClick={() => {
              navigateTo('/user/admin/add-category');
            }}
          >
            Create New Category
          </Button>
        </div>
      </div>

      <TableSectionAdmin />
    </ManageCategoriesPageAdminStyled>
  );
};

export default ManageCategoriesPageAdmin;
