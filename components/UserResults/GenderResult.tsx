import styles from './UserResults.module.css';
import { probabilityToPercentage } from '@/lib/probabilityToPercentage';
import { UserGenderDataWithoutCount } from '@/lib/types';
import { ProbabilityBar } from '../ProbabilityBar/ProbabilityBar';

export const GenderResult = ({
  userGenderData,
}: {
  userGenderData: UserGenderDataWithoutCount;
}) => {
  const percentage = probabilityToPercentage(userGenderData.probability);
  return (
    <div className={styles.section}>
      <h3 className={styles.section__title}>GENDER</h3>
      <div>
        <div className={styles.genderItem__label}>
          <span>
            <p>{userGenderData.gender}</p>
          </span>
        </div>
        <ProbabilityBar percentage={percentage} />
      </div>
    </div>
  );
};
