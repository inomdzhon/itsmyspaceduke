import * as React from 'react';

export type MergeProps<PropsA = {}, PropsB = {}> = PropsA & Omit<PropsB, keyof PropsA>;

export type MergeWithComponentProps<
  Component extends React.ElementType,
  OwnProps = {},
  ExcludeComponentProps extends string = never,
> = OwnProps & Omit<React.ComponentPropsWithRef<Component>, keyof OwnProps | ExcludeComponentProps>;

export type PropsWithComponentProperty<
  Component extends React.ElementType,
  OwnProps = {},
  ExcludeComponentProps extends string = never,
> = OwnProps & {
  component?: Component;
} & Omit<React.ComponentPropsWithRef<Component>, keyof OwnProps | ExcludeComponentProps>;

export interface IFCWithComponentProperty<
  DefaultComponent extends React.ElementType,
  Props = {},
  ExcludeComponentProps extends string = never,
> {
  <Component extends React.ElementType = DefaultComponent>(
    props: PropsWithComponentProperty<Component, Props, ExcludeComponentProps>,
  ): React.ReactElement | null;
  (props: PropsWithComponentProperty<DefaultComponent, Props, ExcludeComponentProps>): React.ReactElement | null;
  propTypes?: React.WeakValidationMap<Props>;
  defaultProps?: Partial<Props>;
  displayName?: string;
}
