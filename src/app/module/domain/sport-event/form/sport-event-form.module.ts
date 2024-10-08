import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SportEventFormUtil } from '@app/api/domain/sport-event';

import { SportEventFormComponent } from './component';
import { SportEventFormUtilImpl } from './util';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TabViewModule } from 'primeng/tabview';
import { PermissionFormModule } from '../../permission';

@NgModule({
    declarations: [SportEventFormComponent],
    exports: [SportEventFormComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        CalendarModule,
        DropdownModule,
        InputTextModule,
        InputTextareaModule,
        PermissionFormModule,
        SelectButtonModule,
        TabViewModule
    ],
    providers: [
    {
      provide: SportEventFormUtil,
      useClass: SportEventFormUtilImpl,
    },
  ],
})
export class SportEventFormModule {}
