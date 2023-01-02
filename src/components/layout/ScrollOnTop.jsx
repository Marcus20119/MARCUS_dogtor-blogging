import { Fragment, useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const ScrollOnTopStyled = styled.div`
  position: fixed;
  bottom: 30px;
  right: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.theme.color.brown};
  color: ${props => props.theme.color.skin};
  font-size: 30px;
  cursor: pointer;
  opacity: 0.95;

  :hover {
    opacity: 0.8;
  }
`;

const ScrollOnTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
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
      {show && (
        <ScrollOnTopStyled onClick={handleScrollOnTop}>
          <i className="bx bx-up-arrow-alt"></i>
        </ScrollOnTopStyled>
      )}
    </Fragment>
  );
};

export { ScrollOnTop };
