import { SAOTagSizes } from './tag.enum';

export type SAOTagSizeType =
  | SAOTagSizes
  | `${SAOTagSizes}`
  | 'small'
  | 'default'
  | 'large';
