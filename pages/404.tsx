import Link from 'next/link';
import styles from '@/styles/404.module.css';

export default function Custom404() {
  return (
    <div className={styles.container}>
      <img src="/404error.png" alt="404" />
      <span>The page you’re looking for doesn’t exist.</span>
      <Link className={styles.backward_button} href="/">
        Go back home
      </Link>
    </div>
  );
}
