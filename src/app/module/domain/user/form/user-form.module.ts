import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserFormComponent } from './component';

@NgModule({
    declarations: [UserFormComponent],
    exports: [UserFormComponent],
    imports: [
        CommonModule,
        ButtonModule,
        FormsModule,
        HttpClientModule,
        InputTextModule,
        DropdownModule,
        MultiSelectModule,
        ReactiveFormsModule,
    ],
})
export class UserFormModule {}
