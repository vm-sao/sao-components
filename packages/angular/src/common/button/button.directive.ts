import { Directive, effect, ElementRef, inject, input } from '@angular/core';
import { SAOButtonAppearances, SAOButtonSizes } from './button.enum';
import { SAOButtonAppearanceType, SAOButtonSizeType } from './button.type';

@Directive({
  selector: 'button[saoButton]',
  standalone: true,
})
export class SAOButtonDirective {
  /**
   * @description The appearance of the button.
   * @input {SAOButtonAppearanceType}
   * @enum {['primary', 'secondary', 'tertiary', 'ghost', 'error', 'success']}
   * @example
   * ```html
   * <button saoButton [appearance]="'primary'"></button>
   * ```
   */
  public readonly appearance = input<SAOButtonAppearanceType>(
    SAOButtonAppearances.Primary
  );
  /**
   * @description The size of the button.
   * @input {SAOButtonSizeType}
   * @enum {['xsmall', 'small', 'medium', 'default', 'large', 'xlarge']}
   * @example
   * ```html
   * <button saoButton [size]="'small'"></button>
   * ```
   */
  public readonly size = input<SAOButtonSizeType>(SAOButtonSizes.Default);

  public readonly elementRef = inject(ElementRef<HTMLButtonElement>);
  public readonly defaultClassName = 'sao-button';

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);

    effect(() => {
      const appearance = `${this.defaultClassName}--${this.appearance()}`;
      const size = `${this.defaultClassName}--${this.size()}`;

      [appearance, size].forEach(className => {
        this.elementRef.nativeElement.classList.toggle(className, true);
      });
    });
  }
}
