import { Directive, effect, ElementRef, inject, input } from '@angular/core';
import { SAOLozengesType } from './lozenges.type';

@Directive({
  selector: '[saoLozenges]',
  standalone: true,
})
export class SAOLozengesDirective {
  /**
   * @description The appearance of the lozenge.
   * @input {SAOLozengesType}
   * @enum {['neutral', 'info', 'moved', 'new', 'removed', 'success']}
   * @example
   * ```html
   * <span [saoLozenges]="'info'">Label</span>
   * ```
   */
  public readonly appearance = input.required<SAOLozengesType>({
    alias: 'saoLozenges',
  });
  /**
   * @description Whether the lozenge should be bold.
   * @input {boolean}
   * @example
   * ```html
   * <span [saoLozenges]="'info'" [bold]="true">Label</span>
   * ```
   */
  public readonly bold = input<boolean>(false);
  public readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  public readonly defaultClassName = 'sao-lozenges';

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);

    effect(() => {
      const appearance = `${this.defaultClassName}--${this.appearance()}`;
      const bold = `${this.defaultClassName}--${this.bold() ? 'bold' : 'not-bold'}`;

      [appearance, bold].forEach(className => {
        this.elementRef.nativeElement.classList.toggle(className, true);
      });
    });
  }
}
