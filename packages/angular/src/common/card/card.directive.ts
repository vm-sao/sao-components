import { Directive, effect, ElementRef, inject, input } from '@angular/core';
import { SAOCardSizes } from './card.enum';
import { SAOCardSizeType } from './card.type';

@Directive({
  selector: '[saoCard]',
  standalone: true,
})
export class SAOCardDirective {
  public readonly size = input<SAOCardSizeType>(SAOCardSizes.Default);
  public readonly elementRef = inject(ElementRef<HTMLElement>);
  public readonly defaultClassName = 'sao-card';

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);

    effect(() => {
      this.elementRef.nativeElement.classList.toggle(
        `${this.defaultClassName}--${this.size()}`,
        true
      );
    });
  }
}
