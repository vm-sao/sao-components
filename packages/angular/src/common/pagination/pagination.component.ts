import { CdkMenuTrigger } from '@angular/cdk/menu';
import { DecimalPipe } from '@angular/common';
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
import { SAOIconDirective } from '../icon';

@Component({
  selector: 'sao-pagination',
  template: `
    <main>
      <div>
        <span>{{ itemsPerPageText() }}:</span>
        <button [cdkMenuTriggerFor]="itemsPerPageTemplate">
          {{ itemsPerPage() === total() ? allText() : itemsPerPage() }}
          <i [saoIcon]="'sao-icon-filtered-hardware-keyboard-arrow-down'"></i>
        </button>
        <ng-template #itemsPerPageTemplate>
          <ul
            class="sao-select w-[100px]"
            [style.--sao-select-max-height]="'200px'">
            @for (value of itemsPerPageOptions(); track value) {
              <li
                [class.selected]="value === itemsPerPage()"
                (click)="itemsPerPage.set(value)">
                <span>{{ value }}</span>
              </li>
            }
            <li
              [class.selected]="itemsPerPage() === this.total()"
              (click)="itemsPerPage.set(this.total())">
              <span>{{ allText() }}</span>
            </li>
          </ul>
        </ng-template>
      </div>
      <span>
        {{ from() }} – {{ to() }} {{ ofText() }}
        {{ total() | number: '1.0-0' }} {{ itemsText() }}
      </span>
    </main>
    <aside>
      <div>
        <button [cdkMenuTriggerFor]="pagesTemplate">
          {{ current() + 1 }}
          <i [saoIcon]="'sao-icon-filtered-hardware-keyboard-arrow-down'"></i>
        </button>
        <ng-template #pagesTemplate>
          <ul
            class="sao-select w-[100px]"
            [style.--sao-select-max-height]="'200px'">
            @for (page of pagesOptions(); track page) {
              <li [class.selected]="page === current()" (click)="moveTo(page)">
                <span>{{ page + 1 }}</span>
              </li>
            }
          </ul>
        </ng-template>
        <span>{{ ofText() }} {{ pages() }} {{ pagesText() }}</span>
      </div>
      <div>
        <button (click)="moveTo(current() - 1)">
          <i [saoIcon]="'sao-icon-filtered-navigation-arrow-left'"></i>
        </button>
        <button (click)="moveTo(current() + 1)">
          <i [saoIcon]="'sao-icon-filtered-navigation-arrow-right'"></i>
        </button>
      </div>
    </aside>
  `,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SAOIconDirective, CdkMenuTrigger, DecimalPipe],
})
export class SAOPaginationComponent {
  /**
   * @description The current page.
   * @model {number}
   * @example
   * ```html
   * <sao-pagination [current]="1"></sao-pagination>
   * ```
   */
  public readonly current = model<number>(0);
  /**
   * @description The number of items per page.
   * @model {number}
   * @example
   * ```html
   * <sao-pagination [itemsPerPage]="10"></sao-pagination>
   * ```
   */
  public readonly itemsPerPage = model<number>(10);
  /**
   * @description The total number of items.
   * @input {number}
   * @example
   * ```html
   * <sao-pagination [total]="100"></sao-pagination>
   * ```
   */
  public readonly total = input.required<number>();
  /**
   * @description The options for the number of items per page.
   * @input {number[]}
   * @example
   * ```html
   * <sao-pagination [itemsPerPageOptions]="[10, 20, 50, 100, 200]"></sao-pagination>
   * ```
   */
  public readonly itemsPerPageOptions = input<number[]>([10, 20, 50, 100, 200]);
  /**
   * @description The text for the label of the number of items per page.
   * @input {string}
   * @example
   * ```html
   * <sao-pagination [itemsPerPageText]="'Items per page'"></sao-pagination>
   * ```
   */
  public readonly itemsPerPageText = input<string>('Items per page');
  /**
   * @description The text for the label of the number of items.
   * @input {string}
   * @example
   * ```html
   * <sao-pagination [ofText]="'of'"></sao-pagination>
   * ```
   */
  public readonly ofText = input<string>('of');
  /**
   * @description The text for the label of the items.
   * @input {string}
   * @example
   * ```html
   * <sao-pagination [itemsText]="'item(s)'"></sao-pagination>
   * ```
   */
  public readonly itemsText = input<string>('item(s)');
  /**
   * @description The text for the label of the pages.
   * @input {string}
   * @example
   * ```html
   * <sao-pagination [pagesText]="'page(s)'"></sao-pagination>
   * ```
   */
  public readonly pagesText = input<string>('page(s)');
  /**
   * @description The text for the label of all pages.
   * @input {string}
   * @example
   * ```html
   * <sao-pagination [allText]="'All'"></sao-pagination>
   * ```
   */
  public readonly allText = input<string>('All');
  public readonly pages = computed(() =>
    Math.ceil(this.total() / this.itemsPerPage())
  );
  public readonly pagesOptions = computed(() =>
    Array.from(Array(this.pages()).keys())
  );
  public readonly from = computed(
    () => this.current() * this.itemsPerPage() + 1
  );
  public readonly to = computed(() =>
    Math.min(this.from() + this.itemsPerPage() - 1, this.total())
  );
  public readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  public readonly defaultClassName = 'sao-pagination';

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);
  }

  public moveTo(page: number) {
    if (page < 0 || page >= this.pages()) {
      return;
    }

    this.current.set(page);
  }
}
