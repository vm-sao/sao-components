import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  effect,
  ElementRef,
  inject,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { SAOAccordionHeaderDirective } from './accordion-header.directive';
import { SAOAccordionMainDirective } from './accordion-main.directive';

@Component({
  selector: 'sao-accordion',
  template: `
    @if (headerElement()) {
      <ng-content select="[saoAccordionHeader]" />
    } @else {
      <header [class]="headerCustomClasses()" (click)="clickEvent.emit($event)">
        <h6>{{ title() }}</h6>
      </header>
    }
    @if (mainElement()) {
      <ng-content select="[saoAccordionMain]" />
    } @else {
      <main [class]="mainCustomClasses()">
        <ng-content></ng-content>
      </main>
    }
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SAOAccordionComponent {
  /**
   * @description The click event of the accordion header.
   * @output {MouseEvent}
   * @example
   * ```html
   * <sao-accordion (clickEvent)="onClick($event)" [title]="'Accordion title'">
   *   <p>Accordion content goes here</p>
   * </sao-accordion>
   * ```
   */
  public readonly clickEvent = output<MouseEvent>();
  /**
   * @description The title of the accordion.
   * @input {string}
   * @example
   * ```html
   * <sao-accordion [title]="'Accordion title'">
   *   <p>Accordion content goes here</p>
   * </sao-accordion>
   * ```
   */
  public readonly title = input<string>('');
  /**
   * @description Whether the accordion is active.
   * @input {boolean}
   * @example
   * ```html
   * <sao-accordion [active]="true">
   *   <p>Accordion content goes here</p>
   * </sao-accordion>
   * ```
   */
  public readonly active = input<boolean>(false);
  /**
   * @description Custom classes for the accordion.
   * @input {string}
   * @example
   * ```html
   * <sao-accordion [customClasses]="'custom-class'">
   *   <p>Accordion content goes here</p>
   * </sao-accordion>
   * ```
   */
  public readonly customClasses = input<string>('');
  /**
   * @description Custom classes for the accordion header.
   * @input {string}
   * @example
   * ```html
   * <sao-accordion [headerCustomClasses]="'custom-class'">
   *   <p>Accordion content goes here</p>
   * </sao-accordion>
   * ```
   */
  public readonly headerCustomClasses = input<string>('');
  /**
   * @description Custom classes for the accordion main.
   * @input {string}
   * @example
   * ```html
   * <sao-accordion [mainCustomClasses]="'custom-class'">
   *   <p>Accordion content goes here</p>
   * </sao-accordion>
   * ```
   */
  public readonly mainCustomClasses = input<string>('');
  /**
   * @description The main element of the accordion.
   * @contentChild {SAOAccordionMainDirective}
   * @example
   * ```html
   * <sao-accordion>
   *   <main saoAccordionMain>...</main>
   * </sao-accordion>
   * ```
   */
  public readonly mainElement = contentChild(SAOAccordionMainDirective);
  /**
   * @description The header element of the accordion.
   * @contentChild {SAOAccordionHeaderDirective}
   * @example
   * ```html
   * <sao-accordion>
   *   <header saoAccordionHeader>...</header>
   * </sao-accordion>
   * ```
   */
  public readonly headerElement = contentChild(SAOAccordionHeaderDirective);
  public readonly elementRef = inject(ElementRef<HTMLElement>);
  public readonly defaultClassName = 'sao-accordion';

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);

    effect(() => {
      this.elementRef.nativeElement.classList.toggle('active', this.active());
    });
  }
}
