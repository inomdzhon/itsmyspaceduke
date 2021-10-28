import React from 'react';

import { Typography } from 'components/Typography';
import { Button } from 'components/Button';

import { INTERVIEW_TYPES } from 'shared/constants';

import { Drum } from 'modules/Drum/Drum';

import styles from './Game.module.css';

export function Game() {
  return (
    <section id="game" className={styles.host}>
      <Typography variant="h2" color="alpha" align="center" className={styles.title}>Крути слоты</Typography>
      <Drum
        winnerIndex={null}
        winners={[]}
        players={[]}
        distribution={{}}
      />
      <Button component="a" href="#" color="accent" size="large" fullWidth className={styles.action}>Перейти в бота</Button>
    </section>
  );
}
