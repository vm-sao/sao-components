export enum SAOControlSizes {
  Default = 'default',
  Large = 'large',
}

export type SAOControlSizeType =
  | SAOControlSizes
  | `${SAOControlSizes}`
  | 'default'
  | 'large';
