import * as React from 'react';
import classNames from 'classnames';
import { useTransition, animated } from 'react-spring';

import type { TCompetitionResultsWinner, TCompetitionResultsPlayer } from '../../types';

import styles from './Winner.module.css';

type TWinnerProps = {
  player: TCompetitionResultsWinner | TCompetitionResultsPlayer;
  className?: string;
};

export const Winner: React.FC<TWinnerProps> = ({ player, className }) => {
  const [playerTransition] = useTransition(
    player,
    {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
      config: { duration: 250 },
    },
    [player],
  );

  return (
    <div className={classNames(styles.host, className)}>
      {playerTransition((style, player) => {
        return (
          <animated.div className={styles.content} key={`${player.points}_${player.name}`} style={style}>
            {player.name}
          </animated.div>
        );
      })}
    </div>
  );
};
