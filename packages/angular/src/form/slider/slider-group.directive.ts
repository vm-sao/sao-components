import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[saoSliderGroup]',
  standalone: true,
})
export class SAOSliderGroupDirective implements AfterViewInit {
  public readonly elementRef = inject(ElementRef<HTMLElement>);
  public readonly defaultClassName = 'sao-slider-group';

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);
  }

  public ngAfterViewInit(): void {
    const slider = this.elementRef.nativeElement.querySelector(
      '.sao-slider-container'
    );

    if (!slider) {
      console.warn('SAOSliderGroupDirective: No slider container found');
    }
  }
}
