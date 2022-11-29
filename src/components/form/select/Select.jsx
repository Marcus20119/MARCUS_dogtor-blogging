import { useController, useWatch } from 'react-hook-form';
import styled from 'styled-components';
import { useSelect } from '~/hooks';

const SelectStyled = styled.div`
  width: 100%;

  .select-wrap {
    position: relative;
    width: 100%;
  }

  .select-default {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 12px 16px;
    border-radius: 8px;
    border: solid 1px transparent;
    background-color: ${props =>
      props.type === 'secondary' ? '#cccccc50' : props.theme.color.skin};
    cursor: pointer;

    i {
      display: flex;
      align-items: center;
      opacity: 0.7;
    }
  }
  @keyframes increaseHeight {
    from {
      max-height: 50px;
    }
    to {
      max-height: 400px;
    }
  }
  .select-options {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
    padding: 8px;
    border-radius: 8px;
    overflow: hidden;
    animation: increaseHeight 1s ease;
    background-color: ${props => props.theme.color.skin};
    box-shadow: 0px 1px 2px 0px #8d351a30, 0px 2px 6px 2px #8d351a30;
    border: solid 1px ${props => props.theme.color.brown};

    li {
      padding: 6px 8px;
      color: ${props => props.theme.color.black};
      background-color: transparent;
      opacity: 0.8;
      font-weight: 500;
      cursor: pointer;
      border-radius: 6px;
    }
    li:hover {
      background-color: #8d351a30;
      opacity: 1;
    }
  }
`;
const ErrorStyled = styled.span`
  display: block;
  font-size: 14px;
  line-height: 20px;
  color: red;
  font-weight: 500;
`;

const Select = ({
  name,
  control,
  setValue,
  setError,
  defaultOption = 'Select one option...',
  type,
  options,
}) => {
  const {
    formState: { errors },
  } = useController({ name, control, defaultValue: '' });

  const watchOptionValue = useWatch({ name, control });

  const { selectRef, selectedValue } = useSelect({
    defaultOption,
    watchOptionValue,
    setValue,
    setError,
    name,
  });
  return (
    <SelectStyled type={type}>
      <div ref={selectRef} className="select-wrap">
        <div className="select-default">
          <p>{selectedValue}</p>
          <i className="bx bxs-down-arrow"></i>
        </div>
        <ul className="select-options hidden">
          {options.map(option => (
            <li key={option}>{option}</li>
          ))}
        </ul>
      </div>

      {errors?.[name]?.message && (
        <ErrorStyled>{errors[name].message}</ErrorStyled>
      )}
    </SelectStyled>
  );
};

export { Select };
