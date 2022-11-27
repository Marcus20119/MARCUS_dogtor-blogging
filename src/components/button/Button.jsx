import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LoadingCircle } from '../loading';

const ButtonStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: ${props => (props.type === 'small' ? '16px' : '20px')};
  letter-spacing: 1px;
  margin: 0 auto;
  min-width: fit-content;
  cursor: pointer;
  opacity: 0.9;
  width: ${props => props.width || '100%'};
  height: ${props => props.height || 'unset'};
  font-family: ${props => props.theme.font.tertiary};
  background-color: ${props =>
    props.backgroundColor || props.theme.color.brown};
  color: ${props => props.color || props.theme.color.white};

  &:hover {
    opacity: 1;
  }
`;

/**
 *
 * @param {*} children - text or an Element inside the button
 * @param {boolean} disabled - defined the button is disabled or not
 * @param {boolean} isSubmitting - defined the button is submitting or not
 * @returns
 */

const Button = ({ disabled, isSubmitting, children, ...props }) => {
  const child = isSubmitting ? <LoadingCircle /> : children;
  return (
    <ButtonStyled disabled={disabled || isSubmitting} {...props}>
      {child}
    </ButtonStyled>
  );
};

Button.propTypes = {
  children: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
  isSubmitting: PropTypes.bool,
};

export default Button;
