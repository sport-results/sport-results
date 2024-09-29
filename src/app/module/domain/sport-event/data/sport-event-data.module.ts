
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SportEventDataService } from '@app/api/domain/sport-event';

import { SportEventDataServiceImpl } from './service';

@NgModule({
    imports: [CommonModule, HttpClientModule],
    providers: [
        {
            provide: SportEventDataService,
            useClass: SportEventDataServiceImpl,
        },
    ],
})
export class SportEventDataModule {}