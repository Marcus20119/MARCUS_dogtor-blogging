import styled from 'styled-components';

const IconButtonStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: solid 1px #ccc;
  padding: 6px;
`;

const IconButton = ({ children, onClick, ...rest }) => {
  return (
    <IconButtonStyled onClick={onClick} {...rest}>
      {children}
    </IconButtonStyled>
  );
};

export default IconButton;
