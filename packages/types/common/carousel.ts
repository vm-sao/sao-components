export enum SAOCarouselDirections {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export type SAOCarouselDirectionType =
  | SAOCarouselDirections
  | `${SAOCarouselDirections}`
  | 'horizontal'
  | 'vertical';
