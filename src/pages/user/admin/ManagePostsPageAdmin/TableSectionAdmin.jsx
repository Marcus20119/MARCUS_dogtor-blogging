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
import styled, { css } from 'styled-components';
import Swal from 'sweetalert2';
import Button from '~/components/button';

import {
  Table,
  IconLink,
  IconButton,
  PostCell,
  StatusTag,
  TableLoading,
} from '~/components/table';
import { db } from '~/firebase/firebase-config';
import {
  deleteOldImage,
  useMultiDocsPagination,
  useQuantityOfCollection,
} from '~/firebase/funcs';
import { EyeIcon, TrashIcon, WriteIcon } from '~/icons';
import { tabletAndMobile } from '~/styles/responsive';

const AllPostAdminTableHeadStyled = styled.thead`
  .allPostAdmin-firstRow {
    th:nth-child(1) {
      width: 70px;
      text-align: center !important;
    }
    th:nth-child(2) {
      width: 400px;
    }
    th:nth-child(3),
    th:nth-child(4),
    th:nth-child(5) {
      ${tabletAndMobile(css`
        width: 150px;
      `)}
    }
  }
`;
const AllPostAdminTableBodyStyled = styled.tbody`
  .allPostAdmin-postId {
    text-align: center !important;
  }
  .allPostAdmin-postAction {
    div {
      display: flex;
      align-items: center;
      gap: 12px;
    }
  }
  .allPostAdmin-postAuthor {
    height: 100%;
    span {
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }
`;

const TableSectionAdmin = ({ categoryValue, searchValue }) => {
  const { imgURLs } = useOutletContext();
  // Set query base on the selected category
  let quantityQuery;
  let firstQuery;
  const postPerLoad = 5;
  // Kiểm tra có querySearch thì mới lọc theo querySearch còn không thì lọc theo category
  if (searchValue) {
    if (categoryValue && categoryValue !== 'All categories') {
      quantityQuery = query(
        collection(db, 'posts'),
        where('category', '==', categoryValue),
        where('title', '>=', searchValue),
        where('title', '<=', searchValue + 'utf8'),
        orderBy('title', 'desc')
      );

      firstQuery = query(
        collection(db, 'posts'),
        where('category', '==', categoryValue),
        where('title', '>=', searchValue),
        where('title', '<=', searchValue + 'utf8'),
        orderBy('title', 'desc'),
        limit(postPerLoad)
      );
    } else {
      quantityQuery = query(
        collection(db, 'posts'),
        where('title', '>=', searchValue),
        where('title', '<=', searchValue + 'utf8'),
        orderBy('title', 'desc')
      );

      firstQuery = query(
        collection(db, 'posts'),
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
        where('category', '==', categoryValue),
        orderBy('createdAt', 'desc')
      );

      firstQuery = query(
        collection(db, 'posts'),
        where('category', '==', categoryValue),
        orderBy('createdAt', 'desc'),
        limit(postPerLoad)
      );
    } else {
      quantityQuery = query(
        collection(db, 'posts'),
        orderBy('createdAt', 'desc')
      );

      firstQuery = query(
        collection(db, 'posts'),
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
          where('category', '==', categoryValue),
          orderBy('createdAt', 'desc'),
          startAfter(lastSnapshot),
          limit(postPerLoad)
        );
      } else {
        nextDataQuery = query(
          collection(db, 'posts'),
          orderBy('createdAt', 'desc'),
          startAfter(lastSnapshot),
          limit(postPerLoad)
        );
      }
    }
    setNextQuery(nextDataQuery);
  };

  const handleDeletePost = async post => {
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
        await deleteDoc(doc(db, 'posts', post.id));
        await deleteOldImage({ imgName: post.img.name });
        const newPosts = posts.filter(dataItem => dataItem.id !== post.id);
        setPosts(newPosts);
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
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
        <AllPostAdminTableHeadStyled>
          <tr className="allPostAdmin-firstRow">
            <th>No.</th>
            <th>Post</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </AllPostAdminTableHeadStyled>
        <AllPostAdminTableBodyStyled>
          {!isLoadingFirstTime &&
            posts &&
            posts.length > 0 &&
            posts.map((post, index) => (
              <tr key={post.id}>
                <td className="allPostAdmin-postId">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </td>
                <td>
                  <PostCell postData={post} />
                </td>
                <td className="allPostAdmin-postAuthor">
                  <span>{post.author}</span>
                </td>
                <td className="allPostAdmin-postStatus">
                  <StatusTag status={post.status} />
                </td>
                <td className="allPostAdmin-postAction">
                  <div>
                    <IconLink navigatePath={`/post/${post.slug}`} title="view">
                      <EyeIcon />
                    </IconLink>
                    <IconLink
                      navigatePath={`/user/admin/edit-post/${post.id}`}
                      title="edit"
                    >
                      <WriteIcon />
                    </IconLink>
                    <IconButton
                      onClick={() => handleDeletePost(post)}
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
              <td colSpan="5">
                <TableLoading />
              </td>
            </tr>
          )}
          {!isLoading && posts && posts.length === 0 && (
            <tr>
              <td colSpan="5">
                {searchValue
                  ? 'No post was found! Try another keyword'
                  : `You still don't have any posts about this section yet!`}
              </td>
            </tr>
          )}
        </AllPostAdminTableBodyStyled>
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

export default TableSectionAdmin;
