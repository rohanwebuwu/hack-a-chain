/**
 * Copyright 2022 Design Barn Inc.
 */

/* eslint-disable @typescript-eslint/typedef */
/* eslint-disable filenames/match-exported */

import { useRef, useState, useEffect, useCallback } from 'react';
import { useQuery, UseQueryArgs, UseQueryResponse } from 'urql';

const useLazyQuery: (args: Omit<UseQueryArgs, 'variables' | 'pause'>) => UseQueryResponse = args => {
  const firstUpdate = useRef(true);
  const [variables, setVariables] = useState<unknown>();

  const [result, refetch] = useQuery({
    ...args,
    variables,
    pause: true,
  });

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;

      return;
    }
    refetch();
  }, [variables]);

  const makeRequest = useCallback(reqVariables => {
    setVariables(reqVariables);
  }, []);

  return [result, makeRequest];
};

export default useLazyQuery;
