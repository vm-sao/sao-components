import { Directive, effect, ElementRef, inject, input } from '@angular/core';
import { SAOBreadcrumbSeparatorType } from './breadcrumb.type';

@Directive({
  selector: '[saoBreadcrumb]',
  standalone: true,
})
export class SAOBreadcrumbDirective {
  /**
   * @description The separator of the breadcrumb.
   * @input {SAOBreadcrumbSeparatorType}
   * @enum {['arrow', 'slash']}
   * @example
   * ```html
   * <ul [saoBreadcrumb]="'arrow'">
   *   <li>
   *     <i class="sao-icon sao-icon-filtered-action-3d-rotation"></i>
   *     Home
   *   </li>
   *   <li>
   *     <i class="sao-icon sao-icon-filtered-action-3d-rotation"></i>
   *     About
   *   </li>
   *   <li>
   *     <i class="sao-icon sao-icon-filtered-action-3d-rotation"></i>
   *     Contact
   *   </li>
   * </ul>
   * ```
   */
  public readonly separator = input.required<SAOBreadcrumbSeparatorType>({
    alias: 'saoBreadcrumb',
  });
  public readonly elementRef = inject(ElementRef<HTMLUListElement>);
  public readonly defaultClassName = 'sao-breadcrumb';

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);

    effect(() => {
      this.elementRef.nativeElement.classList.toggle(
        `${this.defaultClassName}--${this.separator()}`,
        true
      );
    });
  }
}
