import { SAOLozengesAppearances } from './lozenges.enum';

export type SAOLozengesType =
  | SAOLozengesAppearances
  | `${SAOLozengesAppearances}`
  | 'neutral'
  | 'info'
  | 'moved'
  | 'new'
  | 'removed'
  | 'success';
