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
import { upperFirst } from 'lodash';
import { Fragment } from 'react';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import Button from '~/components/button';
import LoadingBounce from '~/components/loading/Bounce';

import { Table, IconLink, IconButton, UserCell } from '~/components/table';
import { db } from '~/firebase/firebase-config';
import {
  deleteOldImage,
  useMultiDocsPagination,
  useQuantityOfCollection,
} from '~/firebase/funcs';
import { TrashIcon, WriteIcon } from '~/icons';

const AllUsersAdminTableHeadStyled = styled.thead`
  .allPage-firstRow {
    th:nth-child(1) {
      width: 70px;
      text-align: center !important;
    }
    th:nth-child(2) {
      width: 300px;
    }
  }
`;
const AllUsersAdminTableBodyStyled = styled.tbody`
  .allUser-userIndex {
    text-align: center !important;
  }
  .allPage-userActions {
    div {
      display: flex;
      align-items: center;
      gap: 12px;
    }
  }
  .allPage-userId {
    height: 100%;
    span {
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }
  .allPage-userId,
  .allPage-userEmail,
  .allPage-userTel {
    p {
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
  }
`;

const TableSectionAdmin = ({ roleValue }) => {
  const { imgURLs } = useOutletContext();
  // Set query base on the selected role
  let quantityQuery;
  let firstQuery;
  const postPerLoad = 5;

  if (roleValue && roleValue !== 'All roles') {
    quantityQuery = query(
      collection(db, 'users'),
      where('role', '==', roleValue),
      orderBy('createdAt', 'desc')
    );

    firstQuery = query(
      collection(db, 'users'),
      where('role', '==', roleValue),
      orderBy('createdAt', 'desc'),
      limit(postPerLoad)
    );
  } else {
    quantityQuery = query(
      collection(db, 'users'),
      orderBy('createdAt', 'desc')
    );

    firstQuery = query(
      collection(db, 'users'),
      orderBy('createdAt', 'desc'),
      limit(postPerLoad)
    );
  }

  const quantity = useQuantityOfCollection({ query: quantityQuery });

  // Handle load more data
  const [lastSnapshot, setLastSnapshot] = useState({});
  const [nextQuery, setNextQuery] = useState();
  const {
    data: users,
    setData: setUsers,
    isLoading,
  } = useMultiDocsPagination({
    firstQuery,
    nextQuery,
    setLastSnapshot,
    reRenderCondition: [roleValue],
  });
  const handleLoadMore = () => {
    let nextDataQuery;

    if (roleValue && roleValue !== 'All roles') {
      nextDataQuery = query(
        collection(db, 'users'),
        where('role', '==', roleValue),
        orderBy('createdAt', 'desc'),
        startAfter(lastSnapshot),
        limit(postPerLoad)
      );
    } else {
      nextDataQuery = query(
        collection(db, 'users'),
        orderBy('createdAt', 'desc'),
        startAfter(lastSnapshot),
        limit(postPerLoad)
      );
    }

    setNextQuery(nextDataQuery);
  };

  const handleDeleteUser = async user => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8d351a',
      cancelButtonColor: '#8d351a50',
      confirmButtonText: 'Yes, delete it!',
      scrollbarPadding: false,
    }).then(async result => {
      if (result.isConfirmed) {
        // Loading pop-up
        Swal.fire({
          title: 'Loading...',
          text: 'Please wait',
          imageUrl: imgURLs.loading,
          imageHeight: '60px',
          showConfirmButton: false,
          allowOutsideClick: false,
          scrollbarPadding: false,
        });
        await deleteDoc(doc(db, 'users', user.id));
        if (user.avatar.name !== 'default-user.png') {
          await deleteOldImage({ imgName: user.avatar.name });
        }
        const newUsers = users.filter(dataItem => dataItem.id !== user.id);
        setUsers(newUsers);
        Swal.fire({
          title: 'Deleted!',
          text: 'This user has been deleted.',
          icon: 'success',
          scrollbarPadding: false,
        });
      }
    });
  };

  return (
    <Fragment>
      <Table>
        <AllUsersAdminTableHeadStyled>
          <tr className="allPage-firstRow">
            <th>No.</th>
            <th>User</th>
            <th>Id</th>
            <th>Email</th>
            <th>Tel.</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </AllUsersAdminTableHeadStyled>
        <AllUsersAdminTableBodyStyled>
          {users &&
            users.length > 0 &&
            users.map((user, index) => (
              <tr key={user.id}>
                <td className="allUser-userIndex">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </td>
                <td className="allUser-userCell">
                  <UserCell userData={user} />
                </td>
                <td className="allPage-userId" title={user.id}>
                  <p>{user.id}</p>
                </td>
                <td className="allPage-userEmail" title={user.email}>
                  <p>{user.email}</p>
                </td>
                <td className="allPage-userTel" title={user.phoneNumber}>
                  <p>{user.phoneNumber || '...'}</p>
                </td>
                <td className="allPage-userRole">
                  <p>{upperFirst(user.role)}</p>
                </td>
                <td className="allPage-userActions">
                  <div>
                    <IconLink
                      navigatePath={`/user/admin/edit-user/${user.id}`}
                      title="edit"
                    >
                      <WriteIcon />
                    </IconLink>
                    <IconButton
                      onClick={() => handleDeleteUser(user)}
                      title="delete"
                    >
                      <TrashIcon />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))}
          {isLoading && (
            <tr>
              <td colSpan="7">
                <LoadingBounce />
              </td>
            </tr>
          )}
          {!isLoading &&
            users &&
            users.length === 0 &&
            roleValue !== 'All categories' && (
              <tr>
                <td colSpan="7">No user was found!</td>
              </tr>
            )}
        </AllUsersAdminTableBodyStyled>
      </Table>
      {users && users.length < quantity && (
        <Button
          width="150px"
          style={{ margin: '24px auto 0' }}
          onClick={handleLoadMore}
        >
          Load More
        </Button>
      )}
    </Fragment>
  );
};

export default TableSectionAdmin;
