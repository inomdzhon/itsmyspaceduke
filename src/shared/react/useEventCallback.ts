import * as React from 'react';

import { useEnhancedEffect } from './useEnhancedEffect';

/**
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 *
 * @param {function} fn
 */
export default function useEventCallback<T extends (...args: any[]) => any>(
  fn: T,
): (...args: Parameters<T>) => ReturnType<T> {
  const ref = React.useRef(fn);
  useEnhancedEffect(() => {
    ref.current = fn;
  });
  return React.useCallback(
    (...args) =>
      // @ts-expect-error Left side of comma operator is unused and has no side effects.
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      (0, ref.current)(...args),
    [],
  );
}
