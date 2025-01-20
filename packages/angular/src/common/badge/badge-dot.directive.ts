import { Directive, effect, ElementRef, inject, input } from '@angular/core';
import { SAOBadgeDotColorType } from './badge.type';

@Directive({
  selector: '[saoBadgeDot]',
  standalone: true,
})
export class SAOBadgeDotDirective {
  /**
   * @description The color of the badge dot.
   * @input {SAOBadgeDotColorType}
   * @enum {['pink', 'red', 'yellow', 'orange', 'cyan', 'green', 'blue', 'purple', 'lime', 'dark-pink', 'gray', 'processing', 'processing-animating']}
   * @example
   * ```html
   * <span [saoBadgeDot]="'blue'"></span>
   * ```
   */
  public readonly color = input.required<SAOBadgeDotColorType>({
    alias: 'saoBadgeDot',
  });
  public readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  public readonly defaultClassName = 'sao-badge-dot';

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);

    effect(() => {
      this.elementRef.nativeElement.classList.toggle(
        `${this.defaultClassName}--${this.color()}`,
        true
      );
    });
  }
}
