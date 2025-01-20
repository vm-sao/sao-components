import { SAOButtonAppearances, SAOButtonSizes } from './button.enum';

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
