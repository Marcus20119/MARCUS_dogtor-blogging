import { Fragment, useEffect } from 'react';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { mobile } from '~/styles/responsive';

const ButtonScrollOnTopStyled = styled.div`
  position: fixed;
  bottom: 30px;
  right: 35px;
  display: ${props => (props.show ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.theme.color.brown};
  color: ${props => props.theme.color.skin} !important;
  font-size: 30px;
  cursor: pointer;
  opacity: 0.95;
  z-index: 777;

  ${mobile(css`
    right: 20px;
    display: flex !important;
  `)}

  :hover {
    opacity: 0.8;
  }
`;

const ButtonScrollOnTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollOnTop = () => {
    document.documentElement.scrollTop = 0;
  };

  return (
    <Fragment>
      <ButtonScrollOnTopStyled
        onClick={handleScrollOnTop}
        title="Scroll to top"
        show={show}
      >
        <i className="bx bx-up-arrow-alt"></i>
      </ButtonScrollOnTopStyled>
    </Fragment>
  );
};

export { ButtonScrollOnTop };
