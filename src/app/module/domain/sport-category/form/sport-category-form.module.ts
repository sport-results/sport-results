import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SportCategoryFormComponent } from './component';

@NgModule({
    declarations: [SportCategoryFormComponent],
    exports: [SportCategoryFormComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule
    ],
})
export class SportCategoryFormModule {}
