import * as React from 'react';

let currentId = 0;

export default function useUniqueId(prefix?: string): string {
  const [uniqueId] = React.useState(() => {
    currentId += 1;
    return prefix ? `${prefix}${currentId}` : `${currentId}`;
  });
  return uniqueId;
}
