/**
 * Copyright 2022 Design Barn Inc.
 */

import { useEffect } from '@wordpress/element';

import { ILottieProps, IInteractivityProps } from '../interfaces';
import { randomHtmlId } from '../utility';
import { Mode } from '../utils/enums';

export const useInteractivity = (
  lottieRef: React.RefObject<HTMLInputElement>,
  attributes: ILottieProps,
  setAttributes: unknown,
): void => {
  const getActions = (): IInteractivityProps[] => {
    const { animationstate, id, interactivitymode, interactivitytype } = attributes;
    const item = document.getElementById(id as string);
    const totalFrames = item?.getLottie().totalFrames;

    if (totalFrames !== attributes.totalFrames) {
      setAttributes({ totalFrames });
    }

    if (interactivitymode === Mode.SCROLL) {
      return [
        {
          visibility: [0, 1],
          type: interactivitytype as string,
          frames: [0, parseFloat(totalFrames as string)],
        },
      ];
    }

    return [
      {
        type: interactivitytype as string,
        state: animationstate,
      },
    ];
  };

  const doInteractivity = (): void => {
    // eslint-disable-next-line no-negated-condition
    if (document.getElementById(attributes.id as string) !== null) {
      const { id, interactivitymode } = attributes;

      if (interactivitymode !== Mode.NONE) {
        const actions = getActions();

        const interactivityConfig = {
          player: `#${id}`,
          mode: interactivitymode,
          actions,
        };

        LottieInteractivity.create(interactivityConfig);
      }
    } else {
      const id = randomHtmlId();

      if (setAttributes instanceof Function) {
        setAttributes({ id });
      }
    }
  };

  useEffect(() => {
    if (lottieRef.current !== null) {
      lottieRef.current.addEventListener('ready', doInteractivity);
    }

    return (): void => {
      if (lottieRef.current !== null) {
        lottieRef.current.removeEventListener('ready', doInteractivity);
      }
    };
  }, [lottieRef]);
};
