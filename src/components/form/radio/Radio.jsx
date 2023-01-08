import { useController, useWatch } from 'react-hook-form';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const RadioStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;

  .radio-wrap {
    display: flex;
    width: 100%;
    height: 50px;
    gap: 24px;
  }
  .radio-item-wrap {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .radio-item_check-wrap {
    position: relative;
    width: 20px;
    height: 20px;
  }
  .radio-item_check {
    opacity: 0;
  }
  .radio-item_check-alternative {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #cccccc50;
    border: solid 1px #cccccc;
  }

  .radio-item-wrap:nth-child(1)
    .radio-item_check:checked
    + .radio-item_check-alternative {
    background-color: ${props =>
      props.colors ? props.colors[0] : props.theme.color.brown};
  }
  .radio-item-wrap:nth-child(2)
    .radio-item_check:checked
    + .radio-item_check-alternative {
    background-color: ${props =>
      props.colors ? props.colors[1] : props.theme.color.brown};
  }
  .radio-item-wrap:nth-child(3)
    .radio-item_check:checked
    + .radio-item_check-alternative {
    background-color: ${props =>
      props.colors ? props.colors[2] : props.theme.color.brown};
  }

  .radio-item_label {
    margin-left: 8px;
  }
`;
const ErrorStyled = styled.span`
  display: block;
  font-size: 14px;
  line-height: 20px;
  color: red;
  font-weight: 500;
  margin-right: auto;
`;

/**
 * @requires
 * @param {string} name
 * @param {object} control - control object from react-hook-form
 * @param {array} radios - Array of the radios
 */

const Radio = ({ name, control, radios, colors, ...props }) => {
  const {
    field,
    formState: { errors },
  } = useController({ name, control, defaultValue: '' });

  const watchRadioValue = useWatch({ name, control });

  return (
    <RadioStyled colors={colors}>
      <div className="radio-wrap">
        {radios.map(radio => (
          <label key={radio.name} className="radio-item-wrap">
            <div className="radio-item_check-wrap">
              <input
                type="radio"
                className="radio-item_check"
                // eslint-disable-next-line eqeqeq
                checked={watchRadioValue == radio.value}
                {...props}
                {...{ ...field, value: radio.value }}
              />
              <div className="radio-item_check-alternative"></div>
            </div>
            <span className="radio-item_label">{radio.name}</span>
          </label>
        ))}
      </div>
      {errors?.[name]?.message && (
        <ErrorStyled>{errors[name].message}</ErrorStyled>
      )}
    </RadioStyled>
  );
};

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  radios: PropTypes.array.isRequired,
};

export { Radio };
