import styles from './HistoryContent.module.css';
import { getCountryNameFromCode } from '@/lib/getCountryNameFromCode';
import { probabilityToPercentage } from '@/lib/probabilityToPercentage';
import { RequestHistory } from '@/lib/types';

export const HistoryContent = ({ historyItem }: { historyItem: RequestHistory }) => {
  return (
    <>
      {historyItem.genderData.count !== 0 ? (
        <>
          <div className={styles.content__item}>
            <div className={styles.content__item_genderData}>
              <span>{historyItem.genderData.gender?.toUpperCase()}</span>
              <span style={{ fontWeight: '900' }}>
                {probabilityToPercentage(historyItem.genderData.probability)}%
              </span>
            </div>
          </div>
          <div className={styles.content__item}>
            {historyItem.nationalityData.country.map((country, index) => {
              return (
                <div key={index} className={styles.content__item_nationalityData}>
                  <span>{getCountryNameFromCode(country.country_id)}</span>
                  <span style={{ textAlign: 'center', fontWeight: '900' }}>
                    {probabilityToPercentage(country.probability)}%
                  </span>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '1rem' }}>
          There is no data for this request
        </div>
      )}
    </>
  );
};
