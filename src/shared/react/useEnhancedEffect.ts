import * as React from 'react';

import { isSSR } from '../browser';

export const useEnhancedEffect = isSSR ? React.useEffect : React.useLayoutEffect;
