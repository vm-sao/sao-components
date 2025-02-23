export enum SAOBadgeDotColors {
  Pink = 'pink',
  Red = 'red',
  Yellow = 'yellow',
  Orange = 'orange',
  Cyan = 'cyan',
  Green = 'green',
  Blue = 'blue',
  Purple = 'purple',
  Lime = 'lime',
  DarkPink = 'dark-pink',
  Gray = 'gray',
  Processing = 'processing',
  ProcessingAnimating = 'processing-animating',
}

export enum SAOBadgeStatuses {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Processing = 'processing',
  Default = 'default',
}

export enum SAOBadgeCountColors {
  Red = 'red',
  Gray = 'gray',
  Green = 'green',
  BlueInvert = 'blue-invert',
  Blue = 'blue',
}

export enum SAOBadgeCountSizes {
  Small = 'small',
  Medium = 'medium',
}

export enum SAOBadgeTextColors {
  Gray = 'gray',
  Blue = 'blue',
  Purple = 'purple',
  Error = 'error',
  Success = 'success',
  Warning = 'warning',
  Cyan = 'cyan',
}

export enum SAOBadgeTextAppearances {
  Transparent = 'transparent',
  Solid = 'solid',
}

export enum SAOBadgeTextSizes {
  XSmall = 'xsmall',
  Small = 'small',
}

export type SAOBadgeDotColorType =
  | SAOBadgeDotColors
  | `${SAOBadgeDotColors}`
  | 'pink'
  | 'red'
  | 'yellow'
  | 'orange'
  | 'cyan'
  | 'green'
  | 'blue'
  | 'purple'
  | 'lime'
  | 'dark-pink'
  | 'gray'
  | 'processing'
  | 'processing-animating';

export type SAOBadgeStatusType =
  | SAOBadgeStatuses
  | `${SAOBadgeStatuses}`
  | 'success'
  | 'error'
  | 'warning'
  | 'processing'
  | 'default';

export type SAOBadgeCountColorType =
  | SAOBadgeCountColors
  | `${SAOBadgeCountColors}`
  | 'red'
  | 'gray'
  | 'green'
  | 'blue-invert'
  | 'blue';

export type SAOBadgeCountSizeType =
  | SAOBadgeCountSizes
  | `${SAOBadgeCountSizes}`
  | 'small'
  | 'medium';

export type SAOBadgeTextColorType =
  | SAOBadgeTextColors
  | `${SAOBadgeTextColors}`
  | 'gray'
  | 'blue'
  | 'purple'
  | 'error'
  | 'success'
  | 'warning'
  | 'cyan';

export type SAOBadgeTextAppearanceType = 'transparent' | 'solid';

export type SAOBadgeTextSizeType =
  | SAOBadgeTextSizes
  | `${SAOBadgeTextSizes}`
  | 'xsmall'
  | 'small';
