import styles from './ProbabilityBar.module.css';

export const ProbabilityBar = ({ percentage }: { percentage: number }) => {
  return (
    <div className={styles.container}>
      <div className={styles.bar} style={{ width: `${percentage}%` }}>
        {percentage}%
      </div>
    </div>
  );
};
