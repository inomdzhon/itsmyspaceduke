import React from 'react';

import { Typography } from 'components/Typography';
import { Button } from 'components/Button';
import { Card } from 'components/Card';

import { useScrollTo } from 'shared/react';

import { INTERVIEW_TYPES } from 'shared/constants';

import styles from './About.module.css';

export function About() {
  const handleScrollToClick = useScrollTo();

  return (
    <section className={styles.host}>
      <div className={styles.top}>
        <Typography variant="h2" color="alpha" align="center" className={styles.title}>Что тебя ждет</Typography>
        <Typography variant="text" color="beta">Мы приготовили целую кучу собеседований на любой вкус, но выбор решит жребий.</Typography>
      </div>
      <div className={styles.cards}>
        {INTERVIEW_TYPES.map(card => (
          <Card key={card.id} image={card.image} title={card.title} description={card.description} />
        ))}
      </div>
      <div className={styles.bottom}>
        <Button component="a" href="#game" color="accent" size="large" fullWidth className={styles.action} onClick={handleScrollToClick}>Ну, погнали!</Button>
      </div>
    </section>
  );
}
