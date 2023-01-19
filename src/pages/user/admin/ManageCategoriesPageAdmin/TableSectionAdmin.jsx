import { Fragment } from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import LoadingBounce from '~/components/loading/Bounce';
import { Table, IconLink, IconButton } from '~/components/table';
import { TrashIcon, WriteIcon } from '~/icons';

const AllCategoriesAdminTableHeadStyled = styled.thead`
  .allPage-firstRow {
    th:nth-child(1) {
      width: 70px;
      text-align: center !important;
    }
    th:nth-child(2) {
      width: 330px;
    }
    th:last-child {
      width: 150px;
    }
  }
`;
const AllCategoryAdminTableBodyStyled = styled.tbody`
  .allPage-categoryId {
    text-align: center !important;
  }
  .allPage-categoryAction {
    div {
      display: flex;
      align-items: center;
      gap: 12px;
    }
  }
  td {
    span {
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
  }
`;

const TableSectionAdmin = () => {
  const { categories } = useOutletContext();

  const handleDeleteCategory = async () => {
    Swal.fire({
      title: `You shouldn't do this!`,
      text: 'This action will cause a huge damage to your data!',
      icon: 'warning',
      scrollbarPadding: false,
      confirmButtonColor: '#8d351a',
    });
  };
  const handleEditCategory = async () => {
    Swal.fire({
      title: `You shouldn't do this!`,
      text: 'This action will cause a huge damage to your data!',
      icon: 'warning',
      scrollbarPadding: false,
      confirmButtonColor: '#8d351a',
    });
  };

  return (
    <Fragment>
      <Table>
        <AllCategoriesAdminTableHeadStyled>
          <tr className="allPage-firstRow">
            <th>No.</th>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Group</th>
            <th>Actions</th>
          </tr>
        </AllCategoriesAdminTableHeadStyled>
        <AllCategoryAdminTableBodyStyled>
          {categories &&
            categories.length > 0 &&
            categories.map((category, index) => (
              <tr key={category.id}>
                <td className="allPage-categoryId">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </td>
                <td title={category.id}>
                  <span>{category.id}</span>
                </td>
                <td title={category.name}>
                  <span>{category.name}</span>
                </td>
                <td title={category.slug}>
                  <span>{category.slug}</span>
                </td>
                <td>
                  <span>{category.group}</span>
                </td>
                <td className="allPage-categoryAction">
                  <div>
                    <IconLink onClick={handleEditCategory} title="edit">
                      <WriteIcon />
                    </IconLink>
                    <IconButton onClick={handleDeleteCategory} title="delete">
                      <TrashIcon />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))}
          {(!categories || categories.length === 0) && (
            <tr>
              <td colSpan="5">
                <LoadingBounce />
              </td>
            </tr>
          )}
        </AllCategoryAdminTableBodyStyled>
      </Table>
    </Fragment>
  );
};

export default TableSectionAdmin;
