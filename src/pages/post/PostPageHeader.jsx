import { doc, updateDoc } from 'firebase/firestore';
import { useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  FacebookShareButton,
  EmailShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  FacebookIcon,
  EmailIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
} from 'react-share';
import styled from 'styled-components';
import { useFirebase } from '~/contexts/firebaseContext';
import { db } from '~/firebase/firebase-config';
import { useSingleDoc } from '~/firebase/funcs';
import { convertDate, convertTime } from '~/helpers';

const PostPageHeaderStyled = styled.div`
  .postPage-header {
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
    &__meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      background-color: #eeeeee;
      padding: 12px 18px;
      border-radius: 4px;
      margin: 0 -1px 24px;
    }
  }
  .meta__social {
    display: inline-flex;
    justify-content: stretch;
    align-items: center;
    gap: 16px;

    &-left {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;

      &-share,
      &-like {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 4px;
        background-color: #1877f2;
        font-size: 15px;
        color: ${props => props.theme.color.white};
        border-radius: 4px;
        padding: 4px 8px;
        cursor: pointer;
      }
    }
    &-breakLine {
      width: 1px;
      background-color: #ccc;
    }
    &-right {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 8px;
    }
  }
  .meta__info {
    display: inline-flex;
    justify-content: stretch;
    align-items: center;
    gap: 8px;
    font-size: 15px;
    color: #7b7a7a;

    &-breakLine {
      width: 2px;
      background-color: #ccc;
      margin: 0 4px;
    }
    &-breakLine--small {
      width: 1px;
      background-color: #ccc;
      height: 16px;
    }
    span:last-of-type {
      color: #4e4d4d;
      font-weight: 500;
    }
  }
`;

const PostPageHeader = ({ postData }) => {
  const { document: userData } = useSingleDoc({
    col: 'users',
    id: postData?.userId ? postData.userId : '',
  });
  const facebookRef = useRef();
  const { userDocument } = useFirebase();

  // Handle like post
  /**
   * Dùng state số lượng like để hiển thị phần giao diện còn cho chạy ẩn phía background
   * Dùng thêm 1 state disable để disable đi button cho đến khi phía background chạy xong để tránh tình trạng lost update
   * Background sẽ cập nhật 2 collection:
   * - user: cập nhật id post mà user like
   * - post: cập nhật id của user đã like post này
   *  */
  const [quantityLiked, setQuantityLiked] = useState(
    postData?.usersLiked ? postData.usersLiked.length : 0
  );
  const [isCurrentUserLike, setIsCurrentUserLike] = useState(
    (postData?.usersLiked &&
      userDocument?.id &&
      postData.usersLiked.includes(userDocument.id)) ||
      false
  );
  console.log('isCurrentUserLike', isCurrentUserLike);
  const [forceDisable, setForceDisable] = useState(false);

  const handleUpdateUser = async () => {
    let newPostsLiked;
    if (userDocument?.postsLiked && userDocument.postsLiked.length > 0) {
      newPostsLiked = [...userDocument.postsLiked];
      if (isCurrentUserLike) {
        newPostsLiked = newPostsLiked.filter(id => id !== postData.id);
      } else {
        newPostsLiked.push(postData.id);
      }
    } else {
      if (isCurrentUserLike) {
        newPostsLiked = [];
      } else {
        newPostsLiked = [postData.id];
      }
    }
    await updateDoc(doc(db, 'users', userDocument.id), {
      ...userDocument,
      postsLiked: newPostsLiked,
    });
  };

  const handleUpdatePost = async () => {
    let newUsersLiked;
    if (postData?.usersLiked && postData.usersLiked.length > 0) {
      newUsersLiked = [...postData.usersLiked];

      if (isCurrentUserLike) {
        newUsersLiked = newUsersLiked.filter(id => id !== userDocument.id);
      } else {
        newUsersLiked.push(userDocument.id);
      }
    } else {
      if (isCurrentUserLike) {
        newUsersLiked = [];
      } else {
        newUsersLiked = [userDocument.id];
      }
    }
    await updateDoc(doc(db, 'posts', postData.id), {
      ...postData,
      usersLiked: newUsersLiked,
    });
  };

  const handleSetLike = () => {
    const handleUpdate = async () => {
      setForceDisable(true);
      await handleUpdateUser();
      handleUpdatePost();
      setForceDisable(false);
    };

    if (isCurrentUserLike) {
      setQuantityLiked(prev => prev - 1);
    } else {
      setQuantityLiked(prev => prev + 1);
    }
    handleUpdate();

    setIsCurrentUserLike(!isCurrentUserLike);
  };

  return (
    <PostPageHeaderStyled>
      <span className="postPage-header__category">
        {postData.category === 'Food n Drink'
          ? 'FOOD & DRINK'
          : postData.category.toUpperCase()}
      </span>
      <h1 className="postPage-header__title">{postData.title}</h1>
      <div className="postPage-header__meta">
        <div className="meta__social">
          <div className="meta__social-left">
            <button
              className="meta__social-left-like"
              onClick={handleSetLike}
              disabled={forceDisable}
            >
              <i className="bx bxs-like"></i>
              <span>Like</span>
              <span>{quantityLiked}</span>
            </button>
            <button
              className="meta__social-left-share"
              onClick={() => facebookRef.current.click()}
            >
              Share
            </button>
          </div>
          <div className="meta__social-breakLine">&nbsp;</div>
          <div className="meta__social-right">
            <FacebookShareButton ref={facebookRef} url={window.location.href}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <EmailShareButton url={window.location.href}>
              <EmailIcon size={32} round />
            </EmailShareButton>
            <LinkedinShareButton url={window.location.href}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <TelegramShareButton url={window.location.href}>
              <TelegramIcon size={32} round />
            </TelegramShareButton>
            <TwitterShareButton url={window.location.href}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>
        </div>
        <div className="meta__info">
          <span>{convertDate(postData.createdAt.seconds, true)}</span>
          <div className="meta__info-breakLine--small">&nbsp;</div>
          <span>{convertTime(postData.createdAt.seconds)}</span>
          <div className="meta__info-breakLine">&nbsp;</div>
          {userData?.userName && <span>{userData.userName}</span>}
        </div>
      </div>
    </PostPageHeaderStyled>
  );
};

export default PostPageHeader;
