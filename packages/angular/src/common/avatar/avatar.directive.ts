import { Directive, effect, ElementRef, inject, input } from '@angular/core';
import { SAOAvatarStatuses } from './avatar.enum';
import { SAOAvatarSizeType, SAOAvatarStatusType } from './avatar.type';

@Directive({
  selector: '[saoAvatar]',
  standalone: true,
})
export class SAOAvatarDirective {
  /**
   * @description The size of the avatar.
   * @input {SAOAvatarSizeType}
   * @enum {['xs', 's', 'm', 'l', 'xl']}
   * @example
   * ```html
   * <span [saoAvatar]="'s'">...</span>
   * ```
   */
  public readonly size = input.required<SAOAvatarSizeType>({
    alias: 'saoAvatar',
  });
  /**
   * @description The status of the avatar.
   * @input {SAOAvatarStatusType}
   * @enum {['online', 'offline']}
   * @example
   * ```html
   * <span [saoAvatar]="'s'" [status]="'online'">...</span>
   * ```
   */
  public readonly status = input<SAOAvatarStatusType | null>(null);

  public readonly elementRef = inject(ElementRef<HTMLElement>);
  public readonly defaultClassName = 'sao-avatar';

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);
    effect(() => {
      const size = `${this.defaultClassName}--${this.size()}`;
      this.elementRef.nativeElement.classList.toggle(size, true);

      [SAOAvatarStatuses.Offline, SAOAvatarStatuses.Online].forEach(status => {
        this.elementRef.nativeElement.classList.remove(
          `${this.defaultClassName}--${status}`
        );
      });
      const status = this.status()
        ? `${this.defaultClassName}--${this.status()}`
        : '';

      if (status) {
        this.elementRef.nativeElement.classList.add(status);
      }
    });
  }
}
