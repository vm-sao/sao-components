import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  ElementRef,
  forwardRef,
  inject,
  input,
  model,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SAOIconDirective } from '../../common';
import { SAOSelectItemDirective } from './select-item.directive';

@Component({
  selector: 'sao-select',
  template: `
    @for (item of items(); track item.value()) {
      <div
        tabindex="0"
        class="sao-select-item"
        [class.selected]="item.value() === value()"
        [class.disabled]="item.disabled()"
        (click)="!item.disabled() && writeValue(item.value())">
        @if (item.prefixIcon(); as icon) {
          <aside>
            <i [saoIcon]="icon"></i>
            <span [innerHTML]="innerHTML(item.text())"></span>
          </aside>
        } @else {
          <span [innerHTML]="innerHTML(item.text())"></span>
        }
        @if (item.suffixIcon(); as icon) {
          <i [saoIcon]="icon"></i>
        }
      </div>
    }
  `,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SAOIconDirective],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SAOSelectComponent),
      multi: true,
    },
  ],
})
export class SAOSelectComponent<T> implements ControlValueAccessor {
  /**
   * @description The items of the select.
   * @contentChildren {SAOSelectItemDirective[]}
   * @example
   * ```html
   * <ul>
   *   <ng-template [saoSelectItem]="'foo'" [text]="'Foo'" />
   *   <ng-template [saoSelectItem]="'bar'" [text]="'Bar'" />
   * </ul>
   * ```
   */
  public readonly items = contentChildren(SAOSelectItemDirective);
  /**
   * @description Whether the select is disabled.
   * @model {boolean}
   * @example
   * ```html
   * <sao-select [disabled]="true"></sao-select>
   * ```
   */
  public readonly disabled = model<boolean>(false);
  /**
   * @description The search text.
   * @input {string}
   * @example
   * ```html
   * <sao-select [search]="'foo'"></sao-select>
   * ```
   */
  public readonly search = input<string>('');
  public readonly value = signal<T | null>(null);
  public readonly elementRef = inject(ElementRef<HTMLElement>);
  public readonly defaultClassName = 'sao-select';

  public onTouched: () => void = () => void 0;

  public onChange: (_: T | null) => void = () => void 0;

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);
  }

  public registerOnChange(fn: (_: T | null) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public writeValue(value: T | null): void {
    this.onTouched();
    this.onChange(value);
    this.value.set(value);
  }

  public setDisabledState(disabled: boolean): void {
    this.disabled.set(disabled);
  }

  public innerHTML(text: string): string {
    return computed(() => {
      const search = this.search();
      if (search?.length === 0) {
        return text;
      }

      return text.replace(
        new RegExp(search, 'gi'),
        match => `<mark>${match}</mark>`
      );
    })();
  }
}
