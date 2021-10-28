import * as React from 'react';
import { classNames } from 'shared/browser';

import styles from './Typography.module.css';

export type TTypographyVariant = 'h1-large' | 'h1' | 'h2' | 'text' | 'text-small' | 'caption';
export type TTypographyColor = 'alpha' | 'beta' | 'gamma' | 'accent' | 'positive' | 'negative' | 'warning' | 'inherit';
export type TTypographyWeight = 'regular' | 'bold';
export type TTypographyAlign = 'left' | 'center' | 'right';
export type TTypographyVerticalAlign = 'top' | 'center' | 'bottom';
export type TTypographyComponent = 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'span' | 'p';

export type TTypographyProps = {
  variant?: TTypographyVariant;
  color?: TTypographyColor;
  weight?: TTypographyWeight;
  align?: TTypographyAlign;
  verticalAlign?: TTypographyVerticalAlign;
  component?: TTypographyComponent;
  children: React.ReactNode;
  className?: string;
  noWrap?: boolean;
} & React.HTMLAttributes<HTMLElement>;

const variantMapping = {
  'h1-large': 'h1',
  h1: 'h1',
  h2: 'h2',
  text: 'span',
  'text-small': 'span',
  caption: 'span',
} as const;

const weightMapping = {
  'h1-large': 'bold',
  h1: 'bold',
  h2: 'bold',
  text: 'regular',
  'text-small': 'regular',
  caption: 'regular',
} as const;

const hostSizeStyles: Record<TTypographyVariant, string> = {
  'h1-large': styles.host_variant_h1Large,
  h1: styles.host_variant_h1,
  h2: styles.host_variant_h2,
  text: styles.host_variant_text,
  'text-small': styles.host_variant_textSmall,
  caption: styles.host_variant_caption,
};

const hostColorStyles: Record<TTypographyColor, string> = {
  alpha: styles.host_color_alpha,
  beta: styles.host_color_beta,
  gamma: styles.host_color_gamma,
  accent: styles.host_color_accent,
  positive: styles.host_color_positive,
  negative: styles.host_color_negative,
  warning: styles.host_color_warning,
  inherit: styles.host_color_inherit,
};

const hostWeightStyles: Record<TTypographyWeight, string> = {
  regular: styles.host_weight_regular,
  bold: styles.host_weight_bold,
};

const hostAlignStyles: Record<TTypographyAlign, string> = {
  left: styles.host_align_left,
  center: styles.host_align_center,
  right: styles.host_align_right,
};

const hostVerticalAlignStyles: Record<TTypographyVerticalAlign, string> = {
  top: styles.host_verticalAlign_top,
  center: styles.host_verticalAlign_center,
  bottom: styles.host_verticalAlign_bottom,
};

export const Typography: React.FC<TTypographyProps> = ({
  variant = 'text',
  color = 'inherit',
  weight,
  align = 'left',
  verticalAlign,
  component,
  children,
  className,
  noWrap = false,
  ...otherProps
}) => {
  const Component = component || variantMapping[variant];

  return (
    <Component
      className={classNames(
        styles.host,
        noWrap && styles.host_has_nowrap,
        hostSizeStyles[variant],
        hostColorStyles[color],
        hostWeightStyles[weight || weightMapping[variant]],
        verticalAlign && styles.host_has_verticalAlign,
        verticalAlign && hostVerticalAlignStyles[verticalAlign],
        hostAlignStyles[align],
        className,
      )}
      {...otherProps}
    >
      {children}
    </Component>
  );
};
