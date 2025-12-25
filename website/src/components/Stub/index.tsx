import React from 'react';
import styles from './styles.module.css';

export default function Stub({ children })
{
  return (
    <div className={styles.stub}>
      <hr />
      {children ?? "This section of the page is incomplete."}
      <hr />
    </div>
  );
};
