import {
  AfterViewInit,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { SAORadioSizes } from './radio.enum';
import { SAORadioSizeType } from './radio.type';

@Directive({
  selector: '[saoRadio]',
  standalone: true,
})
export class SAORadioDirective implements AfterViewInit {
  /**
   * @description The size of the radio.
   * @input {SAORadioSizeType}
   * @enum {['default', 'large']}
   * @example
   * ```html
   * <label saoRadio [size]="'default'"></label>
   * ```
   */
  public readonly size = input<SAORadioSizeType>(SAORadioSizes.Default);
  public readonly elementRef = inject(ElementRef<HTMLElement>);
  public readonly defaultClassName = 'sao-radio';

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
      this.elementRef.nativeElement.querySelector('input[type="radio"]'),
    ].some(input => !!input);

    if (!existedInput) {
      console.warn('SAORadioDirective: No input found');
    }
  }
}
