import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  input,
  model,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'sao-star',
  template: `
    @for (index of array(); track index) {
      <span class="sao-star" [style.--sao-star-index]="index"></span>
    }
  `,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SAOStarComponent),
      multi: true,
    },
  ],
})
export class SAOStarComponent implements ControlValueAccessor {
  /**
   * @description The length of the star
   * @input {number}
   * @example
   * ```html
   * <sao-star [length]="5"></sao-star>
   * ```
   */
  public readonly length = input<number>(5);
  /**
   * @description Whether the star is disabled.
   * @model {boolean}
   * @example
   * ```html
   * <sao-star [disabled]="true"></sao-star>
   * ```
   */
  public readonly disabled = model<boolean>(false);
  public readonly array = computed(() => {
    return Array.from({ length: this.length() }, (_, index) => index + 1);
  });
  public readonly value = signal(0);
  public readonly hoverValue = signal(0);
  public readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  public readonly defaultClassName = 'sao-star-group';

  public onTouched: () => void = () => void 0;

  public onChange: (_: number) => void = () => void 0;

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);

    effect(() => {
      this.elementRef.nativeElement.style.setProperty(
        '--sao-star-value',
        `${this.hoverValue()}`
      );
    });
  }

  public registerOnChange(fn: (_: number) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public writeValue(value: number | null): void {
    this.onTouched();
    this.onChange(value ?? 0);
    this.value.set(value ?? 0);
    this.hoverValue.set(value ?? 0);
  }

  public setDisabledState(disabled: boolean): void {
    this.disabled.set(disabled);
  }

  @HostListener('mousemove', ['$event'])
  public onMouseEnter(event: MouseEvent): void {
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const percentage = (mouseX / rect.width) * 100;
    this.hoverValue.set(this.mapToRange(percentage, 0, 100, 0, 5));
  }

  @HostListener('mouseleave')
  public onMouseLeave(): void {
    this.hoverValue.set(this.value());
  }

  @HostListener('click')
  public onClick(): void {
    this.writeValue(this.roundToNearest(this.hoverValue(), 0.5));
  }

  private mapToRange(
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
  ): number {
    return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
  }

  private roundToNearest(value: number, step: number): number {
    return Math.round(value / step) * step;
  }
}
