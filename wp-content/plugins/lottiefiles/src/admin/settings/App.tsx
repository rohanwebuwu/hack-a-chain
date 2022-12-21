/**
 * Copyright 2022 Design Barn Inc.
 */

import { useTracker } from '@context/tracker-provider';
import { appDetails } from '@helpers/consts';
import { eventsConst } from '@lottiefiles/plugin-tracker';
import { useEffect, useState } from '@wordpress/element';
import * as React from 'react';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';

import { Illustration } from '../../assets/Icons';
import { Header } from '../../gutenberg-block/Layout/Header';

import { IAPIProps } from './interfaces';
import { IHNResponseProps } from './reducer';
import { Settings, Setup } from './views';

// Main component for admin page app
export const App: React.FC<IAPIProps> = ({ deleteSettings, getSettings, updateSettings }: IAPIProps) => {
  const [settings, setSettings] = useState<IHNResponseProps | boolean>(false);
  const tracker = useTracker();

  useEffect(async () => {
    const response: IHNResponseProps | boolean = await getSettings();

    if (response && response.userData) {
      setSettings(response);
    } else {
      setSettings(false);
    }
  }, []);

  const onDeleteSettings = async (userId: number): Promise<boolean> => {
    tracker.pluginTracking({
      eventType: eventsConst.click.logout,
      userId,
    });
    const response: boolean = await deleteSettings({});

    setSettings(false);

    return response;
  };

  const onSaveSettings = async (_settings: IHNResponseProps): Promise<boolean> => {
    const response = await updateSettings(_settings);

    setSettings(_settings);

    return response;
  };

  return (
    <>
      <div>
        <Header>
          <div className="lf-flex lf-items-center lf-gap-6">
            <ul className="lf-text-xs lf-flex lf-gap-6">
              <li className="lf-m-0">
                <a
                  className="lf-text-sm lf-text-gray-500 hover:lf-text-gray-700"
                  target="_blank"
                  href="https://feedback.lottiefiles.com/plugin-wordpress"
                >
                  Feedback
                </a>
              </li>
              <li className="lf-m-0">
                <a
                  className="lf-text-sm lf-text-gray-500 hover:lf-text-gray-700"
                  target="_blank"
                  href="https://lottiefiles.zendesk.com"
                >
                  Help Center
                </a>
              </li>
            </ul>
            <div className="version lf-flex lf-pr-1">
              <span className="lf-text-sm">{appDetails.version}</span>
            </div>
          </div>
        </Header>
        <div
          style={{
            display: 'flex',
            height: 'calc(100% - 64px)',
            minHeight: 'auto',
          }}
        >
          <Router>
            <Routes>
              {settings === false && (
                <Route
                  path="/"
                  element={
                    <Setup
                      settings={{
                        shareUserData: true,
                        shareWithOthers: false,
                        copyLottieToMedia: false,
                        switchAccount: false,
                        isAdmin: false,
                      }}
                      onSaveSettings={onSaveSettings}
                    />
                  }
                />
              )}
              {settings && (
                <Route
                  path="/"
                  element={
                    <Settings settings={settings} updateSettings={updateSettings} onDeleteSettings={onDeleteSettings} />
                  }
                />
              )}
            </Routes>
          </Router>
        </div>
      </div>
      <footer>
        <div>
          <Illustration />
        </div>
      </footer>
    </>
  );
};
