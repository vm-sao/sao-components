import { SAOTimeLineStepStatuses } from './time-line.enum';

export type SAOTimeLineStepStatusType =
  | SAOTimeLineStepStatuses
  | `${SAOTimeLineStepStatuses}`
  | 'general'
  | 'success'
  | 'error'
  | 'default';
