import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SportPlayerFormUtil } from '@app/api/domain/sport-player';

import { SportPlayerFormComponent } from './component';
import { SportPlayerFormUtilImpl } from './util';

@NgModule({
    declarations: [SportPlayerFormComponent],
    exports: [SportPlayerFormComponent],
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
      provide: SportPlayerFormUtil,
      useClass: SportPlayerFormUtilImpl,
    },
  ],
})
export class SportPlayerFormModule {}
