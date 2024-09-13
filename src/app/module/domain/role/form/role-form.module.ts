import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RoleFormComponent } from './component';

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
})
export class RoleFormModule {}
