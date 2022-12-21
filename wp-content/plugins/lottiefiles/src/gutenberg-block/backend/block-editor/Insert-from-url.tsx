/**
 * Copyright 2022 Design Barn Inc.
 */

import { IconButton, Popover } from '@wordpress/components';
import { useState } from '@wordpress/element';
import * as React from 'react';
import styled from 'styled-components';

import { LottieContext } from '../../../context/lottie-provider';
import { IHostAppProps, IInsertFromURLProps } from '../../../interfaces';
import { saveToMediaLibrary } from '../../../utility';
import { InputLabel } from '../block-settings-controls';

const Wrapper = styled.div`
  width: 250px;
  display: flex;
  .url-input {
    margin: 0;
  }
  .save-btn {
    transform: rotate(180deg);
  }
`;

export const InsertFromURL: React.FC<IHostAppProps & IInsertFromURLProps> = ({
  attributes,
  setAttributes,
  toggle,
}: IHostAppProps & IInsertFromURLProps) => {
  const [src, setSrc] = useState<string>(attributes.src as string);

  const { appData } = React.useContext(LottieContext);

  const { copyLottieToMedia } = appData;

  const onInsert = (): void => {
    if (copyLottieToMedia) {
      saveToMediaLibrary({
        url: src,
        onFileSave: (url: string) => {
          setAttributes({ src: url });
          toggle(false);
        },
        onError: (error: unknown) => {
          console.log(error);
        },
      });
    } else {
      setAttributes({ src });
      toggle(false);
    }
  };

  return (
    <Popover onFocusOutside={(): void => toggle(false)}>
      <Wrapper>
        <InputLabel
          className="url-input"
          placeholder="Insert URL"
          value={src}
          onChange={(value: string): void => setSrc(value)}
        />
        <IconButton icon="redo" className="save-btn" onClick={onInsert}></IconButton>
      </Wrapper>
    </Popover>
  );
};
