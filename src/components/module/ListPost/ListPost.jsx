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

import Button from '~/components/button';
import { db } from '~/firebase/firebase-config';
import {
  useMultiDocsPagination,
  useQuantityOfCollection,
} from '~/firebase/funcs';
import { useState } from 'react';
import LoadingBounce from '~/components/loading/Bounce';
import ListPostItem from './ListPostItem';

const ListPostStyled = styled.div`
  width: 100%;

  .listPost-wrap {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ListPost = ({
  whereField,
  whereValue,
  orderByField = 'createdAt',
  orderByType = 'desc',
  postPerLoad = 5,
}) => {
  let quantityQuery;
  let firstQuery;

  if (whereField) {
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
  const { data: posts, isLoading } = useMultiDocsPagination({
    firstQuery,
    nextQuery,
    setLastSnapshot,
    reRenderCondition: [],
  });

  const handleLoadMore = () => {
    let nextDataQuery;
    if (whereField) {
      nextDataQuery = query(
        collection(db, 'posts'),
        where('status', '==', 1),
        where(whereField, '==', whereValue),
        orderBy(orderByField, orderByType),
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
    <ListPostStyled>
      <div className="listPost-wrap">
        {posts &&
          posts.length > 0 &&
          posts.map(post => (
            <ListPostItem key={`listPost-${post.id}`} post={post} />
          ))}
      </div>
      {isLoading && <LoadingBounce />}
      {posts && posts.length < quantity && (
        <Button
          width="150px"
          style={{ margin: '32px auto 4px' }}
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
