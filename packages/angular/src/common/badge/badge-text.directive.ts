import { Directive, effect, ElementRef, inject, input } from '@angular/core';
import { SAOBadgeTextColors, SAOBadgeTextSizes } from './badge.enum';
import {
  SAOBadgeTextAppearanceType,
  SAOBadgeTextColorType,
  SAOBadgeTextSizeType,
} from './badge.type';

@Directive({
  selector: '[saoBadgeText]',
  standalone: true,
})
export class SAOBadgeTextDirective {
  /**
   * @description The appearance of the badge text.
   * @input {SAOBadgeTextAppearanceType}
   * @enum {['transparent', 'solid']}
   * @example
   * ```html
   * <span [saoBadgeText]="'solid'" [size]="'small'" [color]="'blue'">Warning</span>
   * ```
   */
  public readonly appearance = input.required<SAOBadgeTextAppearanceType>({
    alias: 'saoBadgeText',
  });
  /**
   * @description The color of the badge text.
   * @input {SAOBadgeTextColorType}
   * @enum {['gray', 'blue', 'purple', 'error', 'success', 'warning', 'cyan']}
   * @example
   * ```html
   * <span [saoBadgeText]="'solid'" [size]="'small'" [color]="'blue'">Warning</span>
   * ```
   */
  public readonly color = input<SAOBadgeTextColorType>(SAOBadgeTextColors.Gray);
  /**
   * @description The size of the badge text.
   * @input {SAOBadgeTextSizeType}
   * @enum {['xsmall', 'small']}
   * @example
   * ```html
   * <span [saoBadgeText]="'solid'" [size]="'small'" [color]="'blue'">Warning</span>
   * ```
   */
  public readonly size = input<SAOBadgeTextSizeType>(SAOBadgeTextSizes.Small);
  public readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  public readonly defaultClassName = 'sao-badge-text';

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);

    effect(() => {
      const appearance = `${this.defaultClassName}--${this.appearance()}--${this.color()}`;
      const size = `${this.defaultClassName}--${this.size()}`;

      [appearance, size].forEach(className => {
        this.elementRef.nativeElement.classList.toggle(className, true);
      });
    });
  }
}
