import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/admin.module.css';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { getUserFromSession } from '@/lib/auth/user';
import { RequestHistoryData, RequestHistoryWithId } from '@/lib/types';
import { Button } from '@/components/Button/Button';
import { HistoryItem } from '@/components/admin_page/HistoryItem';
import { Loader } from '@/components/Loader/Loader';
import ReactPaginate from 'react-paginate';

const PAGE_SIZE = 10;

export default function Admin() {
  const [historyData, setHistoryData] = useState<RequestHistoryWithId[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    fetchHistoryData(currentPage);
  }, [currentPage]);

  const fetchHistoryData = async (page: number) => {
    try {
      const response = await axios.get('/api/getHistoryData', { params: { page, PAGE_SIZE } });
      const requestHistoryData = response.data as RequestHistoryData;
      setHistoryData(requestHistoryData.data);
      setTotalItems(requestHistoryData.totalItems);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('Error: ', error);
    }
  };
  const handlePageChange = (selectedPage: { selected: number }) => {
    const newPage = selectedPage.selected + 1;
    setCurrentPage(newPage);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Head>
        <title>Admin panel</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Admin panel" />
      </Head>
      <Link href="/api/logout">
        <Button className={styles.login__button}>LOGOUT</Button>
      </Link>
      <div className={styles.main}>
        <h2>Requests history</h2>
        <ul className={styles.history__list}>
          <li className={styles.history__listHeader}>
            <span>Timestamp</span>
            <span>Name</span>
          </li>
          {isLoading ? <Loader /> : ''}
          {historyData.map((historyItem) => {
            return <HistoryItem key={historyItem._id} historyItem={historyItem} />;
          })}
          {!isLoading && historyData.length === 0 && (
            <span className={styles.emptyList}>No requests in database</span>
          )}
        </ul>
        {!isLoading && (
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            pageCount={Math.ceil(totalItems / PAGE_SIZE)}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName={styles.pagination}
            activeClassName={styles['pagination__button--active']}
            pageClassName={styles.pagination__button}
            previousClassName={styles.pagination__buttonPrevNext}
            nextClassName={styles.pagination__buttonPrevNext}
            disabledClassName={styles.pagination__buttonDisabled}
            breakClassName={styles.pagination__break}
            pageLinkClassName={styles.pagination__link}
            renderOnZeroPageCount={null}
          />
        )}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const user = await getUserFromSession(req);
  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: {
      user,
    },
  };
};
