import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SportEventUtilService } from '@app/api/domain/sport-event';

import { SportEventUtilServiceImpl } from './service';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule],
    providers: [
        {
            provide: SportEventUtilService,
            useClass: SportEventUtilServiceImpl,
        },
    ],
})
export class SportEventUtilModule {}
