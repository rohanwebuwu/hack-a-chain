/**
 * Copyright 2022 Design Barn Inc.
 */

import { useTracker } from '@context/tracker-provider';
import { HitCountEvents } from '@helpers/enums';
import { eventsConst, eventEnums } from '@lottiefiles/plugin-tracker';
import { Appearance, Avatar, Size, TextColor } from '@lottiefiles/react-ui-kit';
import { useContext } from '@wordpress/element';
import * as React from 'react';

import { Button, Card } from '../_components';
import { LottieContext } from '../context/lottie-provider';
import { saveToMediaLibrary } from '../utility';

import { LottiePlayer } from './LottiePlayer';

interface IUserProps {
  avatarUrl: string;
  firstName: string;
}

export interface ITileProps {
  bgColor: string;
  createdBy: IUserProps;
  id: number;
  lottieUrl: string;
}

export const Tile: React.FC<ITileProps> = ({ bgColor, createdBy, id, lottieUrl }: ITileProps): JSX.Element => {
  const tracker = useTracker();
  const { appData, exploreLottie, setAttributes } = useContext(LottieContext);

  const onFileSave = (src: string): void => {
    setAttributes({ src });
    exploreLottie(false);
    tracker.pluginTracking({
      eventType: eventsConst.click.insertAnimation,
      userId: appData.userData.id,
      eventProperties: { animationId: id, type: eventEnums.animationsType.lottie },
      resourceId: id,
      method: HitCountEvents.DOWNLOAD_LOTTIE_JSON,
    });
  };

  const onInsert = (): void => {
    if (appData.copyLottieToMedia) {
      saveToMediaLibrary({
        url: lottieUrl,
        onFileSave: (src: string) => onFileSave(src),
        onError: (error: unknown) => {
          console.log(error);
        },
      });
    } else {
      onFileSave(lottieUrl);
    }
  };

  if (!lottieUrl || lottieUrl === '') {
    return <></>;
  }

  return (
    <div
      key={`project-${id}`}
      onKeyDown={(): null => null}
      className="list-item lf-h-44 lf-cursor-pointer lf-list-none lf-mb-2"
    >
      <Card size={Size.fluid}>
        <LottiePlayer bgColor={bgColor} src={lottieUrl} isPreview />
        <div className="lf-hidden group-hover:lf-block lf-absolute lf-bottom-4">
          <Button appearance={Appearance.primary} size={Size.tiny} textColor={TextColor.white} onClick={onInsert}>
            Insert animation
          </Button>
        </div>
      </Card>
      <div className="lf-flex lf-items-center lf-mt-2">
        <div className="lf-w-4 lf-mr-2">
          <Avatar src={createdBy?.avatarUrl} size={Size.fluid} className="lf-border-0" />
        </div>
        <div>
          <h5 className="lf-font-bold lf-text-xs">{createdBy?.firstName || 'loading...'}</h5>
        </div>
      </div>
    </div>
  );
};
