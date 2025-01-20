import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: 'input[saoInput], textarea[saoInput]',
  standalone: true,
})
export class SAOInputDirective {
  public readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  public readonly defaultClassName = 'sao-input';

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);
  }
}
