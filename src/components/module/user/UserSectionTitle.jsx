import styled from 'styled-components';
import PropTypes from 'prop-types';

const UserSectionTitleStyled = styled.span`
  display: block;
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 20px;
  font-family: ${props => props.theme.font.tertiary};
  color: ${props => props.theme.color.brown};
  text-shadow: 0 0 5px ${props => props.theme.color.skin};
`;

/**
 * @requires
 * @param {string} children
 * @returns
 */

const UserSectionTitle = ({ children }) => {
  return <UserSectionTitleStyled>{children}</UserSectionTitleStyled>;
};

UserSectionTitle.propTypes = {
  children: PropTypes.string.isRequired,
};

export default UserSectionTitle;
