import { Directive, effect, ElementRef, inject, input } from '@angular/core';
import { SAOBadgeStatusType } from './badge.type';

@Directive({
  selector: '[saoBadgeStatus]',
  standalone: true,
})
export class SAOBadgeStatusDirective {
  /**
   * @description The color of the badge status.
   * @input {SAOBadgeStatusColorType}
   * @enum {['success', 'error', 'warning', 'info', 'processing', 'default']}
   * @example
   * ```html
   * <span [saoBadgeStatus]="'success'">Success</span>
   * ```
   */
  public readonly color = input.required<SAOBadgeStatusType>({
    alias: 'saoBadgeStatus',
  });
  public readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  public readonly defaultClassName = 'sao-badge-status';

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);

    effect(() => {
      this.elementRef.nativeElement.classList.toggle(
        `${this.defaultClassName}--${this.color()}`,
        true
      );
    });
  }
}
