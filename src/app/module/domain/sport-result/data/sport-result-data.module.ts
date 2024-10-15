
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SportResultDataService } from '@app/api/domain/sport-result';

import { SportResultDataServiceImpl } from './service';

@NgModule({
    imports: [CommonModule, HttpClientModule],
    providers: [
        {
            provide: SportResultDataService,
            useClass: SportResultDataServiceImpl,
        },
    ],
})
export class SportResultDataModule {}