import styled from 'styled-components';
import { LoadingCircle } from '../loading';

const ButtonStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  width: ${props => props.width || '100%'};
  border-radius: 8px;
  font-weight: 600;
  font-size: 20px;
  letter-spacing: 1px;
  margin: 0 auto;
  min-width: fit-content;
  cursor: pointer;
  opacity: 0.9;
  font-family: ${props => props.theme.font.tertiary};
  background-color: ${props =>
    props.backgroundColor || props.theme.color.brown};
  color: ${props => props.color || props.theme.color.white};

  &:hover {
    opacity: 1;
  }
`;

const Button = ({ disabled, isSubmitting, children, ...props }) => {
  const child = isSubmitting ? <LoadingCircle /> : children;
  return (
    <ButtonStyled disabled={disabled || isSubmitting} {...props}>
      {child}
    </ButtonStyled>
  );
};

export default Button;
