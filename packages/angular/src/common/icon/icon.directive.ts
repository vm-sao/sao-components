import { Directive, effect, ElementRef, inject, input } from '@angular/core';
import { SaoIconType } from '@sao-icons/types';

@Directive({
  selector: 'i[saoIcon]',
  standalone: true,
})
export class SAOIconDirective {
  /**
   * @description The name of the icon.
   * @input {SaoIconType}
   * @example
   * ```html
   * <i [saoIcon]="'sao-icon-outlined-av-4k'"></i>
   * ```
   */
  public readonly name = input.required<SaoIconType>({
    alias: 'saoIcon',
  });
  /**
   * @description The size of the icon.
   * @input {SaoIconSizeType}
   * @example
   * ```html
   * <i [saoIcon]="'sao-icon-outlined-av-4k'" [size]="'30px'"></i>
   * ```
   */
  public readonly size = input<
    | `${number}px`
    | `${number}rem`
    | `${number}em`
    | `${number}%`
    | `${number}vh`
    | `${number}vw`
    | `${number}dvh`
    | `${number}dvw`
    | `var(--${string})`
    | null
  >(null);

  public readonly elementRef = inject(ElementRef<HTMLButtonElement>);
  public readonly defaultClassName = 'sao-icon';

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);

    effect(() => {
      if (this.size()) {
        (this.elementRef.nativeElement as HTMLElement).style.setProperty(
          '--sao-icon-size',
          this.size()
        );
      }
    });

    effect(() => {
      const matches = (
        this.elementRef.nativeElement as HTMLElement
      ).className.match(/sao-icon-(\w+)/);

      matches?.forEach(match => {
        this.elementRef.nativeElement.classList.remove(match);
      });

      this.elementRef.nativeElement.classList.add(this.name(), true);
    });
  }
}
