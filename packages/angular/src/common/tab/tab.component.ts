import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SaoIconType } from '@sao-icons/types';
import { SAOIconDirective } from '../icon';
import { SAOTabAppearances, SAOTabSizes } from './tab.enum';
import { SAOTabAppearanceType, SAOTabSizeType } from './tab.type';

@Component({
  selector: 'sao-tab',
  template: `
    <span>{{ text() }}</span>
    @if (icon(); as src) {
      <i [saoIcon]="src"></i>
    }
    <ng-content select="i" />
  `,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SAOIconDirective],
})
export class SAOTabComponent {
  /**
   * @description The appearance of the tab.
   * @input {SAOTabAppearanceType}
   * @enum {['fill', 'line']}
   * @example
   * ```html
   * <sao-tab [appearance]="'fill'"></sao-tab>
   * ```
   */
  public readonly appearance = input<SAOTabAppearanceType>(
    SAOTabAppearances.Fill
  );
  /**
   * @description The size of the tab.
   * @input {SAOTabSizeType}
   * @enum {['small', 'default', 'large']}
   * @example
   * ```html
   * <sao-tab [size]="'small'"></sao-tab>
   * ```
   */
  public readonly size = input<SAOTabSizeType>(SAOTabSizes.Default);
  /**
   * @description The text of the tab.
   * @input {string}
   * @example
   * ```html
   * <sao-tab [text]="'Tab'"></sao-tab>
   * ```
   */
  public readonly text = input<string>('');
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
   * @description The active state of the tab.
   * @input {boolean}
   * @example
   * ```html
   * <sao-tab [active]="true"></sao-tab>
   * ```
   */
  public readonly active = input<boolean>(false);
  /**
   * @description The disabled state of the tab.
   * @input {boolean}
   * @example
   * ```html
   * <sao-tab [disabled]="true"></sao-tab>
   * ```
   */
  public readonly disabled = input<boolean>(false);
  public readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  public readonly defaultClassName = 'sao-tab';

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);

    effect(() => {
      const size = `${this.defaultClassName}--${this.size()}`;
      const appearance = `${this.defaultClassName}--${this.appearance()}`;

      [appearance, size].forEach(className => {
        this.elementRef.nativeElement.classList.toggle(className, true);
      });
    });

    effect(() => {
      this.elementRef.nativeElement.classList.toggle('active', this.active());
    });

    effect(() => {
      this.elementRef.nativeElement.classList.toggle(
        'disabled',
        this.disabled()
      );
    });
  }
}
