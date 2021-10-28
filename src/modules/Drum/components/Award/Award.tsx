import * as React from 'react';
import { useTransition, animated } from 'react-spring';
import classNames from 'classnames';

import { TCompetitionPrizeFundDistributionMapItem } from '../../types';

import styles from './Award.module.css';

type TAwardProps = {
  award: TCompetitionPrizeFundDistributionMapItem;
  className?: string;
};

export const Award: React.FC<TAwardProps> = React.memo(({ award, className }) => {
  const [awardTransition] = useTransition(
    award,
    {
      initial: { transform: 'scale(1)', opacity: 1, zIndex: 1 },
      from: { transform: 'scale(0.2)', opacity: 0.5, zIndex: 1 },
      enter: { transform: 'scale(1)', opacity: 1, zIndex: 1 },
      leave: { transform: 'scale(0.2)', opacity: 0.5, position: 'absolute' as const, zIndex: 0 },
      config: { duration: 400 },
    },
    [award],
  );

  return (
    <div className={classNames(styles.host, className)}>
      {awardTransition((style, award) => {
        return (
          <animated.div className={styles.content} key={award.position} style={style}>
            {award.award.type}
          </animated.div>
        );
      })}
    </div>
  );
});
