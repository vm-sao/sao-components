import { Directive, effect, ElementRef, inject, input } from '@angular/core';
import { SAOBadgeCountSizes } from './badge.enum';
import { SAOBadgeCountColorType, SAOBadgeCountSizeType } from './badge.type';

@Directive({
  selector: '[saoBadgeCount]',
  standalone: true,
})
export class SAOBadgeCountDirective {
  /**
   * @description The color of the badge.
   * @input {SAOBadgeCountColorType}
   * @enum {['red', 'gray', 'green', 'blue-invert', 'blue']}
   * @example
   * ```html
   * <span [saoBadgeCount]="'green'">99+</span>
   * ```
   */
  public readonly color = input.required<SAOBadgeCountColorType>({
    alias: 'saoBadgeCount',
  });
  /**
   * @description The size of the badge.
   * @input {SAOBadgeCountSizeType}
   * @enum {['small', 'medium']}
   * @example
   * ```html
   * <span [saoBadgeCount]="'green'" [size]="'small'">99+</span>
   * ```
   */
  public readonly size = input<SAOBadgeCountSizeType>(
    SAOBadgeCountSizes.Medium
  );
  public readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  public readonly defaultClassName = 'sao-badge-count';

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);

    effect(() => {
      const color = `${this.defaultClassName}--${this.color()}`;
      const size = `${this.defaultClassName}--${this.size()}`;

      [color, size].forEach(className => {
        this.elementRef.nativeElement.classList.toggle(className, true);
      });
    });
  }
}
