import { SAOCardSizes } from './card.enum';

export type SAOCardSizeType =
  | SAOCardSizes
  | `${SAOCardSizes}`
  | 'default'
  | 'small';
