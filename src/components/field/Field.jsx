import styled from 'styled-components';
import PropTypes from 'prop-types';

const FieldStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;
  width: ${props => props.width || '100%'}; ;
`;
/**
 *
 * @requires
 * @param {*} children
 */

const Field = ({ children, ...props }) => {
  return <FieldStyled {...props}>{children}</FieldStyled>;
};

Field.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Field;
