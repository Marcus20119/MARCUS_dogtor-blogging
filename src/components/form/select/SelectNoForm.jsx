import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelect } from '~/hooks';

const SelectNoFormStyled = styled.div`
  width: 100%;

  .selectNoForm-wrap {
    position: relative;
    width: 100%;
    height: 50px;
  }

  .selectNoForm-default {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 12px 16px;
    border-radius: 8px;
    border: solid 1px transparent;
    background-color: #cccccc50;
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
      overflow: hidden;
    }
    to {
      max-height: 400px;
      overflow: unset;
    }
  }
  .selectNoForm-options {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
    padding: 8px;
    border-radius: 8px;
    animation: increaseHeight 1s ease;
    background-color: #f6eede;
    box-shadow: 0px 1px 2px 0px #8d351a30, 0px 2px 6px 2px #8d351a30;
    border: solid 1px ${props => props.theme.color.brown};
    z-index: 100;

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
  .selectNoForm-options::after {
    content: '';
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    height: 30px;
  }
`;

const SelectNoForm = ({
  defaultOption,
  name,
  options,
  setValue,
  navigateBasePath,
}) => {
  const { selectRef, selectedValue } = useSelect({
    defaultOption,
    name,
    options,
  });
  const navigateTo = useNavigate();
  useEffect(() => {
    navigateTo(navigateBasePath + selectedValue);
    setValue(selectedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);
  return (
    <SelectNoFormStyled>
      <div ref={selectRef} className="selectNoForm-wrap">
        <div className="selectNoForm-default">
          <p>{selectedValue}</p>
          <i className="bx bxs-down-arrow"></i>
        </div>
        <ul className="selectNoForm-options hidden">
          {options.map(option => (
            <li key={option}>{option}</li>
          ))}
        </ul>
      </div>
    </SelectNoFormStyled>
  );
};

export { SelectNoForm };
