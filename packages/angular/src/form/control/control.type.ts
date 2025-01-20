import { SAOControlSizes } from './control.enum';

export type SAOControlSizeType =
  | SAOControlSizes
  | `${SAOControlSizes}`
  | 'default'
  | 'large';
