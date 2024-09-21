import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SportNetworkUtilService } from '@app/api/domain/sport-network';

import { SportNetworkUtilServiceImpl } from './service';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule],
    providers: [
        {
            provide: SportNetworkUtilService,
            useClass: SportNetworkUtilServiceImpl,
        },
    ],
})
export class SportNetworkUtilModule {}
