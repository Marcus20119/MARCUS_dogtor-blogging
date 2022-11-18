import { Fragment } from 'react';
import { useController } from 'react-hook-form';
import styled from 'styled-components';

const InputWrapStyled = styled.div`
  position: relative;
  width: 100%;

  input {
    display: block;
    width: 100%;
    border-radius: 8px;
    border: solid 1px transparent;
    background-color: ${props => props.theme.color.skin};
    padding: ${props => (props.icon ? `8px 36px 8px 12px` : `8px 12px`)};
    &:focus {
      border: solid 1px ${props => props.theme.color.brown};
      background-color: ${props => props.theme.color.white};
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

const Input = ({ control, name, id, icon, placeholder, ...props }) => {
  const {
    field,
    formState: { errors },
  } = useController({ name, control, defaultValue: '' });
  return (
    <Fragment>
      <InputWrapStyled>
        <input
          id={id || name}
          placeholder={placeholder || `Type your ${name} ...`}
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

export { Input };
