import { Directive, input } from '@angular/core';
import { SaoIconType } from '@sao-icons/types';

@Directive({
  selector: 'ng-template[saoSelectItem]',
  standalone: true,
})
export class SAOSelectItemDirective<T> {
  public readonly value = input.required<T>({
    alias: 'saoSelectItem',
  });
  public readonly text = input<string>('');
  public readonly disabled = input<boolean>(false);
  public readonly prefixIcon = input<SaoIconType | null>(null);
  public readonly suffixIcon = input<SaoIconType | null>(null);
}
