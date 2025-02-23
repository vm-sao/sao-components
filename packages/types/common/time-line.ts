export enum SAOTimeLineStepStatuses {
  General = 'general',
  Success = 'success',
  Error = 'error',
  Default = 'default',
}

export type SAOTimeLineStepStatusType =
  | SAOTimeLineStepStatuses
  | `${SAOTimeLineStepStatuses}`
  | 'general'
  | 'success'
  | 'error'
  | 'default';
