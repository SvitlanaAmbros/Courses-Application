import {Component, OnInit, Input, forwardRef} from '@angular/core';
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
  private innerValue: string;
  //
  // constructor() { }
  //
  // ngOnInit() {
  // }
  //
  set value(value: Date) {
    console.log('Date value', value);
    // this.innerValue = new Date(value).toISOString().split('T')[0];
    this.onChange(value);
    this.onTouched();
  }

  get value(): Date {
    return new Date(this.innerValue);
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
    // this.value = obj;
  }

  public dateChanged(value): void {
    console.log('Date changed', value);
    // this.value = new Date(value);
  }
}
