import { Directive, effect, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: 'table[saoTable]',
  standalone: true,
})
export class SAOTableDirective {
  public readonly bordered = input<boolean>(false);
  public readonly hoverable = input<boolean>(false);
  public readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  public readonly defaultClassName = 'sao-table';

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);

    effect(() => {
      this.elementRef.nativeElement.classList.toggle(
        `${this.defaultClassName}--bordered`,
        this.bordered()
      );
    });

    effect(() => {
      this.elementRef.nativeElement.classList.toggle(
        `${this.defaultClassName}--hoverable`,
        this.hoverable()
      );
    });
  }
}
