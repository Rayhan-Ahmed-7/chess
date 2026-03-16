import { Component, Input, forwardRef } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { inputVariants, InputVariants } from './input.variants';
import { cn } from '../../utils/cn';

@Component({
  selector: 'ui-input',
  standalone: true,
  template: `
    <input
      [type]="type"
      [placeholder]="placeholder"
      [disabled]="disabled"
      [value]="value"
      (input)="onInput($event)"
      (blur)="onTouched()"
      [class]="classes"
    />
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() variant: InputVariants['variant'] = 'default';
  @Input() inputSize: InputVariants['inputSize'] = 'default';
  @Input() className: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() disabled = false;

  value = '';

  get classes() {
    return cn(inputVariants({ variant: this.variant, inputSize: this.inputSize }), this.className);
  }

  private onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string) {
    this.value = value ?? '';
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }
}
