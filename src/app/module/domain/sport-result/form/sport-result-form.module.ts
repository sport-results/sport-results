import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SportResultFormUtil } from '@app/api/domain/sport-result';

import { SportResultFormComponent } from './component';
import { SportResultFormUtilImpl } from './util';
import { PeriodResultComponent, ValidationMessageDirective } from '@app/core/form';

@NgModule({
  declarations: [SportResultFormComponent],
  exports: [SportResultFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    PeriodResultComponent,
    ValidationMessageDirective,
  ],
  providers: [
    {
      provide: SportResultFormUtil,
      useClass: SportResultFormUtilImpl,
    },
  ],
})
export class SportResultFormModule {}
