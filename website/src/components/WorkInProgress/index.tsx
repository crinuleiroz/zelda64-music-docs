import React from 'react';
import styles from './styles.module.css';

import carpentersImg from '@site/static/img/carpenters.png';

export default function WorkInProgress()
{
  return (
    <div className={styles.sbubbleParent}>
      <img
        className={styles.Image}
        src={carpentersImg}
        alt="Carpenters"
      />
      <span className={styles.sbubble}>
        Kaah! This page is currently under construction!
        <span className={styles.arrow}></span>
      </span>
    </div>
  );
}