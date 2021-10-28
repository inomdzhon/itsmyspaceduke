import React from 'react';

import { Typography } from 'components/Typography';

import styles from './Card.module.css';

type TCardProps = {
  image: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
};

export function Card({ image, title, description }: TCardProps) {
  return (
    <div className={styles.host}>
      <Typography variant="h1" className={styles.image}>{image}</Typography>
      <Typography variant="text" color="inherit" weight="bold" className={styles.title}>{title}</Typography>
      <Typography variant="text-small" color="inherit">{description}</Typography>
    </div>
  );
}
