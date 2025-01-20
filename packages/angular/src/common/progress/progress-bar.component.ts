import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SAOProgressBarDirections, SAOProgressBarSizes } from './progress.enum';
import {
  SAOProgressBarDirectionType,
  SAOProgressBarSizeType,
} from './progress.type';

@Component({
  selector: 'sao-progress-bar',
  template: `
    <span></span>
    <span>{{ percentage() }}%</span>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SAOProgressBarComponent {
  /**
   * @description The direction of the progress bar.
   * @input {SAOProgressBarDirectionType}
   * @enum {['horizontal', 'vertical']}
   * @example
   * ```html
   * <sao-progress-bar [direction]="'horizontal'" />
   * ```
   */
  public readonly direction = input<SAOProgressBarDirectionType>(
    SAOProgressBarDirections.Horizontal
  );
  /**
   * @description The size of the progress bar.
   * @input {SAOProgressBarSizeType}
   * @enum {['small', 'default']}
   * @example
   * ```html
   * <sao-progress-bar [size]="'small'" />
   * ```
   */
  public readonly size = input<SAOProgressBarSizeType>(
    SAOProgressBarSizes.Default
  );
  /**
   * @description The percentage of the progress bar.
   * @input {number}
   * @example
   * ```html
   * <sao-progress-bar [percentage]="50" />
   * ```
   */
  public readonly percentage = input<number>(0);
  public readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  public readonly defaultClassName = 'sao-progress-bar';

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);

    effect(() => {
      const direction = `${this.defaultClassName}--${this.direction()}`;
      const size = `${this.defaultClassName}--${this.size()}`;

      [direction, size].forEach(className => {
        this.elementRef.nativeElement.classList.toggle(className, true);
      });
    });

    effect(() => {
      const percentage = this.percentage();
      this.elementRef.nativeElement.style.setProperty(
        '--sao-progress-percentage',
        `${percentage ?? 0}%`
      );
    });
  }
}
