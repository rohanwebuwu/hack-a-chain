/**
 * Copyright 2022 Design Barn Inc.
 */

import { Client } from '@context/tracker-provider';

export interface IBigModelProps {
  children: React.ReactNode;
  isOpen: boolean;
  toggleModal(isOpen: boolean): void;
}

export interface ILottieProps {
  align: 'center' | 'full' | 'left' | 'right' | 'wide';
  animationType: unknown;
  autoplay: unknown;
  background: unknown;
  blockSize: unknown;
  contentAlign: 'center' | 'left' | 'right';
  controls: unknown;
  direction: unknown;
  forceflag: unknown;
  framesend: unknown;
  framesstart: unknown;
  height: unknown;
  hover: unknown;
  id: unknown;
  interactivitymode: unknown;
  interactivitytype: unknown;
  loop: unknown;
  loopHack: unknown;
  mode: unknown;
  speed: unknown;
  src: unknown;
  totalFrames: unknown;
  visibilityend: unknown;
  visibilitystart: unknown;
  width: unknown;
}

export interface IHostAppProps {
  attributes: ILottieProps;
  setAttributes(value: unknown): void;
}

export interface IModalProps {
  toggleModal(value: boolean): void;
}
export interface IHeaderProps {
  children: React.ReactNode;
}

export interface INavbarProps {
  toggleModal?(value: boolean): void;
}

export interface IAppProps {
  hostApp: IHostAppProps;
  tracker: Client;
}

export interface ILottieBlockControlsProps {
  attributes: ILottieProps;
  isOpen: boolean;
  onToggleModal(value: boolean): void;
  setAttributes(value: unknown): void;
}

export interface IPlacehoderlProps {
  exploreLottie(value: boolean): void;
}

export interface IToolbarButtonProps {
  children: React.ReactNode;
  icon?: string;
  isOpen: boolean;
  onToggle(): void;
  variant?: string;
}

export interface IInsertFromURLProps {
  isOpen: boolean;
  toggle(val: boolean): void;
}

export interface IReactQueryProviderProps {
  children: React.ReactNode;
}

export interface IMyMediaUploaderProps {
  gallery?: boolean;
  onSelect(url: string): void;
  render(props: { open(): void }): JSX.Element;
}

export interface IAppRouteProps {
  attributes: ILottieProps;
  exploreLottie(value: boolean): void;
  setAttributes(value: unknown): void;
}

export interface IInteractivityProps {
  frames?: [unknown, unknown];
  state?: unknown;
  type: string;
  visibility?: [unknown, unknown];
}
