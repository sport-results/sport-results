import { Subscription } from 'rxjs';

import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidationError } from '@app/api/core/form';

@Directive({
  selector: '[appValidationMessage]',
  standalone: true,
})
export class ValidationMessageDirective implements OnDestroy, OnInit {
  private subscription!: Subscription | undefined;

  @Input()
  public control: AbstractControl | null = null;
  @Input()
  public validationErrors: ValidationError[] = [];

  constructor(private element: ElementRef) {}

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public ngOnInit(): void {
    this.subscription = this.control?.statusChanges.subscribe((value) => {
      if (this.control?.dirty) {
        const error = this.validationErrors.find((validationError) =>
          this.control?.hasError(validationError.key)
        );

        this.element.nativeElement.innerHTML = error ? error?.value : '';
      }
    });
  }
}
