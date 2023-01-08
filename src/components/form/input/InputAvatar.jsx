import { Fragment, useEffect, useRef, useState } from 'react';
import { useController } from 'react-hook-form';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { useFirebase } from '~/contexts/firebaseContext';
import { CameraIcon, PhotoIcon } from '~/icons';
import { useClickOutSide } from '~/hooks';
import { useOutletContext } from 'react-router-dom';

const InputAvatarWrapStyled = styled.div`
  position: relative;
  width: 220px;
  height: 220px;
  margin: 0 24px;

  .inputAvatar-img-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.color.skin};
    border-radius: 50%;
    border: solid 4px #693626;
    cursor: pointer;
    &:hover {
      opacity: 0.9;
      ${props =>
        props.secondary &&
        css`
          box-shadow: 0px 1px 2px 2px #8d351a30, 0px 2px 6px 4px #8d351a30;
        `};
    }
  }

  .inputAvatar-img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    border-radius: 50%;
  }

  .inputAvatar-icon {
    position: absolute;
    bottom: 5%;
    right: 3%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25%;
    height: 25%;
    border-radius: 50%;
    background-color: #693626;
    cursor: pointer;

    i {
      color: ${props => props.theme.color.skin};
      font-size: 35px;
      margin-top: 3px;
    }

    &:hover {
      background-color: #7a3f2d;
    }
  }

  @keyframes zoomOut {
    to {
      transform: scale(1);
    }
  }
  .inputAvatar-dropDown {
    position: absolute;
    top: calc(100% + 15px);
    left: 0px;
    right: 0px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 8px;
    border-radius: 8px;
    background-color: ${props => props.theme.color.white};
    padding: 16px 16px;
    color: ${props => props.theme.color.black};
    box-shadow: 0px 1px 2px 0px rgb(60 64 67 / 30%),
      0px 2px 6px 2px rgb(60 64 67 / 15%);
    border: 1px solid rgba(0, 0, 0, 0.2);
    transform: scale(0);
    transform-origin: 50% 0;
    animation: zoomOut 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;

    li {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 12px;
      width: 100%;
      padding: 2px 4px;

      &:hover {
        background-color: #eee;
        border-radius: 8px;
      }
    }
    span {
    }

    &::after {
      content: '';
      position: absolute;
      top: -7px;
      left: 50%;
      display: block;
      width: 16px;
      height: 16px;
      border-radius: 4px;
      transform: rotate(45deg) translate(-25%, 25%);
      background-color: ${props => props.theme.color.white};
      box-shadow: 0px 1px 2px 0px rgb(60 64 67 / 30%),
        0px 2px 6px 2px rgb(60 64 67 / 15%);
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      display: block;
      width: 50px;
      height: 15px;
      background-color: ${props => props.theme.color.white};
      z-index: 1;
    }

    &__iconWrap {
      width: 30px;
      height: 30px;
    }
  }
`;

const InputAvatarSeePhotoStyled = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;

  img {
    display: block;
    max-width: 90%;
    max-height: 90%;
  }

  i {
    position: absolute;
    top: 5%;
    right: 5%;
    color: ${props => props.theme.color.white};
    font-size: 42px;
    padding: 4px;
    cursor: pointer;
  }
`;

/**
 * @param {string} id
 * @requires
 * @param {object} control - control from react-hook-form
 * @param {string} name - name of the input
 * @param {*} file
 * @param {Function} setFile
 */

const InputAvatar = ({
  control,
  name,
  file,
  setFile,
  id,
  userDocument,
  ...props
}) => {
  const { imgURLs } = useOutletContext();
  const { field } = useController({ name, control, defaultValue: '' });

  const inputRef = useRef();
  const avatarRef = useRef();
  const dropdownRef = useRef();

  const [tempAvatar, setTempAvatar] = useState('');

  // Handle event listener
  useEffect(() => {
    if (inputRef.current && avatarRef.current) {
      setFile(inputRef.current.files[0]);
      const avatarRefCurrent = avatarRef.current;
      const handleClick = () => {
        inputRef.current.click();
        // setShow(false);
      };
      avatarRefCurrent.lastChild.addEventListener('click', handleClick);
      return () => {
        avatarRefCurrent.lastChild.removeEventListener('click', handleClick);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.value]);

  // Create temp URL to show the temp avatar image
  useEffect(() => {
    if (field.value && inputRef.current) {
      const tempAvatarURL = URL.createObjectURL(inputRef.current.files[0]);

      setTempAvatar(tempAvatarURL);
      // Remove temp url from memory
      return () => URL.revokeObjectURL(tempAvatar);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.value]);

  // Handle dropdown
  const { show, setShow, nodeRef } = useClickOutSide();
  useEffect(() => {
    if (dropdownRef.current) {
      setFile(inputRef.current.files[0]);
      const dropdownRefCurrent = dropdownRef.current;
      const handleClick = () => {
        inputRef.current.click();
        setShow(false);
      };
      dropdownRefCurrent.lastChild.addEventListener('click', handleClick);
      return () => {
        dropdownRefCurrent.lastChild.removeEventListener('click', handleClick);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  // Handle see avatar
  const [showAvatar, setShowAvatar] = useState(false);

  return (
    <Fragment>
      <InputAvatarWrapStyled ref={avatarRef}>
        <div ref={nodeRef} className="inputAvatar-img-wrap">
          <img
            className="inputAvatar-img"
            src={
              tempAvatar ||
              (userDocument?.avatar?.URL && userDocument.avatar.URL) ||
              imgURLs.userAvatar
            }
            alt={
              tempAvatar ||
              (userDocument?.avatar?.URL && userDocument.avatar.URL) ||
              imgURLs.userAvatar
            }
            onClick={() => setShow(!show)}
          />
          {show && (
            <ul ref={dropdownRef} className="inputAvatar-dropDown">
              <li
                onClick={() => {
                  setShowAvatar(true);
                  setShow(false);
                }}
              >
                <div className="inputAvatar-dropDown__iconWrap">
                  <PhotoIcon />
                </div>
                <span>See avatar</span>
              </li>
              <li>
                <div className="inputAvatar-dropDown__iconWrap">
                  <CameraIcon />
                </div>
                <span>Update avatar</span>
              </li>
            </ul>
          )}
        </div>
        <div className="inputAvatar-icon">
          <i className="bx bxs-camera"></i>
        </div>
      </InputAvatarWrapStyled>
      <input
        id={id || name}
        {...field}
        {...props}
        style={{ display: 'none' }}
        ref={inputRef}
        accept=".png,.jpg,.jpeg"
      />
      {showAvatar && (
        <InputAvatarSeePhotoStyled>
          <img
            src={
              tempAvatar ||
              (userDocument?.avatar?.URL && userDocument.avatar.URL) ||
              imgURLs.userAvatar
            }
            alt={
              tempAvatar ||
              (userDocument?.avatar?.URL && userDocument.avatar.URL) ||
              imgURLs.userAvatar
            }
          />
          <i className="bx bx-x" onClick={() => setShowAvatar(false)}></i>
        </InputAvatarSeePhotoStyled>
      )}
    </Fragment>
  );
};

InputAvatar.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  file: PropTypes.any,
  setFile: PropTypes.func.isRequired,
  id: PropTypes.string,
};

export { InputAvatar };
