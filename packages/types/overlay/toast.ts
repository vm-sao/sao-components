export enum SAOToastStatuses {
  Information = 'information',
  Neutral = 'neutral',
  Error = 'error',
  Warning = 'warning',
  Success = 'success',
}

export type SAOToastStatusType =
  | SAOToastStatuses
  | `${SAOToastStatuses}`
  | 'information'
  | 'neutral'
  | 'error'
  | 'warning'
  | 'success';
