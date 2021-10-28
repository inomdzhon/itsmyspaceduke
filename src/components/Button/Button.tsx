// [libs]
import * as React from 'react';

// utils
import { classNames } from 'shared/browser';
import { PropsWithComponentProperty, IFCWithComponentProperty } from 'shared/react';

// components
import { ButtonBase, TButtonBaseProps } from '../ButtonBase';

// styles
import classes from './Button.module.css';

export type TButtonProps = {
  /**
   * The size of the button.
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Color for button
   * @default 'default'
   */
  color?: 'default' | 'accent' | 'positive' | 'negative' | 'warning';
  /**
   * The variant to use.
   * @default contained
   */
  variant?: 'contained';
  /**
   * If true, the button will take up the full width of its container. TODO: Add 'text' type
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Text align.
   * @default 'center'
   */
  textAlign?: 'right' | 'center' | 'left';
  /** Element placed before the children. */
  startIcon?: React.ReactNode;
  /** Element placed after the children. */
  endIcon?: React.ReactNode;
  /** Content is wrapper for startIcon, text and endIcon. */
  classNameContent?: string;
  classNameStartIcon?: string;
  classNameText?: string;
  classNameEndIcon?: string;
  /** Override content render. Useful for composition. */
  renderContent?(content: React.ReactElement): React.ReactNode;
} & TButtonBaseProps;

export const Button: IFCWithComponentProperty<'button', TButtonProps> = React.forwardRef(
  (
    {
      component = 'button',
      size = 'medium',
      color = 'default',
      variant = 'contained',
      fullWidth,
      textAlign = 'center',
      startIcon = null,
      endIcon = null,
      children,
      renderContent,
      className,
      classNameContent,
      classNameStartIcon,
      classNameText,
      classNameEndIcon,
      ...otherProps
    }: PropsWithComponentProperty<'button', TButtonProps>,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    const content = (
      <span className={classNames(classes.itemContent, classNameContent)}>
        {(startIcon && <span className={classNames(classes.itemStartIcon, classNameStartIcon)}>{startIcon}</span>) ||
          (textAlign === 'center' && endIcon && <span className={classes.itemIconFake} />)}
        <span
          className={classNames(
            {
              [classes.itemTextAlignRight]: textAlign === 'right',
              [classes.itemTextAlignCenter]: textAlign === 'center',
              [classes.itemTextAlignLeft]: textAlign === 'left',
            },
            classNameText,
          )}
        >
          {children}
        </span>
        {(endIcon && <span className={classNames(classes.itemEndIcon, classNameEndIcon)}>{endIcon}</span>) ||
          (textAlign === 'center' && startIcon && <span className={classes.itemIconFake} />)}
      </span>
    );

    return (
      <ButtonBase
        component={component}
        className={classNames(
          classes.host,
          {
            [classes.hostSizeSmall]: size === 'small',
            [classes.hostSizeMedium]: size === 'medium',
            [classes.hostSizeLarge]: size === 'large',

            [classes.hostVariantContained]: variant === 'contained',
            [classes.hostColorContainedDefault]: variant === 'contained' && color === 'default',
            [classes.hostColorContainedAccent]: variant === 'contained' && color === 'accent',
            [classes.hostColorContainedPositive]: variant === 'contained' && color === 'positive',
            [classes.hostColorContainedNegative]: variant === 'contained' && color === 'negative',
            [classes.hostColorContainedWarning]: variant === 'contained' && color === 'warning',

            [classes.hostHasFullWidth]: fullWidth,
          },
          className,
        )}
        ref={ref}
        {...otherProps}
      >
        {renderContent ? renderContent(content) : content}
      </ButtonBase>
    );
  },
);

Button.displayName = 'Button';
