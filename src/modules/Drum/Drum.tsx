import * as React from 'react';
import classNames from 'classnames';

// import { usePrevious } from 'shared/hooks/usePrevious';
import { ButtonBase } from 'components/ButtonBase';

// import { Award } from './components/Award/Award';
// import { Winner } from './components/Winner/Winner';

import { randomInt, Interpolator } from './lib';

import bodyImage from './assets/drum-body.png';
import borderImage from './assets/drum-border.png';

import {
  TCompetitionPrizeFundDistributionMap,
  TCompetitionResultsWinner,
  TCompetitionResultsWinners,
  TCompetitionResultsPlayers,
} from './types';

import styles from './Drum.module.css';

type TDrumProps = {
  winnerIndex: number | null;
  winners: TCompetitionResultsWinners;
  distribution: TCompetitionPrizeFundDistributionMap;
  players: TCompetitionResultsPlayers;
  className?: string;
  onWinnerVisible?(visible: boolean): void;
};

export type TAnimationState = {
  initialTranslateY: number;
  minTranslateY: number;
  maxTranslateY: number;
  translateY: number | null;
  inSector: boolean;
  inWinnerSector: boolean;
  frameId: number | undefined;
  isInitialState: boolean;
};

const FULL_TURN = 59;
const MAX_SPEED = 3;
const MIN_SPEED = 1;

const ANIMATION_START_DURATION = 900;
const ANIMATION_STOP_DURATION = 3000;

export const Drum: React.FC<TDrumProps> = ({
  winnerIndex,
  winners,
  players,
  distribution,
  className,
  onWinnerVisible,
}) => {
  const [playerIndex, setPlayerIndex] = React.useState(-1);
  const [showedWinner, setShowedWinner] = React.useState<TCompetitionResultsWinner | null>(null);

  const winner = React.useMemo(() => {
    return winnerIndex !== null ? winners[winnerIndex] : undefined;
  }, [winners, winnerIndex]);

  // const currentAward = React.useMemo(() => {
  //   const resultWinner = winner ?? winners[winners.length - 1];
  //   return resultWinner ? distribution[resultWinner.position] : undefined;
  // }, [winner, winners, distribution]);

  // const previousWinner = usePrevious(winner);

  const animationStateRef = React.useRef<TAnimationState>({
    initialTranslateY: -400,
    minTranslateY: -28,
    maxTranslateY: -262,
    translateY: null,
    inSector: false,
    inWinnerSector: false,
    frameId: undefined,
    isInitialState: true,
  });

  React.useEffect(() => {
    animationStateRef.current.isInitialState = winnerIndex === null || winnerIndex === winners.length - 1;
  }, [winners, winnerIndex]);

  const interpolators = React.useMemo(() => ({
    start: new Interpolator('easeInQuad'),
    middle: new Interpolator('linear'),
    stop: new Interpolator('easeOutQuad'),
  }), []);

  const stonesRef = React.useRef<HTMLDivElement | null>(null);

  const handleSpinDrum = React.useCallback(() => {
    const stonesElement = stonesRef.current;
    const animationState = animationStateRef.current;

    if (!stonesElement) {
      animationStateRef.current.frameId = requestAnimationFrame(handleSpinDrum);
      return;
    } else if (!winner) {
      animationState.translateY = animationState.initialTranslateY;
      stonesElement.style.transform = `translateY(${animationState.translateY}%)`;
      return;
    }

    const now = Date.now();

    let addedTranslate = MIN_SPEED;

    if (!interpolators.start.completed(now)) {
      addedTranslate = interpolators.start.fromTo(0, MAX_SPEED, now);
    } else if (!interpolators.middle.completed(now)) {
      addedTranslate = interpolators.middle.fromTo(MAX_SPEED, MAX_SPEED, now);
    } else if (!interpolators.stop.completed(now)) {
      addedTranslate = interpolators.stop.fromTo(MAX_SPEED, MIN_SPEED, now);
    }

    if (animationState.translateY === null) {
      animationState.translateY =
        animationState.isInitialState && !interpolators.start.completed(now)
          ? animationStateRef.current.initialTranslateY
          : animationStateRef.current.maxTranslateY;
    }

    let newTranslateY = animationState.translateY + addedTranslate;

    if (newTranslateY > animationState.minTranslateY) {
      newTranslateY = animationState.maxTranslateY;
    }

    animationState.translateY = newTranslateY;

    const diff = Math.abs(animationState.translateY - Math.floor(animationState.translateY / FULL_TURN) * FULL_TURN);

    stonesElement.style.transform = `translateY(${animationState.translateY}%)`;

    let isStopped = false;

    // check intersection with center sector
    if (diff >= 20 && diff <= 45) {
      if (!animationState.inSector) {
        animationState.inSector = true;

        if (interpolators.stop.completed(now)) {
          animationState.inWinnerSector = true;
          setShowedWinner(winner);
        } else {
          animationState.inWinnerSector = false;
          setPlayerIndex(randomInt(0, players.length - 1));
        }
      }

      if (animationState.inWinnerSector && interpolators.stop.completed(now) && diff >= 32 && diff <= 35) {
        isStopped = true;
        setPlayerIndex(-1);
      }
    } else {
      if (animationState.inSector) {
        animationState.inSector = false;
      }
    }

    if (!isStopped) {
      animationStateRef.current.frameId = requestAnimationFrame(handleSpinDrum);
    }
  }, [stonesRef, players.length, winner, interpolators]);

  React.useEffect(() => {
    const startingAtMs = Date.now();
    const stoppedAtMs = Date.now() + 5000;

    interpolators.start.init(startingAtMs, startingAtMs + ANIMATION_START_DURATION);

    interpolators.middle.init(
      startingAtMs + ANIMATION_START_DURATION,
      stoppedAtMs - ANIMATION_STOP_DURATION,
    );

    interpolators.stop.init(stoppedAtMs - ANIMATION_STOP_DURATION, stoppedAtMs);

    if (animationStateRef.current.frameId) {
      cancelAnimationFrame(animationStateRef.current.frameId);
    }
    animationStateRef.current.frameId = requestAnimationFrame(handleSpinDrum);
  }, [handleSpinDrum, interpolators]);

  React.useEffect(() => {
    onWinnerVisible?.(showedWinner !== null);
  }, [showedWinner, onWinnerVisible]);

  const player = showedWinner ?? players[playerIndex];

  return (
    <div className={classNames(styles.host, className)}>
      <div className={styles.container}>
        <div className={styles.glow} />
        <div className={styles.stonesContainer}>
          <div className={styles.stones} ref={stonesRef}>
            <span className={styles.stone}>🍺</span>
            <span className={styles.stone}>🔍</span>
            <span className={styles.stone}>🎭</span>
            <span className={styles.stone}>🗯</span>
            <span className={styles.stone}>💣</span>
            <span className={styles.stone}>🕹</span>
            <span className={styles.stone}>⚡</span>
            <span className={styles.stone}>🦑</span>
          </div>
        </div>
        <ButtonBase className={styles.actionStart}>Крутить</ButtonBase>
        <img alt="" className={styles.body} src={bodyImage} />
        <img alt="" className={styles.border} src={borderImage} />
      </div>
    </div>
  );
};
