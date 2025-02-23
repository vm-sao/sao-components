export enum SAONotificationDirections {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

export type SAONotificationDirectionType =
  | SAONotificationDirections
  | `${SAONotificationDirections}`
  | 'vertical'
  | 'horizontal';
