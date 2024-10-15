import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { PeriodResult } from '@app/api/domain/sport-result';

@Component({
  selector: 'sr-period-result',
  templateUrl: './period-result.component.html',
  standalone: true,
  styleUrls: ['./period-result.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: PeriodResultComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: PeriodResultComponent,
    },
  ],
})
export class PeriodResultComponent implements ControlValueAccessor, Validator {
  private onValidationChange: any = () => {};
  private touched = false;

  @Input()
  public disabled = false;
  public onChange = (value: PeriodResult | undefined) => {};
  public onTouched = () => {};
  @Input()
  public value?: PeriodResult;

  public markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  public registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  public registerOnValidatorChange?(fn: () => void): void {
    this.onValidationChange = fn;
  }

  public setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    return null;
  }

  public writeValue(value: PeriodResult) {
    this.value = value;
  }

  public changeHandler(event: Event, index: number): void {
    if (!this.disabled) {
      this.markAsTouched();

      (this.value as PeriodResult).results[index].value = Number(
        (event.currentTarget as HTMLInputElement).value
      );
      this.onChange(this.value);
    }
  }
}
