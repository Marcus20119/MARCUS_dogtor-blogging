import styles from './LoadingBounce.module.scss';

const LoadingBounce = ({ mainClass }) => {
  return (
    <div className={mainClass}>
      <div className={styles.loadingBounceWrap}>
        <div className={styles.loadingBounceWrapDot}></div>
        <div className={styles.loadingBounceWrapDot}></div>
        <div className={styles.loadingBounceWrapDot}></div>
        <div className={styles.loadingBounceWrapDot}></div>
      </div>
    </div>
  );
};

export default LoadingBounce;
