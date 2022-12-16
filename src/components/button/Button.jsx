import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LoadingCircle } from '../loading';

const ButtonStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${props => props.padding || '8px 20px'};
  border-radius: 8px;
  font-weight: 600;
  font-size: ${props =>
    props.btnStyle === 'small'
      ? '16px'
      : props.btnStyle === 'medium'
      ? '18px'
      : '20px'};
  letter-spacing: 1px;
  margin: 0 auto;
  min-width: fit-content;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  opacity: ${props => (props.disabled ? '0.7' : '0.9')};
  width: ${props => props.width || '100%'};
  height: ${props => props.height || 'unset'};
  font-family: ${props => props.theme.font.tertiary};
  background-color: ${props =>
    props.backgroundColor || props.theme.color.brown};
  color: ${props => props.color || props.theme.color.white};

  &:hover {
    opacity: ${props => (props.disabled ? '0.7' : '1')};
  }
`;

/**
 *
 * @param {*} children - text or an Element inside the button
 * @param {boolean} disabled - defined the button is disabled or not
 * @param {boolean} isSubmitting - defined the button is submitting or not
 * @param {text} btnStyle - oneOf(['large', 'medium', 'small'])
 * @returns
 */

const Button = ({ disabled, isSubmitting, children, btnStyle, ...props }) => {
  const child = isSubmitting ? <LoadingCircle size="27px" /> : children;
  return (
    <ButtonStyled
      disabled={disabled || isSubmitting}
      btnStyle={btnStyle}
      {...props}
    >
      {child}
    </ButtonStyled>
  );
};

Button.propTypes = {
  children: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  btnStyle: PropTypes.oneOf(['large', 'medium', 'small']),
};

export default Button;
