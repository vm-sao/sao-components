import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'sao-time-line',
  template: `
    <ng-content select="sao-time-line-step" />
  `,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SAOTimeLineComponent {
  public readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  public readonly defaultClassName = 'sao-time-line';

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);
  }
}
