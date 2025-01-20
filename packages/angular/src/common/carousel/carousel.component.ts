import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SAOCarouselDirections } from './carousel.enum';
import { SAOCarouselDirectionType } from './carousel.type';

@Component({
  selector: 'sao-carousel',
  template: `
    @for (index of array(); track index) {
      <span [class.active]="current() === index"></span>
    }
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SAOCarouselComponent {
  /**
   * @description The direction of the carousel.
   * @input {SAOCarouselDirectionType}
   * @enum {['horizontal', 'vertical']}
   * @example
   * ```html
   * <sao-carousel [direction]="'horizontal'"></sao-carousel>
   * ```
   */
  public readonly direction = input<SAOCarouselDirectionType>(
    SAOCarouselDirections.Horizontal
  );
  /**
   * @description The length of the carousel.
   * @input {number}
   * @example
   * ```html
   * <sao-carousel [length]="3"></sao-carousel>
   * ```
   */
  public readonly length = input<number>(0);
  /**
   * @description The current index of the carousel.
   * @input {number}
   * @example
   * ```html
   * <sao-carousel [current]="1"></sao-carousel>
   * ```
   */
  public readonly current = input<number>(0);
  public readonly array = computed(() =>
    Array.from({ length: this.length() }, (_, i) => i)
  );
  public readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  public readonly defaultClassName = 'sao-carousel';

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);

    effect(() => {
      this.elementRef.nativeElement.classList.toggle(
        `${this.defaultClassName}--${this.direction()}`,
        true
      );
    });
  }
}
