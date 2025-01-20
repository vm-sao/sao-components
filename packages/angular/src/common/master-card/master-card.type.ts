import { SAOMasterCardColors, SAOMasterCardSizes } from './master-card.enum';

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
