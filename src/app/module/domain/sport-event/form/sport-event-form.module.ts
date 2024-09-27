import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SportEventFormUtil } from '@app/api/domain/sport-event';

import { SportEventFormComponent } from './component';
import { SportEventFormUtilImpl } from './util';

@NgModule({
    declarations: [SportEventFormComponent],
    exports: [SportEventFormComponent],
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
      provide: SportEventFormUtil,
      useClass: SportEventFormUtilImpl,
    },
  ],
})
export class SportEventFormModule {}
