import { SAOCalendarBoxKinds } from './calendar.enum';

export type SAOCalendarOptionsItemType = {
  key: string;
  label: string;
};

export type SAOCalendarBoxKindType =
  | SAOCalendarBoxKinds
  | `${SAOCalendarBoxKinds}`
  | 'range'
  | 'single';
