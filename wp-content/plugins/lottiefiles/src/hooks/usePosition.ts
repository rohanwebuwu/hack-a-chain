/**
 * Copyright 2022 Design Barn Inc.
 */

import { useEffect } from '@wordpress/element';

import { ILottieProps } from '../interfaces';

export const usePosition = (
  lottieRef: React.RefObject<HTMLInputElement>,
  attributes: ILottieProps,
  position: unknown,
  setPosition: unknown,
  setAttributes: unknown,
): void => {
  useEffect(() => {
    if (lottieRef.current !== null) {
      const parentElement = document.getElementById(`lottie-wrapper-${attributes.id as string}`);
      const item = parentElement.getBoundingClientRect();
      const { x, y } = item;
      const { x: elementX, y: elementY } = position;

      if (elementX !== x || elementY !== y) {
        setAttributes({ position: { x, y } });
        setPosition({ x, y });
      }
    }

    return null;
  }, [lottieRef]);
};
