import { Fragment, useEffect, useRef } from 'react';
import { useController } from 'react-hook-form';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const InputWrapStyled = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  background-color: ${props =>
    props.secondary ? '#cccccc50' : props.theme.color.skin};
  padding: 12px 16px;
  border-radius: 8px;
  overflow: hidden;
  border: solid 1px transparent;
  cursor: pointer;

  &:hover {
    border: solid 1px ${props => props.theme.color.brown};
    background-color: ${props => props.theme.color.white};
    ${props =>
      props.secondary &&
      css`
        background-color: ${props => props.theme.color.skin};
        box-shadow: 0px 1px 2px 0px #8d351a30, 0px 2px 6px 2px #8d351a30;
        border: solid 1px ${props => props.theme.color.brown};
      `};

    .inputFile-uploadButton {
      background-color: #e2d8c46f;
      color: ${props => props.theme.color.brown};
    }
  }

  input {
    display: none;
  }

  .inputFile-uploadButton {
    position: absolute;
    right: -5px;
    top: -5px;
    bottom: -5px;
    width: 20%;
    background-color: #cccccc80;
    z-index: 10;
    border: none;
    outline: none;
    cursor: pointer;
    font-weight: 600;
    letter-spacing: 0.5px;
    font-family: ${props => props.theme.font.tertiary};
    color: ${props => props.theme.color.black};
  }
  .inputFile-uploadValue {
    display: block;
    width: 80%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
`;
const ErrorStyled = styled.span`
  display: block;
  font-size: 14px;
  line-height: 20px;
  color: red;
  font-weight: 500;
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

const InputFile = ({
  control,
  name,
  file,
  setFile,
  id,
  secondary,
  defaultValue,
  ...props
}) => {
  const {
    field,
    formState: { errors },
  } = useController({ name, control, defaultValue: '' });

  const inputRef = useRef();
  useEffect(() => {
    if (inputRef.current.firstChild) {
      setFile(inputRef.current.firstChild.files[0]);
      const replaceButton = inputRef.current;
      const handleClick = () => {
        inputRef.current.firstChild.click();
      };
      replaceButton.addEventListener('click', handleClick);
      return () => {
        replaceButton.removeEventListener('click', handleClick);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.value]);

  return (
    <Fragment>
      <InputWrapStyled secondary={secondary} ref={inputRef}>
        <input id={id || name} {...field} {...props} />
        <button type="button" className="inputFile-uploadButton">
          Upload
        </button>
        <p className="inputFile-uploadValue">
          {defaultValue || (file?.name && file.name)}
        </p>
      </InputWrapStyled>
      {errors?.[name]?.message && (
        <ErrorStyled>{errors[name].message}</ErrorStyled>
      )}
    </Fragment>
  );
};

InputFile.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  file: PropTypes.any,
  setFile: PropTypes.func.isRequired,
  id: PropTypes.string,
  secondary: PropTypes.bool,
};

export { InputFile };
