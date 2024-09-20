import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SportNetworkFormUtil } from '@app/api/domain/sport-network';

import { SportNetworkFormComponent } from './component';
import { SportNetworkFormUtilImpl } from './util';

@NgModule({
    declarations: [SportNetworkFormComponent],
    exports: [SportNetworkFormComponent],
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
      provide: SportNetworkFormUtil,
      useClass: SportNetworkFormUtilImpl,
    },
  ],
})
export class SportNetworkFormModule {}
