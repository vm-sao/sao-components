import { Directive, input } from '@angular/core';

@Directive({
  selector: '[saoCalendarOptionsItem]',
  standalone: true,
})
export class SAOCalendarOptionsItemDirective {
  public readonly key = input.required<string>({
    alias: 'saoCalendarOptionsItem',
  });
  public readonly label = input<string>('');
}
