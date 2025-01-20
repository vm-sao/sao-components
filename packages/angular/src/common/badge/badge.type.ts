import {
  SAOBadgeCountColors,
  SAOBadgeCountSizes,
  SAOBadgeDotColors,
  SAOBadgeStatuses,
  SAOBadgeTextColors,
  SAOBadgeTextSizes,
} from './badge.enum';

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
