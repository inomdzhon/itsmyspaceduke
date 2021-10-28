import * as React from 'react';
import provideRef from './provideRef';

export default function useForkRef<T>(refA?: React.Ref<T>, refB?: React.Ref<T>): React.RefCallback<T> | null {
  /**
   * This will create a new function if the ref props change and are defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior
   */
  return React.useMemo(() => {
    if (refA === null && refB === null) {
      return null;
    }
    return (refValue): void => {
      provideRef(refA, refValue);
      provideRef(refB, refValue);
    };
  }, [refA, refB]);
}
