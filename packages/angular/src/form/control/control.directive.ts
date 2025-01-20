import {
  AfterViewInit,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { SAOControlSizes } from './control.enum';
import { SAOControlSizeType } from './control.type';

@Directive({
  selector: '[saoControl]',
  standalone: true,
})
export class SAOControlDirective implements AfterViewInit {
  /**
   * @description The size of the control.
   * @input {SAOControlSizeType}
   * @enum {['default', 'large']}
   * @example
   * ```html
   * <label saoControl [size]="'default'"></label>
   * ```
   */
  public readonly size = input<SAOControlSizeType>(SAOControlSizes.Default);
  public readonly elementRef = inject(ElementRef<HTMLElement>);
  public readonly defaultClassName = 'sao-control';

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
      this.elementRef.nativeElement.querySelector('input'),
      this.elementRef.nativeElement.querySelector('textarea'),
    ].some(input => !!input);

    if (!existedInput) {
      console.warn('SAOControlDirective: No input found');
    }
  }
}
