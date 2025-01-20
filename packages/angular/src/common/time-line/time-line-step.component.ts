import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SAOTimeLineStepStatuses } from './time-line.enum';
import { SAOTimeLineStepStatusType } from './time-line.type';

@Component({
  selector: 'sao-time-line-step',
  template: `
    @if (label()) {
      <h6>{{ label() }}</h6>
    }
    <ng-content select="h6" />
    @if (description()) {
      <p>{{ description() }}</p>
    }
    <ng-content select="p" />
  `,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SAOTimeLineStepComponent {
  /**
   * @description The status of the time-line step.
   * @input {SAOTimeLineStepStatusType}
   * @enum {['general', 'success', 'error', 'default']}
   * @example
   * ```html
   * <sao-time-line-step [status]="'default'"></sao-time-line-step>
   * ```
   */
  public readonly status = input<SAOTimeLineStepStatusType>(
    SAOTimeLineStepStatuses.Default
  );
  /**
   * @description The label of the time-line step.
   * @input {string | null}
   * @example
   * ```html
   * <sao-time-line-step [label]="'Step 1'"></sao-time-line-step>
   * ```
   */
  public readonly label = input<string | null>();
  /**
   * @description The description of the time-line step.
   * @input {string | null}
   * @example
   * ```html
   * <sao-time-line-step [description]="'Step 1 description'"></sao-time-line-step>
   * ```
   */
  public readonly description = input<string | null>();
  public readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  public readonly defaultClassName = 'sao-time-line-step';

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);

    effect(() => {
      this.elementRef.nativeElement.classList.toggle(
        `${this.defaultClassName}--${this.status()}`,
        true
      );
    });
  }
}
