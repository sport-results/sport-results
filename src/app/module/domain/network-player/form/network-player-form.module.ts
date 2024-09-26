import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NetworkPlayerFormUtil } from '@app/api/domain/network-player';

import { NetworkPlayerFormComponent } from './component';
import { NetworkPlayerFormUtilImpl } from './util';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
    declarations: [NetworkPlayerFormComponent],
    exports: [NetworkPlayerFormComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        DropdownModule,
        InputTextModule,
        InputTextareaModule
    ],
    providers: [
    {
      provide: NetworkPlayerFormUtil,
      useClass: NetworkPlayerFormUtilImpl,
    },
  ],
})
export class NetworkPlayerFormModule {}
