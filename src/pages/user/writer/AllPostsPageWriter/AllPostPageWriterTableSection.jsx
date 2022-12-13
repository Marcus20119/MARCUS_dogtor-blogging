import {
  collection,
  deleteDoc,
  doc,
  orderBy,
  limit,
  getDocs,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { Fragment, useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import Button from '~/components/button';

import { Table, IconButton, PostCell, StatusTag } from '~/components/table';
import { useFirebase } from '~/contexts/firebaseContext';
import { db } from '~/firebase/firebase-config';
import { useMultiDocsPagination, useQuantityOfCollection } from '~/hooks';
import { EyeIcon, TrashIcon, WriteIcon } from '~/icons';

const AllPostTableHeadStyled = styled.thead`
  .allPage-firstRow {
    th:nth-child(1) {
      width: 70px;
      text-align: center !important;
    }
    th:nth-child(2) {
      width: 400px;
    }
  }
`;
const AllPostTableBodyStyled = styled.tbody`
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
  .allPage-postAuthor {
    height: 100%;
    span {
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }
`;

const AllPostPageWriterTableSection = ({ categoryValue }) => {
  const { userDocument } = useFirebase();

  const handleDeletePost = async postId => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8d351a',
      cancelButtonColor: '#8d351a50',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        await deleteDoc(doc(db, 'posts', postId));
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  };

  let quantityQuery;
  let firstQuery;
  if (categoryValue && categoryValue !== 'All categories') {
    quantityQuery = query(
      collection(db, 'posts'),
      where('userId', '==', userDocument.id),
      where('category', '==', categoryValue),
      orderBy('createdAt', 'desc')
    );

    firstQuery = query(
      collection(db, 'posts'),
      where('userId', '==', userDocument.id),
      where('category', '==', categoryValue),
      orderBy('createdAt', 'desc'),
      limit(2)
    );
  } else {
    quantityQuery = query(
      collection(db, 'posts'),
      where('userId', '==', userDocument.id),
      orderBy('createdAt', 'desc')
    );

    firstQuery = query(
      collection(db, 'posts'),
      where('userId', '==', userDocument.id),
      orderBy('createdAt', 'desc'),
      limit(2)
    );
  }
  const quantity = useQuantityOfCollection({ query: quantityQuery });

  // Set first query

  const [lastSnapshot, setLastSnapshot] = useState({});
  const [nextQuery, setNextQuery] = useState();

  const posts = useMultiDocsPagination({
    firstQuery,
    nextQuery,
    setLastSnapshot,
    reRenderCondition: categoryValue,
  });
  const handleLoadMore = () => {
    let nextDataQuery;
    if (categoryValue && categoryValue !== 'All categories') {
      nextDataQuery = query(
        collection(db, 'posts'),
        where('userId', '==', userDocument.id),
        where('category', '==', categoryValue),
        orderBy('createdAt', 'desc'),
        startAfter(lastSnapshot),
        limit(2)
      );
    } else {
      nextDataQuery = query(
        collection(db, 'posts'),
        where('userId', '==', userDocument.id),
        orderBy('createdAt', 'desc'),
        startAfter(lastSnapshot),
        limit(2)
      );
    }
    setNextQuery(nextDataQuery);
  };

  return (
    <Fragment>
      <Table>
        <AllPostTableHeadStyled>
          <tr className="allPage-firstRow">
            <th>No.</th>
            <th>Post</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </AllPostTableHeadStyled>
        <AllPostTableBodyStyled>
          {posts &&
            posts.length > 0 &&
            posts.map((post, index) => (
              <tr key={post.id}>
                <td className="allPage-postId">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </td>
                <td>
                  <PostCell postData={post} />
                </td>
                <td className="allPage-postAuthor">
                  <span>{post.author}</span>
                </td>
                <td className="allPage-postStatus">
                  <StatusTag status={post.status} />
                </td>
                <td className="allPage-postAction">
                  <div>
                    <IconButton>
                      <EyeIcon />
                    </IconButton>
                    <IconButton>
                      <WriteIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeletePost(post.id)}>
                      <TrashIcon />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))}
          {!posts ||
            (posts.length === 0 && (
              <tr>
                <td colSpan="5">
                  You still do not have any posts about this section yet!
                </td>
              </tr>
            ))}
        </AllPostTableBodyStyled>
      </Table>
      {posts && posts.length < quantity && (
        <Button
          width="150px"
          style={{ margin: '24px auto 32px' }}
          onClick={handleLoadMore}
        >
          Load More
        </Button>
      )}
    </Fragment>
  );
};

export default AllPostPageWriterTableSection;
