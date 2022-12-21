/**
 * Copyright 2022 Design Barn Inc.
 */

import { TrackerProvider } from '@context/tracker-provider';
import { appDetails } from '@helpers/consts';
import { createTrackerBridge } from '@host';
import { DefaultIdentity } from '@lottiefiles/plugin-tracker';
import { render } from '@wordpress/element';
import * as React from 'react';

import { deleteSettings, getSettings, updateSettings } from '../../api/settings';
import { getEpoch } from '../../utils';

import { App } from './App';
import { IHNResponseProps } from './reducer';

// eslint-disable-next-line @typescript-eslint/no-misused-promises
window.addEventListener('load', async (): Promise<void> => {
  const response: IHNResponseProps | boolean = await getSettings();

  const TRACKER_API_KEY = process.env.TRACKER_API_KEY as string;
  const TIME = getEpoch();
  const PLATFORM = appDetails.name;
  const APP_VERSION = appDetails.version;
  const DEVICE_ID = new DefaultIdentity().initializeDeviceId();
  const SOURCE_ID = appDetails.hitcountsource;
  const TOKEN = response.userData?.accessToken;
  const IS_ALLOW_TRACKING = response.shareUserData ?? true;

  // Initialize tracker host bridge
  const tracker = await createTrackerBridge(
    TRACKER_API_KEY,
    TIME,
    PLATFORM,
    APP_VERSION,
    DEVICE_ID,
    SOURCE_ID,
    TOKEN,
    IS_ALLOW_TRACKING,
  );

  render(
    <TrackerProvider instance={tracker}>
      <App getSettings={getSettings} updateSettings={updateSettings} deleteSettings={deleteSettings} />
    </TrackerProvider>,
    document.getElementById('lottiefiles-admin-settings'),
  );
});
