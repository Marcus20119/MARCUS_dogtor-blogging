import { useController, useWatch } from 'react-hook-form';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelect } from '~/hooks';

const SelectStyled = styled.div`
  width: 100%;
  min-height: 50px;

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
      props.secondary ? '#cccccc50' : props.theme.color.skin};
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
      overflow-y: hidden;
    }
    to {
      max-height: 254px;
      overflow-y: auto;
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
    max-height: 254px;
    /* overflow-y: auto; */
    padding: 8px;
    border-radius: 8px;
    animation: increaseHeight 0.7s ease forwards;
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
  .select-options::-webkit-scrollbar {
    width: 18px;
    height: 18px;
    background-color: transparent;
  }

  .select-options::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #8d351a90;
    border: solid 4px rgba(0, 0, 0, 0);
    -webkit-background-clip: padding-box; /* for Safari */
    background-clip: padding-box;
  }
  /**
  *  .select-options::after {
  *  content: '';
  *  position: absolute;
  *  top: 100%;
  *  right: 0;
  *  left: 0;
  *  height: 30px;
  }
  */
`;
const ErrorStyled = styled.span`
  display: block;
  font-size: 14px;
  line-height: 20px;
  color: red;
  font-weight: 500;
`;

/**
 * @param {Function} setValue
 * @param {Function} setError
 * @param {boolean} secondary
 * @requires
 * @param {string} name
 * @param {object} control - control object from react-hook-form
 * @param {string} defaultoption - placeholder of the selection
 * @param {array} options - Array of the options
 */

const Select = ({
  name,
  control,
  setValue,
  setError,
  defaultoption = 'Select one option...',
  secondary,
  options,
  ...rest
}) => {
  const {
    formState: { errors },
  } = useController({ name, control, defaultValue: '' });

  const watchOptionValue = useWatch({ name, control });

  const { selectRef, selectedValue } = useSelect({
    defaultOption: defaultoption,
    watchOptionValue,
    setValue,
    setError,
    name,
    options,
  });
  return (
    <SelectStyled secondary={secondary} {...rest}>
      <div ref={selectRef} className="select-wrap">
        <div className="select-default">
          <p>{selectedValue}</p>
          <i className="bx bxs-down-arrow"></i>
        </div>
        <ul className="select-options hidden">
          {options.map(option => (
            <li key={option}>
              {option === 'Food n Drink' ? 'Food & Drink' : option}
            </li>
          ))}
        </ul>
      </div>

      {errors?.[name]?.message && (
        <ErrorStyled>{errors[name].message}</ErrorStyled>
      )}
    </SelectStyled>
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  setValue: PropTypes.func,
  setError: PropTypes.func,
  defaultoption: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary']),
  options: PropTypes.array.isRequired,
};

export { Select };
