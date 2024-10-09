import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SportResultUtilService } from '@app/api/domain/sport-result';

import { SportResultUtilServiceImpl } from './service';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule],
    providers: [
        {
            provide: SportResultUtilService,
            useClass: SportResultUtilServiceImpl,
        },
    ],
})
export class SportResultUtilModule {}
