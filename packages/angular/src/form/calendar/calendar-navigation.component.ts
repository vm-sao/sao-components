import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { SAOButtonDirective, SAOIconDirective } from '../../common';

@Component({
  selector: 'sao-calendar-navigation',
  template: `
    <button
      saoButton
      [appearance]="'ghost'"
      [size]="'small'"
      [disabled]="disabledPrev()"
      (click)="prev()">
      <i [saoIcon]="'sao-icon-filtered-navigation-arrow-back-ios'"></i>
    </button>
    <span>{{ label() }}</span>
    <button
      saoButton
      [appearance]="'ghost'"
      [size]="'small'"
      [disabled]="disabledNext()"
      (click)="next()">
      <i [saoIcon]="'sao-icon-filtered-navigation-arrow-forward-ios'"></i>
    </button>
  `,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SAOButtonDirective, SAOIconDirective],
})
export class SAOCalendarNavigationComponent {
  /**
   * @description The value of the calendar navigation
   * @model {Date}
   * @example
   * ```html
   * <sao-calendar-navigation [value]="new Date()" />
   * ```
   */
  public readonly value = model<Date>(new Date());
  /**
   * @description The minimum date of the calendar
   * @input {Date | null}
   * @example
   * ```html
   * <sao-calendar-navigation [min]="new Date()" />
   * ```
   */
  public readonly min = input<Date | null>(null);
  /**
   * @description The maximum date of the calendar
   * @input {Date | null}
   * @example
   * ```html
   * <sao-calendar-navigation [max]="new Date()" />
   * ```
   */
  public readonly max = input<Date | null>(null);
  /**
   * @description The month labels of the calendar
   * @input {[string, string, string, string, string, string, string, string, string, string, string, string]}
   * @example
   * ```html
   * <sao-calendar-navigation [monthLabels]="['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']" />
   * ```
   */
  public readonly monthLabels = input<
    [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
    ]
  >([
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]);
  public readonly label = computed(() => {
    const value = this.value();
    const month = this.monthLabels()[value.getMonth()];
    const year = value.getFullYear();

    return `${month} ${year}`;
  });
  public readonly disabledPrev = computed(() => {
    const value = this.value();
    const min = this.min();

    return min && value.getTime() < min.getTime();
  });
  public readonly disabledNext = computed(() => {
    const value = this.value();
    const max = this.max();

    return max && value.getTime() > max.getTime();
  });
  public readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  public readonly defaultClassName = 'sao-calendar-navigation';

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);
  }

  public next(): void {
    if (this.disabledNext()) {
      return;
    }

    const value = this.value();
    this.value.set(new Date(value.getFullYear(), value.getMonth() + 1, 1));
  }

  public prev(): void {
    if (this.disabledPrev()) {
      return;
    }

    const value = this.value();
    this.value.set(new Date(value.getFullYear(), value.getMonth() - 1, 1));
  }
}
