import { AbstractControl, Validators } from '@angular/forms';

export class FormValidatorService extends Validators {
  static minLengthArray(min: number) {
    return (c: AbstractControl): { [key: string]: any } | null => {
      if (c.value.length >= min) {
        return null;
      }

      return { minLengthArray: { valid: false } };
    };
  }
}
