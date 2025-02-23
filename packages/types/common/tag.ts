export enum SAOTagSizes {
  Small = 'small',
  Default = 'default',
  Large = 'large',
}

export type SAOTagSizeType =
  | SAOTagSizes
  | `${SAOTagSizes}`
  | 'small'
  | 'default'
  | 'large';
