import { SAORadioSizes } from './radio.enum';

export type SAORadioSizeType =
  | SAORadioSizes
  | `${SAORadioSizes}`
  | 'default'
  | 'small';
