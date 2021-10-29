import React from 'react';
import ReactConfetti from 'react-confetti';

import { Typography } from 'components/Typography';
import { Button } from 'components/Button';

import { Drum } from 'modules/Drum/Drum';

import { classNames } from 'shared/browser';
import { BOT_LINK } from 'shared/constants';
import type { TInterviewType } from 'shared/types';

import styles from './Game.module.css';

const tweenFunctions = {
  linear: (currentTime: number, currentValue: number, targetValue: number, duration: number): number => {
    const c = targetValue - currentValue;
    return (c * currentTime) / duration + currentValue;
  },
};

const getNumberOfPieces = (width?: number) => {
  if (!width) {
    return 300;
  } else if (width < 375) {
    return 150;
  } else if (width < 640) {
    return 200;
  } else if (width < 1024) {
    return 250;
  }
}

const confettiColors = ['#c18705', '#fff7e7', '#96542a', '#ffde85', '#5a4200'];

export function Game() {
  const hostRef = React.useRef<HTMLElement | null>(null);
  const [selectedItem, setSelectedItem] = React.useState<TInterviewType | null>();
  const botLink = React.useMemo(() => {
    let parameters = '';
    if (selectedItem) {
      parameters += `?start=${selectedItem.id}`;
    }
    return `${BOT_LINK}${parameters}`;
  }, [selectedItem]);

  return (
    <section id="game" className={styles.host} ref={hostRef}>
      {selectedItem ? (
        <ReactConfetti
          className={styles.confetti}
          width={hostRef.current?.offsetWidth}
          height={hostRef.current?.offsetHeight}
          initialVelocityY={18}
          gravity={0.5}
          colors={confettiColors}
          numberOfPieces={getNumberOfPieces(hostRef.current?.offsetWidth)}
          tweenDuration={3000}
          tweenFunction={tweenFunctions.linear}
          recycle={false}
        />
      ) : null}
      <Typography variant="h2" color={selectedItem ? 'warning' : "alpha"} align="center" className={styles.title}>{selectedItem ? selectedItem.title : 'Крути слоты'}</Typography>
      <Drum onUpdate={setSelectedItem} />
      <Button component="a" href={botLink} target="_blank" color="accent" size="large" fullWidth className={classNames(styles.action, selectedItem && styles.action_visible)}>Хочу такой собес</Button>
    </section>
  );
}
