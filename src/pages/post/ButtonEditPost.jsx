import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { mobile } from '~/styles/responsive';

const ButtonEditPostStyled = styled.a`
  position: fixed;
  bottom: 100px;
  right: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.theme.color.brown};
  color: ${props => props.theme.color.skin} !important;
  font-size: 26px;
  cursor: pointer;
  opacity: 0.95;

  ${mobile(css`
    right: 20px;
    bottom: 170px;
  `)}

  :hover {
    opacity: 0.8;
  }
`;

const ButtonEditPost = ({ navigatePath }) => {
  const navigateTo = useNavigate();

  return (
    <ButtonEditPostStyled
      href={navigatePath}
      onClick={e => {
        e.preventDefault();
        navigateTo(navigatePath);
      }}
      title="Edit post"
    >
      <i className="bx bx-edit"></i>
    </ButtonEditPostStyled>
  );
};

export default ButtonEditPost;
