import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SaoIconType } from '@sao-icons/types';
import { SAOIconDirective } from '../icon';
import { SAOCardDirective } from './card.directive';

@Component({
  selector: 'sao-card',
  template: `
    @if (showHeader()) {
      <header>
        <aside>
          @if (headerImageSrc(); as src) {
            <img [src]="src" [alt]="headerImageAlt() || 'Avatar'" />
          }
          <label>
            <h6>{{ headerTitle() }}</h6>
            <p>{{ headerDescription() }}</p>
          </label>
        </aside>
        @if (headerIcon(); as icon) {
          <i [saoIcon]="icon"></i>
        }
        <ng-content select="i" />
      </header>
    }
    <ng-content select="header" />
    @if (showImage()) {
      <img [src]="imageSrc()" [alt]="imageAlt() || 'Placeholder'" />
    }
    <ng-content select="img" />
    @if (showMain()) {
      <main>
        <h2>{{ title() }}</h2>
        <p>{{ description() }}</p>
      </main>
    }
    <ng-content select="main" />
    <ng-content select="footer" />
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [SAOIconDirective],
})
export class SAOCardComponent extends SAOCardDirective {
  /**
   * @description The header image source.
   * @input {string | null}
   * @example
   * ```html
   * <sao-card [headerImageSrc]="'https://picsum.photos/200/300'">...</sao-card>
   * ```
   */
  public readonly headerImageSrc = input<string | null>(null);
  /**
   * @description The header image alt.
   * @input {string | null}
   * @example
   * ```html
   * <sao-card [headerImageAlt]="'Picsum photo'">...</sao-card>
   * ```
   */
  public readonly headerImageAlt = input<string | null>(null);
  /**
   * @description The header title.
   * @input {string | null}
   * @example
   * ```html
   * <sao-card [headerTitle]="'Header title'">...</sao-card>
   * ```
   */
  public readonly headerTitle = input<string | null>(null);
  /**
   * @description The header description.
   * @input {string | null}
   * @example
   * ```html
   * <sao-card [headerDescription]="'Header description'">...</sao-card>
   * ```
   */
  public readonly headerDescription = input<string | null>(null);
  /**
   * @description The header icon.
   * @input {SaoIconType | null}
   * @example
   * ```html
   * <sao-card [headerIcon]="'sao-icon-home'">...</sao-card>
   * ```
   */
  public readonly headerIcon = input<SaoIconType | null>(null);
  /**
   * @description The image source.
   * @input {string | null}
   * @example
   * ```html
   * <sao-card [imageSrc]="'https://picsum.photos/200/300'">...</sao-card>
   * ```
   */
  public readonly imageSrc = input<string | null>(null);
  /**
   * @description The image alt.
   * @input {string | null}
   * @example
   * ```html
   * <sao-card [imageAlt]="'Picsum photo'">...</sao-card>
   * ```
   */
  public readonly imageAlt = input<string | null>(null);
  /**
   * @description The title.
   * @input {string | null}
   * @example
   * ```html
   * <sao-card [title]="'Title'">...</sao-card>
   * ```
   */
  public readonly title = input<string | null>(null);
  /**
   * @description The description.
   * @input {string | null}
   * @example
   * ```html
   * <sao-card [description]="'Description'">...</sao-card>
   * ```
   */
  public readonly description = input<string | null>(null);
  public readonly showHeader = computed(
    () =>
      this.headerTitle() || this.headerDescription() || this.headerImageSrc()
  );
  public readonly showImage = computed(() => this.imageSrc());
  public readonly showMain = computed(() => this.title() || this.description());
}
