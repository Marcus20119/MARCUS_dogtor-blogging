import { doc, updateDoc } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import styled, { css } from 'styled-components';
import Swal from 'sweetalert2';
import { useFirebase } from '~/contexts/firebaseContext';
import { db } from '~/firebase/firebase-config';
import { convertDate, convertTime } from '~/helpers';
import { mobile, tabletAndMobile } from '~/styles/responsive';

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

      ${mobile(css`
        font-size: 34px;
        line-height: 40px;
      `)}
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
  .meta__social-print {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    font-size: 18px;
    background-color: #8d351a90;
    color: white;
    border-radius: 50%;

    ${tabletAndMobile(css`
      display: none;
    `)}
  }

  .meta__info--tabletAndMobile {
    display: none;
    margin-bottom: 12px;

    ${tabletAndMobile(css`
      display: flex;
    `)}
  }
  .meta__info--laptop {
    display: flex;
    ${tabletAndMobile(css`
      display: none;
    `)}
  }
  .meta__social--facebook {
    ${mobile(css`
      display: none;
    `)}
  }
`;

const PostPageHeader = ({ postData }) => {
  const facebookRef = useRef();
  const { userDocument } = useFirebase();
  const navigateTo = useNavigate();

  // Handle like post
  /**
   * Dùng state số lượng like để hiển thị phần giao diện còn cho chạy ẩn phía background
   * Dùng thêm 1 state disable để disable đi button cho đến khi phía background chạy xong để tránh tình trạng lost update khi spam nút like
   * Background sẽ cập nhật cập nhật id của user đã like post này và tính tổng số count
   *  */
  const [quantityLiked, setQuantityLiked] = useState(0);
  const [isCurrentUserLike, setIsCurrentUserLike] = useState(false);
  const { slug } = useParams();
  useEffect(() => {
    setQuantityLiked(postData?.usersLiked ? postData.usersLiked.length : 0);
    setIsCurrentUserLike(
      (postData?.usersLiked &&
        userDocument?.id &&
        postData.usersLiked.includes(userDocument.id)) ||
        false
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const [forceDisable, setForceDisable] = useState(false);

  // Update field usersLiked trong document post
  const handleUpdatePost = async newQuantityLiked => {
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
      likesCount: newQuantityLiked,
    });
  };

  const handleSetLike = () => {
    const handleUpdate = async newQuantityLiked => {
      setForceDisable(true);
      await handleUpdatePost(newQuantityLiked);
      setForceDisable(false);
    };
    if (userDocument?.id) {
      let newQuantityLiked;
      if (isCurrentUserLike) {
        newQuantityLiked = quantityLiked - 1;
      } else {
        newQuantityLiked = quantityLiked + 1;
      }
      setQuantityLiked(newQuantityLiked);
      handleUpdate(newQuantityLiked);
      setIsCurrentUserLike(!isCurrentUserLike);
    } else {
      Swal.fire({
        title: 'Sign In is needed!',
        text: 'You need to sign in to do this action!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#8d351a',
        cancelButtonColor: '#8d351a50',
        confirmButtonText: 'Sign In!',
        scrollbarPadding: false,
      }).then(async result => {
        if (result.isConfirmed) {
          // Loading pop-up
          navigateTo('/sign-in');
        }
      });
    }
  };

  return (
    <PostPageHeaderStyled>
      <span className="postPage-header__category">
        {postData.category === 'Food n Drink'
          ? 'FOOD & DRINK'
          : postData.category.toUpperCase()}
      </span>
      <h1 className="postPage-header__title">{postData.title}</h1>

      <div className="meta__info meta__info--tabletAndMobile">
        <span className="meta__info-time">
          {convertDate(postData.createdAt.seconds, true)}
        </span>
        <div className="meta__info-breakLine--small">&nbsp;</div>
        <span className="meta__info-date">
          {convertTime(postData.createdAt.seconds)}
        </span>
        <div className="meta__info-breakLine">&nbsp;</div>
        <span className="meta__info-author">{postData.author}</span>
      </div>

      <div className="postPage-header__meta ">
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
            <FacebookShareButton
              ref={facebookRef}
              url={window.location.href}
              className="meta__social--facebook"
            >
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
            <a
              className="meta__social-print"
              href={`/post/print/${postData.slug}`}
              title="Print"
              target="_blank"
              rel="noreferrer"
            >
              <i className="bx bxs-printer"></i>
            </a>
          </div>
        </div>
        <div className="meta__info meta__info--laptop">
          <span className="meta__info-time">
            {convertDate(postData.createdAt.seconds, true)}
          </span>
          <div className="meta__info-breakLine--small">&nbsp;</div>
          <span className="meta__info-date">
            {convertTime(postData.createdAt.seconds)}
          </span>
          <div className="meta__info-breakLine">&nbsp;</div>
          <span className="meta__info-author">{postData.author}</span>
        </div>
      </div>
    </PostPageHeaderStyled>
  );
};

export default PostPageHeader;
