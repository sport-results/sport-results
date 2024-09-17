import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormValidatorService } from './validator';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule],
  providers: [FormValidatorService],
})
export class CoreFormModule {}
