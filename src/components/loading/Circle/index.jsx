import styles from './LoadingCircle.module.css';

const LoadingCircle = ({ size }) => {
  return (
    <div className={styles.dashedLoading} style={{ '--size': size }}></div>
  );
};

export { LoadingCircle };
