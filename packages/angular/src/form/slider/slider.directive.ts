import {
  AfterViewInit,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
} from '@angular/core';

@Directive({
  selector: '[saoSlider]',
  standalone: true,
})
export class SAOSliderDirective implements AfterViewInit {
  /**
   * @description The value of the slider.
   * @input {number}
   * @example
   * ```html
   * <label [saoSlider]="50"></label>
   * ```
   */
  public readonly value = input.required<number>({
    alias: 'saoSlider',
  });
  public readonly elementRef = inject(ElementRef<HTMLElement>);
  public readonly defaultClassName = 'sao-slider';

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);

    effect(() => {
      this.elementRef.nativeElement.style.setProperty(
        '--sao-slider-value',
        `${this.value()}`
      );
    });
  }

  public ngAfterViewInit(): void {
    const input = this.elementRef.nativeElement.querySelector(
      'input[type="range"]'
    );

    if (!input) {
      console.warn('SAOSliderDirective: No input found');
      return;
    }

    input.setAttribute('min', 0);
    input.setAttribute('max', 100);
  }
}
