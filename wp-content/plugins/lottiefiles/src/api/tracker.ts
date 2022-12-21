/**
 * Copyright 2022 Design Barn Inc.
 */

import { api, amplitudeAPIDomain } from '@helpers/consts';

// eslint-disable-next-line @typescript-eslint/ban-types
export const tracker = (trackerApiKey: string, events: unknown[]): object => {
  return fetch(amplitudeAPIDomain, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
    body: JSON.stringify({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      api_key: trackerApiKey,
      events,
    }),
  });
};

export const gqlFetch = async (query, hcToken, variables): unknown => {
  const data = await fetch(api.graphql, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: hcToken ? `Bearer ${hcToken}` : null,
    },
    body: JSON.stringify({ query, variables }),
  });

  return data.json();
};
