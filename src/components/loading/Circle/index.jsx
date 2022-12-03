import styles from './LoadingCircle.module.css';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LoadingCircleStyled = styled.div`
  --size: ${props => `${props.size} !important` || '30px'};
`;

/**
 *
 * @param {string} size
 */

const LoadingCircle = ({ size }) => {
  return (
    <LoadingCircleStyled
      className={styles.dashedLoading}
      size={size}
    ></LoadingCircleStyled>
  );
};

LoadingCircle.propTypes = {
  size: PropTypes.string,
};

export { LoadingCircle };
