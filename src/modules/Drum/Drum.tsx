import * as React from 'react';

import { ButtonBase } from 'components/ButtonBase';

import { classNames } from 'shared/browser';
import { randomInt } from 'shared/lib';
import type { TInterviewType } from 'shared/types';
import { INTERVIEW_TYPES } from 'shared/constants';

import bodyImage from './assets/drum-body.png';
import borderImage from './assets/drum-border.png';

import styles from './Drum.module.css';

const ITEM_OFFSET = 18;
const ITEM_DELIMITER_OFFSET = 10;

type TDrumProps = {
  className?: string;
  onUpdate?(randomizedItem: TInterviewType | null): void;
};

export const Drum: React.FC<TDrumProps> = React.memo(({ className, onUpdate}) => {
  const [pristine, setPristine] = React.useState(true);
  const [selectedItem, setSelectedItem] = React.useState<TInterviewType | null>(null);
  const [started, setStarted] = React.useState(false);

  const firstItem = React.useMemo(() => <span className={styles.item}>{INTERVIEW_TYPES[0].image}</span>, []);
  const items = React.useMemo(() => INTERVIEW_TYPES.map(item => <span key={item.id} id={`item-${item.id}`} className={styles.item}>{item.image}</span>), []);
  const itemsForSpinner = React.useMemo(() => INTERVIEW_TYPES.map(item => <span key={item.id} className={styles.item}>{item.image}</span>), []);
  const lastItem = React.useMemo(() => <span className={styles.item}>{INTERVIEW_TYPES[INTERVIEW_TYPES.length - 1].image}</span>, []);

  const itemsRef = React.useRef<HTMLDivElement | null>(null);

  const handleClickStart = React.useCallback(() => {
    setSelectedItem(null);
    setStarted(true);
    if (itemsRef.current) {
      itemsRef.current.style.transition = 'none';
      itemsRef.current.style.transform = 'translateY(0)';
    }
  }, []);

  const handleSpinAnimationEnd = React.useCallback(() => {
    const minItemIndex = 0;
    const maxItemIndex = INTERVIEW_TYPES.length - 1;
    const randomizedIndex = randomInt(minItemIndex, maxItemIndex);
    const selectedItem = INTERVIEW_TYPES[randomizedIndex];

    setSelectedItem(selectedItem);
    setPristine(false);
    setStarted(false);

    if (itemsRef.current) {
      const elSelectedItem = itemsRef.current.querySelector<HTMLSpanElement>(`#item-${selectedItem.id}`);

      if (elSelectedItem) {
        const halfOfHeight = elSelectedItem.offsetHeight / 2;
        const y = -1 * (elSelectedItem.offsetTop - (halfOfHeight + ITEM_DELIMITER_OFFSET) - ITEM_OFFSET);
        itemsRef.current.style.transition = '';
        itemsRef.current.style.transform = `translateY(${y}px)`;
      }
    }
  }, []);

  React.useEffect(() => {
    onUpdate?.(selectedItem);
  }, [selectedItem, onUpdate]);

  return (
    <div className={classNames(styles.host, className)}>
      <div className={styles.container}>
        <div className={styles.glow} />
        <div className={styles.itemsContainer}>
          <div className={styles.items} ref={itemsRef} style={{ transform: `translateY(${-1 * ITEM_OFFSET}px)` }}>
            {lastItem}
            {items}
            {firstItem}
          </div>
        </div>
        <div
          className={`${styles.itemsContainer} ${styles.itemsContainer_spinner}`}
          style={{ display: started ? '' : 'none' }}
        >
          <div className={styles.items} onAnimationEnd={handleSpinAnimationEnd}>
            {lastItem}
            {itemsForSpinner}
            {firstItem}
          </div>
        </div>
        <ButtonBase className={styles.actionStart} disabled={started} onClick={handleClickStart}>{pristine ? 'Крутить!' : 'Крутить снова'}</ButtonBase>
        <img alt="" className={styles.body} src={bodyImage} />
        <img alt="" className={styles.border} src={borderImage} />
      </div>
    </div>
  );
});
