export enum SAOAlertStatuses {
  Info = 'info',
  Neutral = 'neutral',
  Error = 'error',
  Warning = 'warning',
  Success = 'success',
}

export type SAOAlertStatusType =
  | SAOAlertStatuses
  | `${SAOAlertStatuses}`
  | 'info'
  | 'neutral'
  | 'error'
  | 'warning'
  | 'success';
