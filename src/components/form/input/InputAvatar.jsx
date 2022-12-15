import { Fragment, useEffect, useRef, useState } from 'react';
import { useController } from 'react-hook-form';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { useFirebase } from '~/contexts/firebaseContext';

const InputAvatarWrapStyled = styled.div`
  position: relative;
  width: 220px;
  height: 220px;
  margin: 0 24px;

  .inputAvatar-img-wrap {
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
`;

/**
 * @param {string} id
 * @param {boolean} secondary
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
  secondary,
  ...props
}) => {
  const { userDocument } = useFirebase();
  const {
    field,
    formState: { errors },
  } = useController({ name, control, defaultValue: '' });

  const inputRef = useRef();
  const avatarRef = useRef();

  const [tempAvatar, setTempAvatar] = useState('');
  console.log('tempAvatar', tempAvatar);

  useEffect(() => {
    if (inputRef.current && avatarRef.current) {
      setFile(inputRef.current.files[0]);
      const avatarRefCurrent = avatarRef.current;
      const handleClick = () => {
        inputRef.current.click();
      };
      avatarRefCurrent.lastChild.addEventListener('click', handleClick);
      return () => {
        avatarRefCurrent.lastChild.removeEventListener('click', handleClick);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.value]);

  useEffect(() => {
    if (field.value && inputRef.current) {
      const avatarURL = URL.createObjectURL(inputRef.current.files[0]);
      setTempAvatar(avatarURL);
      // Remove temp url from memory
      return () => URL.revokeObjectURL(tempAvatar);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.value]);
  return (
    <Fragment>
      <InputAvatarWrapStyled secondary={secondary} ref={avatarRef}>
        <div className="inputAvatar-img-wrap">
          <img
            className="inputAvatar-img"
            src={tempAvatar || userDocument.avatarURL}
            alt={userDocument.userName}
          />
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
    </Fragment>
  );
};

InputAvatar.propTypes = {
  // control: PropTypes.object.isRequired,
  // name: PropTypes.string.isRequired,
  // file: PropTypes.any,
  // setFile: PropTypes.func.isRequired,
  // id: PropTypes.string,
  // secondary: PropTypes.bool,
};

export { InputAvatar };
