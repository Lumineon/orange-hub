import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {
  @Input() label!: string;
  @Input() options!: {value: string, name: string}[];
  public onChange = (_: any) => {};
  public onTouched = () => {};
  selectedIndex!: number;

  constructor() { }

  ngOnInit(): void {

  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  valueChanged(value: any) {
    this.onChange(value);
  }

  public writeValue(value: any): void {
    this.selectedIndex = value;
  }
  
}
