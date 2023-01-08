import {
  collection,
  deleteDoc,
  doc,
  orderBy,
  limit,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { Fragment } from 'react';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import Button from '~/components/button';
import LoadingBounce from '~/components/loading/Bounce';

import {
  Table,
  IconLink,
  IconButton,
  PostCell,
  StatusTag,
} from '~/components/table';
import { db } from '~/firebase/firebase-config';
import {
  deleteOldImage,
  useMultiDocsPagination,
  useQuantityOfCollection,
} from '~/firebase/funcs';
import { EyeIcon, TrashIcon, WriteIcon } from '~/icons';

const AllPostAdminTableHeadStyled = styled.thead`
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
const AllPostAdminTableBodyStyled = styled.tbody`
  .allPage-postId {
    text-align: center !important;
  }
  .allPage-postAction {
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

const TableSectionAdmin = ({ categoryValue, searchValue }) => {
  const { imgURLs, categories: initialCategories } = useOutletContext();

  const [categories, setCategories] = useState(initialCategories);

  const handleDeleteCategory = async category => {
    Swal.fire({
      title: `You shouldn't do this!`,
      text: 'This action will cause a huge damage to your data!',
      icon: 'warning',
      scrollbarPadding: false,
      cancelButtonColor: '#8d351a50',
    });
  };
  const handleEditCategory = async category => {
    Swal.fire({
      title: `You shouldn't do this!`,
      text: 'This action will cause a huge damage to your data!',
      icon: 'warning',
      scrollbarPadding: false,
      cancelButtonColor: '#8d351a50',
    });
  };

  return (
    <Fragment>
      <Table>
        <AllPostAdminTableHeadStyled>
          <tr className="allPage-firstRow">
            <th>No.</th>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Actions</th>
          </tr>
        </AllPostAdminTableHeadStyled>
        <AllPostAdminTableBodyStyled>
          {categories &&
            categories.length > 0 &&
            categories.map((category, index) => (
              <tr key={category.id}>
                <td className="allPage-postId">
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
                <td className="allPage-postAction">
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
        </AllPostAdminTableBodyStyled>
      </Table>
    </Fragment>
  );
};

export default TableSectionAdmin;
