import { collection, query, where } from 'firebase/firestore';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Fragment } from 'react';

import { db } from '~/firebase/firebase-config';
import { useMultiDocs } from '~/firebase/funcs';
import LoadingBounce from '~/components/loading/Bounce';

const PrintPostPageStyled = styled.div`
  width: 760px;
  margin: 24px auto;

  .printPostPage-container {
    display: flex;
    align-items: flex-start;
    gap: 60px;
    width: 760px;
  }
  .printPostPage-mainSection {
    width: 100%;
    &__overview {
      color: ${props => props.theme.color.black};
      font-family: ${props => props.theme.font.primary};
      margin-bottom: 12px;
      font-size: 22px;
    }
  }
  .printPostPage-header {
    &__category {
      display: block;
      margin: 4px 0 12px;
      font-size: 18px;
      line-height: 24px;
      padding-left: 7px;
      border-left: solid 3px ${props => props.theme.color.brown};
    }
    &__title {
      font-size: 42px;
      line-height: 50px;
      font-weight: 900;
      margin-bottom: 20px;
      font-family: ${props => props.theme.font.tertiary};
      color: ${props => props.theme.color.brown};
      text-shadow: 0 0 0.5px ${props => props.theme.color.brown};
    }
  }
  .printPostPage-printBtn {
    position: fixed;
    top: 5%;
    right: 5%;
    display: inline-flex;
    gap: 8px;
    align-items: center;
    padding: 4px 8px;
    border: solid 1px ${props => props.theme.color.brown};
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: ${props => props.theme.color.skin};
    }
  }
  @media print {
    .printPostPage-printBtn {
      display: none;
    }
  }
`;

const PostPage = () => {
  const { slug } = useParams();
  const postQuery = query(collection(db, 'posts'), where('slug', '==', slug));
  const getData = useMultiDocs({ query: postQuery });
  const postData = getData[0];

  return (
    <PrintPostPageStyled>
      {postData && (
        <Fragment>
          <div className="printPostPage">
            <span className="printPostPage-header__category">
              {postData.category === 'Food n Drink'
                ? 'FOOD & DRINK'
                : postData.category.toUpperCase()}
            </span>
            <h1 className="printPostPage-header__title">{postData.title}</h1>
            <div className="printPostPage-container">
              <div className="printPostPage-mainSection">
                <h3 className="printPostPage-mainSection__overview">
                  {`(PLO) - ${postData.overview}`}
                </h3>
                <div className="printPostPage-mainSection__content entry-content">
                  {postData?.content ? parse(postData.content) : ''}
                </div>
              </div>
            </div>
          </div>
          <div
            className="printPostPage-printBtn"
            onClick={() => window.print()}
          >
            <i className="bx bxs-printer"></i>
            <span>Print This Post</span>
          </div>
        </Fragment>
      )}
      {!postData && (
        <div style={{ marginTop: '40px' }}>
          <LoadingBounce />
        </div>
      )}
    </PrintPostPageStyled>
  );
};

export default PostPage;
