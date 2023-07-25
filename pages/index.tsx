import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/index.module.css';
import { UserForm } from '@/components/UserForm/UserForm';
import { useState } from 'react';
import { UserResults } from '@/components/UserResults/UserResults';
import { Button } from '@/components/Button/Button';
import { Loader } from '@/components/Loader/Loader';
import { UserGenderDataWithoutCount, UserNationalityDataWithoutCount } from '@/lib/types';

export default function Home() {
  const [userGenderData, setUserGenderData] = useState<UserGenderDataWithoutCount>();
  const [userNationalityData, setUserNationalityData] = useState<UserNationalityDataWithoutCount>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <Head>
        <title>Who are you?</title>
        <meta name="description" content="Find out what yor name is telling about you" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/faviconQ.ico" />
      </Head>
      <div style={{ position: 'relative' }}>
        <Link href="/login">
          <Button className={styles.login__button}>SIGN IN</Button>
        </Link>
        <main className={`${styles.main}`}>
          <section className={styles.header__text}>
            <h1 className={styles.header__title}>Who are you?</h1>
            <p className={styles.header__subtitle}>
              Let's find out what your name is telling about you!!!
            </p>
          </section>
          <section className={styles.form}>
            <UserForm
              setUserGenderData={setUserGenderData}
              setUserNationalityData={setUserNationalityData}
              setIsLoading={setIsLoading}
            />
          </section>
          <section className={styles.result}>
            {isLoading ? (
              <Loader />
            ) : (
              <UserResults
                userGenderData={userGenderData}
                userNationalityData={userNationalityData}
              />
            )}
          </section>
        </main>
      </div>
    </>
  );
}
