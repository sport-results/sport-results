import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleFormUtil } from '@app/api/domain/role';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';

import { RoleFormComponent } from './component';
import { RoleFormUtilImpl } from './util';

@NgModule({
  declarations: [RoleFormComponent],
  exports: [RoleFormComponent],
  imports: [
    CommonModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    MultiSelectModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: RoleFormUtil,
      useClass: RoleFormUtilImpl,
    },
  ],
})
export class RoleFormModule {}
