import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';

import Button from '~/components/button';
import { db } from '~/firebase/firebase-config';
import {
  useMultiDocsPagination,
  useQuantityOfCollection,
} from '~/firebase/funcs';
import LoadingBounce from '~/components/loading/Bounce';
import ListPostItem from './ListPostItem';

const ListPostStyled = styled.div`
  width: 100%;

  .listPost-wrap {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: ${props =>
      props.posts && props.posts.length === 0 ? '0' : '32px'};
  }
  .listPost-loading {
    margin: 0 auto 32px;
  }
`;

const ListPost = ({
  whereField,
  whereValue,
  searchQuery,
  orderByField = 'createdAt',
  orderByType = 'desc',
  postPerLoad = 5,
  isWhereFieldArray = false,
  reRenderCondition,
}) => {
  let quantityQuery;
  let firstQuery;

  // Nếu field lọc thuộc dạng array
  if (isWhereFieldArray) {
    quantityQuery = query(
      collection(db, 'posts'),
      where(whereField, 'array-contains', whereValue),
      orderBy(orderByField, orderByType)
    );
    firstQuery = query(
      collection(db, 'posts'),
      where(whereField, 'array-contains', whereValue),
      orderBy(orderByField, orderByType),
      limit(postPerLoad)
    );
    // Nếu filter theo field
  } else if (whereField) {
    quantityQuery = query(
      collection(db, 'posts'),
      where('status', '==', 1),
      where(whereField, '==', whereValue),
      orderBy(orderByField, orderByType)
    );
    firstQuery = query(
      collection(db, 'posts'),
      where('status', '==', 1),
      where(whereField, '==', whereValue),
      orderBy(orderByField, orderByType),
      limit(postPerLoad)
    );
    // Nếu filter theo search
  } else if (searchQuery) {
    quantityQuery = query(
      collection(db, 'posts'),
      where('status', '==', 1),
      where('title', '>=', searchQuery),
      where('title', '<=', searchQuery + 'utf8')
    );
    firstQuery = query(
      collection(db, 'posts'),
      where('status', '==', 1),
      where('title', '>=', searchQuery),
      where('title', '<=', searchQuery + 'utf8'),
      limit(postPerLoad)
    );
  } else {
    quantityQuery = query(
      collection(db, 'posts'),
      where('status', '==', 1),
      orderBy(orderByField, orderByType)
    );
    firstQuery = query(
      collection(db, 'posts'),
      where('status', '==', 1),
      orderBy(orderByField, orderByType),
      limit(postPerLoad)
    );
  }

  const quantity = useQuantityOfCollection({ query: quantityQuery });

  const [lastSnapshot, setLastSnapshot] = useState({});
  const [nextQuery, setNextQuery] = useState();
  const {
    data: posts,
    isLoading,
    isLoadingFirstTime,
  } = useMultiDocsPagination({
    firstQuery,
    nextQuery,
    setLastSnapshot,
    reRenderCondition: reRenderCondition ? [reRenderCondition] : [],
  });

  const handleLoadMore = () => {
    let nextDataQuery;
    if (isWhereFieldArray) {
      nextDataQuery = query(
        collection(db, 'posts'),
        where(whereField, 'array-contains', whereValue),
        orderBy(orderByField, orderByType),
        startAfter(lastSnapshot),
        limit(postPerLoad)
      );
    } else if (whereField) {
      nextDataQuery = query(
        collection(db, 'posts'),
        where('status', '==', 1),
        where(whereField, '==', whereValue),
        orderBy(orderByField, orderByType),
        startAfter(lastSnapshot),
        limit(postPerLoad)
      );
    } else if (searchQuery) {
      nextDataQuery = query(
        collection(db, 'posts'),
        where('status', '==', 1),
        where('title', '>=', searchQuery),
        where('title', '<=', searchQuery + 'utf8'),
        startAfter(lastSnapshot),
        limit(postPerLoad)
      );
    } else {
      nextDataQuery = query(
        collection(db, 'posts'),
        where('status', '==', 1),
        orderBy(orderByField, orderByType),
        startAfter(lastSnapshot),
        limit(postPerLoad)
      );
    }
    setNextQuery(nextDataQuery);
  };
  return (
    <ListPostStyled posts={posts}>
      {!isLoadingFirstTime && (
        <div className="listPost-wrap">
          {posts &&
            posts.length > 0 &&
            posts.map(post => (
              <ListPostItem key={`listPost-${post.id}`} post={post} />
            ))}
        </div>
      )}
      {isLoading && (
        <div className="listPost-loading">
          <LoadingBounce />
        </div>
      )}
      {!isLoading && !searchQuery && posts && posts.length === 0 && (
        <span>You still don't have any posts about this section yet! </span>
      )}
      {!isLoading && searchQuery && posts && posts.length === 0 && (
        <span>No post was found! Try another keyword</span>
      )}
      {!isLoadingFirstTime && posts && posts.length < quantity && (
        <Button
          width="150px"
          style={{ margin: '0 auto 4px' }}
          onClick={handleLoadMore}
        >
          Load More
        </Button>
      )}
    </ListPostStyled>
  );
};

ListPost.propTypes = {
  whereField: PropTypes.string,
  whereValue: PropTypes.any,
  orderByField: PropTypes.string,
  orderByType: PropTypes.oneOf(['desc', 'asc']),
};

export { ListPost };
