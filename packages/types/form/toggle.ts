export enum SAOToggleSizes {
  Default = 'default',
  Large = 'large',
}

export type SAOToggleSizeType =
  | SAOToggleSizes
  | `${SAOToggleSizes}`
  | 'default'
  | 'large';
