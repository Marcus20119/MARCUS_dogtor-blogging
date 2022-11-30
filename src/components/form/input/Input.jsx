import { Fragment } from 'react';
import { useController } from 'react-hook-form';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const InputWrapStyled = styled.div`
  position: relative;
  width: 100%;

  input {
    display: block;
    width: 100%;
    border-radius: 8px;
    border: solid 1px transparent;
    background-color: ${props =>
      props.secondary ? '#cccccc50' : props.theme.color.skin};
    padding: ${props => (props.icon ? `12px 40px 12px 16px` : `12px 16px`)};
    &:focus {
      border: solid 1px ${props => props.theme.color.brown};
      background-color: ${props => props.theme.color.white};
      ${props =>
        props.secondary &&
        css`
          background-color: ${props => props.theme.color.skin};
          box-shadow: 0px 1px 2px 0px #8d351a30, 0px 2px 6px 2px #8d351a30;
          border: solid 1px ${props => props.theme.color.brown};
        `};
    }
    &::placeholder {
      opacity: 0.7;
    }
  }
  .input-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 18px;
    height: 18px;
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
 * @param {*} icon
 * @param {string} placeholder
 * @param {boolean} secondary
 * @requires
 * @param {object} control - control from react-hook-form
 * @param {string} name - name of the input
 */

const Input = ({
  control,
  name,
  id,
  icon,
  placeholder,
  secondary,
  ...props
}) => {
  const {
    field,
    formState: { errors },
  } = useController({ name, control, defaultValue: '' });
  return (
    <Fragment>
      <InputWrapStyled secondary={secondary}>
        <input
          id={id || name}
          placeholder={placeholder || `Enter your ${name} ...`}
          {...field}
          {...props}
        />
        <div className="input-icon">{icon}</div>
      </InputWrapStyled>
      {errors?.[name]?.message && (
        <ErrorStyled>{errors[name].message}</ErrorStyled>
      )}
    </Fragment>
  );
};

Input.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  icon: PropTypes.any,
  placeholder: PropTypes.string,
  secondary: PropTypes.bool,
};

export { Input };
