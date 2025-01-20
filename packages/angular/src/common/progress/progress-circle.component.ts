import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SAOProgressCircleSizes } from './progress.enum';
import { SAOProgressCircleSizeType } from './progress.type';

@Component({
  selector: 'sao-progress-circle',
  template: `
    <svg
      class="{{ defaultClassName }} {{ defaultClassName }}--{{ size() }}"
      [style.--sao-progress-percentage]="percentage()">
      <circle [attr.cx]="area()" [attr.cy]="area()" [attr.r]="border()" />
      <circle [attr.cx]="area()" [attr.cy]="area()" [attr.r]="border()" />
      <text
        [attr.x]="area()"
        [attr.y]="area()"
        text-anchor="middle"
        dominant-baseline="middle">
        {{ percentage() }}%
      </text>
    </svg>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      sao-progress-circle {
        display: contents;
      }
    `,
  ],
})
export class SAOProgressCircleComponent {
  /**
   * @description The size of the progress circle.
   * @input {SAOProgressCircleSizeType}
   * @enum {['xsmall', 'small', 'medium', 'large', 'xlarge']}
   * @example
   * ```html
   * <sao-progress-circle [size]="'small'" />
   * ```
   */
  public readonly size = input<SAOProgressCircleSizeType>(
    SAOProgressCircleSizes.Medium
  );
  /**
   * @description The percentage of the progress circle.
   * @input {number}
   * @example
   * ```html
   * <sao-progress-circle [percentage]="50" />
   * ```
   */
  public readonly percentage = input<number>(0);
  public readonly radius = computed(() => {
    switch (this.size()) {
      case SAOProgressCircleSizes.XSmall:
        return 60;
      case SAOProgressCircleSizes.Small:
        return 120;
      case SAOProgressCircleSizes.Medium:
        return 144;
      case SAOProgressCircleSizes.Large:
        return 220;
      case SAOProgressCircleSizes.XLarge:
        return 260;
      default:
        return 144;
    }
  });
  public readonly area = computed(() => this.radius() / 2);
  public readonly border = computed(() => this.area() - this.radius() / 20);
  public readonly defaultClassName = 'sao-progress-circle';
}
