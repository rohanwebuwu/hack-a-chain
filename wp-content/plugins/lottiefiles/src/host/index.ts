/**
 * Copyright 2020 Design Barn Inc.
 */

// import { TrackerDefault } from '../helpers/interfaces';

import { Client } from './client';

export { Client };

export const createTrackerBridge = async (
  apiKey: string,
  time: string,
  platform: string,
  appVersion: string,
  deviceId: string,
  sourceId: number,
  token: string,
  notTracking: boolean,
): Promise<unknown> => Client.getInstance(apiKey, time, platform, appVersion, deviceId, sourceId, token, notTracking);
