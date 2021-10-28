import React from 'react';

import { Button } from 'components/Button';
import { Typography } from 'components/Typography';

import { useScrollTo } from 'shared/react';

import imageSpace307 from './assets/space307.svg';
import imageDataDuck from './assets/dataduck.svg';

import styles from './Main.module.css';

export function Main() {
  const handleScrollToClick = useScrollTo();

  return (
    <section className={styles.host}>
      <div className={styles.top}>
        <img src={imageSpace307} alt="Logo of Space307 company" width={32} height={32} />
        <img src={imageDataDuck} alt="Logo of DataDuck company" width={32} height={32} />
      </div>
      <div className={styles.bottom}>
        <Typography variant="h1" color="alpha" align="center" className={styles.title}>Ты в игре?</Typography>
        <Typography variant="text" color="beta" align="center" className={styles.description}>Здесь кандидаты получают возможность собеседоваться по справедливости и в уникальных условиях. Они страдали от неравенства и дискриминации, и мы даём им последний шанс пройти собеседование честно и получить оффер.</Typography>
        <Button component="a" href="#game" color="accent" size="large" fullWidth className={styles.action} onClick={handleScrollToClick}>Я в игре!</Button>
        <svg className={styles.actionIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
          <path fill="#fff" d="M17.707 13.293a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0l-5-5a1 1 0 1 1 1.414-1.414L11 16.586V5a1 1 0 1 1 2 0v11.586l3.293-3.293a1 1 0 0 1 1.414 0Z" />
        </svg>
      </div>
    </section>
  );
}
