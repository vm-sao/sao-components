export enum SAOTabAppearances {
  Fill = 'fill',
  Line = 'line',
}

export enum SAOTabSizes {
  Default = 'default',
  Large = 'large',
}

export type SAOTabAppearanceType =
  | SAOTabAppearances
  | `${SAOTabAppearances}`
  | 'fill'
  | 'line';

export type SAOTabSizeType =
  | SAOTabSizes
  | `${SAOTabSizes}`
  | 'default'
  | 'large';
