export enum SAOProgressBarSizes {
  Small = 'small',
  Default = 'default',
}

export enum SAOProgressBarDirections {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export enum SAOProgressCircleSizes {
  XSmall = 'xsmall',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  XLarge = 'xlarge',
}

export type SAOProgressBarSizeType =
  | SAOProgressBarSizes
  | `${SAOProgressBarSizes}`
  | 'small'
  | 'default';
export type SAOProgressBarDirectionType =
  | SAOProgressBarDirections
  | `${SAOProgressBarDirections}`
  | 'horizontal'
  | 'vertical';
export type SAOProgressCircleSizeType =
  | SAOProgressCircleSizes
  | `${SAOProgressCircleSizes}`
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge';
