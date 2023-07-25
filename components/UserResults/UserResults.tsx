import styles from './UserResults.module.css';
import { UserGenderDataWithoutCount, UserNationalityDataWithoutCount } from '@/lib/types';
import { GenderResult } from './GenderResult';
import { NationalityResult } from './NationalityResult';
import { enqueueSnackbar } from 'notistack';

type Props = {
  userGenderData: UserGenderDataWithoutCount | undefined;
  userNationalityData: UserNationalityDataWithoutCount | undefined;
};

export const UserResults = ({ userGenderData, userNationalityData }: Props) => {
  const handleCopyToClipboard = () => {
    const textToCopy = { ...userGenderData, ...userNationalityData };
    navigator.clipboard.writeText(JSON.stringify(textToCopy));
    enqueueSnackbar('Data has been copied to clipboard', { variant: 'info' });
  };

  return (
    <div className={styles.container}>
      {userGenderData && userNationalityData && (
        <>
          <div className={styles.userResult__header}>
            <h2 className={styles.userResult__title}>
              NAME:{' '}
              <span style={{ fontWeight: '900', fontSize: '2rem' }}>{userGenderData?.name}</span>
            </h2>
            <button className={styles.userResult__copyButton} onClick={handleCopyToClipboard}>
              Copy
            </button>
          </div>
          <GenderResult userGenderData={userGenderData} />
          <NationalityResult userNationalityData={userNationalityData} />
        </>
      )}
    </div>
  );
};
