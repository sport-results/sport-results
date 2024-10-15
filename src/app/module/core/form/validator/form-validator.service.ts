import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { PeriodResult } from '@app/api/domain/sport-result';

export class FormValidatorService extends Validators {
  static minLengthArray(min: number) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value.length >= min) {
        return null;
      }

      return { minLengthArray: { valid: false } };
    };
  }

  static periodResult(periodTypeWinningSize: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control) {
        return null;
      }

      const periodResult = control.value as PeriodResult;

      if (
        periodResult.results.every(
          (result) => result.value <= periodTypeWinningSize && result.value >= 0
        )
      ) {
        return null;
      }

      return { periodResult: { valid: false } };
    };
  }
}
