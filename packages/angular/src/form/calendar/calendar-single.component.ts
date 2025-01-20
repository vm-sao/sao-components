import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  inject,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SAOIconDirective } from '../../common';

@Component({
  selector: 'sao-calendar-single',
  template: ``,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SAOIconDirective],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SAOCalendarSingleComponent),
      multi: true,
    },
  ],
})
export class SAOCalendarSingleComponent implements ControlValueAccessor {
  public readonly disabled = input<boolean>(false);
  /**
   * @description The search text.
   * @input {string}
   * @example
   * ```html
   * <sao-calendar-single [search]="'foo'"></sao-calendar-single>
   * ```
   */
  public readonly value = signal<Date | null>(null);
  public readonly elementRef = inject(ElementRef<HTMLElement>);
  public readonly defaultClassName = 'sao-calendar';

  public onTouched: () => void = () => void 0;

  public onChange: (_: Date | null) => void = () => void 0;

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);
  }

  public registerOnChange(fn: (_: Date | null) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public writeValue(value: Date | null): void {
    this.onTouched();
    this.onChange(value);
    this.value.set(value);
  }

  public setDisabledState(disabled: boolean): void {
    this.disabled.set(disabled);
  }
}
