export enum SAODrawerSizes {
  Small = 'small',
  Default = 'default',
  Large = 'large',
  XLarge = 'xlarge',
}

export type SAODrawerSizeType =
  | SAODrawerSizes
  | `${SAODrawerSizes}`
  | 'small'
  | 'default'
  | 'large'
  | 'xlarge';
