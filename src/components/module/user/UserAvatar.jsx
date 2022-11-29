import styled from 'styled-components';
import PropTypes from 'prop-types';

const UserAvatarStyled = styled.div`
  display: block;
  height: ${props => props.size || '45px'};
  width: ${props => props.size || '45px'};
  border-radius: 50%;
  border: solid 1px ${props => props.theme.color.brown};
  overflow: hidden;
  cursor: pointer;
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
  }
`;

/**
 *
 * @param {string} size - size of the image
 * @requires
 * @param {string} src
 * @param {string} alt
 */

const UserAvatar = ({ size, src, alt, ...rest }) => {
  return (
    <UserAvatarStyled size={size} {...rest}>
      <img src={src} alt={alt} />
    </UserAvatarStyled>
  );
};

UserAvatar.propTypes = {
  size: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export { UserAvatar };
