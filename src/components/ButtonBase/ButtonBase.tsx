// [libs]
import * as React from 'react';

// utils
import { classNames } from 'shared/browser';
import { PropsWithComponentProperty, IFCWithComponentProperty } from 'shared/react';

// styles
import classes from './ButtonBase.module.css';

type TSpecificProps =
  | {
      disabled?: boolean;
    }
  | {
      role?: string;
      'aria-disabled'?: boolean;
    };

export type TButtonBaseProps = {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  tabIndex?: number;
  /**
   * If `true`, the component will be disabled.
   * @default false
   */
  disabled?: boolean;
};

export const ButtonBase: IFCWithComponentProperty<'button', TButtonBaseProps> = React.forwardRef(
  (
    {
      component = 'button',
      className,
      children,
      tabIndex,
      disabled,
      ...otherProps
    }: PropsWithComponentProperty<'button', TButtonBaseProps>,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    const specificProps: TSpecificProps =
      component === 'button'
        ? {
            disabled: disabled,
          }
        : {
            // Because non-button element haven't 'disabled' attribute
            role: 'button',
            'aria-disabled': disabled,
          };
    const Component = component;

    return (
      <Component
        className={classNames(classes.host, className)}
        tabIndex={disabled ? -1 : tabIndex}
        ref={ref}
        disabled={disabled}
        {...specificProps}
        {...otherProps}
      >
        {children}
      </Component>
    );
  },
);

ButtonBase.displayName = 'ButtonBase';
