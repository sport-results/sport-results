import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SportCategoryFormComponent } from './component';
import { SportCategoryFormUtil } from '@app/api/domain/sport-category';
import { SportCategoryFormUtilImpl } from './util';

@NgModule({
  declarations: [SportCategoryFormComponent],
  exports: [SportCategoryFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
  ],
  providers: [
    {
      provide: SportCategoryFormUtil,
      useClass: SportCategoryFormUtilImpl,
    },
  ],
})
export class SportCategoryFormModule {}
