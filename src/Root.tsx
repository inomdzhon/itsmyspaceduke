import React from 'react';

import { Main } from 'sections/Main';
import { About } from 'sections/About';
import { Game } from 'sections/Game';

import styles from './Root.module.css';

export function Root() {
  return (
    <div className={styles.host}>
      <Main />
      <About />
      <Game />
    </div>
  );
}
