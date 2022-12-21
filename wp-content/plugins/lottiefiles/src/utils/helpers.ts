/**
 * Copyright 2022 Design Barn Inc.
 */

export const getEpoch = (): string => {
  return Date.now().toString();
};

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const toHumanDate = (date: Date, withYear = false) => {
  // eslint-disable-next-line no-restricted-globals
  if (date instanceof Date && !isNaN(date as unknown)) {
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
    };

    if (withYear) {
      options.year = 'numeric';
    }

    return date.toLocaleDateString('en-US', options);
  }

  return date;
};

interface Thumbnail {
  thumbnails?: {
    png?: {
      small?: {
        url?: string;
      };
    };
    webp?: {
      small?: {
        url?: string;
      };
    };
  };
}

export const getThumbnailUrls = (thumbnails: Thumbnail[]): string[] =>
  thumbnails.map(
    thumbnail =>
      (thumbnail.thumbnails &&
        thumbnail.thumbnails.webp &&
        thumbnail.thumbnails.webp.small &&
        thumbnail.thumbnails.webp.small.url) ||
      (thumbnail.thumbnails &&
        thumbnail.thumbnails.png &&
        thumbnail.thumbnails.png.small &&
        thumbnail.thumbnails.png.small.url) ||
      '',
  );
