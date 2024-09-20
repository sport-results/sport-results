import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FieldsetModule} from 'primeng/fieldset';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SportCategoryRuleFormUtil } from '@app/api/domain/sport-category-rule';

import { SportCategoryRuleFormComponent } from './component';
import { SportCategoryRuleFormUtilImpl } from './util';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [SportCategoryRuleFormComponent],
  exports: [SportCategoryRuleFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    DropdownModule,
    FieldsetModule,
    InputNumberModule,
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
