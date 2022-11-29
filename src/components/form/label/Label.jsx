import styled from 'styled-components';
import PropTypes from 'prop-types';

const LabelStyled = styled.label`
  display: block;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.2px;
  color: #181818;
  font-family: ${props => props.theme.font.tertiary};
`;

/**
 * @requires
 * @param {string} id
 * @param {*} children
 */

const Label = ({ id, children, ...props }) => {
  return (
    <LabelStyled htmlFor={id} {...props}>
      {children}
    </LabelStyled>
  );
};

Label.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};

export default Label;
