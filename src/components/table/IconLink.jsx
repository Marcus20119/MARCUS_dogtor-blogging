import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const IconLinkStyled = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: solid 1px #ccc;
  padding: 6px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
    background-color: #eee;
  }
`;

const IconLink = ({ children, navigatePath, ...rest }) => {
  const navigateTo = useNavigate();

  return (
    <IconLinkStyled
      onClick={e => {
        e.preventDefault();
        navigateTo(navigatePath);
      }}
      href={navigatePath}
      {...rest}
    >
      {children}
    </IconLinkStyled>
  );
};

export { IconLink };
