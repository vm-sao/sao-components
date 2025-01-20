import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SaoIconType } from '@sao-icons/types';
import { SAOIconDirective } from '../icon';

@Component({
  selector: 'sao-table-header',
  template: `
    @if (text(); as text) {
      <span [class]="textClasses()">{{ text }}</span>
    }
    <ng-content />
    @if (icon(); as icon) {
      <i [saoIcon]="icon"></i>
    }
  `,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [SAOIconDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SAOTableHeaderComponent {
  /**
   * @description The text of the tab.
   * @input {string | null}
   * @example
   * ```html
   * <sao-tab [text]="'Tab'"></sao-tab>
   * ```
   */
  public readonly text = input<string | null>(null);
  /**
   * @description The icon of the tab.
   * @input {SaoIconType | null}
   * @example
   * ```html
   * <sao-tab [icon]="'sao-icon-cc'"></sao-tab>
   * ```
   */
  public readonly icon = input<SaoIconType | null>(null);
  /**
   * @description The classes of the tab text.
   * @input {string}
   * @example
   * ```html
   * <sao-tab [textClasses]="'text-red'"></sao-tab>
   * ```
   */
  public readonly textClasses = input<string>('');
  public readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  public readonly defaultClassName = 'sao-table-header';

  public constructor() {
    if (
      !this.elementRef.nativeElement.classList.contains(this.defaultClassName)
    ) {
      this.elementRef.nativeElement.classList.add(this.defaultClassName);
    }
  }
}
