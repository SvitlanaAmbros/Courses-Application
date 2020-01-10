import {Component, OnInit, Input, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DurationComponent),
      multi: true
    }
  ]
})
export class DurationComponent implements ControlValueAccessor {
  private innerValue: number;

  set value(value: number) {
    this.innerValue = value;
    // this.onChange(value);
    // this.onTouched();
  }

  get value(): number {
    return this.innerValue;
  }

  onChange: any = (value) => { };
  onTouched: any = () => { };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: number): void {
    this.value = value;
    this.onChange(this.value);
  }
}
