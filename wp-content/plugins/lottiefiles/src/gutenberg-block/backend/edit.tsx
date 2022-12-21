/**
 * Copyright 2022 Design Barn Inc.
 */

import { TrackerProvider } from '@context/tracker-provider';
import { AlignmentToolbar, BlockControls, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { useState } from '@wordpress/element';
import * as React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';

import { BigModal } from '../../components';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { LottieProvider } from '../../context/lottie-provider';
import '../global.css';
import { IAppProps, ILottieBlockControlsProps } from '../../interfaces';
// import { ReactQueryProvider } from '../../react-query';
import { Header } from '../Layout/Header';
import { Navbar } from '../Layout/Header/Components';

import { AppRoute } from './app-route';
import { Placeholder, ReplaceMenu } from './block-editor';
import { AdvanceSettings, AnimationSettings, BackgroundSettings } from './block-settings-controls';

export interface AppState {
  name: string;
}

export const LottieBlockControls: React.FC<ILottieBlockControlsProps> = ({
  attributes,
  isOpen,
  onToggleModal,
  setAttributes,
}: ILottieBlockControlsProps) => {
  return (
    <>
      <BlockControls key="block Controls">
        <ToolbarGroup>
          <AlignmentToolbar
            value={attributes.contentAlign}
            onChange={(value: string): void =>
              setAttributes({
                contentAlign: value === 'undefined' ? attributes.contentAlign : value,
              })
            }
          />
        </ToolbarGroup>
        <ReplaceMenu exploreLottie={onToggleModal} attributes={attributes} setAttributes={setAttributes} />
      </BlockControls>

      <InspectorControls>
        <AnimationSettings attributes={attributes} setAttributes={setAttributes} />
        <BackgroundSettings attributes={attributes} setAttributes={setAttributes} />
        <AdvanceSettings attributes={attributes} setAttributes={setAttributes} />
      </InspectorControls>

      {isOpen && (
        <BigModal isOpen={isOpen} toggleModal={(value: boolean): void => onToggleModal(value)}>
          <Header>
            <Navbar toggleModal={onToggleModal} />
          </Header>

          <AppRoute exploreLottie={onToggleModal} attributes={attributes} setAttributes={setAttributes} />
        </BigModal>
      )}
    </>
  );
};

export const edit: React.FC<IAppProps> = ({ hostApp, tracker }: IAppProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onToggleModal = (value: boolean): void => setIsOpen(value);

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { attributes, setAttributes } = hostApp;

  return (
    <ErrorBoundary>
      {/* <ReactQueryProvider> */}
      <Router>
        <TrackerProvider instance={tracker}>
          <LottieProvider attributes={attributes} setAttributes={setAttributes} exploreLottie={onToggleModal}>
            <LottieBlockControls
              isOpen={isOpen}
              onToggleModal={onToggleModal}
              attributes={attributes}
              setAttributes={setAttributes}
            />
            <div {...useBlockProps()}>
              <Placeholder exploreLottie={onToggleModal} attributes={attributes} setAttributes={setAttributes} />
            </div>
          </LottieProvider>
        </TrackerProvider>
      </Router>
      {/* </ReactQueryProvider> */}
    </ErrorBoundary>
  );
};
