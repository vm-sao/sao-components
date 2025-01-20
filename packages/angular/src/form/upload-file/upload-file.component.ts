import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  model,
  signal,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'sao-upload-file',
  template: `
    @if (file(); as file) {
      <main>
        <span>{{ file.name }}</span>
        <span class="is-information">
          {{ transformToMB(file.size) }} MB - {{ percentage() }}%
          {{ uploadedText() }}
        </span>
        @if (errorText(); as message) {
          <span class="is-error">{{ message }}</span>
        }
      </main>
      <ng-content select="i"></ng-content>
    } @else {
      <input
        #file
        type="file"
        [disabled]="disabled()"
        [accept]="accept()"
        (change)="onFileChange($event)" />
      <main>
        <span (click)="file.click()">
          <strong>{{ buttonText() }}</strong>
          {{ orText() }} {{ dndText() }}
        </span>
        <span>
          {{ accept() }}
          @if (maxSize(); as size) {
            ({{ transformToMB(size) }})mb {{ sizeText() }}
          }
        </span>
      </main>
    }
  `,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SAOUploadFileComponent {
  /**
   * @description The file
   * @model {File | null}
   * @example
   * ```html
   * <sao-upload-file [file]="file" />
   * ```
   */
  public readonly file = model<File | null>(null);
  /**
   * @description The max size of the file
   * @input {number | null}
   * @example
   * ```html
   * <sao-upload-file [maxSize]="1048576" />
   * ```
   */
  public readonly maxSize = input<number | null>(null);
  /**
   * @description The percentage of the upload
   * @input {number}
   * @example
   * ```html
   * <sao-upload-file [percentage]="100" />
   * ```
   */
  public readonly percentage = input<number>(0);
  /**
   * @description The accept input file types
   * @input {string | null}
   * @example
   * ```html
   * <sao-upload-file [accept]="'image/png, image/jpeg'" />
   * ```
   */
  public readonly accept = input<string | null>(null);
  /**
   * @description The error text
   * @input {string | null}
   * @example
   * ```html
   * <sao-upload-file [error]="'Try again'" />
   * ```
   */
  public readonly errorText = input<string | null>(null);
  /**
   * @description The uploaded text
   * @input {string}
   * @example
   * ```html
   * <sao-upload-file [uploadedText]="'uploaded'" />
   * ```
   */
  public readonly uploadedText = input<string>('uploaded');
  /**
   * @description The button text
   * @input {string}
   * @example
   * ```html
   * <sao-upload-file [button]="'Click to upload'" />
   * ```
   */
  public readonly buttonText = input<string>('Click to upload');
  /**
   * @description The or text
   * @input {string}
   * @example
   * ```html
   * <sao-upload-file [or]="'drag and drop'" />
   * ```
   */
  public readonly orText = input<string>('or');
  /**
   * @description The drag and drop text
   * @input {string}
   * @example
   * ```html
   * <sao-upload-file [dndText]="'drag and drop'" />
   * ```
   */
  public readonly dndText = input<string>('drag and drop');
  /**
   * @description The condition text
   * @input {string}
   * @example
   * ```html
   * <sao-upload-file [conditionText]="'SVG, PNG, JPG or PDF'" />
   * ```
   */
  public readonly conditionText = input<string>('SVG, PNG, JPG or PDF');
  /**
   * @description The size text
   * @input {string}
   * @example
   * ```html
   * <sao-upload-file [sizeText]="'max file size" />
   * ```
   */
  public readonly sizeText = input<string>('max file size');
  /**
   * @description The disabled state
   * @input {boolean}
   * @example
   * ```html
   * <sao-upload-file [disabled]="true" />
   * ```
   */
  public readonly disabled = input<boolean>(false);
  public readonly dragging = signal<boolean>(false);
  public readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  public readonly defaultClassName = 'sao-upload-file';

  public constructor() {
    this.elementRef.nativeElement.classList.toggle(this.defaultClassName, true);

    effect(() => {
      const selecting = `${this.defaultClassName}-selecting`;
      const selected = `${this.defaultClassName}-selected`;
      const file = this.file();

      if (!file) {
        this.elementRef.nativeElement.classList.remove(selected);
        this.elementRef.nativeElement.classList.toggle(selecting, true);
        this.elementRef.nativeElement.classList.toggle(
          'dragging',
          this.dragging()
        );

        return;
      }

      this.elementRef.nativeElement.classList.toggle(selected, true);
      this.elementRef.nativeElement.classList.remove('uploaded');
      this.elementRef.nativeElement.classList.remove('has-error');
      this.elementRef.nativeElement.classList.remove(selecting);
      this.elementRef.nativeElement.style.setProperty(
        '--sao-upload-file-progress',
        `0`
      );

      const errorText = this.errorText();

      if (errorText) {
        this.elementRef.nativeElement.classList.add('has-error');
        return;
      }

      this.elementRef.nativeElement.style.setProperty(
        '--sao-upload-file-progress',
        `${this.percentage()}%`
      );
      const uploaded = this.percentage() === 100;

      if (uploaded) {
        this.elementRef.nativeElement.classList.add('uploaded');
      }
    });
  }

  @HostListener('dragover', ['$event'])
  @HostListener('dragenter', ['$event'])
  public onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragging.set(true);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.dragging.set(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragging.set(false);

    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      this.file.set(file);
    }
  }

  public onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      this.file.set(file);
    }
  }

  public transformToMB(size: number): string {
    return (size / 1024 / 1024).toFixed(2);
  }
}
