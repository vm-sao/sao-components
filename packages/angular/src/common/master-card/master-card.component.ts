import { NgIf } from '@angular/common';
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
import { SAOMasterCardColors, SAOMasterCardSizes } from './master-card.enum';
import {
  SAOMasterCardColorType,
  SAOMasterCardSizeType,
} from './master-card.type';

@Component({
  selector: 'sao-master-card',
  template: `
    <header>
      @if (imageUrl(); as src) {
        <img [src]="src" [alt]="imageAlt() || 'Logo'" />
      }
      <ng-content select="img" />
    </header>
    <main>
      <aside>
        <label>
          <h6>{{ name() }}</h6>
          <span>{{ number() }}</span>
        </label>
        <span *ngIf="size() === 'large'">{{ expiry() }}</span>
      </aside>
      @if (icon(); as src) {
        <i [saoIcon]="src"></i>
      }
      <ng-content select="i" />
    </main>
  `,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SAOIconDirective, NgIf],
})
export class SAOMasterCardComponent {
  /**
   * @description The size of the master card.
   * @input {SAOMasterCardSizeType}
   * @enum {['small', 'large']}
   * @example
   * ```html
   * <sao-master-card [size]="'small'"></sao-master-card>
   * ```
   */
  public readonly size = input<SAOMasterCardSizeType>(SAOMasterCardSizes.Small);
  /**
   * @description The color of the master card.
   * @input {SAOMasterCardColorType}
   * @enum {['purple', 'ocean-blue', 'dark-green', 'charcoal', 'future-blue']}
   * @example
   * ```html
   * <sao-master-card [color]="'purple'"></sao-master-card>
   * ```
   */
  public readonly color = input<SAOMasterCardColorType>(
    SAOMasterCardColors.Purple
  );
  /**
   * @description The URL of the image.
   * @input {string | null}
   * @example
   * ```html
   * <sao-master-card [imageUrl]="'https://avatars.githubusercontent.com/u/49849883?v=4'"></sao-master-card>
   * ```
   */
  public readonly imageUrl = input<string | null>(null);
  /**
   * @description The alt text of the image.
   * @input {string | null}
   * @example
   * ```html
   * <sao-master-card [imageAlt]="'Logo'"></sao-master-card>
   * ```
   */
  public readonly imageAlt = input<string | null>(null);
  /**
   * @description The name of the card holder.
   * @input {string}
   * @example
   * ```html
   * <sao-master-card [name]="'John Doe'"></sao-master-card>
   * ```
   */
  public readonly name = input<string>('');
  /**
   * @description The number of the card.
   * @input {string}
   * @example
   * ```html
   * <sao-master-card [number]="'1234 5678 9012 3456'"></sao-master-card>
   * ```
   */
  public readonly number = input<string>('');
  /**
   * @description The expiry date of the card.
   * @input {string}
   * @example
   * ```html
   * <sao-master-card [expiry]="'12/24'"></sao-master-card>
   * ```
   */
  public readonly expiry = input<string>('');
  /**
   * @description The icon of the card.
   * @input {SaoIconType | null}
   * @example
   * ```html
   * <sao-master-card [icon]="'sao-icon-cc'"></sao-master-card>
   * ```
   */
  public readonly icon = input<SaoIconType | null>(null);
  public readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  public readonly defaultClassName = 'sao-master-card';

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);

    effect(() => {
      const size = `${this.defaultClassName}--${this.size()}`;
      const color = `${this.defaultClassName}--${this.color()}`;

      [size, color].forEach(className => {
        this.elementRef.nativeElement.classList.toggle(className, true);
      });
    });
  }
}
