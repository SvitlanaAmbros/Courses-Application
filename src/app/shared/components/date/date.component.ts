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
export class DateComponent implements OnInit, ControlValueAccessor {
  @Input('value') innerValue: Date;

  constructor() { }

  ngOnInit() {
  }

  set value(value: Date) {
    this.innerValue = value;
    this.onChange(value);
    this.onTouched();
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

}
