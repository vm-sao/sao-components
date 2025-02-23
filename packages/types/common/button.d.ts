export enum SAOButtonAppearances {
  Primary = 'primary',
  Secondary = 'secondary',
  Ghost = 'ghost',
  Success = 'success',
  Error = 'error',
  Tertiary = 'tertiary',
}

export enum SAOButtonSizes {
  XSmall = 'xsmall',
  Small = 'small',
  Medium = 'medium',
  Default = 'default',
  Large = 'large',
}

export type SAOButtonAppearanceType =
  | SAOButtonAppearances
  | `${SAOButtonAppearances}`
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'success'
  | 'error'
  | 'tertiary';

export type SAOButtonSizeType =
  | SAOButtonSizes
  | `${SAOButtonSizes}`
  | 'xsmall' // 32px
  | 'small' // 36px
  | 'medium' // 40px
  | 'default' // 44px
  | 'large' // 48px
  | 'xlarge'; // 56px
