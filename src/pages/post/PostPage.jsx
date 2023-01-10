import { collection, doc, query, updateDoc, where } from 'firebase/firestore';
import parse from 'html-react-parser';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Fragment, useEffect, useState } from 'react';

import { db } from '~/firebase/firebase-config';
import { useMultiDocs } from '~/firebase/funcs';
import ButtonEditPost from './ButtonEditPost';
import { useFirebase } from '~/contexts/firebaseContext';
import { useScrollOnTop } from '~/hooks';
import PostPageHeader from './PostPageHeader';
import PostPageSideSection from './PostPageSideSection';

const PostPageStyled = styled.div`
  .postPage-container {
    display: flex;
    align-items: flex-start;
    gap: 60px;
    width: 100%;
  }
  .postPage-mainSection {
    width: 68%;
    &__overview {
      color: ${props => props.theme.color.black};
      font-family: ${props => props.theme.font.primary};
      margin-bottom: 12px;
      font-size: 22px;
    }
  }
  .postPage-subSection {
    flex: 1;
  }
`;

const PostPage = () => {
  const { slug } = useParams();
  useScrollOnTop(slug);
  const { userDocument } = useFirebase();
  const postQuery = query(collection(db, 'posts'), where('slug', '==', slug));
  const getData = useMultiDocs({ query: postQuery, renderCondition: [slug] });
  // Vì dùng hàm getDocs nên dữ liệu trả về nằm trong mảng
  const postData = getData[0];

  useEffect(() => {
    const handleAddQuantityOfView = async () => {
      await updateDoc(doc(db, 'posts', postData.id), {
        ...postData,
        quantityView: postData?.quantityView ? postData?.quantityView + 1 : 1,
      });
    };
    if (postData?.title) {
      // Set lại title cho page
      document.title = postData.title;
      // Nếu truy cập vào bài post không phải mình viết thì +1
      if (postData.userId !== userDocument.id) {
        handleAddQuantityOfView();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postData]);

  return (
    <PostPageStyled>
      {postData && (
        <Fragment>
          <div className="postPage">
            <PostPageHeader postData={postData} />
            <div className="postPage-container">
              <div className="postPage-mainSection">
                <h3 className="postPage-mainSection__overview">
                  {`(PLO) - ${postData.overview}`}
                </h3>
                <div className="postPage-mainSection__content entry-content">
                  {postData?.content ? parse(postData.content) : ''}
                </div>
              </div>
              <div className="postPage-subSection">
                <PostPageSideSection
                  postData={postData}
                  renderCondition={slug}
                />
              </div>
            </div>
          </div>
          {userDocument?.id &&
            userDocument.role === 'writer' &&
            userDocument.id === postData.userId && (
              <ButtonEditPost
                navigatePath={`/user/writer/edit-post/${postData.id}`}
              />
            )}
          {userDocument?.id && userDocument.role === 'admin' && (
            <ButtonEditPost
              navigatePath={`/user/admin/edit-post/${postData.id}`}
            />
          )}
        </Fragment>
      )}
    </PostPageStyled>
  );
};

export default PostPage;
