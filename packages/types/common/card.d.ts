export enum SAOCardSizes {
  Default = 'default',
  Small = 'small',
}

export type SAOCardSizeType =
  | SAOCardSizes
  | `${SAOCardSizes}`
  | 'default'
  | 'small';
