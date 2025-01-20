import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'sao-accordion-group',
  template: `
    <ng-content select="sao-accordion" />
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SAOAccordionGroupComponent {
  public readonly elementRef = inject(ElementRef<HTMLElement>);
  public readonly defaultClassName = 'sao-accordion-group';

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);
  }
}
