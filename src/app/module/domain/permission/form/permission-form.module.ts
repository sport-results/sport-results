import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PermissionFormUtil } from '@app/api/domain/permission';

import { PermissionFormComponent } from './component';
import { PermissionFormUtilImpl } from './util';

@NgModule({
    declarations: [PermissionFormComponent],
    exports: [PermissionFormComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        InputTextareaModule
    ],
    providers: [
    {
      provide: PermissionFormUtil,
      useClass: PermissionFormUtilImpl,
    },
  ],
})
export class PermissionFormModule {}
