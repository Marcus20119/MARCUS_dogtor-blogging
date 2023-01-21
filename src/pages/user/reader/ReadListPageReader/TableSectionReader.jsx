import {
  collection,
  doc,
  orderBy,
  limit,
  query,
  startAfter,
  where,
  updateDoc,
} from 'firebase/firestore';
import { Fragment } from 'react';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Swal from 'sweetalert2';
import Button from '~/components/button';

import {
  Table,
  IconLink,
  IconButton,
  PostCell,
  TableLoading,
} from '~/components/table';
import { db } from '~/firebase/firebase-config';
import {
  useMultiDocsPagination,
  useQuantityOfCollection,
} from '~/firebase/funcs';
import { EyeIcon, TrashIcon } from '~/icons';
import { tabletAndMobile } from '~/styles/responsive';

const ReadListReaderTableHeadStyled = styled.thead`
  .readListPage-firstRow {
    th:nth-child(1) {
      width: 70px;
      text-align: center !important;
    }
    th:nth-child(2) {
      width: 500px;
    }
    th:nth-child(3) {
      ${tabletAndMobile(css`
        width: 180px;
      `)}
    }
    th:nth-child(4) {
      ${tabletAndMobile(css`
        width: 120px;
      `)}
    }
  }
`;
const ReadListReaderTableBodyStyled = styled.tbody`
  .readListPage-postId {
    text-align: center !important;
  }
  .readListPage-postAction {
    div {
      display: flex;
      align-items: center;
      gap: 12px;
    }
  }
  .readListPage-postAuthor {
    height: 100%;
    span {
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }
`;

const TableSectionReader = ({ categoryValue, searchValue }) => {
  const { userDocument, imgURLs } = useOutletContext();
  // Set query base on the selected category
  let quantityQuery;
  let firstQuery;
  const postPerLoad = 5;
  if (searchValue) {
    if (categoryValue && categoryValue !== 'All categories') {
      quantityQuery = query(
        collection(db, 'posts'),
        where('usersReading', 'array-contains', userDocument.id),
        where('category', '==', categoryValue),
        where('title', '>=', searchValue),
        where('title', '<=', searchValue + 'utf8'),
        orderBy('title', 'desc')
      );

      firstQuery = query(
        collection(db, 'posts'),
        where('usersReading', 'array-contains', userDocument.id),
        where('category', '==', categoryValue),
        where('title', '>=', searchValue),
        where('title', '<=', searchValue + 'utf8'),
        orderBy('title', 'desc'),
        limit(postPerLoad)
      );
    } else {
      quantityQuery = query(
        collection(db, 'posts'),
        where('usersReading', 'array-contains', userDocument.id),
        where('title', '>=', searchValue),
        where('title', '<=', searchValue + 'utf8'),
        orderBy('title', 'desc')
      );

      firstQuery = query(
        collection(db, 'posts'),
        where('usersReading', 'array-contains', userDocument.id),
        where('title', '>=', searchValue),
        where('title', '<=', searchValue + 'utf8'),
        orderBy('title', 'desc'),
        limit(postPerLoad)
      );
    }
  } else {
    if (categoryValue && categoryValue !== 'All categories') {
      quantityQuery = query(
        collection(db, 'posts'),
        where('usersReading', 'array-contains', userDocument.id),
        where('category', '==', categoryValue),
        orderBy('createdAt', 'desc')
      );

      firstQuery = query(
        collection(db, 'posts'),
        where('usersReading', 'array-contains', userDocument.id),
        where('category', '==', categoryValue),
        orderBy('createdAt', 'desc'),
        limit(postPerLoad)
      );
    } else {
      quantityQuery = query(
        collection(db, 'posts'),
        where('usersReading', 'array-contains', userDocument.id),
        orderBy('createdAt', 'desc')
      );

      firstQuery = query(
        collection(db, 'posts'),
        where('usersReading', 'array-contains', userDocument.id),
        orderBy('createdAt', 'desc'),
        limit(postPerLoad)
      );
    }
  }

  const quantity = useQuantityOfCollection({ query: quantityQuery });

  // Handle load more data
  const [lastSnapshot, setLastSnapshot] = useState({});
  const [nextQuery, setNextQuery] = useState();
  const {
    data: posts,
    setData: setPosts,
    isLoading,
    isLoadingFirstTime,
  } = useMultiDocsPagination({
    firstQuery,
    nextQuery,
    setLastSnapshot,
    reRenderCondition: [categoryValue, searchValue],
  });
  const handleLoadMore = () => {
    let nextDataQuery;
    if (searchValue) {
      if (categoryValue && categoryValue !== 'All categories') {
        nextDataQuery = query(
          collection(db, 'posts'),
          where('usersReading', 'array-contains', userDocument.id),
          where('category', '==', categoryValue),
          where('title', '>=', searchValue),
          where('title', '<=', searchValue + 'utf8'),
          orderBy('title', 'desc'),
          startAfter(lastSnapshot),
          limit(postPerLoad)
        );
      } else {
        nextDataQuery = query(
          collection(db, 'posts'),
          where('usersReading', 'array-contains', userDocument.id),
          where('title', '>=', searchValue),
          where('title', '<=', searchValue + 'utf8'),
          orderBy('title', 'desc'),
          startAfter(lastSnapshot),
          limit(postPerLoad)
        );
      }
    } else {
      if (categoryValue && categoryValue !== 'All categories') {
        nextDataQuery = query(
          collection(db, 'posts'),
          where('usersReading', 'array-contains', userDocument.id),
          where('category', '==', categoryValue),
          orderBy('createdAt', 'desc'),
          startAfter(lastSnapshot),
          limit(postPerLoad)
        );
      } else {
        nextDataQuery = query(
          collection(db, 'posts'),
          where('usersReading', 'array-contains', userDocument.id),
          orderBy('createdAt', 'desc'),
          startAfter(lastSnapshot),
          limit(postPerLoad)
        );
      }
    }
    setNextQuery(nextDataQuery);
  };

  const handleRemovePost = async post => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This post will be removed from your Read List immediately!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8d351a',
      cancelButtonColor: '#8d351a50',
      confirmButtonText: 'Yes, remove it!',
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
        const newUsersReading = post.usersReading.filter(
          userId => userId !== userDocument.id
        );
        await updateDoc(doc(db, 'posts', post.id), {
          ...post,
          usersReading: newUsersReading,
        });
        const newPosts = posts.filter(dataItem => dataItem.id !== post.id);
        setPosts(newPosts);
        Swal.fire({
          title: 'Removed!',
          text: 'This post has been removed.',
          icon: 'success',
          scrollbarPadding: false,
          confirmButtonColor: '#8d351a',
        });
      }
    });
  };

  return (
    <Fragment>
      <Table>
        <ReadListReaderTableHeadStyled>
          <tr className="readListPage-firstRow">
            <th>No.</th>
            <th>Post</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </ReadListReaderTableHeadStyled>
        <ReadListReaderTableBodyStyled>
          {!isLoadingFirstTime &&
            posts &&
            posts.length > 0 &&
            posts.map((post, index) => (
              <tr key={post.id}>
                <td className="readListPage-postId">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </td>
                <td>
                  <PostCell postData={post} />
                </td>
                <td className="readListPage-postAuthor">
                  <span>{post.author}</span>
                </td>
                <td className="readListPage-postAction">
                  <div>
                    <IconLink navigatePath={`/post/${post.slug}`} title="view">
                      <EyeIcon />
                    </IconLink>
                    <IconButton
                      onClick={() => handleRemovePost(post)}
                      title="remove from Read List"
                    >
                      <TrashIcon />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))}
          {isLoading && (
            <tr>
              <td colSpan="4">
                <TableLoading />
              </td>
            </tr>
          )}
          {!isLoading && posts && posts.length === 0 && (
            <tr>
              <td colSpan="4">
                {searchValue
                  ? 'No post was found! Try another keyword'
                  : `You still don't have any posts about this section yet!`}
              </td>
            </tr>
          )}
        </ReadListReaderTableBodyStyled>
      </Table>
      {!isLoadingFirstTime && posts && posts.length < quantity && (
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

export default TableSectionReader;
