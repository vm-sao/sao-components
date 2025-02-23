export enum SAOLozengesAppearances {
  Neutral = 'neutral',
  Info = 'info',
  Moved = 'moved',
  New = 'new',
  Removed = 'removed',
  Success = 'success',
}

export type SAOLozengesType =
  | SAOLozengesAppearances
  | `${SAOLozengesAppearances}`
  | 'neutral'
  | 'info'
  | 'moved'
  | 'new'
  | 'removed'
  | 'success';
