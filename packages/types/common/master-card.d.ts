export enum SAOMasterCardSizes {
  Small = 'small',
  Large = 'large',
}

export enum SAOMasterCardColors {
  Purple = 'purple',
  OceanBlue = 'ocean-blue',
  DarkGreen = 'dark-green',
  Charcoal = 'charcoal',
  FutureBlue = 'future-blue',
}

export type SAOMasterCardSizeType =
  | SAOMasterCardSizes
  | `${SAOMasterCardSizes}`
  | 'small'
  | 'large';

export type SAOMasterCardColorType =
  | SAOMasterCardColors
  | `${SAOMasterCardColors}`
  | 'purple'
  | 'ocean-blue'
  | 'dark-green'
  | 'charcoal'
  | 'future-blue';
