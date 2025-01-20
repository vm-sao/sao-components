import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  inject,
  model,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SAOIconDirective } from '../../common';

@Component({
  selector: 'sao-calendar-range',
  template: ``,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SAOIconDirective],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SAOCalendarRangeComponent),
      multi: true,
    },
  ],
})
export class SAOCalendarRangeComponent implements ControlValueAccessor {
  public readonly disabled = model<boolean>(false);
  /**
   * @description The search text.
   * @input {string}
   * @example
   * ```html
   * <sao-calendar-range [search]="'foo'"></sao-calendar-range>
   * ```
   */
  public readonly value = signal<[Date | null, Date | null] | null>(null);
  public readonly elementRef = inject(ElementRef<HTMLElement>);
  public readonly defaultClassName = 'sao-calendar';

  public onTouched: () => void = () => void 0;

  public onChange: (_: [Date | null, Date | null] | null) => void = () =>
    void 0;

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);
  }

  public registerOnChange(
    fn: (_: [Date | null, Date | null] | null) => void
  ): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public writeValue(value: [Date | null, Date | null] | null): void {
    this.onTouched();
    this.onChange(value);
    this.value.set(value);
  }

  public setDisabledState(disabled: boolean): void {
    this.disabled.set(disabled);
  }
}
