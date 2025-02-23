export enum SAOAvatarSizes {
  XS = 'xs',
  S = 's',
  M = 'm',
  L = 'l',
  XL = 'xl',
}

export enum SAOAvatarStatuses {
  Online = 'online',
  Offline = 'offline',
}

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
