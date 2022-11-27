import styles from './LoadingCircle.module.css';
import PropTypes from 'prop-types';

/**
 *
 * @param {string} size
 */

const LoadingCircle = ({ size }) => {
  return (
    <div
      className={styles.dashedLoading}
      style={{ '--size': `${size} !important` }}
    ></div>
  );
};

LoadingCircle.propTypes = {
  size: PropTypes.string,
};

export { LoadingCircle };
