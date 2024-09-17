import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SportCategoryRuleFormUtil } from '@app/api/domain/sport-category-rule';

import { SportCategoryRuleFormComponent } from './component';
import { SportCategoryRuleFormUtilImpl } from './util';

@NgModule({
  declarations: [SportCategoryRuleFormComponent],
  exports: [SportCategoryRuleFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
  ],
  providers: [
    {
      provide: SportCategoryRuleFormUtil,
      useClass: SportCategoryRuleFormUtilImpl,
    },
  ],
})
export class SportCategoryRuleFormModule {}
