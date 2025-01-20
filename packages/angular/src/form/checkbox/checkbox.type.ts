import { SAOCheckboxSizes } from './checkbox.enum';

export type SAOCheckboxSizeType =
  | SAOCheckboxSizes
  | `${SAOCheckboxSizes}`
  | 'default'
  | 'small';
