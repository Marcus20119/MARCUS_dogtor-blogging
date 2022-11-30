import { useController, useWatch } from 'react-hook-form';
import styled from 'styled-components';

const RadioStyled = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;

  .radio-wrap {
    display: flex;
    width: 100%;
    gap: 12px;
  }
  .radio-item-wrap {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .radio-item_check-wrap {
    position: relative;
    width: 16px;
    height: 16px;
  }
  .radio-item_check {
    opacity: 0;
    visibility: hidden;
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
    background-color: ${props => props.theme.color.skin};
  }
  .radio-item-wrap:nth-child(2)
    .radio-item_check:checked
    + .radio-item_check-alternative {
    background-color: ${props => props.theme.color.brown};
  }
  .radio-item-wrap:nth-child(3)
    .radio-item_check:checked
    + .radio-item_check-alternative {
    background-color: ${props => props.theme.color.black};
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
`;

const Radio = ({ name, control, label, radios, ...props }) => {
  const {
    field,
    formState: { errors },
  } = useController({ name, control, defaultValue: '' });

  const watchRadioValue = useWatch({ name, control });

  return (
    <RadioStyled>
      <div className="radio-wrap">
        {radios.map(radio => (
          <label key={radio} className="radio-item-wrap">
            <div className="radio-item_check-wrap">
              <input
                type="radio"
                className="radio-item_check"
                checked={watchRadioValue === radio}
                {...props}
                {...{ ...field, value: radio }}
              />
              <div className="radio-item_check-alternative"></div>
            </div>
            <span className="radio-item_label">{radio}</span>
          </label>
        ))}
      </div>
      {errors?.[name]?.message && (
        <ErrorStyled>{errors[name].message}</ErrorStyled>
      )}
    </RadioStyled>
  );
};

export default Radio;
