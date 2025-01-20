import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { SAOCalendarNavigationComponent } from './calendar-navigation.component';
import { generateCalendarDays } from './calendar.utils';

@Component({
  selector: 'sao-calendar-picker',
  template: `
    <sao-calendar-navigation
      [value]="selectedMonth()"
      [min]="min()"
      [max]="max()"
      [monthLabels]="monthLabels()" />
    <main class="sao-calendar-button-group">
      @for (weekDay of weekDayLabels(); track weekDay) {
        <button class="sao-calendar-button is-label">
          <span>{{ weekDay }}</span>
        </button>
      }
      @for (day of days(); track day) {
        <button class="sao-calendar-button">
          <span>{{ day.getDate() }}</span>
        </button>
      }
    </main>
  `,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SAOCalendarNavigationComponent],
})
export class SAOCalendarPickerComponent {
  /**
   * @description The value of the calendar
   * @input {Date | null}
   * @example
   * ```html
   * <sao-calendar-picker [value]="new Date()" />
   * ```
   */
  public readonly value = model<Date | null>(null);
  /**
   * @description The selected month of the calendar
   * @model {Date}
   * @example
   * ```html
   * <sao-calendar-picker [selectedMonth]="new Date()" />
   * ```
   */
  public readonly selectedMonth = model<Date>(new Date());
  /**
   * @description The minimum date of the calendar
   * @input {Date | null}
   * @example
   * ```html
   * <sao-calendar-picker [min]="new Date()" />
   * ```
   */
  public readonly min = input<Date | null>(null);
  /**
   * @description The maximum date of the calendar
   * @input {Date | null}
   * @example
   * ```html
   * <sao-calendar-picker [max]="new Date()" />
   * ```
   */
  public readonly max = input<Date | null>(null);
  /**
   * @description border left of calendar picker
   * @input {boolean}
   * @example
   * ```html
   * <sao-calendar-picker [booleanLeft]="true" />
   * ```
   */
  public readonly borderLeft = input<boolean>(false);
  /**
   * @description border right of calendar picker
   * @input {boolean}
   * @example
   * ```html
   * <sao-calendar-picker [borderRight]="true" />
   * ```
   */
  public readonly borderRight = input<boolean>(false);
  /**
   * @description border top of calendar picker
   * @input {boolean}
   * @example
   * ```html
   * <sao-calendar-picker [borderTop]="true" />
   * ```
   */
  public readonly borderTop = input<boolean>(false);
  /**
   * @description border bottom of calendar picker
   * @input {boolean}
   * @example
   * ```html
   * <sao-calendar-picker [borderBottom]="true" />
   * ```
   */
  public readonly borderBottom = input<boolean>(false);
  /**
   * @description The week day labels of the calendar
   * @input {[string, string, string, string, string, string, string]}
   * @example
   * ```html
   * <sao-calendar-picker [weekDayLabels]="['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']" />
   * ```
   */
  public readonly weekDayLabels = input<
    [string, string, string, string, string, string, string]
  >(['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']);
  /**
   * @description The month labels of the calendar
   * @input {[string, string, string, string, string, string, string, string, string, string, string, string]}
   * @example
   * ```html
   * <sao-calendar-picker [monthLabels]="['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']" />
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
  /**
   * @description Whether the calendar is in range
   * @input {boolean}
   * @example
   * ```html
   * <sao-calendar-picker [inRange]="true" />
   * ```
   */
  public readonly inRange = input<boolean>(false);
  public readonly days = computed(() =>
    generateCalendarDays(this.selectedMonth())
  );
  public readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  public readonly defaultClassName = 'sao-calendar-picker';

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);

    effect(() => {
      const borderLeft = `${this.defaultClassName}--border-left`;
      const borderRight = `${this.defaultClassName}--border-right`;
      const borderTop = `${this.defaultClassName}--border-top`;
      const borderBottom = `${this.defaultClassName}--border-bottom`;

      [borderLeft, borderRight, borderTop, borderBottom].forEach(className => {
        this.elementRef.nativeElement.classList.toggle(className, true);
      });
    });

    effect(() => {
      const value = this.value();

      if (!value) {
        this.selectedMonth.set(new Date());
        return;
      }

      this.selectedMonth.set(value);
    });
  }
}
