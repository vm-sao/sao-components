import { SAOCarouselDirections } from './carousel.enum';

export type SAOCarouselDirectionType =
  | SAOCarouselDirections
  | `${SAOCarouselDirections}`
  | 'horizontal'
  | 'vertical';
