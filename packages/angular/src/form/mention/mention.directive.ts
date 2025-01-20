import { Directive, effect, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[saoMention]',
  standalone: true,
})
export class SAOMentionDirective {
  public readonly noAccess = input<boolean>(false);
  public readonly highlighted = input<boolean>(false);
  public readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  public readonly defaultClassName = 'sao-mention';

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);

    effect(() => {
      this.elementRef.nativeElement.classList.remove('no-access');
      this.elementRef.nativeElement.classList.remove('highlighted');

      if (this.noAccess()) {
        this.elementRef.nativeElement.classList.add('no-access');
        return;
      }

      if (this.highlighted()) {
        this.elementRef.nativeElement.classList.add('highlighted');
      }
    });
  }
}
