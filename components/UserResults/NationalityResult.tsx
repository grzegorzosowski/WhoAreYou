import styles from './UserResults.module.css';
import { getCountryNameFromCode } from '@/lib/getCountryNameFromCode';
import { probabilityToPercentage } from '@/lib/probabilityToPercentage';
import { ProbabilityBar } from '../ProbabilityBar/ProbabilityBar';
import { UserNationalityDataWithoutCount } from '@/lib/types';

export const NationalityResult = ({
  userNationalityData,
}: {
  userNationalityData: UserNationalityDataWithoutCount;
}) => {
  return (
    <div className={styles.section}>
      <h3 className={styles.section__title}>NATIONALITY</h3>
      {userNationalityData.country.map((country) => (
        <div key={country.country_id} className={styles.nationalityItem}>
          <p className={styles.margin_bottom}>
            <span>{getCountryNameFromCode(country.country_id) ?? country.country_id}</span>
          </p>
          <ProbabilityBar percentage={probabilityToPercentage(country.probability)} />
        </div>
      ))}
    </div>
  );
};
