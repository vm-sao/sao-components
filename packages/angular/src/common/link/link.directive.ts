import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: 'a[saoLink]',
  standalone: true,
})
export class SAOLinkDirective {
  public readonly elementRef = inject(ElementRef<HTMLAnchorElement>);
  public readonly defaultClassName = 'sao-link';

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);
  }
}
