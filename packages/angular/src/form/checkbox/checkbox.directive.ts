import {
  AfterViewInit,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { SAOCheckboxSizes } from './checkbox.enum';
import { SAOCheckboxSizeType } from './checkbox.type';

@Directive({
  selector: '[saoCheckbox]',
  standalone: true,
})
export class SAOCheckboxDirective implements AfterViewInit {
  /**
   * @description The size of the checkbox.
   * @input {SAOCheckboxSizeType}
   * @enum {['default', 'large']}
   * @example
   * ```html
   * <label saoCheckbox [size]="'default'"></label>
   * ```
   */
  public readonly size = input<SAOCheckboxSizeType>(SAOCheckboxSizes.Default);
  public readonly elementRef = inject(ElementRef<HTMLElement>);
  public readonly defaultClassName = 'sao-checkbox';

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);

    effect(() => {
      this.elementRef.nativeElement.classList.toggle(
        `${this.defaultClassName}--${this.size()}`,
        true
      );
    });
  }

  public ngAfterViewInit(): void {
    const existedInput = [
      this.elementRef.nativeElement.querySelector('input[type="checkbox"]'),
    ].some(input => !!input);

    if (!existedInput) {
      console.warn('SAOCheckboxDirective: No input found');
    }
  }
}
