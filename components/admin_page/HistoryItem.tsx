import styles from './HistoryItem.module.css';
import { useEffect, useRef, useState } from 'react';
import { HistoryContent } from './HistoryContent';
import { RequestHistory } from '@/lib/types';

export const HistoryItem = ({ historyItem }: { historyItem: RequestHistory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const listItemRef = useRef<HTMLLIElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (contentRef.current) {
      if (listItemRef.current) {
        listItemRef.current.classList.toggle(styles.active);
      }
      if (isOpen) {
        contentRef.current.style.maxHeight = contentRef?.current?.scrollHeight + 'px';
      } else {
        contentRef.current.style.maxHeight = '';
      }
    }
  }, [isOpen]);

  const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  return (
    <>
      <li ref={listItemRef} className={styles.history__listItem} onClick={handleClick}>
        <span>{new Date(historyItem.timestamp).toLocaleString()}</span>
        <span>{historyItem.name} </span>
      </li>
      <div ref={contentRef} className={styles.content}>
        <HistoryContent historyItem={historyItem} />
      </div>
    </>
  );
};
