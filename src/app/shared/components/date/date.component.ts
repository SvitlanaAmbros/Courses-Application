import {Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateComponent),
      multi: true
    }
  ]
})
export class DateComponent implements ControlValueAccessor {
  private innerValue: Date;

  set value(value: Date) {
    this.innerValue = value;
  }

  get value(): Date {
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

  writeValue(obj: Date): void {
    this.value = obj;
  }

  public dateChanged(value): void {
    this.writeValue(value);
    this.onChange(value);
  }
}
