/**
 * Copyright 2022 Design Barn Inc.
 */

import { useBlockProps } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { useState, createRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import clsx from 'clsx';
import * as React from 'react';
import styled from 'styled-components';

import { Lottie } from '../../../../assets/Icons';
import { LottiePlayer } from '../../../../components/LottiePlayer/LottiePlayerWeb';
import { PlayerErrorBoundary } from '../../../../components/LottiePlayer/PlayerErrorBoundary';
import { MyMediaUploader } from '../../../../components/media-upload';
import { usePosition } from '../../../../hooks';
import { IHostAppProps, IPlacehoderlProps } from '../../../../interfaces';
import { InputLabel } from '../../block-settings-controls';
import { InsertFromURL } from '../Insert-from-url';

const Wrapper = styled.div`
  min-height: auto !important;
  .components-button {
    margin-bottom: 0;
  }
`;

export const Placeholder: React.FC<IPlacehoderlProps & IHostAppProps> = ({
  attributes,
  exploreLottie,
  setAttributes,
}: IPlacehoderlProps & IHostAppProps) => {
  const lottieRef = createRef<HTMLInputElement>();

  const [openUrl, setOpenUrl] = useState<boolean>(false);
  const [position, setPosition] = useState<IPosition>({ x: 0, y: 0 });

  usePosition(lottieRef, attributes, position, setPosition, setAttributes);

  return (
    <div {...useBlockProps()}>
      {attributes.src === '' ? (
        <Wrapper className={`components-placeholder`}>
          <div className="components-placeholder__label">
            <Lottie /> {__('Lottie Animation')}
          </div>
          <div className="components-placeholder__instructions">
            {__('Discover and insert animations from the world’s largest collection of free-to-use animations.')}
          </div>
          <div className="components-placeholder__fieldset">
            <form>
              <Button variant="primary" onClick={(): void => exploreLottie(true)}>
                {__('Discover animation')}
              </Button>
              <MyMediaUploader
                onSelect={(src: string): void => setAttributes({ src })}
                render={({ open }: { open(): void }): JSX.Element => (
                  <Button variant="link" onClick={open}>
                    {__('Media Library')}
                  </Button>
                )}
              />
              <Button variant="link" onClick={(): void => setOpenUrl(!openUrl)}>
                {__('Insert from Url')}
                {openUrl && (
                  <InsertFromURL
                    isOpen={openUrl}
                    attributes={attributes}
                    setAttributes={setAttributes}
                    toggle={setOpenUrl}
                  />
                )}
              </Button>
            </form>
          </div>
        </Wrapper>
      ) : (
        <Wrapper
          className={`components-placeholder wp-block`}
          data-align={attributes.align}
          style={{ backgroundColor: attributes.background as string }}
        >
          <div className="w-full flex" ref={lottieRef} id={`lottie-wrapper-${attributes.id}`}>
            <div
              className={clsx(
                attributes.contentAlign === 'center' ? 'mx-auto' : '',
                attributes.contentAlign === 'left' ? '' : '',
                attributes.contentAlign === 'right' ? 'mx-auto mr-0' : '',
              )}
            >
              <PlayerErrorBoundary>
                <LottiePlayer attributes={attributes} setAttributes={setAttributes} />
              </PlayerErrorBoundary>
            </div>
          </div>
          <div className="lf-w-full lf-flex">
            <InputLabel
              className="italic"
              label="Lottie JSON file URL"
              value={attributes.src as string}
              disabled
              onChange={(value: string): void => setAttributes({ src: value })}
            />
            <div className="lf-flex lf-flex-none lf-items-center">
              <Button style={{ marginTop: 20 }} variant="link" onClick={(): void => exploreLottie(true)}>
                {__('Discover animations')}
              </Button>
            </div>
          </div>
        </Wrapper>
      )}
    </div>
  );
};
