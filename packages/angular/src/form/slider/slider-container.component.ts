import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'sao-slider-container',
  template: `
    <span>0%</span>
    <ng-content select="[saoSlider]" />
    <span>100%</span>
  `,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SAOSliderContainerComponent implements AfterViewInit {
  public readonly elementRef = inject(ElementRef<HTMLElement>);
  public readonly defaultClassName = 'sao-slider-container';

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);
  }

  public ngAfterViewInit(): void {
    const slider = this.elementRef.nativeElement.querySelector('.sao-slider');

    if (!slider) {
      console.warn('SAOSliderContainerComponent: No slider found');
    }
  }
}
