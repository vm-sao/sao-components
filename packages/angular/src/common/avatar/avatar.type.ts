import { SAOAvatarSizes, SAOAvatarStatuses } from './avatar.enum';

export type SAOAvatarSizeType =
  | SAOAvatarSizes
  | `${SAOAvatarSizes}`
  | 'xs'
  | 's'
  | 'm'
  | 'l'
  | 'xl';

export type SAOAvatarStatusType =
  | SAOAvatarStatuses
  | `${SAOAvatarStatuses}`
  | 'online'
  | 'offline';
