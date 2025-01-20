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
import { SAOTagSizes } from './tag.enum';
import { SAOTagSizeType } from './tag.type';

@Component({
  selector: 'sao-tag',
  template: `
    @if (imageSrc(); as src) {
      <img [src]="src" [alt]="imageAlt() || 'Avatar'" />
    }
    <ng-content select="img" />
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
  host: {
    tabindex: '0',
  },
})
export class SAOTagComponent {
  /**
   * @description The size of the tag.
   * @input {SAOTagSizeType}
   * @enum {['small', 'default', 'large']}
   * @example
   * ```html
   * <sao-tag [size]="'small'"></sao-tag>
   * ```
   */
  public readonly size = input<SAOTagSizeType>(SAOTagSizes.Default);
  /**
   * @description The text of the tag.
   * @input {string}
   * @example
   * ```html
   * <sao-tag [text]="'Tag'"></sao-tag>
   * ```
   */
  public readonly text = input<string>('');
  /**
   * @description The icon of the tag.
   * @input {SaoIconType | null}
   * @example
   * ```html
   * <sao-tag [icon]="'sao-icon-cc'"></sao-tag>
   * ```
   */
  public readonly icon = input<SaoIconType | null>(null);
  /**
   * @description The URL of the image.
   * @input {string | null}
   * @example
   * ```html
   * <sao-tag [imageUrl]="'https://avatars.githubusercontent.com/u/49849883?v=4'"></sao-tag>
   * ```
   */
  public readonly imageSrc = input<string | null>(null);
  /**
   * @description The alt text of the image.
   * @input {string | null}
   * @example
   * ```html
   * <sao-tag [imageAlt]="'Logo'"></sao-tag>
   * ```
   */
  public readonly imageAlt = input<string | null>(null);
  public readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  public readonly defaultClassName = 'sao-tag';

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);

    effect(() => {
      this.elementRef.nativeElement.classList.toggle(
        `${this.defaultClassName}--${this.size()}`,
        true
      );
    });
  }
}
