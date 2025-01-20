import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SAOCalendarBoxKinds } from './calendar.enum';
import { SAOCalendarBoxKindType } from './calendar.type';

@Component({
  selector: 'sao-calendar-box',
  template: `
    @if (kind() === 'range') {
      <ng-content select="sao-calendar-options" />
      <aside>
        <main>
          <ng-content select="sao-calendar-picker" />
        </main>
        <ng-content select="sao-calendar-footer" />
      </aside>
    } @else {
      <ng-content select="sao-calendar-picker" />
      <ng-content select="sao-calendar-footer" />
    }
  `,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SAOCalendarBoxComponent {
  /**
   * @description The kind of the calendar box
   * @input {SAOCalendarBoxKindType}
   * @example
   * ```html
   * <sao-calendar-box [kind]="'single'" />
   * ```
   */
  public readonly kind = input<SAOCalendarBoxKindType>(
    SAOCalendarBoxKinds.Single
  );
  public readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  public readonly defaultClassName = 'sao-calendar-box';

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);

    effect(() => {
      this.elementRef.nativeElement.classList.toggle(
        `${this.defaultClassName}--${this.kind()}`,
        true
      );
    });
  }
}
