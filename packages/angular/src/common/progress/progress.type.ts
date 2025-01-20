import {
  SAOProgressBarDirections,
  SAOProgressBarSizes,
  SAOProgressCircleSizes,
} from './progress.enum';

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
