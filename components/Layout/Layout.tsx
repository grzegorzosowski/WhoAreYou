import React from 'react';
import { font } from './../../lib/fonts';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className={font.className}>{children}</div>;
};
