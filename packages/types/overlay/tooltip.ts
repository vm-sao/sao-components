export enum SAOTooltipPositions {
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  TOP_CENTER = 'top-center',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right',
  BOTTOM_CENTER = 'bottom-center',
  LEFT = 'left',
  RIGHT = 'right',
}

export type SAOTooltipPositionType =
  | SAOTooltipPositions
  | `${SAOTooltipPositions}`
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'left'
  | 'right';
