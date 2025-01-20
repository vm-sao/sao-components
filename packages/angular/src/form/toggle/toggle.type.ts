import { SAOToggleSizes } from './toggle.enum';

export type SAOToggleSizeType =
  | SAOToggleSizes
  | `${SAOToggleSizes}`
  | 'default'
  | 'large';
