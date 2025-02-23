export enum SAORadioSizes {
  Default = 'default',
  Small = 'small',
}

export type SAORadioSizeType =
  | SAORadioSizes
  | `${SAORadioSizes}`
  | 'default'
  | 'small';
