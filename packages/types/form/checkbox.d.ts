export enum SAOCheckboxSizes {
  Default = 'default',
  Small = 'small',
}

export type SAOCheckboxSizeType =
  | SAOCheckboxSizes
  | `${SAOCheckboxSizes}`
  | 'default'
  | 'small';
