/**
 * Copyright 2022 Design Barn Inc.
 */

import { Dropdown, MenuGroup, MenuItem, ToolbarGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import * as React from 'react';

import { MyMediaUploader } from '../../../../components/media-upload';
import { IPlacehoderlProps, IHostAppProps, IToolbarButtonProps } from '../../../../interfaces';

import { ToolbarButton } from './toolbar-buton';

export const ReplaceMenu: React.FC<IHostAppProps & IPlacehoderlProps> = ({
  exploreLottie,
  setAttributes,
}: IHostAppProps & IPlacehoderlProps) => {
  return (
    <ToolbarGroup>
      <MyMediaUploader
        onSelect={(src: string): void => setAttributes({ src })}
        render={({ open }: { open(): void }): JSX.Element => (
          <Dropdown
            className="my-container-class-name"
            contentClassName="my-popover-content-classname"
            position="bottom right"
            renderToggle={({ isOpen, onToggle }: IToolbarButtonProps): JSX.Element => (
              <ToolbarButton variant="link" onToggle={onToggle} isOpen={isOpen}>
                {__('Replace')}
              </ToolbarButton>
            )}
            renderContent={({ onToggle }: IToolbarButtonProps): JSX.Element => (
              <MenuGroup>
                <MenuItem
                  onClick={(): void => {
                    onToggle();
                    exploreLottie(true);
                  }}
                >
                  {' '}
                  {__('Explore LottieFiles')}
                </MenuItem>

                <MenuItem
                  onClick={(): void => {
                    onToggle();
                    open();
                  }}
                >
                  {__('Media Library')}
                </MenuItem>

                <MenuItem
                  onClick={(): void => {
                    onToggle();
                    open();
                  }}
                >
                  {__('Upload')}
                </MenuItem>
              </MenuGroup>
            )}
          />
        )}
      />
    </ToolbarGroup>
  );
};
