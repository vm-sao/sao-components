import {
  AfterViewInit,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { SAOToggleSizes } from './toggle.enum';
import { SAOToggleSizeType } from './toggle.type';

@Directive({
  selector: '[saoToggle]',
  standalone: true,
})
export class SAOToggleDirective implements AfterViewInit {
  /**
   * @description The size of the toggle.
   * @input {SAOToggleSizeType}
   * @enum {['default', 'large']}
   * @example
   * ```html
   * <label saoToggle [size]="'default'"></label>
   * ```
   */
  public readonly size = input<SAOToggleSizeType>(SAOToggleSizes.Default);
  public readonly elementRef = inject(ElementRef<HTMLElement>);
  public readonly defaultClassName = 'sao-toggle';

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
      console.warn('SAOToggleDirective: No input found');
    }
  }
}
