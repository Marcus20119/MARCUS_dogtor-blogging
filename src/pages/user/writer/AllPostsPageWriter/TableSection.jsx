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
import { useNavigate, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import Button from '~/components/button';
import { LoadingCircle } from '~/components/loading';
import LoadingBounce from '~/components/loading/Bounce';

import { Table, IconButton, PostCell, StatusTag } from '~/components/table';
import { db } from '~/firebase/firebase-config';
import {
  deleteOldImage,
  useMultiDocsPagination,
  useQuantityOfCollection,
} from '~/firebase/funcs';
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

const TableSection = ({ categoryValue }) => {
  const userDocument = useOutletContext();
  const navigateTo = useNavigate();
  // Set query base on the selected category
  let quantityQuery;
  let firstQuery;
  const postPerLoad = 5;
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
      limit(postPerLoad)
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
      limit(postPerLoad)
    );
  }

  const quantity = useQuantityOfCollection({ query: quantityQuery });

  // Handle load more data
  const [lastSnapshot, setLastSnapshot] = useState({});
  const [nextQuery, setNextQuery] = useState();
  const {
    data: posts,
    setData: setPosts,
    isLoading,
  } = useMultiDocsPagination({
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
        limit(postPerLoad)
      );
    } else {
      nextDataQuery = query(
        collection(db, 'posts'),
        where('userId', '==', userDocument.id),
        orderBy('createdAt', 'desc'),
        startAfter(lastSnapshot),
        limit(postPerLoad)
      );
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
          imageUrl: 'https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif',
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
        });
      }
    });
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
                    <IconButton
                      onClick={() => {
                        navigateTo(`/post/${post.slug}`);
                      }}
                    >
                      <EyeIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        navigateTo(`/user/writer/edit-post/${post.id}`)
                      }
                    >
                      <WriteIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeletePost(post)}>
                      <TrashIcon />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))}
          {isLoading && (
            <tr>
              <td colSpan="5">
                <LoadingBounce />
              </td>
            </tr>
          )}
          {posts &&
            posts.length === 0 &&
            categoryValue !== 'All categories' && (
              <tr>
                <td colSpan="5">
                  You still don't have any posts about this section yet!
                </td>
              </tr>
            )}
        </AllPostTableBodyStyled>
      </Table>
      {posts && posts.length < quantity && (
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

export default TableSection;
