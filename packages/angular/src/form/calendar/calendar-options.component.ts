import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  ElementRef,
  inject,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { SAOCalendarOptionsItemDirective } from './calendar-options-item.directive';
import { SAOCalendarOptionsItemType } from './calendar.type';

@Component({
  selector: 'sao-calendar-options',
  template: `
    @for (item of combinedItems(); track item.key) {
      <div
        class="sao-calendar-options-item"
        [class.selected]="item.key === selectedItem()"
        (click)="selectedItem.set(item.key)">
        {{ item.label }}
      </div>
    }
  `,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SAOCalendarOptionsComponent {
  /**
   * @description The items to display in the calendar options
   * @input {SAOCalendarOptionsItemType[]}
   * @example
   * ```html
   * <sao-calendar-options [items]="[
   *   { key: '1', label: 'January' },
   *   { key: '2', label: 'February' },
   *   { key: '3', label: 'March' },
   *   { key: '4', label: 'April' },
   * ]"></sao-calendar-options>
   * ```
   */
  public readonly items = input<SAOCalendarOptionsItemType[]>([]);
  /**
   * @description The children template of the calendar options
   * @contentChildren {SAOCalendarOptionsItemDirective[]}
   * @example
   * ```html
   * <sao-calendar-options>
   *   <ng-template [saoCalendarOptionsItem]="'foo'" [label]="'Foo'" />
   *   <ng-template [saoCalendarOptionsItem]="'bar'" [label]="'Bar'" />
   * </sao-calendar-options>
   * ```
   */
  public readonly children = contentChildren(SAOCalendarOptionsItemDirective);
  /**
   * @description The selected item
   * @input {string | null}
   * @example
   * ```html
   * <sao-calendar-options [selectedItem]="'foo'"></sao-calendar-options>
   * ```
   */
  public readonly selectedItem = model<string | null>(null);
  public readonly combinedItems = computed(() => [
    ...this.items(),
    ...this.children().map(child => ({
      key: child.key(),
      label: child.label(),
    })),
  ]);
  public readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  public readonly defaultClassName = 'sao-calendar-options';

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);
  }
}
