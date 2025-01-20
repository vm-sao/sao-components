import { SAOTabAppearances, SAOTabSizes } from './tab.enum';

export type SAOTabAppearanceType =
  | SAOTabAppearances
  | `${SAOTabAppearances}`
  | 'fill'
  | 'line';

export type SAOTabSizeType =
  | SAOTabSizes
  | `${SAOTabSizes}`
  | 'default'
  | 'large';
