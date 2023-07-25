import React from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
};

export const Button = ({
  children,
  className,
  type = 'button',
  disabled = false,
  onClick,
}: ButtonProps) => (
  <button
    className={`${styles.button} ${className}`}
    type={type}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);
