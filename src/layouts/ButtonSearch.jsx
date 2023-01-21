import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { mobile } from '~/styles/responsive';

const ButtonSearchStyled = styled.button`
  position: fixed;
  bottom: 100px;
  right: 35px;
  display: none;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.theme.color.brown};
  color: ${props => props.theme.color.skin} !important;
  font-size: 24px;
  cursor: pointer;
  opacity: 0.95;
  z-index: 777;
  font-weight: 900;

  ${mobile(css`
    display: flex;
    right: 20px;
  `)}

  :hover {
    opacity: 0.8;
  }
`;

const ButtonSearch = () => {
  const navigateTo = useNavigate();
  return (
    <ButtonSearchStyled
      title="Search"
      onClick={() => {
        navigateTo('/search?layoutSearch=');
      }}
    >
      <i className="bx bx-search"></i>
    </ButtonSearchStyled>
  );
};

export default ButtonSearch;
