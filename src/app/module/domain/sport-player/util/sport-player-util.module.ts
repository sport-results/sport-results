import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SportPlayerUtilService } from '@app/api/domain/sport-player';

import { SportPlayerUtilServiceImpl } from './service';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule],
    providers: [
        {
            provide: SportPlayerUtilService,
            useClass: SportPlayerUtilServiceImpl,
        },
    ],
})
export class SportPlayerUtilModule {}
