import * as React from 'react';

export default function provideRef<T>(callback: React.Ref<T> | undefined, ref: T | null): void {
  if (!callback) {
    return;
  }

  if (typeof callback === 'function') {
    callback(ref);
  } else {
    (callback as React.MutableRefObject<T | null>).current = ref;
  }
}
